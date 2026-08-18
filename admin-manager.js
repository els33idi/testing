class AdminManager {
  constructor(db, authManager, securityManager, trialManager) {
    this.db = db;
    this.authManager = authManager;
    this.securityManager = securityManager;
    this.trialManager = trialManager;
    this.initTables();
  }

  initTables() {
    // Admin-specific metadata (notes, roles mapping, etc.)
    this.db.run(`
      CREATE TABLE IF NOT EXISTS admin_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id TEXT NOT NULL,
        target_type TEXT,
        target_id TEXT,
        note TEXT,
        created_at TEXT NOT NULL
      )
    `);
  }

  async createAdmin(email, password, name = null, role = "admin") {
    return new Promise((resolve, reject) => {
      // If user exists, update role/password as needed
      this.db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
        if (err) return reject(err);

        const now = new Date().toISOString();
        if (row) {
          const passwordHash = this.authManager.hashPassword(password);
          this.db.run(
            `UPDATE users SET password_hash = ?, role = ?, updated_at = ? WHERE id = ?`,
            [passwordHash, role, now, row.id],
            (uErr) => {
              if (uErr) return reject(uErr);
              resolve({ id: row.id, email, role, updated: true });
            }
          );
          return;
        }

        const userId = `admin-${Date.now()}`;
        const passwordHash = this.authManager.hashPassword(password);
        this.db.run(
          `INSERT INTO users (id, email, phone, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [userId, email, null, passwordHash, role, now, now],
          (iErr) => {
            if (iErr) return reject(iErr);
            resolve({ id: userId, email, role, created: true });
          }
        );
      });
    });
  }

  async getUsers({ search = null, limit = 50, offset = 0 } = {}) {
    return new Promise((resolve) => {
      let query = `SELECT u.id, u.email, u.role, u.status, u.created_at, u.updated_at, us.plan AS subscription_plan, us.plan_ends_at FROM users u LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.is_active = 1 WHERE 1=1`;
      const params = [];
      if (search) {
        query += ` AND (u.email LIKE ? OR u.id LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
      }
      query += ` ORDER BY u.created_at DESC LIMIT ? OFFSET ?`;
      params.push(limit, offset);
      this.db.all(query, params, (err, rows) => {
        resolve(err ? [] : rows.map(row => ({
          ...row,
          subscription_plan: row.subscription_plan || 'free'
        })));
      });
    });
  }

  async getUserById(id) {
    return new Promise((resolve) => {
      const query = `SELECT u.*, us.plan AS subscription_plan, us.plan_ends_at FROM users u LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.is_active = 1 WHERE u.id = ?`;
      this.db.get(query, [id], (err, row) => {
        resolve(err ? null : row);
      });
    });
  }

  async setUserRole(userId, role, performedBy = null) {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      this.db.run(`UPDATE users SET role = ?, updated_at = ? WHERE id = ?`, [role, now, userId], async (err) => {
        if (err) return reject(err);
        if (this.securityManager) await this.securityManager.logAction(performedBy, 'set_role', 'user', userId, 'success', null, null, { role });
        resolve(true);
      });
    });
  }

  async setUserStatus(userId, status, performedBy = null, reason = null) {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      this.db.run(`UPDATE users SET status = ?, updated_at = ? WHERE id = ?`, [status, now, userId], async (err) => {
        if (err) return reject(err);
        if (this.securityManager) await this.securityManager.logAction(performedBy, `set_status_${status}`, 'user', userId, 'success', null, null, { reason });
        resolve(true);
      });
    });
  }

  async getStats() {
    return new Promise((resolve) => {
      const stats = {};
      this.db.get(`SELECT COUNT(1) AS total FROM users`, [], (err, row) => {
        stats.totalUsers = (row && row.total) || 0;
        this.db.get(`SELECT COUNT(1) AS active FROM users WHERE status = 'active'`, [], (e2, r2) => {
          stats.activeUsers = (r2 && r2.active) || 0;
          this.db.get(`SELECT COUNT(1) AS suspended FROM users WHERE status = 'suspended'`, [], (e3, r3) => {
            stats.suspendedUsers = (r3 && r3.suspended) || 0;
            if (this.trialManager) {
              this.trialManager.getTrialDaysRemaining('dummy').catch(() => {});
            }
            resolve(stats);
          });
        });
      });
    });
  }

  async getSubscriptionByUserId(userId) {
    return new Promise((resolve) => {
      this.db.get(`SELECT * FROM user_subscriptions WHERE user_id = ? AND is_active = 1`, [userId], (err, row) => {
        if (err || !row) return resolve(null);
        resolve(row);
      });
    });
  }

  async getSubscriptionHistory(userId, limit = 20, offset = 0) {
    return new Promise((resolve) => {
      this.db.all(
        `SELECT id, plan, created_at, trial_started_at, trial_ends_at, plan_started_at, plan_ends_at, stripe_subscription_id, is_active
         FROM user_subscriptions
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [userId, limit, offset],
        (err, rows) => {
          resolve(err ? [] : rows);
        }
      );
    });
  }

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      const userId = `user-${Date.now()}`;
      const passwordHash = this.authManager.hashPassword(userData.password || Math.random().toString(36).slice(2));
      const now = new Date().toISOString();
      const values = [
        userId,
        userData.email,
        userData.phone || null,
        passwordHash,
        userData.role || 'student',
        userData.status || 'active',
        now,
        now
      ];
      this.db.run(
        `INSERT INTO users (id, email, phone, password_hash, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        values,
        async (err) => {
          if (err) return reject(err);
          if (this.trialManager) {
            await this.trialManager.createTrial(userId).catch(() => {});
          }
          if (this.securityManager) {
            await this.securityManager.logAction(null, 'create_user', 'user', userId, 'success', null, null, { email: userData.email });
          }
          resolve({ id: userId, email: userData.email });
        }
      );
    });
  }

  async deleteUser(userId, performedBy = null) {
    return new Promise((resolve, reject) => {
      const self = this;
      this.db.run(`DELETE FROM users WHERE id = ?`, [userId], async function (err) {
        if (err) return reject(err);
        const deleted = this.changes > 0;
        if (deleted && self.securityManager) {
          await self.securityManager.logAction(performedBy, 'delete_user', 'user', userId, 'success', null, null, {});
        }
        resolve(deleted);
      });
    });
  }

  async createAmbassadorApplication(userId, message, referralCode = null) {
    return new Promise((resolve, reject) => {
      const applicationId = `ambassador-${Date.now()}`;
      const now = new Date().toISOString();
      this.db.run(
        `INSERT INTO ambassador_applications (id, user_id, message, status, referral_code, created_at, updated_at) VALUES (?, ?, ?, 'pending', ?, ?, ?)`,
        [applicationId, userId, message, referralCode, now, now],
        async (err) => {
          if (err) return reject(err);
          if (this.securityManager) {
            await this.securityManager.logAction(userId, 'ambassador_application', 'ambassador', applicationId, 'pending', null, null, { referralCode, message });
          }
          resolve({ id: applicationId, user_id: userId, message, status: 'pending', referral_code: referralCode, created_at: now, updated_at: now });
        }
      );
    });
  }

  async getAmbassadorApplications(limit = 100, offset = 0) {
    return new Promise((resolve) => {
      this.db.all(
        `SELECT a.id, a.user_id, a.message, a.status, a.referral_code, a.processed_by, a.processed_at, a.created_at, a.updated_at, u.email AS user_email
         FROM ambassador_applications a
         LEFT JOIN users u ON a.user_id = u.id
         ORDER BY a.created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          resolve(err ? [] : rows || []);
        }
      );
    });
  }

  async updateAmbassadorApplicationStatus(applicationId, status, processedBy = null) {
    return new Promise((resolve, reject) => {
      const allowed = ['accepted', 'declined', 'pending'];
      if (!allowed.includes(status)) return reject(new Error('Invalid status'));
      const now = new Date().toISOString();
      this.db.run(
        `UPDATE ambassador_applications SET status = ?, processed_by = ?, processed_at = ?, updated_at = ? WHERE id = ?`,
        [status, processedBy, now, now, applicationId],
        async function (err) {
          if (err) return reject(err);
          if (this.changes === 0) return resolve(null);
          if (status === 'accepted' && processedBy) {
            // Mark the applicant user as ambassador
            this.db.run(
              `UPDATE users SET is_ambassador = 1, ambassador_since = ?, updated_at = ? WHERE id = (SELECT user_id FROM ambassador_applications WHERE id = ?)`,
              [now, now, applicationId],
              () => {}
            );
          }
          resolve({ id: applicationId, status, processed_by: processedBy, processed_at: now, updated_at: now });
        }.bind(this)
      );
    });
  }

  async getAmbassadorStats() {
    return new Promise((resolve) => {
      const stats = { total: 0, pending: 0, accepted: 0, declined: 0 };
      this.db.get(`SELECT COUNT(1) AS total FROM ambassador_applications`, [], (err, row) => {
        stats.total = (row && row.total) || 0;
        this.db.get(`SELECT COUNT(1) AS pending FROM ambassador_applications WHERE status = 'pending'`, [], (e1, r1) => {
          stats.pending = (r1 && r1.pending) || 0;
          this.db.get(`SELECT COUNT(1) AS accepted FROM ambassador_applications WHERE status = 'accepted'`, [], (e2, r2) => {
            stats.accepted = (r2 && r2.accepted) || 0;
            this.db.get(`SELECT COUNT(1) AS declined FROM ambassador_applications WHERE status = 'declined'`, [], (e3, r3) => {
              stats.declined = (r3 && r3.declined) || 0;
              resolve(stats);
            });
          });
        });
      });
    });
  }

  async getUserSessions(userId) {
    return new Promise((resolve) => {
      this.db.all(
        `SELECT id, device_name, device_type, ip_address, created_at, expires_at FROM sessions WHERE user_id = ? ORDER BY created_at DESC`,
        [userId],
        (err, rows) => {
          resolve(err ? [] : rows);
        }
      );
    });
  }

  async revokeSession(sessionId, performedBy = null) {
    return new Promise((resolve) => {
      const self = this;
      this.db.run(`DELETE FROM sessions WHERE id = ?`, [sessionId], async function (err) {
        if (err) return resolve(false);
        const revoked = this.changes > 0;
        if (revoked && self.securityManager) await self.securityManager.logAction(performedBy, 'revoke_session', 'session', sessionId, 'success', null, null, {});
        resolve(revoked);
      });
    });
  }

  async getSubscriptionPlans() {
    return new Promise((resolve) => {
      if (!this.trialManager) return resolve([]);
      resolve(Object.entries(this.trialManager?.PLANS || {}).map(([key, value]) => ({ plan: key, ...value })));
    });
  }

  async setUserSubscription(userId, plan, performedBy = null) {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      const planEnds = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      this.db.run(
        `UPDATE user_subscriptions SET plan = ?, plan_started_at = ?, plan_ends_at = ?, is_active = 1 WHERE user_id = ? AND is_active = 1`,
        [plan, now, planEnds, userId],
        async function (err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            const id = `sub_${Date.now()}`;
            this.db.run(
              `INSERT INTO user_subscriptions (id, user_id, plan, created_at, plan_started_at, plan_ends_at, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)`,
              [id, userId, plan, now, now, planEnds],
              async (insertErr) => {
                if (insertErr) return reject(insertErr);
                if (this.securityManager) await this.securityManager.logAction(performedBy, 'set_subscription', 'user', userId, 'success', null, null, { plan });
                resolve(true);
              }
            );
            return;
          }
          if (this.securityManager) await this.securityManager.logAction(performedBy, 'set_subscription', 'user', userId, 'success', null, null, { plan });
          resolve(true);
        }.bind(this)
      );
    });
  }
}

module.exports = AdminManager;
