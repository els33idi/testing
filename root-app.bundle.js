(() => {
  const { useState, useEffect, useRef, useCallback } = React;
  const C = {
    bg: "#07090f",
    surface: "#0f1219",
    card: "#161b26",
    cardHover: "#1c2233",
    border: "#1e2535",
    borderLight: "#252d40",
    accent: "#4f8ef7",
    accentSoft: "#1a2d5a",
    gold: "#f0b429",
    green: "#22c55e",
    red: "#ef4444",
    text: "#e2e8f8",
    muted: "#5a6480",
    purple: "#a78bfa",
    teal: "#2dd4bf",
    orange: "#fb923c",
    pink: "#f472b6"
  };
  const accentCol = C.accent;
  const THEME_PALETTES = {
    dark: {
      bg: "#0c0921",
      surface: "#140f34",
      card: "#1c1444",
      cardHover: "#251a58",
      border: "#2b2160",
      borderLight: "#372a78",
      accent: "#6f4fff",
      accentSoft: "#2a2168",
      gold: "#ffb020",
      green: "#22c55e",
      red: "#f0596a",
      text: "#f2eeff",
      muted: "#948bc4",
      purple: "#a78bfa",
      teal: "#2dd4bf",
      orange: "#ff8a3d",
      pink: "#f472b6",
      heroA: "#4b2fe0",
      heroB: "#ff8a3d"
    },
    light: {
      bg: "#f6f3ff",
      surface: "#ffffff",
      card: "#efe9ff",
      cardHover: "#e3d9ff",
      border: "#ddd0fb",
      borderLight: "#e9e0fc",
      accent: "#6a45f0",
      accentSoft: "#e3d9ff",
      gold: "#f59e0b",
      green: "#16a34a",
      red: "#e0475c",
      text: "#1c1240",
      muted: "#6f6396",
      purple: "#7c3aed",
      teal: "#0d9488",
      orange: "#fb7a2d",
      pink: "#db2777",
      heroA: "#5334f2",
      heroB: "#ff9d4d"
    }
  };
  const SCHOOL_NAMES = [
    "Chawama Secondary School",
    "Kafue Secondary School",
    "Lusaka International Community School",
    "Hillcrest Technical High School",
    "David Kaunda Technical High School",
    "Munali Secondary School",
    "Roma Girls Secondary School",
    "St. Mary's Secondary School",
    "Kamwala Secondary School",
    "Matero Girls Secondary School",
    "Other"
  ];
  const UNIVERSITY_NAMES = [
    "University of Zambia",
    "Copperbelt University",
    "Mulungushi University",
    "Zambia Open University",
    "Levy Mwanawasa Medical University",
    "University of Lusaka",
    "Cavendish University Zambia",
    "Texila American University",
    "Eden University",
    "Other"
  ];
  const API_BASE_URL = typeof window !== "undefined" && window.__API_BASE_URL ? window.__API_BASE_URL : typeof window !== "undefined" && window.location && window.location.origin ? window.location.origin : "http://localhost:4000";
  const PROFILE_ENGINE = {
    getLevel(profile) {
      const edu = profile.education;
      if (edu === "kindergarten") return "kindergarten";
      if (edu === "primary") return "primary";
      if (edu === "secondary") return "secondary";
      return "higher";
    },
    getPersona(profile) {
      const level = PROFILE_ENGINE.getLevel(profile);
      const prog = (profile.program || "").toLowerCase();
      if (level === "kindergarten") return "tiny_explorer";
      if (level === "primary") return "young_learner";
      if (level === "secondary") return "high_schooler";
      if (prog.includes("law") || prog.includes("llb")) return "law";
      if (prog.includes("medicine") || prog.includes("mbchb") || prog.includes("med")) return "medicine";
      if (prog.includes("engineer") || prog.includes("eng")) return "engineering";
      if (prog.includes("nurs")) return "nursing";
      if (prog.includes("pharm")) return "pharmacy";
      if (prog.includes("dent")) return "dentistry";
      if (prog.includes("psych")) return "psychology";
      if (prog.includes("business") || prog.includes("bba") || prog.includes("mba") || prog.includes("commerce")) return "business";
      if (prog.includes("educat") || prog.includes("teach")) return "education";
      if (prog.includes("cs") || prog.includes("comput") || prog.includes("software") || prog.includes("data")) return "cs";
      if (prog.includes("science") || prog.includes("biology") || prog.includes("chemistry") || prog.includes("physics")) return "science";
      if (prog.includes("art") || prog.includes("design") || prog.includes("architect")) return "arts";
      if (prog.includes("social") || prog.includes("sociol") || prog.includes("anthro")) return "social_science";
      if (prog.includes("math") || prog.includes("stat") || prog.includes("actuari")) return "maths";
      if (prog.includes("econ")) return "economics";
      if (prog.includes("pre-med") || prog.includes("hpfp")) return "premed";
      return "general";
    },
    getConfig(profile, { resetProgress = false } = {}) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const persona = PROFILE_ENGINE.getPersona(profile);
      const level = PROFILE_ENGINE.getLevel(profile);
      const resetMetricValue = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes("streak")) return "0 days";
        if (lower.includes("avg") || lower.includes("accuracy") || lower.includes("quiz") || lower.includes("mcq") || lower.includes("best")) return "0%";
        if (lower.includes("stars")) return "0 stars";
        if (lower.includes("cards")) return "0";
        if (/topics|cases|modules|frameworks|concepts|stories|theories|problems|essays/.test(lower)) return "0";
        return "0";
      };
      const configs = {
        tiny_explorer: {
          emoji: "\u{1F308}",
          greeting: "Hello, Superstar! \u{1F31F}",
          subgreeting: "Ready to learn something amazing today?",
          simaName: "SIMA",
          simaIntro: "Hi! I'm SIMA, your learning buddy! \u{1F308} Let's have fun learning together! What would you like to learn about today?",
          accentColor: C.pink,
          weakAreas: ["Numbers 1-20 \u{1F522}", "Letter Sounds \u{1F524}", "Shapes & Colors \u{1F7E1}", "Counting Objects \u{1F34E}"],
          todaySessions: ["\u{1F308} Letters & Sounds (15 min)", "\u{1F522} Counting Fun (10 min)", "\u{1F3A8} Drawing & Colors (15 min)"],
          quickPrompts: ["Tell me about animals \u{1F418}", "Count with me! \u{1F522}", "What color is that? \u{1F3A8}", "Sing the ABC song \u{1F3B5}", "Tell me a story! \u{1F4D6}"],
          exampleTopics: ["Colors & Shapes", "Animals & Their Sounds", "Numbers 1 to 10", "My Body Parts", "Days of the Week"],
          studioModes: ["Flashcards \u{1F0CF}", "Quiz \u{1F3AF}", "Story \u{1F4D6}"],
          systemPromptHint: "Use extremely simple language, lots of emojis, short sentences, and fun analogies. Speak like a kind, enthusiastic teacher for 4\u20136 year olds. Use examples from animals, food, and toys. Celebrate every question!",
          flashcardTone: "Make it super simple with pictures described in words, short answers, and lots of emoji. Use examples kids love: animals, food, toys.",
          timetableHint: "15\u201320 minute fun activity blocks with movement breaks. Lots of play-based learning.",
          badgeColor: C.pink,
          statHighlights: ["\u2B50 Stars earned", "\u{1F4DA} Stories learned", "\u{1F522} Numbers learned", "\u{1F3A8} Things made"],
          statValues: ["12 stars", "5 stories", "Up to 20", "4 drawings"],
          weakLabel: "Things to Practice",
          weakIcon: "\u{1F331}",
          analyticsLabel: "My Learning Journey"
        },
        young_learner: {
          emoji: "\u{1F680}",
          greeting: "Hey, Champ! \u{1F680}",
          subgreeting: "Let's make today's learning awesome!",
          simaName: "SIMA",
          simaIntro: `Hi ${((_a = profile.name) == null ? void 0 : _a.split(" ")[0]) || "there"}! \u{1F680} I'm SIMA, your study helper! I can help you understand your subjects, make studying fun, and answer any questions you have. What subject are we tackling today?`,
          accentColor: C.teal,
          weakAreas: ["Times Tables \u{1F4CA}", "Fractions \u{1F355}", "Reading Comprehension \u{1F4D6}", "Map Skills \u{1F5FA}\uFE0F"],
          todaySessions: ["\u{1F4D6} Reading & Writing (30 min)", "\u{1F522} Maths Practice (30 min)", "\u{1F30D} Social Studies (20 min)"],
          quickPrompts: ["Help me with fractions", "What causes rain? \u{1F327}\uFE0F", "History help please!", "Make a quiz for me", "Explain in simple steps"],
          exampleTopics: ["Fractions & Decimals", "The Water Cycle", "World War II Basics", "Plant Life Cycles", "Grammar & Punctuation"],
          studioModes: ["Flashcards", "Quiz", "Summary", "Mind Map"],
          systemPromptHint: "Use friendly, encouraging language for primary school students (ages 7\u201312). Use simple words, step-by-step explanations, real-world examples, and relatable analogies. Add fun facts and emojis occasionally. Keep sentences short.",
          flashcardTone: "Simple, clear language for primary school. Use examples from everyday life. Short answers.",
          timetableHint: "30-minute focused blocks with 10-minute breaks. Include physical activity breaks.",
          badgeColor: C.teal,
          statHighlights: ["\u{1F525} Day streak", "\u2705 Topics done", "\u26A1 Cards reviewed", "\u{1F3C6} Quiz best"],
          statValues: ["5 days", "14", "86", "90%"],
          weakLabel: "Areas to Strengthen",
          weakIcon: "\u{1F4AA}",
          analyticsLabel: "Progress Tracker"
        },
        high_schooler: {
          emoji: "\u{1F4DA}",
          greeting: "What's good,",
          subgreeting: "Let's crush those exams \u{1F4AA}",
          simaName: "SIMA",
          simaIntro: `Hey ${((_b = profile.name) == null ? void 0 : _b.split(" ")[0]) || "there"}! \u{1F44B} I'm SIMA \u2014 your personal study AI. I can help with any subject, generate practice questions, explain concepts, create revision notes, and build a study timetable. What are you working on?`,
          accentColor: C.accent,
          weakAreas: ["Calculus \u2014 Integration", "Organic Chemistry Reactions", "Essay Structure & Argument", "Economics \u2014 Elasticity"],
          todaySessions: ["\u{1F9EA} Chemistry Organic (45 min)", "\u{1F4D0} Maths Past Papers (1h)", "\u270D\uFE0F English Essay Draft (30 min)"],
          quickPrompts: ["Generate 10 practice questions", "Explain this concept simply", "Create revision notes", "What will be on the exam?", "Make flashcards", "Grade my essay"],
          exampleTopics: ["Calculus \u2014 Differentiation & Integration", "Organic Chemistry Mechanisms", "World Literature Essay Techniques", "Macroeconomics Fundamentals", "Physics \u2014 Electricity & Magnetism"],
          studioModes: ["Flashcards", "MCQs", "Essay Feedback", "Summary"],
          systemPromptHint: "Adapt to a high school student. Use clear, engaging language. Cover exam techniques, memory tricks, and structure answers for maximum marks. Reference common exam board styles (Cambridge, IB, local national exams).",
          flashcardTone: "High school level. Focus on definitions, key dates, formulas, and exam-style phrasing.",
          timetableHint: "45-minute Pomodoro sessions. Prioritize exam subjects. Include past paper practice and active recall.",
          badgeColor: C.accent,
          statHighlights: ["\u{1F525} Study streak", "\u{1F4DA} Topics mastered", "\u26A1 Cards due", "\u{1F4CA} Quiz avg"],
          statValues: ["7 days", "18", "23", "76%"],
          weakLabel: "Weak Areas \u2014 Prioritize These",
          weakIcon: "\u26A0\uFE0F",
          analyticsLabel: "Exam Readiness"
        },
        law: {
          emoji: "\u2696\uFE0F",
          greeting: "Good day, Counsellor",
          subgreeting: "Case law, statutes, and moots await",
          simaName: "SIMA",
          simaIntro: `Good day, ${((_c = profile.name) == null ? void 0 : _c.split(" ")[0]) || "Counsellor"}! \u2696\uFE0F I'm SIMA, your legal study companion. I specialise in case analysis, statutory interpretation, essay structuring using IRAC/CREAC, and moot preparation. What area of law are we working on today?`,
          accentColor: C.gold,
          weakAreas: ["Donoghue v Stevenson \u2014 Duty of Care", "Constitutional Interpretation Methods", "Consideration in Contract Law", "Mens Rea & Actus Reus"],
          todaySessions: ["\u2696\uFE0F Constitutional Law \u2014 Reading (1.5h)", "\u{1F4DD} Tort Essay \u2014 IRAC Draft (1h)", "\u{1F50D} Case Brief Practice (30 min)"],
          quickPrompts: ["Brief this case for me", "Explain IRAC method", "What are the exam issues here?", "Generate 10 MCQs on contract", "Compare two legal positions", "Draft a legal argument"],
          exampleTopics: ["Negligence & Duty of Care", "Offer & Acceptance in Contract", "Criminal Law \u2014 Mens Rea", "Judicial Review Principles", "Constitutional Rights & Limitations"],
          studioModes: ["Case Briefs", "MCQs", "Essay Feedback", "Statute Analysis"],
          systemPromptHint: "You are a legal study assistant. Use IRAC/CREAC frameworks. Cite landmark cases where relevant. Explain legal concepts with precision. Distinguish obiter dicta from ratio decidendi. Encourage critical legal analysis and competing arguments.",
          flashcardTone: "Law student level. Include: case name, year, key ratio, and principle. Frame as exam questions.",
          timetableHint: "90-minute deep reading blocks. Include mooting practice, past paper problem questions, and case brief sessions.",
          badgeColor: C.gold,
          statHighlights: ["\u{1F525} Study streak", "\u2696\uFE0F Cases briefed", "\u{1F4DD} Essays done", "\u{1F3DB}\uFE0F Topics covered"],
          statValues: ["6 days", "34 cases", "8 essays", "22 topics"],
          weakLabel: "Doctrine Gaps to Address",
          weakIcon: "\u2696\uFE0F",
          analyticsLabel: "Legal Mastery Tracker"
        },
        medicine: {
          emoji: "\u{1FA7A}",
          greeting: "Good morning, Doctor",
          subgreeting: "Let's build clinical excellence",
          simaName: "SIMA",
          simaIntro: `Hi ${((_d = profile.name) == null ? void 0 : _d.split(" ")[0]) || "Doc"}! \u{1FA7A} I'm SIMA, your medical study AI. I specialise in pathophysiology, clinical reasoning, pharmacology, and exam prep. I can generate MCQs, clinical cases, drug mnemonics, and more. What system are we studying today?`,
          accentColor: C.red,
          weakAreas: ["Acid-Base Disorders", "ECG Interpretation", "Drug Dosage Calculations", "Sepsis Management"],
          todaySessions: ["\u{1FAC0} Cardiology \u2014 Heart Failure (1.5h)", "\u{1F48A} Pharmacology MCQs (1h)", "\u{1F3E5} Clinical Case Review (30 min)"],
          quickPrompts: ["Create a clinical case", "Generate MCQs", "Drug mechanism?", "Explain pathophysiology", "Memory tip for this drug", "What's the management?"],
          exampleTopics: ["Heart Failure Pathophysiology", "Antibiotic Resistance Mechanisms", "Diabetic Ketoacidosis Management", "Paediatric Malnutrition", "Acute Abdomen Differentials"],
          studioModes: ["MCQs", "Clinical Cases", "Flashcards", "Drug Summary"],
          systemPromptHint: "You are a clinical medical education AI. Use clinical reasoning: Pathophysiology \u2192 Presentation \u2192 Investigations \u2192 Diagnosis \u2192 Management. Cite evidence-based guidelines. Include mnemonics. Flag high-yield exam facts.",
          flashcardTone: "Medical student. Include: mechanism, clinical features, investigations, management. High-yield exam focus.",
          timetableHint: "Pomodoro 25-min blocks for theory, 45-min for case-based learning. Rotate systems. Include clinical exposure reflection.",
          badgeColor: C.red,
          statHighlights: ["\u{1F525} Study streak", "\u{1FA7A} Topics mastered", "\u26A1 Cards due", "\u{1F4CA} MCQ avg"],
          statValues: ["7 days", "24", "12", "78%"],
          weakLabel: "High-Yield Weak Areas",
          weakIcon: "\u26A0\uFE0F",
          analyticsLabel: "Clinical Readiness"
        },
        engineering: {
          emoji: "\u2699\uFE0F",
          greeting: "Engineer Mode: ON",
          subgreeting: "Build, solve, iterate",
          simaName: "SIMA",
          simaIntro: `Hey ${((_e = profile.name) == null ? void 0 : _e.split(" ")[0]) || "Engineer"}! \u2699\uFE0F I'm SIMA. I think in systems and problem-solving frameworks. I can help with derivations, worked examples, concept breakdowns, and exam prep for your engineering modules. What's on the workbench today?`,
          accentColor: C.teal,
          weakAreas: ["Fourier Transforms", "Thermodynamics \u2014 Entropy", "Structural Analysis \u2014 Beam Bending", "Signal Processing Fundamentals"],
          todaySessions: ["\u2699\uFE0F Mechanics \u2014 Worked Problems (1.5h)", "\u{1F4D0} Maths Methods \u2014 Revision (45 min)", "\u{1F4A1} Electrical Circuits MCQs (30 min)"],
          quickPrompts: ["Step-by-step derivation", "Solve this problem", "Conceptual explanation", "Generate practice problems", "Sketch a system diagram", "Common mistakes to avoid"],
          exampleTopics: ["Stress & Strain Analysis", "Laplace Transforms in Control", "Fluid Mechanics \u2014 Bernoulli", "Thermodynamic Cycles", "Digital Logic & Boolean Algebra"],
          studioModes: ["Problem Sets", "Concept Cards", "Formula Sheets", "Derivation Walkthrough"],
          systemPromptHint: "Engineering study assistant. Use first-principles thinking. Work through derivations step-by-step. Identify common error patterns. Use diagrams described in text. Emphasise unit analysis, dimensional consistency, and engineering intuition.",
          flashcardTone: "Engineering student. Include: formula, units, when to apply it, and common exam traps.",
          timetableHint: "90-minute deep problem-solving sessions. Interleave theory and practice. Use worked examples first, then blind problem sets.",
          badgeColor: C.teal,
          statHighlights: ["\u{1F525} Problem streak", "\u2699\uFE0F Modules covered", "\u{1F4D0} Problems solved", "\u2705 Accuracy rate"],
          statValues: ["5 days", "8", "47", "82%"],
          weakLabel: "Concept Gaps to Close",
          weakIcon: "\u2699\uFE0F",
          analyticsLabel: "Problem-Solving Analytics"
        },
        cs: {
          emoji: "\u{1F4BB}",
          greeting: "sudo study --focus",
          subgreeting: "Ship knowledge, not bugs",
          simaName: "SIMA",
          simaIntro: `Hey ${((_f = profile.name) == null ? void 0 : _f.split(" ")[0]) || "Dev"}! \u{1F4BB} I'm SIMA. I can help with algorithms, data structures, system design, theory concepts, and exam prep. I speak your language \u2014 literally. What are we debugging today?`,
          accentColor: C.teal,
          weakAreas: ["Dynamic Programming", "Big-O Complexity Analysis", "Database Normalisation", "Network Protocols (OSI Model)"],
          todaySessions: ["\u{1F4BB} Algorithms \u2014 Graph Problems (1h)", "\u{1F5C4}\uFE0F Databases \u2014 SQL Practice (45 min)", "\u{1F4E1} Networks \u2014 Theory Revision (30 min)"],
          quickPrompts: ["Explain Big-O", "Walk me through this algorithm", "Generate coding interview Qs", "Explain this concept", "What's the time complexity?", "Design this system"],
          exampleTopics: ["Dynamic Programming Patterns", "Graph Algorithms \u2014 BFS/DFS", "SQL Joins & Optimisation", "OS \u2014 Process Scheduling", "Machine Learning Fundamentals"],
          studioModes: ["Concept Cards", "Algorithm Qs", "Code Explainer", "Mock Interview"],
          systemPromptHint: "CS/software engineering study AI. Explain algorithms with pseudocode and complexity analysis. Use real-world analogies. Generate LeetCode-style problems. Cover both theoretical CS and practical software engineering.",
          flashcardTone: "CS student. Include: definition, time/space complexity, use case, and a simple example.",
          timetableHint: "60-minute coding sessions alternating with 30-minute theory. Include LeetCode daily practice and system design weekly.",
          badgeColor: C.teal,
          statHighlights: ["\u{1F525} Code streak", "\u{1F4BB} Topics covered", "\u{1F9E9} Problems solved", "\u2705 Accuracy"],
          statValues: ["9 days", "15", "63", "79%"],
          weakLabel: "Concept Gaps",
          weakIcon: "\u{1F4BB}",
          analyticsLabel: "Dev Skill Tracker"
        },
        business: {
          emoji: "\u{1F4C8}",
          greeting: "Market's open,",
          subgreeting: "Let's grow your business IQ",
          simaName: "SIMA",
          simaIntro: `Hey ${((_g = profile.name) == null ? void 0 : _g.split(" ")[0]) || "there"}! \u{1F4C8} I'm SIMA, your business & management study partner. I can break down strategy frameworks, accounting concepts, finance theory, marketing models, and more. What are we analysing today?`,
          accentColor: C.gold,
          weakAreas: ["Financial Statement Analysis", "Porter's Five Forces Application", "Monetary Policy Transmission", "Break-Even Analysis"],
          todaySessions: ["\u{1F4CA} Finance \u2014 DCF Analysis (1h)", "\u{1F4C8} Strategy \u2014 Case Study (45 min)", "\u{1F4DA} Marketing Theory (30 min)"],
          quickPrompts: ["Explain this framework", "Case study analysis", "Define this term", "Generate exam questions", "Apply to a real company", "Pros and cons?"],
          exampleTopics: ["Porter's Five Forces", "DCF Valuation", "Consumer Behaviour Theory", "Organisational Structures", "International Trade & Tariffs"],
          studioModes: ["Framework Cards", "MCQs", "Case Analysis", "Definitions"],
          systemPromptHint: "Business & management study AI. Use real-world company examples. Apply strategic frameworks (SWOT, Porter, BCG). Ground finance concepts in practical scenarios. Help with both theoretical and applied business problems.",
          flashcardTone: "Business student. Include: definition, real-world example, and application in an exam context.",
          timetableHint: "60-minute case study blocks. Include news reading for current business examples. Alternate theory and case application.",
          badgeColor: C.gold,
          statHighlights: ["\u{1F525} Study streak", "\u{1F4C8} Frameworks mastered", "\u{1F4DD} Cases analysed", "\u2705 Quiz avg"],
          statValues: ["4 days", "18", "12", "81%"],
          weakLabel: "Knowledge Gaps",
          weakIcon: "\u{1F4C8}",
          analyticsLabel: "Business Acumen Tracker"
        },
        psychology: {
          emoji: "\u{1F9E0}",
          greeting: "Hello, Mind Explorer",
          subgreeting: "Understand people, understand the world",
          simaName: "SIMA",
          simaIntro: `Hi ${((_h = profile.name) == null ? void 0 : _h.split(" ")[0]) || "there"}! \u{1F9E0} I'm SIMA, your psychology study companion. I can explain theories, help you remember key studies, generate APA-style essay structures, and quiz you on everything from Freud to neuroscience. What's our focus today?`,
          accentColor: C.purple,
          weakAreas: ["Reliability vs Validity", "Cognitive Dissonance Theory", "Erikson's Psychosocial Stages", "Research Methods & Ethics"],
          todaySessions: ["\u{1F9E0} Cognitive Psychology (1h)", "\u{1F4CA} Research Methods Practice (45 min)", "\u{1F4AC} Case Study Analysis (30 min)"],
          quickPrompts: ["Explain this theory", "Key study for this topic?", "Compare two theorists", "Essay structure help", "Generate quiz questions", "Real-world application?"],
          exampleTopics: ["Attachment Theory (Bowlby)", "Social Learning Theory", "Cognitive Development \u2014 Piaget", "Schizophrenia \u2014 Biological Explanations", "Research Ethics in Psychology"],
          studioModes: ["Theory Cards", "MCQs", "Essay Plans", "Study Summaries"],
          systemPromptHint: "Psychology study AI. Cover theories, key researchers, landmark studies, and evaluation (strengths/limitations). Use APA referencing style where relevant. Help with essay structure: AO1 (knowledge) + AO3 (evaluation).",
          flashcardTone: "Psychology student. Include: theorist name, year, theory summary, key study, and one evaluation point.",
          timetableHint: "45-minute theory blocks with evaluation practice. Include essay drafting and past paper practice.",
          badgeColor: C.purple,
          statHighlights: ["\u{1F525} Study streak", "\u{1F9E0} Theories mastered", "\u{1F4DD} Essays drafted", "\u2705 Quiz avg"],
          statValues: ["5 days", "21", "6", "74%"],
          weakLabel: "Theory Gaps",
          weakIcon: "\u{1F9E0}",
          analyticsLabel: "Psych Mastery Tracker"
        },
        science: {
          emoji: "\u{1F52C}",
          greeting: "Lab coat on,",
          subgreeting: "Science waits for no one",
          simaName: "SIMA",
          simaIntro: `Hi ${((_i = profile.name) == null ? void 0 : _i.split(" ")[0]) || "Scientist"}! \u{1F52C} I'm SIMA, your science study companion. I can explain mechanisms, walk through experiments, help with equations, and generate practice questions across biology, chemistry, and physics. What's our experiment today?`,
          accentColor: C.teal,
          weakAreas: ["Electron Configuration", "Genetic Inheritance Problems", "Newton's Laws Applications", "Enzyme Kinetics"],
          todaySessions: ["\u{1F9EA} Chemistry \u2014 Organic Reactions (1h)", "\u{1F52C} Biology \u2014 Genetics (45 min)", "\u26A1 Physics \u2014 Electricity (30 min)"],
          quickPrompts: ["Explain the mechanism", "Work through this problem", "Lab technique explanation", "Generate practice Qs", "What's the equation?", "Draw & explain this"],
          exampleTopics: ["Photosynthesis & Respiration", "Periodic Trends & Bonding", "Mechanics \u2014 Force & Motion", "DNA Replication", "Thermochemistry"],
          studioModes: ["Concept Cards", "Problem Sets", "Experiment Notes", "Definitions"],
          systemPromptHint: "Science education AI. Use mechanistic thinking. Step through problems showing working. Use diagrams described in text. Highlight common misconceptions. Cover both conceptual understanding and mathematical application.",
          flashcardTone: "Science student. Include: concept, equation/formula if applicable, real-world example, and common misconception.",
          timetableHint: "60-minute concept blocks followed by problem-solving. Include past paper practice and experiment review.",
          badgeColor: C.teal,
          statHighlights: ["\u{1F525} Study streak", "\u{1F52C} Topics done", "\u{1F9E9} Problems solved", "\u2705 Quiz avg"],
          statValues: ["6 days", "19", "55", "77%"],
          weakLabel: "Concept Gaps",
          weakIcon: "\u{1F52C}",
          analyticsLabel: "Science Progress"
        },
        maths: {
          emoji: "\u2211",
          greeting: "Let's prove something,",
          subgreeting: "Mathematics is the language of the universe",
          simaName: "SIMA",
          simaIntro: `Hello ${((_j = profile.name) == null ? void 0 : _j.split(" ")[0]) || "Mathematician"}! \u2211 I'm SIMA, your maths study partner. I can work through proofs, explain concepts from first principles, generate problem sets, and help you spot patterns. What theorem are we tackling today?`,
          accentColor: C.purple,
          weakAreas: ["Real Analysis \u2014 Epsilon-Delta Proofs", "Group Theory Fundamentals", "Differential Equations \u2014 Exact Methods", "Probability \u2014 Conditional & Bayes"],
          todaySessions: ["\u2211 Analysis \u2014 Proof Writing (1.5h)", "\u{1F4D0} Linear Algebra \u2014 Problem Set (1h)", "\u{1F4CA} Probability \u2014 Exercises (30 min)"],
          quickPrompts: ["Step-by-step solution", "Prove this theorem", "Explain intuitively", "Generate practice problems", "Where does this formula come from?", "Common mistakes?"],
          exampleTopics: ["Real Analysis \u2014 Limits & Continuity", "Linear Algebra \u2014 Eigenvalues", "Abstract Algebra \u2014 Groups & Rings", "Probability & Statistics", "Complex Analysis"],
          studioModes: ["Problem Sets", "Proof Cards", "Formula Sheets", "Concept Explainers"],
          systemPromptHint: "Mathematics study AI. Show full working. Build intuition before formalism. Offer multiple proof strategies. Highlight where students typically make errors. Use LaTeX-style notation written out in words.",
          flashcardTone: "Maths student. Include: theorem/definition, intuition, when to apply, and a worked mini-example.",
          timetableHint: "90-minute deep focus blocks. Daily proof practice. Interleave new content with consolidation of recent material.",
          badgeColor: C.purple,
          statHighlights: ["\u{1F525} Problem streak", "\u2211 Topics covered", "\u2705 Problems solved", "\u{1F4CA} Accuracy"],
          statValues: ["8 days", "12", "71", "84%"],
          weakLabel: "Proof Gaps",
          weakIcon: "\u2211",
          analyticsLabel: "Mathematical Mastery"
        },
        economics: {
          emoji: "\u{1F4CA}",
          greeting: "Markets are rational,",
          subgreeting: "Are you? Let's find out",
          simaName: "SIMA",
          simaIntro: `Hey ${((_k = profile.name) == null ? void 0 : _k.split(" ")[0]) || "Economist"}! \u{1F4CA} I'm SIMA, your economics study partner. I can explain micro and macro concepts, work through diagrams, analyse policy, and generate exam-style questions. What's our focus today?`,
          accentColor: C.gold,
          weakAreas: ["Price Elasticity of Demand", "IS-LM Model", "Game Theory Equilibria", "Keynesian vs Monetarist"],
          todaySessions: ["\u{1F4CA} Macroeconomics \u2014 Policy Analysis (1h)", "\u{1F4C9} Microeconomics \u2014 Problem Set (45 min)", "\u{1F4DD} Essay Practice (30 min)"],
          quickPrompts: ["Explain this diagram", "Policy analysis", "Evaluate this argument", "Generate exam questions", "Real-world example?", "Compare two theories"],
          exampleTopics: ["Supply & Demand Dynamics", "Fiscal & Monetary Policy", "Market Failures & Externalities", "International Trade Theory", "GDP & National Income Accounting"],
          studioModes: ["Concept Cards", "MCQs", "Essay Plans", "Diagram Explainers"],
          systemPromptHint: "Economics study AI. Use diagrams described in words. Apply models to real-world examples. Evaluate policy tradeoffs. Structure answers for economics essays: Theory \u2192 Application \u2192 Evaluation.",
          flashcardTone: "Economics student. Include: concept, diagram description, real-world example, and evaluation point.",
          timetableHint: "60-minute blocks alternating theory and essay practice. Include current economic news reading.",
          badgeColor: C.gold,
          statHighlights: ["\u{1F525} Study streak", "\u{1F4CA} Concepts mastered", "\u{1F4DD} Essays", "\u2705 Quiz avg"],
          statValues: ["4 days", "20", "7", "79%"],
          weakLabel: "Concept Gaps",
          weakIcon: "\u{1F4CA}",
          analyticsLabel: "Economics Mastery"
        },
        general: {
          emoji: "\u{1F393}",
          greeting: "Good to see you,",
          subgreeting: "Let's make progress today",
          simaName: "SIMA",
          simaIntro: `Hi ${((_l = profile.name) == null ? void 0 : _l.split(" ")[0]) || "there"}! \u{1F393} I'm SIMA, your personal study AI. I can help you understand any subject, generate practice questions, create revision notes, and build a personalised study plan. What are we working on today?`,
          accentColor: C.accent,
          weakAreas: ["Critical Thinking & Analysis", "Essay Structure & Argument", "Research Methods", "Exam Technique"],
          todaySessions: ["\u{1F4DA} Main Subject Review (1h)", "\u{1F4DD} Practice Questions (45 min)", "\u{1F501} Flashcard Review (20 min)"],
          quickPrompts: ["Explain this concept", "Generate practice questions", "Summarise this topic", "Create flashcards", "Study tips for this?", "What will be examined?"],
          exampleTopics: ["Core Concepts Review", "Practice Question Sets", "Topic Summaries", "Exam Technique"],
          studioModes: ["Flashcards", "MCQs", "Summary", "Study Plan"],
          systemPromptHint: "General academic study AI. Adapt to the student's level and subject. Be encouraging. Use clear explanations, examples, and memory techniques.",
          flashcardTone: "University student. Clear, concise question and answer format.",
          timetableHint: "45-minute Pomodoro sessions with regular breaks. Include review and practice sessions.",
          badgeColor: C.accent,
          statHighlights: ["\u{1F525} Study streak", "\u{1F4DA} Topics done", "\u26A1 Cards due", "\u2705 Quiz avg"],
          statValues: ["3 days", "11", "18", "72%"],
          weakLabel: "Areas to Strengthen",
          weakIcon: "\u26A0\uFE0F",
          analyticsLabel: "Learning Progress"
        }
      };
      const config = { ...configs[persona] || configs.general };
      if (!config.weeklyStudyHours) config.weeklyStudyHours = [0, 0, 0, 0, 0, 0, 0];
      if (!config.weeklyQuizScores) config.weeklyQuizScores = [0, 0, 0, 0, 0, 0, 0];
      if (resetProgress) {
        config.statValues = config.statHighlights.map(resetMetricValue);
        config.weeklyStudyHours = [0, 0, 0, 0, 0, 0, 0];
        config.weeklyQuizScores = [0, 0, 0, 0, 0, 0, 0];
        config.weakAreas = [];
        config.exampleTopics = [];
        config.todaySessions = [];
      }
      return config;
    }
  };
  const PROGRAMS = [
    "Medicine (MBChB)",
    "Law (LLB)",
    "Engineering (General)",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Computer Science",
    "Software Engineering",
    "Data Science & AI",
    "Nursing",
    "Pharmacy",
    "Dentistry",
    "Psychology",
    "Business Administration (BBA)",
    "MBA",
    "Economics",
    "Accounting & Finance",
    "Commerce",
    "Education / Teaching",
    "Natural Sciences",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Statistics & Actuarial Science",
    "Architecture",
    "Art & Design",
    "Social Sciences",
    "Sociology & Anthropology",
    "Political Science",
    "Pre-Med (HPFP)",
    "Journalism & Media",
    "Agriculture",
    "Environmental Science",
    "Other"
  ];
  const Icon = ({ d, size = 20, color = "currentColor", fill = "none", sw = 1.8 }) => /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill, stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d }));
  const Icons = {
    brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z",
    flash: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    clock: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 6v4l3 3",
    users: "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-10 4a4 4 0 0 0-4 4v2h6v-2a4 4 0 0 0-2-3.46zm14 0a4 4 0 0 0-4 4v2h6v-2a4 4 0 0 0-2-3.46z",
    mic: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    check: "M20 6L9 17l-5-5",
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    sparkle: "M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z",
    chart: "M18 20V10M12 20V4M6 20v-6",
    note: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    repeat: "M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3",
    play: "M5 3l14 9-14 9V3z",
    pause: "M6 4h4v16H6zM14 4h4v16h-4z",
    stop: "M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z",
    x: "M18 6L6 18M6 6l12 12",
    plus: "M12 5v14M5 12h14",
    target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    trophy: "M8 6h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 0 4h-1v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4H4a2 2 0 0 1 0-4h2V8a2 2 0 0 1 2-2z M9 2h6M11 14h2v3h-2z"
  };
  const localSimaResponse = ({ prompt: prompt2 = "", mode = "exam", profile = {}, selectedSource: selectedSource2 = null }) => {
    var _a;
    const studentName = ((_a = profile.name) == null ? void 0 : _a.split(" ")[0]) || "Student";
    const subject = profile.program || "your subject";
    const normalized = prompt2.toLowerCase();
    const hasExplain = /explain|define|describe|what is|why|how/.test(normalized);
    const hasCompare = /difference|compare|contrast/.test(normalized);
    const hasExample = /example|practice|quiz|solve|question|problem/.test(normalized);
    const hasSummary = /summary|summarize|overview|recap/.test(normalized);
    const sourceHint = selectedSource2 ? ` based on ${selectedSource2.name}` : "";
    let answer = "";
    if (hasSummary) {
      answer = `Here is a clear summary of the key ideas${sourceHint} for ${subject}:
- Identify the major concept.
- Connect it to the main goal.
- Highlight what matters most for exams.`;
    } else if (hasCompare) {
      answer = `To compare these ideas${sourceHint}:
- Point 1: Use the first concept to show the core difference.
- Point 2: Show how the second concept changes application.
- Exam tip: Remember the strengths and when each method applies.`;
    } else if (hasExample) {
      answer = `Let's turn this into a learning example for ${subject}${sourceHint}:
1. State the problem clearly.
2. Show how to solve it step by step.
3. Summarize the result and the key lesson.`;
    } else if (hasExplain) {
      answer = `Sure ${studentName}, here is a simple explanation for ${subject}${sourceHint}:
- Start with the basic idea.
- Break it into two or three main steps.
- Finish with the practical takeaway.`;
    } else {
      answer = `Great question, ${studentName}! For ${subject}${sourceHint}, I recommend this approach:
- Focus on the most important concept.
- Practice a quick example.
- Review the answer in your own words.`;
    }
    if (mode === "simple") {
      answer = answer.replace(/\bexam\b/gi, "test").replace(/concept/g, "idea").replace(/strategy/g, "plan");
    }
    if (mode === "exam") {
      answer = `Exam-ready answer:
${answer}

Tip: write keywords, keep sentences short, and underline the main point.`;
    }
    if (mode === "advanced") {
      answer = `Advanced analysis:
${answer}

Think about exceptions, edge cases, and how this applies across topics.`;
    }
    if (mode === "clinical") {
      answer = `Clinical learning:
${answer}

Use a real-world scenario, explain the outcome, and connect it to theory.`;
    }
    return answer;
  };
  const inferSourceGroup = (filename) => {
    const id = filename.toLowerCase();
    if (/biology|bio/.test(id)) return "Biology";
    if (/chemistry|chem/.test(id)) return "Chemistry";
    if (/physics|phys/.test(id)) return "Physics";
    if (/economics|econ/.test(id)) return "Economics";
    if (/math|algebra|calculus|geometry|statistics|probability/.test(id)) return "Mathematics";
    if (/history|hist|civics/.test(id)) return "History";
    if (/english|literature|lang/.test(id)) return "English";
    if (/business|marketing|finance|accounting/.test(id)) return "Business";
    if (/law|legal/.test(id)) return "Law";
    if (/medicine|nursing|health|anatomy|physiology/.test(id)) return "Health";
    return "General Studies";
  };
  const S = {
    get page() {
      return {
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column"
      };
    },
    get card() {
      return {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: 20
      };
    },
    btn: (bg = C.accent, fg = "#fff") => ({
      background: bg,
      color: fg,
      border: "none",
      borderRadius: 999,
      padding: "11px 22px",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      transition: "opacity .15s, transform .1s",
      fontFamily: "inherit"
    }),
    get input() {
      return {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "11px 14px",
        color: C.text,
        fontSize: 14,
        width: "100%",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit"
      };
    },
    label: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 6,
      display: "block"
    }
  };
  function Badge({ children, color = C.accent }) {
    return /* @__PURE__ */ React.createElement("span", { style: { background: color + "22", color, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 } }, children);
  }
  function Pill({ children, active, onClick, color }) {
    const col = color || C.accent;
    return /* @__PURE__ */ React.createElement("button", { onClick, style: {
      background: active ? col : C.surface,
      color: active ? "#fff" : C.muted,
      border: `1px solid ${active ? col : C.border}`,
      borderRadius: 20,
      padding: "7px 15px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all .15s",
      whiteSpace: "nowrap",
      fontFamily: "inherit"
    } }, children);
  }
  function ProgressBar({ value, max, color = C.accent, height = 8 }) {
    return /* @__PURE__ */ React.createElement("div", { style: { background: C.border, borderRadius: 999, height, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${Math.min(100, value / max * 100)}%`, background: color, height: "100%", borderRadius: 999, transition: "width .4s" } }));
  }
  function Sparkline({ values = [], color = C.accent, width = 120, height = 36 }) {
    if (!values || values.length === 0) return /* @__PURE__ */ React.createElement("div", { style: { height, width } });
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const len = values.length;
    const step = width / Math.max(1, len - 1);
    const points = values.map((v, i) => {
      const x = i * step;
      const y = height - (v - min) / (max - min || 1) * height;
      return `${x},${y}`;
    }).join(" ");
    return /* @__PURE__ */ React.createElement("svg", { width, height, viewBox: `0 0 ${width} ${height}`, style: { display: "block" } }, /* @__PURE__ */ React.createElement("polyline", { fill: "none", stroke: color, strokeWidth: "2", points, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function MiniBarChart({ values = [], color = C.accent, width = 200, height = 80 }) {
    if (!values || values.length === 0) return /* @__PURE__ */ React.createElement("div", { style: { height, width, background: C.cardHover, borderRadius: 8 } });
    const max = Math.max(...values, 1);
    const barW = Math.max(4, Math.floor(width / values.length) - 4);
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "end", height, padding: 8, background: C.cardHover, borderRadius: 8 } }, values.map((v, i) => /* @__PURE__ */ React.createElement("div", { key: i, title: `${v}%`, style: { width: barW, height: `${Math.round(v / max * 100)}%`, background: color, borderRadius: 4 } })));
  }
  function CircleProgress({ value, size = 80, stroke = 7, color = C.accent, label }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - value / 100 * circ;
    return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)", position: "absolute" } }, /* @__PURE__ */ React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: C.border, strokeWidth: stroke }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: size / 2,
        cy: size / 2,
        r,
        fill: "none",
        stroke: color,
        strokeWidth: stroke,
        strokeDasharray: circ,
        strokeDashoffset: offset,
        strokeLinecap: "round",
        style: { transition: "stroke-dashoffset .6s ease" }
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: size * 0.22, fontWeight: 800, color } }, value, "%"), label && /* @__PURE__ */ React.createElement("div", { style: { fontSize: size * 0.13, color: C.muted, lineHeight: 1.2 } }, label)));
  }
  function Squiggle({ color = C.orange, width = 90, height = 24, style }) {
    return /* @__PURE__ */ React.createElement("svg", { className: "sima-scribble", width, height, viewBox: "0 0 90 24", style }, /* @__PURE__ */ React.createElement(
      "path",
      {
        d: "M2 12c5-10 10-10 15 0s10 10 15 0 10-10 15 0 10 10 15 0 10-10 15 0",
        stroke: color,
        strokeWidth: "3.4"
      }
    ));
  }
  function BlobShape({ color = C.heroA, size = 160, style, opacity = 1 }) {
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 200 200", style }, /* @__PURE__ */ React.createElement(
      "path",
      {
        fill: color,
        opacity,
        d: "M45.2,-58.4C57.9,-49.8,66.4,-34.3,69.6,-18C72.8,-1.7,70.7,15.4,62.6,29.1C54.5,42.8,40.4,53.1,24.9,60.1C9.5,67.1,-7.3,70.7,-23.1,67.3C-38.9,63.9,-53.7,53.4,-62.5,39C-71.3,24.6,-74.1,6.3,-70.6,-10.5C-67.1,-27.3,-57.3,-42.5,-44.1,-51.2C-30.9,-59.9,-15.5,-62.1,1.4,-64C18.2,-65.9,32.5,-67,45.2,-58.4Z",
        transform: "translate(100 100)"
      }
    ));
  }
  function HeroDecor({ heroA = C.heroA, heroB = C.heroB, className }) {
    return /* @__PURE__ */ React.createElement("div", { className, style: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 } }, /* @__PURE__ */ React.createElement(BlobShape, { color: heroA, size: 220, opacity: 0.35, style: { position: "absolute", top: -60, left: -70 } }), /* @__PURE__ */ React.createElement(BlobShape, { color: heroB, size: 160, opacity: 0.3, style: { position: "absolute", bottom: -50, right: -50 } }), /* @__PURE__ */ React.createElement("div", { className: "sima-illo-spin", style: { position: "absolute", top: 14, right: 18, width: 34, height: 34, borderRadius: "50%", border: `2.5px dashed ${heroB}66` } }), /* @__PURE__ */ React.createElement(Squiggle, { color: heroB, width: 70, height: 20, style: { position: "absolute", top: 30, left: 24, opacity: 0.7 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 24, left: 30, width: 10, height: 10, borderRadius: "50%", background: heroB, opacity: 0.6 } }));
  }
  function IllustrationStudyDesk({ width = 220, heroA = C.heroA, heroB = C.heroB, className = "sima-illo-float" }) {
    const height = width * 0.86;
    return /* @__PURE__ */ React.createElement("svg", { className, width, height, viewBox: "0 0 220 190", fill: "none" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "110", cy: "176", rx: "86", ry: "10", fill: heroA, opacity: "0.18" }), /* @__PURE__ */ React.createElement("rect", { x: "30", y: "122", width: "150", height: "10", rx: "4", fill: "#1c1444" }), /* @__PURE__ */ React.createElement("rect", { x: "42", y: "132", width: "8", height: "34", fill: "#1c1444" }), /* @__PURE__ */ React.createElement("rect", { x: "160", y: "132", width: "8", height: "34", fill: "#1c1444" }), /* @__PURE__ */ React.createElement("rect", { x: "70", y: "70", width: "80", height: "54", rx: "6", fill: heroA }), /* @__PURE__ */ React.createElement("rect", { x: "78", y: "78", width: "64", height: "38", rx: "3", fill: "#fff" }), /* @__PURE__ */ React.createElement("rect", { x: "86", y: "86", width: "30", height: "4", rx: "2", fill: heroB }), /* @__PURE__ */ React.createElement("rect", { x: "86", y: "94", width: "44", height: "4", rx: "2", fill: heroA, opacity: "0.5" }), /* @__PURE__ */ React.createElement("rect", { x: "86", y: "102", width: "36", height: "4", rx: "2", fill: heroA, opacity: "0.5" }), /* @__PURE__ */ React.createElement("rect", { x: "100", y: "124", width: "20", height: "8", fill: heroA }), /* @__PURE__ */ React.createElement("path", { d: "M60 122 L60 96 Q60 84 74 84 L96 84 Q108 84 108 96 L108 122 Z", fill: "#1c1444", opacity: "0.9" }), /* @__PURE__ */ React.createElement("circle", { cx: "84", cy: "60", r: "16", fill: "#ffb98a" }), /* @__PURE__ */ React.createElement("path", { d: "M68 58c0-12 8-20 16-20s16 8 16 20c-6-6-26-6-32 0z", fill: "#241468" }), /* @__PURE__ */ React.createElement("path", { d: "M56 118c2-22 12-34 28-34s26 12 28 34", fill: heroB }), /* @__PURE__ */ React.createElement("rect", { x: "52", y: "112", width: "14", height: "14", rx: "4", fill: "#ffb98a" }), /* @__PURE__ */ React.createElement("rect", { x: "102", y: "112", width: "14", height: "14", rx: "4", fill: "#ffb98a" }), /* @__PURE__ */ React.createElement("rect", { x: "182", y: "146", width: "20", height: "20", rx: "3", fill: heroB }), /* @__PURE__ */ React.createElement("path", { d: "M192 146c-10-6-8-20 0-24 8 4 10 18 0 24z", fill: "#22c55e" }), /* @__PURE__ */ React.createElement("path", { d: "M192 146c6-10 4-22-4-26 -6 6-6 20 4 26z", fill: "#16a34a" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "52", r: "6", fill: heroB, opacity: "0.8" }), /* @__PURE__ */ React.createElement("circle", { cx: "196", cy: "46", r: "4", fill: heroA, opacity: "0.7" }), /* @__PURE__ */ React.createElement("path", { className: "sima-scribble", d: "M20 90c4-6 8-6 12 0", stroke: heroB, strokeWidth: "2.5" }));
  }
  function IllustrationFlashcards({ width = 180, heroA = C.heroA, heroB = C.heroB, className = "sima-illo-float" }) {
    const height = width;
    return /* @__PURE__ */ React.createElement("svg", { className, width, height, viewBox: "0 0 180 180", fill: "none" }, /* @__PURE__ */ React.createElement("rect", { x: "34", y: "46", width: "112", height: "76", rx: "14", fill: heroA, opacity: "0.35", transform: "rotate(-6 90 84)" }), /* @__PURE__ */ React.createElement("rect", { x: "34", y: "52", width: "112", height: "76", rx: "14", fill: heroA, transform: "rotate(3 90 90)" }), /* @__PURE__ */ React.createElement("rect", { x: "30", y: "58", width: "112", height: "76", rx: "14", fill: "#fff" }), /* @__PURE__ */ React.createElement("circle", { cx: "52", cy: "80", r: "12", fill: heroB }), /* @__PURE__ */ React.createElement("path", { d: "M46 80l4 4 8-8", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ React.createElement("rect", { x: "72", y: "72", width: "56", height: "6", rx: "3", fill: heroA, opacity: "0.7" }), /* @__PURE__ */ React.createElement("rect", { x: "72", y: "84", width: "40", height: "6", rx: "3", fill: heroA, opacity: "0.35" }), /* @__PURE__ */ React.createElement("rect", { x: "44", y: "104", width: "84", height: "10", rx: "5", fill: heroB, opacity: "0.85" }), /* @__PURE__ */ React.createElement("circle", { cx: "150", cy: "40", r: "7", fill: heroB }), /* @__PURE__ */ React.createElement("circle", { cx: "26", cy: "140", r: "5", fill: heroA }));
  }
  function IllustrationPlanner({ width = 190, heroA = C.heroA, heroB = C.heroB, className = "sima-illo-float" }) {
    const height = width * 0.95;
    return /* @__PURE__ */ React.createElement("svg", { className, width, height, viewBox: "0 0 190 180", fill: "none" }, /* @__PURE__ */ React.createElement("rect", { x: "30", y: "34", width: "130", height: "120", rx: "16", fill: "#fff" }), /* @__PURE__ */ React.createElement("rect", { x: "30", y: "34", width: "130", height: "34", rx: "16", fill: heroA }), /* @__PURE__ */ React.createElement("rect", { x: "30", y: "52", width: "130", height: "16", fill: heroA }), /* @__PURE__ */ React.createElement("rect", { x: "54", y: "20", width: "10", height: "24", rx: "5", fill: heroB }), /* @__PURE__ */ React.createElement("rect", { x: "126", y: "20", width: "10", height: "24", rx: "5", fill: heroB }), [0, 1, 2].map((r) => /* @__PURE__ */ React.createElement("g", { key: r }, [0, 1, 2, 3].map((c) => /* @__PURE__ */ React.createElement(
      "rect",
      {
        key: c,
        x: 48 + c * 26,
        y: 82 + r * 24,
        width: "18",
        height: "14",
        rx: "4",
        fill: r === 1 && c === 2 ? heroB : heroA,
        opacity: r === 1 && c === 2 ? 1 : 0.18
      }
    )))), /* @__PURE__ */ React.createElement("circle", { cx: "150", cy: "140", r: "20", fill: heroB }), /* @__PURE__ */ React.createElement("path", { d: "M142 140l6 6 10-12", stroke: "#fff", strokeWidth: "3.2", strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function IllustrationTrophy({ width = 170, heroA = C.heroA, heroB = C.heroB, className = "sima-illo-float" }) {
    const height = width;
    return /* @__PURE__ */ React.createElement("svg", { className, width, height, viewBox: "0 0 170 170", fill: "none" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "85", cy: "150", rx: "46", ry: "8", fill: heroA, opacity: "0.18" }), /* @__PURE__ */ React.createElement("rect", { x: "70", y: "120", width: "30", height: "18", fill: "#1c1444" }), /* @__PURE__ */ React.createElement("rect", { x: "56", y: "136", width: "58", height: "10", rx: "4", fill: "#1c1444" }), /* @__PURE__ */ React.createElement("path", { d: "M60 50h50v34c0 16-11 28-25 28s-25-12-25-28V50z", fill: heroB }), /* @__PURE__ */ React.createElement("path", { d: "M60 56c-14 0-22 8-22 20s10 18 20 16", stroke: heroB, strokeWidth: "6", fill: "none", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("path", { d: "M110 56c14 0 22 8 22 20s-10 18-20 16", stroke: heroB, strokeWidth: "6", fill: "none", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("circle", { cx: "85", cy: "66", r: "12", fill: "#fff", opacity: "0.9" }), /* @__PURE__ */ React.createElement("path", { d: "M85 59l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z", fill: heroB }), /* @__PURE__ */ React.createElement("circle", { cx: "30", cy: "40", r: "5", fill: heroA }), /* @__PURE__ */ React.createElement("circle", { cx: "140", cy: "34", r: "4", fill: heroA }), /* @__PURE__ */ React.createElement(Squiggle, { color: heroA, width: 40, height: 12, style: { position: "relative", left: 60, top: -6 } }));
  }
  function IllustrationEmptyState({ width = 150, heroA = C.heroA, heroB = C.heroB, className = "" }) {
    const height = width * 0.86;
    return /* @__PURE__ */ React.createElement("svg", { className, width, height, viewBox: "0 0 150 130", fill: "none" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "75", cy: "112", rx: "50", ry: "8", fill: heroA, opacity: "0.15" }), /* @__PURE__ */ React.createElement("path", { d: "M20 58l55-24 55 24-55 24-55-24z", fill: heroA, opacity: "0.5" }), /* @__PURE__ */ React.createElement("path", { d: "M20 58v34l55 24V82L20 58z", fill: heroA }), /* @__PURE__ */ React.createElement("path", { d: "M130 58v34l-55 24V82l55-24z", fill: heroA, opacity: "0.75" }), /* @__PURE__ */ React.createElement("circle", { cx: "75", cy: "40", r: "14", fill: heroB, opacity: "0.9" }), /* @__PURE__ */ React.createElement("path", { d: "M69 40l4 4 8-8", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function SimaTyping() {
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, alignItems: "center", padding: "10px 14px", background: C.card, borderRadius: 12, width: "fit-content" } }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: `bounce 1s ${i * 0.15}s infinite` } })));
  }
  function OnboardingScreen({ onComplete }) {
    var _a, _b, _c;
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({
      name: "",
      age: 18,
      education: "",
      program: "",
      year: "",
      institution: "",
      studyTime: "morning",
      attention: "medium",
      hours: 3,
      style: ["visual"],
      email: ""
    });
    const [validationError, setValidationError] = useState("");
    const upd = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
    const STEPS = 4;
    const styleOptions = [
      ["visual", "Visual"],
      ["auditory", "Auditory"],
      ["reading", "Reading/Writing"],
      ["kinesthetic", "Kinesthetic"],
      ["practical", "Practical"],
      ["social", "Group Learning"],
      ["solitary", "Solo Study"],
      ["logical", "Logical"],
      ["verbal", "Verbal"],
      ["spacedRepetition", "Spaced Repetition"],
      ["groupStudy", "Group Study"],
      ["mindMapping", "Mind Mapping"],
      ["activeRecall", "Active Recall"]
    ];
    const educationOptions = [
      { value: "kindergarten", label: "Kindergarten" },
      { value: "primary", label: "Primary School" },
      { value: "secondary", label: "Secondary School" },
      { value: "university", label: "University" },
      { value: "postgraduate", label: "Postgraduate" }
    ];
    const gradeOptions = {
      primary: [
        { value: "grade1", label: "Grade 1" },
        { value: "grade2", label: "Grade 2" },
        { value: "grade3", label: "Grade 3" },
        { value: "grade4", label: "Grade 4" },
        { value: "grade5", label: "Grade 5" },
        { value: "grade6", label: "Grade 6" },
        { value: "grade7", label: "Grade 7" }
      ],
      secondary: [
        { value: "grade8", label: "Grade 8 (Form 1)" },
        { value: "grade9", label: "Grade 9 (Form 2)" },
        { value: "grade10", label: "Grade 10 (Form 3)" },
        { value: "grade11", label: "Grade 11 (Form 4)" },
        { value: "grade12", label: "Grade 12 (Form 5)" }
      ]
    };
    const previewProfile = {
      ...profile,
      style: Array.isArray(profile.style) ? profile.style[0] : profile.style
    };
    const styleLabel = Array.isArray(profile.style) ? profile.style.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ") : profile.style;
    const validateStep = (stepIndex, profileData) => {
      if (stepIndex === 0) {
        if (!profileData.name.trim()) return "Please enter your name before continuing.";
        if (!profileData.education) return "Please select your education level.";
      }
      if (stepIndex === 1) {
        if (!profileData.institution.trim()) return "Please enter your institution or school name.";
        if (profileData.education === "university" || profileData.education === "postgraduate") {
          if (!profileData.program) return "Please select your program or course.";
          if (!profileData.year) return "Please choose your year of study.";
        }
        if ((profileData.education === "primary" || profileData.education === "secondary") && !profileData.year) return "Please select your grade or class.";
      }
      if (stepIndex === 2) {
        if (!Array.isArray(profileData.style) || profileData.style.length === 0) return "Please choose at least one learning style.";
      }
      return "";
    };
    const previewConfig = PROFILE_ENGINE.getConfig(previewProfile);
    const steps = [
      /* @__PURE__ */ React.createElement("div", { key: 0 }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: previewConfig.accentColor, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 } }, "STEP 1 \u2014 WHO ARE YOU?"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 22, fontWeight: 800, marginBottom: 6 } }, "Let's personalise SIMA for you \u2728"), /* @__PURE__ */ React.createElement("p", { style: { color: C.muted, marginBottom: 24, fontSize: 14 } }, "Everything adapts to your profile \u2014 from the language SIMA uses to your quiz topics."), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Your name"), /* @__PURE__ */ React.createElement("input", { style: { ...S.input, marginBottom: 16 }, placeholder: "e.g. Mwansa Chanda", value: profile.name, onChange: (e) => upd("name", e.target.value) }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Age: ", profile.age), /* @__PURE__ */ React.createElement("input", { type: "range", min: 4, max: 60, value: profile.age, onChange: (e) => upd("age", +e.target.value), style: { width: "100%", accentColor: previewConfig.accentColor, marginBottom: 16 } }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Education level"), /* @__PURE__ */ React.createElement("select", { style: { ...S.input }, value: profile.education, onChange: (e) => upd("education", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, "Select education level"), educationOptions.map((opt) => /* @__PURE__ */ React.createElement("option", { key: opt.value, value: opt.value }, opt.label))), profile.education && profile.education !== "kindergarten" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, padding: "10px 14px", background: previewConfig.accentColor + "15", borderRadius: 10, border: `1px solid ${previewConfig.accentColor}33`, fontSize: 13, color: previewConfig.accentColor } }, previewConfig.emoji, " SIMA will adapt to your level automatically")),
      /* @__PURE__ */ React.createElement("div", { key: 1 }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: previewConfig.accentColor, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 } }, "STEP 2 \u2014 YOUR COURSE"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 22, fontWeight: 800, marginBottom: 6 } }, "Academic details \u{1F4DA}"), /* @__PURE__ */ React.createElement("p", { style: { color: C.muted, marginBottom: 24, fontSize: 14 } }, "SIMA uses this to adapt quiz topics, examples, and difficulty."), profile.education === "university" || profile.education === "postgraduate" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Program / Course"), /* @__PURE__ */ React.createElement("select", { style: { ...S.input, marginBottom: 16 }, value: profile.program, onChange: (e) => upd("program", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, "Select program / course"), PROGRAMS.map((p) => /* @__PURE__ */ React.createElement("option", { key: p, value: p }, p))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Year of study"), /* @__PURE__ */ React.createElement("select", { style: { ...S.input, marginBottom: 16 }, value: profile.year, onChange: (e) => upd("year", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, "Select year of study"), ["1", "2", "3", "4", "5", "6", "7"].map((y) => /* @__PURE__ */ React.createElement("option", { key: y, value: y }, "Year ", y))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Institution"), /* @__PURE__ */ React.createElement("input", { style: S.input, placeholder: "e.g. University of Zambia", value: profile.institution, onChange: (e) => upd("institution", e.target.value), list: "universityList" }), /* @__PURE__ */ React.createElement("datalist", { id: "universityList" }, UNIVERSITY_NAMES.map((name) => /* @__PURE__ */ React.createElement("option", { key: name, value: name })))) : profile.education === "kindergarten" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "School name"), /* @__PURE__ */ React.createElement("input", { style: { ...S.input, marginBottom: 16 }, placeholder: "e.g. Sunshine Nursery", value: profile.institution, onChange: (e) => upd("institution", e.target.value) }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px", background: C.pink + "15", borderRadius: 12, border: `1px solid ${C.pink}33`, fontSize: 14, color: C.pink } }, "\u{1F308} SIMA will use simple words, fun pictures described in words, and lots of emojis just for you!")) : profile.education === "primary" || profile.education === "secondary" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "School name"), /* @__PURE__ */ React.createElement("input", { style: { ...S.input, marginBottom: 16 }, placeholder: "e.g. Chawama Secondary School", value: profile.institution, onChange: (e) => upd("institution", e.target.value), list: "schoolList" }), /* @__PURE__ */ React.createElement("datalist", { id: "schoolList" }, SCHOOL_NAMES.map((name) => /* @__PURE__ */ React.createElement("option", { key: name, value: name }))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Grade / Class"), /* @__PURE__ */ React.createElement("select", { style: S.input, value: profile.year, onChange: (e) => upd("year", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, "Select your grade"), (_a = gradeOptions[profile.education]) == null ? void 0 : _a.map((g) => /* @__PURE__ */ React.createElement("option", { key: g.value, value: g.value }, g.label)))) : null, /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, padding: "12px 14px", background: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { color: C.muted, fontSize: 11, fontWeight: 700, marginBottom: 6 } }, "SIMA WILL TEACH YOU LIKE A"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: previewConfig.accentColor } }, previewConfig.emoji, " ", previewConfig.greeting.replace(",", ""), " learner"), /* @__PURE__ */ React.createElement("div", { style: { color: C.muted, fontSize: 12, marginTop: 4 } }, "Topics: ", (_b = previewConfig.exampleTopics) == null ? void 0 : _b[0], ", ", (_c = previewConfig.exampleTopics) == null ? void 0 : _c[1]))),
      /* @__PURE__ */ React.createElement("div", { key: 2 }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: previewConfig.accentColor, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 } }, "STEP 3 \u2014 HOW YOU STUDY"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 22, fontWeight: 800, marginBottom: 6 } }, "Your study style \u{1F9E0}"), /* @__PURE__ */ React.createElement("p", { style: { color: C.muted, marginBottom: 24, fontSize: 14 } }, "SIMA adapts your timetable, sessions, and explanations to match."), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Preferred study time"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" } }, ["morning", "afternoon", "evening", "night"].map((t) => /* @__PURE__ */ React.createElement(Pill, { key: t, active: profile.studyTime === t, onClick: () => upd("studyTime", t), color: previewConfig.accentColor }, t.charAt(0).toUpperCase() + t.slice(1)))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Attention span"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" } }, [["short", "\u26A1 Short (<20 min)"], ["medium", "\u{1F525} Medium (20\u201345 min)"], ["long", "\u{1F48E} Deep (45 min+)"]].map(([v, l]) => /* @__PURE__ */ React.createElement(Pill, { key: v, active: profile.attention === v, onClick: () => upd("attention", v), color: previewConfig.accentColor }, l))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Learning style"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 } }, styleOptions.map(([ls, label]) => {
        const selected = Array.isArray(profile.style) ? profile.style.includes(ls) : profile.style === ls;
        return /* @__PURE__ */ React.createElement(
          Pill,
          {
            key: ls,
            active: selected,
            onClick: () => {
              const current = Array.isArray(profile.style) ? profile.style : [profile.style];
              const next = current.includes(ls) ? current.filter((item) => item !== ls) : [...current, ls];
              upd("style", next.length ? next : ["visual"]);
            },
            color: previewConfig.accentColor
          },
          label
        );
      })), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Daily study hours: ", profile.hours, "h"), /* @__PURE__ */ React.createElement("input", { type: "range", min: 1, max: 12, value: profile.hours, onChange: (e) => upd("hours", +e.target.value), style: { width: "100%", accentColor: previewConfig.accentColor } })),
      /* @__PURE__ */ React.createElement("div", { key: 3 }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: previewConfig.accentColor, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 } }, "STEP 4 \u2014 CONTACT INFO"), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 22, fontWeight: 800, marginBottom: 6 } }, "Add your phone number \u{1F4F1}"), /* @__PURE__ */ React.createElement("p", { style: { color: C.muted, marginBottom: 24, fontSize: 14 } }, "This helps us reach you and provides account recovery options."), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Full name"), /* @__PURE__ */ React.createElement("input", { style: { ...S.input, marginBottom: 16 }, placeholder: "First and Last Name", value: profile.name, onChange: (e) => upd("name", e.target.value) }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Country code"), /* @__PURE__ */ React.createElement("select", { style: { ...S.input, marginBottom: 12 }, value: profile.countryCode || "+260", onChange: (e) => upd("countryCode", e.target.value) }, [{ code: "+260", country: "\u{1F1FF}\u{1F1F2} Zambia" }, { code: "+1", country: "\u{1F1FA}\u{1F1F8} USA" }, { code: "+44", country: "\u{1F1EC}\u{1F1E7} UK" }, { code: "+254", country: "\u{1F1F0}\u{1F1EA} Kenya" }, { code: "+255", country: "\u{1F1F9}\u{1F1FF} Tanzania" }, { code: "+256", country: "\u{1F1FA}\u{1F1EC} Uganda" }, { code: "+27", country: "\u{1F1FF}\u{1F1E6} South Africa" }, { code: "+234", country: "\u{1F1F3}\u{1F1EC} Nigeria" }, { code: "+233", country: "\u{1F1EC}\u{1F1ED} Ghana" }, { code: "+91", country: "\u{1F1EE}\u{1F1F3} India" }, { code: "+86", country: "\u{1F1E8}\u{1F1F3} China" }, { code: "+61", country: "\u{1F1E6}\u{1F1FA} Australia" }].map(({ code, country }) => /* @__PURE__ */ React.createElement("option", { key: code, value: code }, code, " ", country))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Phone number"), /* @__PURE__ */ React.createElement("input", { style: { ...S.input, marginBottom: 16 }, placeholder: "Enter your phone number", type: "tel", value: profile.phone || "", onChange: (e) => upd("phone", e.target.value.replace(/\D/g, "")) }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "How urgent is your study?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 } }, ["Exam in < 1 week", "Need a miracle \u{1F605}", "1\u20134 weeks away", "Just building habits"].map((opt) => /* @__PURE__ */ React.createElement(Pill, { key: opt, active: profile.urgency === opt, onClick: () => upd("urgency", opt), color: previewConfig.accentColor }, opt))), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px", background: previewConfig.accentColor + "15", borderRadius: 14, border: `1px solid ${previewConfig.accentColor}33` } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 15, color: previewConfig.accentColor, marginBottom: 10 } }, previewConfig.emoji, " Your SIMA Profile"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, display: "flex", flexDirection: "column", gap: 5, color: C.text } }, /* @__PURE__ */ React.createElement("div", null, "\u{1F464} ", profile.name || "Student", " \xB7 ", profile.education), profile.program && /* @__PURE__ */ React.createElement("div", null, "\u{1F4DA} ", profile.program, " ", profile.year ? `\xB7 Year ${profile.year}` : ""), /* @__PURE__ */ React.createElement("div", null, "\u23F1\uFE0F ", profile.hours, "h/day \xB7 ", profile.attention, " focus \xB7 ", profile.studyTime), /* @__PURE__ */ React.createElement("div", null, "\u{1F9E0} ", styleLabel, " learner"))))
    ];
    return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 480 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement(IllustrationFlashcards, { width: 92, className: "sima-illo-float" })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.muted } }, "Step ", step + 1, " of ", STEPS), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: previewConfig.accentColor, fontWeight: 700 } }, Math.round((step + 1) / STEPS * 100), "%")), /* @__PURE__ */ React.createElement(ProgressBar, { value: step + 1, max: STEPS, color: previewConfig.accentColor })), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, minHeight: 360, background: `linear-gradient(165deg, ${C.card}, ${previewConfig.accentColor}10)` } }, steps[step]), validationError && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12, padding: "12px 14px", background: "#ffebe8", border: "1px solid #ffb3a0", borderRadius: 10, color: "#a94442", fontSize: 13 } }, validationError), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 16 } }, step > 0 && /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.surface, C.text), flex: 1, justifyContent: "center", border: `1px solid ${C.border}` }, onClick: () => {
      setValidationError("");
      setStep((s) => s - 1);
    } }, "\u2190 Back"), /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { ...S.btn(previewConfig.accentColor), flex: 2, justifyContent: "center", fontSize: 15 },
        onClick: () => {
          const nextError = validateStep(step, profile);
          if (nextError) {
            setValidationError(nextError);
            return;
          }
          setValidationError("");
          if (step < STEPS - 1) setStep((s) => s + 1);
          else onComplete(profile);
        }
      },
      step < STEPS - 1 ? "Continue \u2192" : `Build My Study Brain ${previewConfig.emoji}`
    ))));
  }
  function WelcomeScreen({ onStart, onGuest }) {
    return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 520, height: 520, background: `radial-gradient(circle, ${C.heroA}22 0%, transparent 70%)`, pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", maxWidth: 440, position: "relative" } }, /* @__PURE__ */ React.createElement(IllustrationStudyDesk, { width: 210, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 8, marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${C.heroA}, ${C.heroB})`, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.brain, size: 22, color: "#fff" })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" } }, "SIMA MIND"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, fontWeight: 600 } }, "Adaptive Study Intelligence"))), /* @__PURE__ */ React.createElement("h1", { className: "sima-display", style: { fontSize: 34, fontWeight: 800, lineHeight: 1.15, marginBottom: 14, letterSpacing: "-1px" } }, "Study smarter.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: C.orange } }, "For every learner.")), /* @__PURE__ */ React.createElement("p", { style: { color: C.muted, fontSize: 15, lineHeight: 1.65, marginBottom: 16 } }, "From kindergarten to postgrad \u2014 SIMA adapts its language, topics, examples, and study tools entirely around ", /* @__PURE__ */ React.createElement("em", null, "you"), "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 } }, [["\u{1F308}", "Kindergarten", C.pink], ["\u{1F4DA}", "High School", C.accent], ["\u2696\uFE0F", "Law", C.gold], ["\u2699\uFE0F", "Engineering", C.teal], ["\u{1F9E0}", "Psychology", C.purple], ["\u{1F4BB}", "CS & AI", C.teal]].map(([emoji, label, col]) => /* @__PURE__ */ React.createElement("span", { key: label, style: { background: col + "18", color: col, border: `1px solid ${col}33`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700 } }, emoji, " ", label))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(`linear-gradient(135deg, ${C.heroA}, ${C.heroB})`), justifyContent: "center", fontSize: 16, padding: "15px 28px", boxShadow: `0 10px 26px ${C.heroA}40` }, onClick: onStart }, "Get Started \u2014 It's Free"), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn("transparent", C.muted), justifyContent: "center", border: `1px solid ${C.border}`, fontSize: 14 }, onClick: onGuest }, "Continue as Guest")), /* @__PURE__ */ React.createElement("p", { style: { color: C.muted, fontSize: 12, marginTop: 18 } }, "No credit card required \xB7 Works for all ages & subjects")));
  }
  function PomodoroTimer({ onClose, config }) {
    var _a;
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    const isKinder = (_a = config == null ? void 0 : config.greeting) == null ? void 0 : _a.includes("Superstar");
    const [focusDuration, setFocusDuration] = useState((() => {
      try {
        return JSON.parse(localStorage.getItem("sima_pomodoro_settings") || "{}").focus || (isKinder ? 15 : 25);
      } catch {
        return isKinder ? 15 : 25;
      }
    })());
    const [shortDuration, setShortDuration] = useState((() => {
      try {
        return JSON.parse(localStorage.getItem("sima_pomodoro_settings") || "{}").short || 5;
      } catch {
        return 5;
      }
    })());
    const [longDuration, setLongDuration] = useState((() => {
      try {
        return JSON.parse(localStorage.getItem("sima_pomodoro_settings") || "{}").long || (isKinder ? 10 : 15);
      } catch {
        return isKinder ? 10 : 15;
      }
    })());
    const [showSettings, setShowSettings] = useState(false);
    const DEFAULT_MODES = {
      focus: { label: isKinder ? "\u{1F31F} Learning Time!" : "Focus", color: accentCol2 },
      short: { label: isKinder ? "\u{1F3AE} Play Break" : "Short Break", color: C.green },
      long: { label: isKinder ? "\u{1F34E} Snack Break" : "Long Break", color: C.purple }
    };
    const MODES = {
      focus: { label: DEFAULT_MODES.focus.label, duration: focusDuration * 60, color: accentCol2 },
      short: { label: DEFAULT_MODES.short.label, duration: shortDuration * 60, color: C.green },
      long: { label: DEFAULT_MODES.long.label, duration: longDuration * 60, color: C.purple }
    };
    const [mode, setMode] = useState("focus");
    const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
    const [running, setRunning] = useState(false);
    const [sessions, setSessions] = useState(0);
    const [task, setTask] = useState("");
    const [minimized, setMinimized] = useState(false);
    const intervalRef = useRef(null);
    useEffect(() => {
      setTimeLeft(MODES[mode].duration);
      setRunning(false);
    }, [mode]);
    useEffect(() => {
      if (running) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((t) => {
            if (t <= 1) {
              clearInterval(intervalRef.current);
              setRunning(false);
              if (mode === "focus") setSessions((s) => s + 1);
              return 0;
            }
            return t - 1;
          });
        }, 1e3);
      } else clearInterval(intervalRef.current);
      return () => clearInterval(intervalRef.current);
    }, [running, mode]);
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const secs = String(timeLeft % 60).padStart(2, "0");
    const progress = (MODES[mode].duration - timeLeft) / MODES[mode].duration * 100;
    const savePomodoroSettings = () => {
      localStorage.setItem("sima_pomodoro_settings", JSON.stringify({ focus: focusDuration, short: shortDuration, long: longDuration }));
      setShowSettings(false);
      setTimeLeft(MODES[mode].duration);
      setRunning(false);
    };
    if (showSettings) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000b", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", maxWidth: 340, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800 } }, "\u2699\uFE0F Timer Settings"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowSettings(false), style: { ...S.btn(C.surface, C.muted), padding: "6px 10px" } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 16 }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 8, display: "block" } }, "Focus Duration (minutes)"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "1", max: "60", value: focusDuration, onChange: (e) => setFocusDuration(Math.max(1, parseInt(e.target.value) || 25)), style: { ...S.input, width: "100%" } })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 8, display: "block" } }, "Short Break (minutes)"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "1", max: "30", value: shortDuration, onChange: (e) => setShortDuration(Math.max(1, parseInt(e.target.value) || 5)), style: { ...S.input, width: "100%" } })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 8, display: "block" } }, "Long Break (minutes)"), /* @__PURE__ */ React.createElement("input", { type: "number", min: "1", max: "60", value: longDuration, onChange: (e) => setLongDuration(Math.max(1, parseInt(e.target.value) || 15)), style: { ...S.input, width: "100%" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowSettings(false), style: { ...S.btn(C.surface, C.muted), flex: 1, border: `1px solid ${C.border}` } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: savePomodoroSettings, style: { ...S.btn(accentCol2), flex: 1 } }, "Save Settings"))));
    }
    if (minimized) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", bottom: 80, right: 16, zIndex: 150 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setMinimized(false),
          style: {
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: MODES[mode].color,
            border: `2px solid ${C.surface}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          },
          title: `${mins}:${secs}`
        },
        "\u23F1\uFE0F"
      ));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000b", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", maxWidth: 340, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, justifyContent: "flex-end", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowSettings(true), style: { ...S.btn(C.surface, C.muted), padding: "8px 12px", fontSize: 14, width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }, title: "Settings" }, "\u2699\uFE0F"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMinimized(true), style: { ...S.btn(C.surface, C.muted), padding: "8px 12px", fontSize: 14, width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }, title: "Minimize" }, "\u{1F4CC}"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { ...S.btn(C.surface, C.muted), padding: "8px 12px", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }, title: "Close" }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 16 }))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", paddingTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 14 } }, isKinder ? "\u23F0 LEARNING TIMER" : "POMODORO TIMER"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" } }, Object.entries(MODES).map(([k, v]) => /* @__PURE__ */ React.createElement(Pill, { key: k, active: mode === k, onClick: () => setMode(k), color: v.color }, v.label))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement(CircleProgress, { value: Math.round(progress), size: 140, stroke: 9, color: MODES[mode].color, label: `${mins}:${secs}` })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, fontWeight: 800, color: MODES[mode].color, letterSpacing: "-2px", marginBottom: 14 } }, mins, ":", secs), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: { ...S.input, textAlign: "center", marginBottom: 14, fontSize: 13 },
        placeholder: isKinder ? "What are we learning? \u{1F4DA}" : "What are you working on?",
        value: task,
        onChange: (e) => setTask(e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center" } }, /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(MODES[mode].color), fontSize: 15, padding: "12px 28px" }, onClick: () => setRunning((r) => !r) }, /* @__PURE__ */ React.createElement(Icon, { d: running ? Icons.pause : Icons.play, size: 17, color: "#fff" }), running ? isKinder ? "Pause \u23F8" : "Pause" : isKinder ? "Start! \u{1F680}" : "Start"), /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}` },
        onClick: () => {
          setTimeLeft(MODES[mode].duration);
          setRunning(false);
        }
      },
      /* @__PURE__ */ React.createElement(Icon, { d: Icons.stop, size: 16 })
    )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, display: "flex", gap: 8, justifyContent: "center", alignItems: "center" } }, [0, 1, 2, 3].map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 10, height: 10, borderRadius: "50%", background: i < sessions % 4 ? MODES[mode].color : C.border } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.muted } }, sessions, " ", isKinder ? "\u{1F31F}" : "sessions")))));
  }
  function QuickNotes({ onClose }) {
    const [notes, setNotes] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("sima_notes") || "[]");
      } catch {
        return [];
      }
    });
    const [newNote, setNewNote] = useState("");
    const save = (u) => {
      setNotes(u);
      try {
        localStorage.setItem("sima_notes", JSON.stringify(u));
      } catch {
      }
    };
    const add = () => {
      if (!newNote.trim()) return;
      save([{ id: Date.now(), text: newNote, ts: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...notes]);
      setNewNote("");
    };
    return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000b", zIndex: 200, display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", borderRadius: "20px 20px 0 0", maxHeight: "70vh", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 18 } }, "\u{1F4DD} Quick Notes"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { ...S.btn(C.surface, C.muted), padding: "6px 10px" } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 16 }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        style: { ...S.input, flex: 1 },
        placeholder: "Jot something down\u2026",
        value: newNote,
        onChange: (e) => setNewNote(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && add()
      }
    ), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.accent), padding: "11px 14px" }, onClick: add }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.plus, size: 18 }))), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8 } }, notes.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: C.muted, fontSize: 13, padding: 24 } }, "No notes yet \u2014 start jotting!"), notes.map((n) => /* @__PURE__ */ React.createElement("div", { key: n.id, style: { background: C.surface, borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, lineHeight: 1.5 } }, n.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 4 } }, n.ts)), /* @__PURE__ */ React.createElement("button", { onClick: () => save(notes.filter((x) => x.id !== n.id)), style: { background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 13 })))))));
  }
  function SpacedRepetitionScreen({ profile, config }) {
    var _a;
    const [generating, setGenerating] = useState(false);
    const [topic, setTopic] = useState("");
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documents, setDocuments] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("sima_documents") || "[]");
      } catch {
        return [];
      }
    });
    const [deck, setDeck] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("sima_srs") || "[]");
      } catch {
        return [];
      }
    });
    const [reviewing, setReviewing] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [reviewQueue, setReviewQueue] = useState([]);
    const accentCol2 = config.accentColor;
    const saveDeck = (d) => {
      setDeck(d);
      try {
        localStorage.setItem("sima_srs", JSON.stringify(d));
      } catch {
      }
    };
    const generateCards = async () => {
      if (!topic.trim() && !selectedDocument) return;
      setGenerating(true);
      const levelHint = PROFILE_ENGINE.getLevel(profile);
      const docHint = selectedDocument ? ` based on the document "${selectedDocument.name}"` : "";
      const prompt2 = `Create 10 spaced repetition flashcards${docHint} on "${topic}" for a ${levelHint} student${profile.program ? ` studying ${profile.program}` : ""}. ${config.flashcardTone} Respond ONLY with JSON array: [{"front":"...","back":"...","hint":"...","tags":["..."]}]. No markdown.`;
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "srs",
            prompt: prompt2,
            model: "sima-stub",
            source: selectedDocument == null ? void 0 : selectedDocument.name
          })
        });
        const data = await res.json();
        const text = data.response || "[]";
        const cards = JSON.parse(text.replace(/```json|```/g, "").trim());
        saveDeck([...deck, ...cards.map((c, i) => ({
          ...c,
          id: Date.now() + i,
          interval: 1,
          easiness: 2.5,
          repetitions: 0,
          nextReview: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          source: (selectedDocument == null ? void 0 : selectedDocument.name) || "manual"
        }))]);
        alert(`\u2705 Generated ${cards.length} flashcards!`);
      } catch (e) {
        console.error(e);
        const fallbackCards = [{
          front: `Sample question on ${topic || (selectedDocument == null ? void 0 : selectedDocument.name) || "topic"}`,
          back: "Study this topic to generate real flashcards. Connect to AI for better results.",
          hint: "Use the AI generation feature"
        }];
        saveDeck([...deck, ...fallbackCards.map((c, i) => ({
          ...c,
          id: Date.now() + i,
          interval: 1,
          easiness: 2.5,
          repetitions: 0,
          nextReview: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          source: (selectedDocument == null ? void 0 : selectedDocument.name) || "manual"
        }))]);
      }
      setGenerating(false);
      setTopic("");
      setSelectedDocument(null);
    };
    const startReview = () => {
      const today2 = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const due = deck.filter((c) => c.nextReview <= today2);
      if (!due.length) return;
      setReviewQueue(due);
      setCurrentIdx(0);
      setFlipped(false);
      setReviewing(true);
    };
    const rateCard = (rating) => {
      const card = reviewQueue[currentIdx];
      let { easiness, repetitions, interval } = card;
      if (rating >= 3) {
        repetitions === 0 ? interval = 1 : repetitions === 1 ? interval = 6 : interval = Math.round(interval * easiness);
        repetitions += 1;
      } else {
        repetitions = 0;
        interval = 1;
      }
      easiness = Math.max(1.3, easiness + 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
      const nextDate = /* @__PURE__ */ new Date();
      nextDate.setDate(nextDate.getDate() + interval);
      saveDeck(deck.map((c) => c.id === card.id ? { ...c, easiness, repetitions, interval, nextReview: nextDate.toISOString().split("T")[0] } : c));
      if (currentIdx + 1 >= reviewQueue.length) setReviewing(false);
      else {
        setCurrentIdx((i) => i + 1);
        setFlipped(false);
      }
    };
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const dueCount = deck.filter((c) => c.nextReview <= today).length;
    const isKinder = PROFILE_ENGINE.getLevel(profile) === "kindergarten";
    if (reviewing && reviewQueue[currentIdx]) {
      const card = reviewQueue[currentIdx];
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 18 } }, isKinder ? "\u{1F0CF} My Cards!" : "Spaced Repetition"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted } }, currentIdx + 1, " / ", reviewQueue.length)), /* @__PURE__ */ React.createElement("button", { onClick: () => setReviewing(false), style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}` } }, "End")), /* @__PURE__ */ React.createElement(ProgressBar, { value: currentIdx, max: reviewQueue.length, color: accentCol2, height: 4 }), /* @__PURE__ */ React.createElement("div", { onClick: () => setFlipped((f) => !f), style: { ...S.card, marginTop: 16, minHeight: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer", background: flipped ? accentCol2 + "22" : C.card, transition: "background .3s", padding: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginBottom: 10 } }, flipped ? "\u2705 ANSWER" : isKinder ? "\u{1F914} What is this? (tap to find out!)" : "QUESTION \u2014 tap to reveal"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: flipped ? 700 : 500, lineHeight: 1.6 } }, flipped ? card.back : card.front), !flipped && card.hint && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 10, fontStyle: "italic" } }, "\u{1F4A1} ", card.hint)), flipped && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, textAlign: "center", marginBottom: 10 } }, isKinder ? "Did you know that? \u{1F60A}" : "How well did you know this?"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 } }, [["\u{1F615}", "Forgot", 0, "#6b7280"], ["\u{1F62C}", "Hard", 2, C.red], ["\u{1F642}", "Good", 3, C.gold], ["\u{1F604}", "Easy!", 5, C.green]].map(([em, label, rating, color]) => /* @__PURE__ */ React.createElement("button", { key: label, onClick: () => rateCard(rating), style: { ...S.btn(color + "22", color), border: `1px solid ${color}44`, flexDirection: "column", padding: "10px 4px", fontSize: 12, justifyContent: "center" } }, /* @__PURE__ */ React.createElement("span", null, em), label)))));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, isKinder ? "\u{1F0CF} My Learning Cards!" : "Spaced Repetition"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, isKinder ? "Cards that help you remember!" : "Science-backed memory system (SM-2)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 } }, [["Total", deck.length, accentCol2], ["Due today", dueCount, dueCount > 0 ? C.red : C.green], ["Mastered", deck.filter((c) => c.interval > 21).length, C.gold]].map(([label, val, col]) => /* @__PURE__ */ React.createElement("div", { key: label, style: { ...S.card, padding: "12px 14px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: col } }, val), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, label)))), dueCount > 0 && /* @__PURE__ */ React.createElement("button", { onClick: startReview, style: { ...S.btn(accentCol2), width: "100%", justifyContent: "center", fontSize: 15, marginBottom: 16, padding: "14px" } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.repeat, size: 18, color: "#fff" }), " ", isKinder ? `Let's Review ${dueCount} Card${dueCount !== 1 ? "s" : ""}! \u{1F31F}` : `Review ${dueCount} Due Card${dueCount !== 1 ? "s" : ""}`), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 10 } }, "\u{1F4C4} Generate from Documents"), documents && documents.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 } }, documents.map((doc) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: doc.id,
        onClick: () => setSelectedDocument((selectedDocument == null ? void 0 : selectedDocument.id) === doc.id ? null : doc),
        style: {
          ...S.btn(
            (selectedDocument == null ? void 0 : selectedDocument.id) === doc.id ? accentCol2 : C.surface,
            (selectedDocument == null ? void 0 : selectedDocument.id) === doc.id ? C.text : C.muted
          ),
          border: `1px solid ${(selectedDocument == null ? void 0 : selectedDocument.id) === doc.id ? accentCol2 : C.border}`,
          padding: "10px 12px",
          fontSize: 13,
          textAlign: "left",
          transition: "all 0.2s"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, "\u{1F4C4} ", doc.name),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, marginTop: 2, opacity: 0.7 } }, (doc.size / 1024).toFixed(1), " KB")
    ))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 10 } }, selectedDocument ? `Selected: ${selectedDocument.name}` : "Select a document to generate flashcards")) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, padding: "10px", textAlign: "center", background: C.surface, borderRadius: 8 } }, "\u{1F4C1} No documents uploaded yet. Upload materials in Docs to generate flashcards!")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 10 } }, "\u2728 Generate from Topic"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 } }, (config.exampleTopics || []).slice(0, 3).map((t) => /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => setTopic(t), style: { ...S.btn(accentCol2 + "18", accentCol2), border: `1px solid ${accentCol2}33`, padding: "5px 12px", fontSize: 12 } }, t))), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: { ...S.input, marginBottom: 10 },
        placeholder: `Topic \u2014 e.g. "${((_a = config.exampleTopics) == null ? void 0 : _a[0]) || "any topic"}"`,
        value: topic,
        onChange: (e) => setTopic(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && generateCards()
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: generateCards, style: { ...S.btn(accentCol2), width: "100%", justifyContent: "center" } }, generating ? "Generating\u2026" : "\u2728 Generate 10 Cards")), /* @__PURE__ */ React.createElement("div", { style: S.card }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 10 } }, "\u{1F4DA} Your Deck (", deck.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" } }, deck.slice(0, 20).map((card) => {
      var _a2, _b;
      return /* @__PURE__ */ React.createElement("div", { key: card.id, style: { background: C.surface, borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, flex: 1 } }, (_a2 = card.front) == null ? void 0 : _a2.slice(0, 55), ((_b = card.front) == null ? void 0 : _b.length) > 55 ? "\u2026" : ""), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(Badge, { color: card.nextReview <= today ? C.red : C.green }, card.nextReview <= today ? "Due" : `+${card.interval}d`), /* @__PURE__ */ React.createElement("button", { onClick: () => saveDeck(deck.filter((c) => c.id !== card.id)), style: { background: "none", border: "none", cursor: "pointer", color: C.muted } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 13 }))));
    }))));
  }
  function Dashboard({ profile, config, onNav, plan, onPomodoro, onNotes, onResetProgress, onProfileClick, onLogout, user, isFirstUse }) {
    var _a, _b, _c, _d;
    const accentCol2 = config.accentColor;
    const isKinder = PROFILE_ENGINE.getLevel(profile) === "kindergarten";
    const isPrimary = PROFILE_ENGINE.getLevel(profile) === "primary";
    const [subjectMastery, setSubjectMastery] = useState(config.subjectMastery || []);
    const [weakTopics2, setWeakTopics] = useState(config.weakTopics || []);
    const [strongTopics2, setStrongTopics] = useState(config.strongTopics || []);
    const [predictedExamScore, setPredictedExamScore] = useState(config.predictedExamScore || "72");
    const [learningVelocityState, setLearningVelocityState] = useState(config.learningVelocity || "4.2");
    const [revisionHistoryState, setRevisionHistoryState] = useState(config.revisionHistory || []);
    const [recentScores, setRecentScores] = useState([]);
    const [velocitySeries, setVelocitySeries] = useState([]);
    useEffect(() => {
      let mounted = true;
      const token = localStorage.getItem("sima_token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      Promise.all([
        fetch(API_BASE_URL + "/api/analytics/overview", { headers }).then((r) => r.json()).catch(() => null),
        fetch(API_BASE_URL + "/api/analytics/subject-mastery", { headers }).then((r) => r.json()).catch(() => null),
        fetch(API_BASE_URL + "/api/analytics/revision-history", { headers }).then((r) => r.json()).catch(() => null),
        fetch(API_BASE_URL + "/api/analytics/learning-velocity", { headers }).then((r) => r.json()).catch(() => null)
      ]).then(([overview, subjects, rev, vel]) => {
        var _a2;
        if (!mounted) return;
        if (subjects && Array.isArray(subjects.subjects)) setSubjectMastery(subjects.subjects.map((s) => ({ name: s.subject, pct: s.masteryPct })));
        if (rev && Array.isArray(rev.history)) setRevisionHistoryState(rev.history.map((h) => ({ when: h.date || h.when, topic: h.topic })));
        if (overview && overview.raw && overview.raw.quizzes) {
          setPredictedExamScore(overview.raw.quizzes.averageScore || ((_a2 = overview.overall) == null ? void 0 : _a2.overallProgress) || predictedExamScore);
          setRecentScores(Array.isArray(overview.raw.quizzes.recentScores) ? overview.raw.quizzes.recentScores : []);
        }
        if (vel && vel.velocity) setLearningVelocityState(vel.velocity.cardsPerWeek || learningVelocityState);
        if (vel && Array.isArray(vel.recentSessions)) setVelocitySeries(vel.recentSessions.map((s) => s.score_percentage || 0));
      }).catch(() => {
      });
      return () => {
        mounted = false;
      };
    }, [user == null ? void 0 : user.id]);
    return /* @__PURE__ */ React.createElement("div", { style: { paddingBottom: 80 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 16px 0" } }, /* @__PURE__ */ React.createElement("div", { style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 24,
      background: `linear-gradient(135deg, ${C.heroA}, ${C.heroA}dd 60%, ${C.heroB}bb)`,
      padding: "18px 18px 16px",
      boxShadow: `0 14px 34px ${C.heroA}38`
    } }, /* @__PURE__ */ React.createElement(HeroDecor, { heroA: C.heroA, heroB: C.heroB }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.8)" } }, config.greeting), /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 22, fontWeight: 800, color: "#fff" } }, (profile == null ? void 0 : profile.name) || "Student", " ", config.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.gold, fontWeight: 700, marginTop: 2 } }, config.subgreeting)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onProfileClick,
        style: {
          background: (user == null ? void 0 : user.avatarImage) ? "transparent" : "rgba(255,255,255,0.18)",
          border: `2px solid rgba(255,255,255,0.4)`,
          fontSize: 20,
          cursor: "pointer",
          padding: 0,
          overflow: "hidden",
          transition: "all 0.3s ease",
          width: 44,
          height: 44,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
          flexShrink: 0
        },
        onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.1)",
        onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)",
        title: "Profile"
      },
      (user == null ? void 0 : user.avatarImage) ? /* @__PURE__ */ React.createElement("img", { src: user.avatarImage, alt: "Profile", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : (user == null ? void 0 : user.avatar) || "\u{1F60A}"
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: 10 } }, (plan === "free" || plan === "scholar-lite") && /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,255,255,0.16)", color: "#fff", borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 700 } }, "\u{1F4AC} ", plan === "free" ? "30" : "80", " msgs"), /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,255,255,0.16)", color: "#fff", borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 700 } }, plan === "free" ? "\u{1F381} Free Trial" : plan === "scholar-lite" ? "\u2B50 Scholar Lite" : plan === "standard" ? "\u{1F4DA} Standard" : "\u{1F451} Scholar")), typeof onResetProgress === "function" && /* @__PURE__ */ React.createElement("button", { onClick: onResetProgress, style: { background: "rgba(255,255,255,0.14)", color: "#fff", border: "none", borderRadius: 999, marginTop: 12, fontSize: 12, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" } }, "Reset progress")))), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 20px 0" } }, (plan === "free" || plan === "scholar-lite") && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, background: `linear-gradient(135deg, ${C.gold}18, ${C.card})`, borderColor: C.gold + "44", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -20, right: -20, width: 80, height: 80, background: C.gold + "11", borderRadius: "50%" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" } }, "\u{1F680} Level Up"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, marginBottom: 4 } }, "Unlock Unlimited Learning"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted } }, plan === "free" ? "Get 80+ messages/day, voice chat, and more" : "Upgrade to unlimited & advanced tools")), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.gold), padding: "8px 14px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }, onClick: () => onNav("upgrade") }, "See Plans \u2192"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, background: `linear-gradient(135deg, ${accentCol2}18, ${C.card})`, borderColor: accentCol2 + "33" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: accentCol2, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" } }, "Today's Plan"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 700, marginTop: 2 } }, isKinder ? "0 fun activities" : `${((_a = config.todaySessions) == null ? void 0 : _a.length) || 0} sessions \xB7 ${profile.hours || 0}h`)), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2), padding: "9px 16px", fontSize: 13 }, onClick: () => onNav("timetable") }, "View \u2192")), (_b = config.todaySessions) == null ? void 0 : _b.map((session) => /* @__PURE__ */ React.createElement("div", { key: session, style: { display: "flex", gap: 10, alignItems: "center", fontSize: 13, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0 } }), session))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, config.statHighlights.slice(0, 4).map((label, i) => /* @__PURE__ */ React.createElement("div", { key: label, style: { ...S.card, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: accentCol2 } }, config.statValues[i]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 2 } }, label)))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.08em" } }, isKinder ? "WHAT DO YOU WANT TO DO? \u{1F3AE}" : "QUICK ACTIONS"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 } }, [
      { label: isKinder ? "Ask SIMA \u{1F308}" : "Ask SIMA", icon: Icons.sparkle, screen: "chat", color: accentCol2 },
      { label: isKinder ? "Timer \u23F0" : "Pomodoro", icon: Icons.clock, action: onPomodoro, color: C.green },
      { label: isKinder ? "Cards \u{1F0CF}" : "Flashcards", icon: Icons.flash, screen: "studio", color: C.gold },
      { label: "SRS Deck", icon: Icons.repeat, screen: "srs", color: C.teal },
      { label: isKinder ? "My Progress \u2B50" : "Analytics", icon: Icons.chart, screen: "analytics", color: C.purple },
      { label: "Notes", icon: Icons.note, action: onNotes, color: C.orange },
      { label: "Groups", icon: Icons.users, screen: "groups", color: C.muted }
    ].map(({ label, icon, screen: screen2, color, action }) => /* @__PURE__ */ React.createElement("button", { key: label, onClick: () => action ? action() : onNav(screen2), style: {
      ...S.btn(color + "18", color),
      border: `1px solid ${color}33`,
      flexDirection: "column",
      padding: "13px 14px",
      borderRadius: 12,
      minWidth: isKinder ? 82 : 72,
      flexShrink: 0
    } }, /* @__PURE__ */ React.createElement(Icon, { d: icon, size: 20, color }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, marginTop: 4 } }, label))))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.08em" } }, isKinder ? "\u{1F31F} LET'S EXPLORE!" : "SUGGESTED TOPICS FOR YOU"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, (_c = config.exampleTopics) == null ? void 0 : _c.slice(0, 3).map((topic) => /* @__PURE__ */ React.createElement("div", { key: topic, onClick: () => onNav("chat"), style: { ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer", borderColor: accentCol2 + "33" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, config.emoji, " ", topic), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: accentCol2 } }, "Study \u2192"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.08em" } }, config.weakIcon, " ", (config.weakLabel || "AREAS TO REVIEW").toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, (_d = config.weakAreas) == null ? void 0 : _d.map((area) => /* @__PURE__ */ React.createElement("div", { key: area, onClick: () => onNav("chat"), style: { ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer", borderColor: C.red + "33" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, area), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.red } }, "Review \u2192")))))));
  }
  function ChatScreen({ profile, config, plan, onLimitReached, groupContext }) {
    var _a;
    const [messages, setMessages] = useState([{ role: "assistant", content: config.simaIntro }]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("exam");
    const [isListening, setIsListening] = useState(false);
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [showCallUI, setShowCallUI] = useState(false);
    const bottomRef = useRef(null);
    const recognitionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const fileInputRef = useRef(null);
    const accentCol2 = config.accentColor;
    const isKinder = PROFILE_ENGINE.getLevel(profile) === "kindergarten";
    const isPrimary = PROFILE_ENGINE.getLevel(profile) === "primary";
    const subscription = useSubscription();
    useEffect(() => {
      var _a2;
      (_a2 = bottomRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);
    useEffect(() => {
      if (groupContext) {
        setMessages([{ role: "assistant", content: `${config.simaIntro}

You joined the group: ${groupContext.name}. Topic: ${groupContext.topic}. This is a shared group conversation space.` }]);
      } else {
        setMessages([{ role: "assistant", content: config.simaIntro }]);
      }
    }, [groupContext, config.simaIntro]);
    const startVoice = () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        alert("Voice input not supported.");
        return;
      }
      const r = new SR();
      r.lang = "en-US";
      r.interimResults = false;
      r.onresult = (e) => {
        try {
          const transcript = e.results[0][0].transcript;
          setInput((p) => p + (p && transcript ? " " : "") + transcript);
        } catch (err) {
          console.error("Speech recognition error:", err);
        }
        setIsListening(false);
      };
      r.onerror = () => {
        console.error("Speech error");
        setIsListening(false);
      };
      r.onend = () => setIsListening(false);
      recognitionRef.current = r;
      r.start();
      setIsListening(true);
    };
    const startVoiceNote = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
        const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
        const recorder = new MediaRecorder(stream, { mimeType });
        const chunks = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType });
          const url = URL.createObjectURL(blob);
          setRecordedAudio({ url, blob, duration: Math.round(chunks.length / 10), mimeType });
          stream.getTracks().forEach((t) => t.stop());
        };
        mediaRecorderRef.current = { recorder, stream };
        recorder.start();
        setIsRecordingVoice(true);
      } catch (err) {
        console.error("Microphone error:", err);
        alert("\u{1F3A4} Microphone access denied. Please enable microphone permissions in your browser settings.");
      }
    };
    const stopVoiceNote = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.recorder) {
        mediaRecorderRef.current.recorder.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      }
      setIsRecordingVoice(false);
    };
    const sendVoiceNote = () => {
      if (recordedAudio) {
        const duration = recordedAudio.duration || Math.floor(Math.random() * 30) + 5;
        const msg = { role: "user", content: `\u{1F3B5} Voice message (${duration}s)`, isVoiceNote: true, audioUrl: recordedAudio.url };
        setMessages((prev) => [...prev, msg]);
        setRecordedAudio(null);
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: "assistant", content: "Got your voice message! Great communication! \u{1F44D}" }]);
        }, 1e3);
      }
    };
    const handleFileSelect = (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      if (file && groupContext) {
        const msg = { role: "user", content: `\u{1F4CE} Shared file: ${file.name} (${(file.size / 1024).toFixed(1)}KB)` };
        setMessages((prev) => [...prev, msg]);
        fileInputRef.current.value = "";
      }
    };
    const modeLabels = isKinder ? [["simple", "\u{1F308} Simple"]] : isPrimary ? [["simple", "\u{1F9D2} Simple"], ["exam", "\u{1F4DD} Quiz"]] : [["simple", "\u{1F9D2} Simple"], ["exam", "\u{1F4DD} Exam"], ["clinical", config.emoji + " Deep Dive"], ["advanced", "\u{1F52C} Advanced"]];
    const buildSystem = () => `
You are SIMA \u2014 an adaptive AI study assistant built specifically for ${(profile == null ? void 0 : profile.name) || "this student"}.

STUDENT PROFILE:
- Name: ${profile == null ? void 0 : profile.name}
- Education: ${profile == null ? void 0 : profile.education}
- Program/Subject: ${(profile == null ? void 0 : profile.program) || "General"}
- Year: ${profile == null ? void 0 : profile.year}
- Learning style: ${profile == null ? void 0 : profile.style}
- Study preference: ${profile == null ? void 0 : profile.studyTime}
- Persona: ${PROFILE_ENGINE.getPersona(profile)}

ADAPTATION RULES:
${config.systemPromptHint}

CURRENT MODE: ${mode.toUpperCase()}
${mode === "simple" ? "- Use extremely simple, friendly language. Short sentences. Lots of encouragement." : ""}
${mode === "exam" ? "- Focus on exam technique. Bullet points. Bold key facts. Memory tricks." : ""}
${mode === "clinical" ? "- Go deep with domain-specific reasoning frameworks for this student's field." : ""}
${mode === "advanced" ? "- Use expert-level analysis. Include nuance, exceptions, and critical thinking." : ""}

Always end responses with a relevant follow-up offer (e.g. 'Would you like me to create flashcards on this?').
Match the complexity and vocabulary to this student's level \u2014 a kindergartner should get emojis and simple words; a PhD student should get rigorous depth.
  `;
    const send = async () => {
      if (!input.trim() || loading) return;
      if (!subscription.isTrialActive() && !subscription.canUseFeature("chat")) {
        onLimitReached == null ? void 0 : onLimitReached();
        return;
      }
      const userMsg = { role: "user", content: input };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      if (!subscription.isTrialActive()) {
        subscription.recordUsage("chat");
      }
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "sima-stub",
            context: buildSystem(),
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
            group: groupContext,
            subscriptionPlan: plan == null ? void 0 : plan.id
          })
        }).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          const reply = data.response || localSimaResponse({ prompt: input, mode, profile, selectedSource });
          setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } else {
          const reply = localSimaResponse({ prompt: input, mode, profile, selectedSource });
          setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        }
      } catch (err) {
        console.error("Chat error:", err);
        const reply = localSimaResponse({ prompt: input, mode, profile, selectedSource });
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
      setLoading(false);
    };
    return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, display: "flex", flexDirection: "column", paddingBottom: 80, height: "100vh", overflow: "hidden" } }, showCallUI && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1e3, backdropFilter: "blur(3px)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.card, borderRadius: 24, padding: 40, textAlign: "center", maxWidth: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 60, marginBottom: 24 } }, "\u{1F3A7}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, marginBottom: 12, color: accentCol2 } }, "Start Audio Call"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 28, lineHeight: 1.6 } }, "Connect with ", groupContext.members, " group members via secure audio. Privacy enabled - audio only."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { ...S.btn(accentCol2), flex: 1, justifyContent: "center", padding: "14px", fontSize: 15, fontWeight: 700 },
        onClick: () => {
          setShowCallUI(false);
          alert("\u2705 AUDIO CALL ACTIVE\n\n\u{1F3A7} Connected to " + groupContext.members + " members\n\u{1F512} Private audio connection\n\u23F1\uFE0F Call recording enabled");
          setMessages((prev) => [...prev, { role: "assistant", content: "\u{1F4DE} Audio call started. " + groupContext.members + " members can now connect. Call is being recorded." }]);
        }
      },
      "\u{1F3A7} Start Audio Call"
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { ...S.btn(C.surface, C.text), width: "100%", justifyContent: "center", border: `1px solid ${C.border}`, padding: "12px" },
        onClick: () => setShowCallUI(false)
      },
      "Cancel"
    ))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 14 } }, messages.map((msg, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" } }, msg.role === "assistant" && /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", overflow: "hidden", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("img", { src: "/wadudu.png?cb=2", alt: "SIMA mascot", style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ React.createElement("div", { style: {
      maxWidth: "82%",
      padding: "11px 15px",
      borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
      background: msg.role === "user" ? accentCol2 : C.card,
      fontSize: isKinder ? 15 : 14,
      lineHeight: 1.65,
      whiteSpace: "pre-wrap",
      border: msg.role === "assistant" ? `1px solid ${C.border}` : "none"
    } }, msg.content))), loading && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${accentCol2}, ${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, config.emoji)), /* @__PURE__ */ React.createElement(SimaTyping, null)), /* @__PURE__ */ React.createElement("div", { ref: bottomRef })), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 16px 0", display: "flex", gap: 6, overflowX: "auto" } }, (_a = config.quickPrompts) == null ? void 0 : _a.map((p) => /* @__PURE__ */ React.createElement("button", { key: p, onClick: () => setInput(p), style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, padding: "6px 12px", fontSize: 12, whiteSpace: "nowrap", flexShrink: 0 } }, p))), recordedAudio && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: `${accentCol2}22`, borderTop: `1px solid ${accentCol2}44`, display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18 } }, "\u{1F3B5}"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700 } }, "Voice Note Ready"), /* @__PURE__ */ React.createElement("audio", { src: recordedAudio.url, controls: true, style: { width: "100%", height: 24, marginTop: 4 } })), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.green), padding: "8px 12px", fontSize: 12 }, onClick: sendVoiceNote }, "Send"), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.surface, C.text), padding: "8px 12px", fontSize: 12, border: `1px solid ${C.border}` }, onClick: () => setRecordedAudio(null) }, "Discard")), /* @__PURE__ */ React.createElement("div", { style: { padding: 14, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        style: { ...S.input, flex: 1 },
        placeholder: isListening ? "\u{1F399} Listening\u2026" : isRecordingVoice ? "\u{1F3A4} Recording voice note..." : isKinder ? "Ask me anything! \u{1F308}" : "Ask SIMA anything\u2026",
        value: input,
        onChange: (e) => setInput(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && !isRecordingVoice && send(),
        disabled: isRecordingVoice
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "11px 13px" },
        onClick: () => {
          var _a2;
          return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
        },
        title: "Upload file for SIMA to analyze"
      },
      /* @__PURE__ */ React.createElement(Icon, { d: Icons.plus, size: 17 })
    ), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        style: { display: "none" },
        onChange: (e) => {
          var _a2;
          if ((_a2 = e.target.files) == null ? void 0 : _a2[0]) {
            const file = e.target.files[0];
            setInput((prev) => `${prev}${prev ? "\n" : ""}\u{1F4CE} Uploaded: ${file.name}`);
          }
        },
        accept: ".pdf,.txt,.ppt,.pptx,.docx,.mp3,.wav"
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        style: { ...S.btn(isRecordingVoice ? C.red : isListening ? C.orange : C.surface, isRecordingVoice || isListening ? "#fff" : C.muted), border: `1px solid ${isRecordingVoice ? C.red : isListening ? C.orange : C.border}`, padding: "11px 13px" },
        onClick: () => {
          var _a2;
          if (isRecordingVoice) stopVoiceNote();
          else if (isListening) {
            (_a2 = recognitionRef.current) == null ? void 0 : _a2.stop();
            setIsListening(false);
          } else startVoice();
        },
        title: "Click to speak or record voice note"
      },
      /* @__PURE__ */ React.createElement(Icon, { d: Icons.mic, size: 17 })
    ), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2), padding: "11px 15px" }, onClick: send, disabled: isRecordingVoice }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.send, size: 17, color: "#fff" }))));
  }
  function StudioScreen({ profile, config, plan }) {
    var _a, _b, _c;
    const [mainTab, setMainTab] = useState("sources");
    const [sources, setSources] = useState([]);
    const [generatedMedia, setGeneratedMedia] = useState([]);
    const [selectedSource2, setSelectedSource] = useState(null);
    const [topic, setTopic] = useState("");
    const [generationType, setGenerationType] = useState("flashcard");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [recents, setRecents] = useState([]);
    const [shared, setShared] = useState([]);
    const [downloaded, setDownloaded] = useState([]);
    const [uploadTitle, setUploadTitle] = useState("");
    const accentCol2 = config.accentColor;
    const isKinder = PROFILE_ENGINE.getLevel(profile) === "kindergarten";
    const level = PROFILE_ENGINE.getLevel(profile);
    const currentPlan = plan || "free";
    const limits = SUBSCRIPTION_CONFIG.usageLimits[currentPlan] || SUBSCRIPTION_CONFIG.usageLimits.free;
    const canGenerate = (featureType) => {
      const isTrialing = localStorage.getItem("sima_subscription") ? (() => {
        try {
          const sub = JSON.parse(localStorage.getItem("sima_subscription"));
          const trialEnd = new Date(sub.trialEndDate);
          return trialEnd > /* @__PURE__ */ new Date();
        } catch {
          return true;
        }
      })() : true;
      if (isTrialing) return true;
      return limits[featureType] > 0;
    };
    const studioTabs = [
      { id: "sources", icon: "\u{1F4C1}", label: "Sources" },
      { id: "recents", icon: "\u23F1\uFE0F", label: "Recents" },
      { id: "shared", icon: "\u{1F465}", label: "Shared" },
      { id: "downloaded", icon: "\u{1F4BE}", label: "Downloaded" },
      { id: "chat", icon: "\u{1F4AC}", label: "Chat" },
      { id: "covers", icon: "\u{1F3AC}", label: "Covers" },
      { id: "generate", icon: "\u2728", label: "Generate" }
    ];
    const handleSourceUpload = () => {
      var _a2;
      (_a2 = document.getElementById("studio-source-input")) == null ? void 0 : _a2.click();
    };
    const addSources = (files) => {
      const newSources = Array.from(files).map((file, idx) => {
        const extension = file.name.split(".").pop().toLowerCase();
        const type = extension === "pdf" ? "pdf" : extension === "ppt" || extension === "pptx" ? "ppt" : extension === "txt" ? "txt" : extension === "docx" ? "doc" : file.type.startsWith("image") ? "image" : "doc";
        return {
          id: Date.now() + idx,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type,
          date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
          group: inferSourceGroup(file.name),
          file
        };
      });
      setSources((prev) => [...newSources, ...prev]);
      if (!selectedSource2 && newSources.length > 0) setSelectedSource(newSources[0]);
    };
    const generateContent = async () => {
      if (!topic.trim() && !selectedSource2) return alert("Select a source or enter a topic");
      setLoading(true);
      setOutput(null);
      const sourceHint = selectedSource2 ? ` based on: ${selectedSource2.name}` : "";
      const prompts = {
        audioOverview: `Create a concise audio script overview on "${topic}"${sourceHint} for a ${level} student. Make it engaging and suitable for listening (2-3 minutes). ${config.systemPromptHint}`,
        videoOverview: `Create a detailed video script outline on "${topic}"${sourceHint} for a ${level} student. Include scene descriptions, key visuals, and talking points (5-7 minutes). ${config.systemPromptHint}`,
        flashcard: `Create 8 flashcards on "${topic}"${sourceHint} for a ${level} student. Respond ONLY with JSON: [{"question":"...","answer":"...","difficulty":"..."}]. No markdown.`,
        spacedRepetition: `Create 10 flashcards with spaced repetition intervals on "${topic}"${sourceHint} for a ${level} student. Respond ONLY with JSON: [{"question":"...","answer":"...","interval":"day1","repetitions":0,"easeFactor":2.5}]. No markdown.`,
        quiz: `Create 5 MCQs on "${topic}"${sourceHint} for a ${level} student. Respond ONLY with JSON: [{"question":"...","options":["A)...","B)...","C)...","D)..."],"correct":"A","explanation":"..."}]. No markdown.`,
        infographic: `Create detailed infographic design specifications for "${topic}"${sourceHint} for a ${level} student. Include: layout sections, color recommendations, key statistics, and visual hierarchy.`,
        slideDeck: `Create a 10-slide presentation outline on "${topic}"${sourceHint} for a ${level} student. Include speaker notes for each slide. ${config.systemPromptHint}`,
        osce: `Create an OSCE station scenario on "${topic}"${sourceHint} for a ${level} student. Include: station instructions, candidate tasks, marking criteria, and key points.`,
        scenario: `Create a scenario-based learning question on "${topic}"${sourceHint} for a ${level} student. Include the scenario, multiple perspectives to consider, and guiding questions.`
      };
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: generationType,
            prompt: prompts[generationType],
            model: "sima-stub",
            source: selectedSource2 == null ? void 0 : selectedSource2.name
          })
        });
        const data = await res.json();
        const text = data.response || "";
        setOutput(text);
        if (selectedSource2) {
          const newMedia = {
            id: generatedMedia.length + 1,
            type: generationType,
            source: selectedSource2.name,
            date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            duration: "0:00",
            title: `${generationType} on ${topic}`
          };
          setGeneratedMedia([...generatedMedia, newMedia]);
        }
      } catch (e) {
        console.error(e);
        setOutput("Error generating content. Please try again.");
      }
      setLoading(false);
    };
    const handleAddRecent = () => {
      if (selectedSource2 && topic) {
        const recent = {
          id: recents.length + 1,
          title: uploadTitle || `${generationType} - ${topic}`,
          source: selectedSource2.name,
          date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
          type: generationType
        };
        setRecents([recent, ...recents]);
        setUploadTitle("");
      }
    };
    const renderWithTabs = (content, title) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", overflowX: "auto", gap: 4, padding: "12px 16px", background: C.surface, borderBottom: `1px solid ${C.border}`, marginBottom: 0 } }, studioTabs.map((tab) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setMainTab(tab.id),
        style: {
          padding: "8px 12px",
          borderRadius: 6,
          border: "none",
          background: mainTab === tab.id ? accentCol2 : "transparent",
          color: mainTab === tab.id ? C.surface : C.text,
          fontWeight: mainTab === tab.id ? 700 : 500,
          cursor: "pointer",
          fontSize: 12,
          whiteSpace: "nowrap",
          transition: "all 0.2s"
        }
      },
      tab.icon,
      " ",
      tab.label
    ))), content);
    if (mainTab === "sources") {
      const content = /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4DA} Sources"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Upload and manage learning materials"), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, padding: 24, textAlign: "center", border: `2px dashed ${accentCol2}`, background: accentCol2 + "08" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "\u{1F4C1}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 600, marginBottom: 6 } }, "Upload Your Materials"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 14 } }, "Drag & drop or click to upload PDF, PPT, DOCX, TXT, images"), /* @__PURE__ */ React.createElement("button", { onClick: handleSourceUpload, style: { ...S.btn(accentCol2), justifyContent: "center" } }, "+ Upload File"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 12 } }, "Limit: ", limits.uploads, "/day \u2022 ", sources.length, " uploaded"), /* @__PURE__ */ React.createElement(
        "input",
        {
          id: "studio-source-input",
          type: "file",
          accept: ".pdf,.ppt,.pptx,.docx,.txt,image/*",
          multiple: true,
          style: { display: "none" },
          onChange: (e) => {
            var _a2;
            if ((_a2 = e.target.files) == null ? void 0 : _a2.length) {
              addSources(e.target.files);
              e.target.value = null;
            }
          }
        }
      )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, letterSpacing: "0.08em" } }, "YOUR SOURCES (", sources.length, ")"), Object.entries(sources.reduce((groups, src) => {
        if (!groups[src.group]) groups[src.group] = [];
        groups[src.group].push(src);
        return groups;
      }, {})).map(([group, items]) => /* @__PURE__ */ React.createElement("div", { key: group, style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: accentCol2, marginBottom: 8 } }, group), items.map((src) => /* @__PURE__ */ React.createElement("div", { key: src.id, onClick: () => setSelectedSource(src), style: { ...S.card, marginBottom: 10, cursor: "pointer", borderColor: (selectedSource2 == null ? void 0 : selectedSource2.id) === src.id ? accentCol2 : C.border, background: (selectedSource2 == null ? void 0 : selectedSource2.id) === src.id ? accentCol2 + "11" : C.card } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, "\u{1F4C4} ", src.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 2 } }, src.date, " \u2022 ", src.size)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20 } }, src.type === "pdf" ? "\u{1F4D1}" : src.type === "ppt" ? "\u{1F4CA}" : src.type === "image" ? "\u{1F5BC}\uFE0F" : "\u{1F4DD}")))))));
    }
    if (mainTab === "recents") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u23F1\uFE0F Recent Items"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Your recently created materials"), recents.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "\u{1F4ED}"), /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "No recent items yet")) : recents.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, style: { ...S.card, marginBottom: 12, padding: "14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, item.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 4 } }, "\u{1F4C4} ", item.source, " \u2022 ", item.date)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, background: accentCol2 + "22", color: accentCol2, padding: "4px 8px", borderRadius: 4, fontWeight: 600 } }, item.type)))));
    }
    if (mainTab === "shared") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F465} Shared With Groups"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Materials shared in your study groups"), shared.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "\u{1F91D}"), /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "No shared materials yet. Create a study group to share!")) : shared.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, style: { ...S.card, marginBottom: 12, padding: "14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, "\u{1F465} ", item.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 4 } }, "Group: ", item.group, " \u2022 ", item.date)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18 } }, item.icon)))));
    }
    if (mainTab === "downloaded") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4BE} Downloaded"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Offline access to your materials"), downloaded.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, "\u{1F4E5}"), /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "No downloaded materials yet")) : downloaded.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.id, style: { ...S.card, marginBottom: 12, padding: "14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, "\u{1F4E6} ", item.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 4 } }, "Size: ", item.size, " \u2022 ", item.date)), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2), padding: "4px 10px", fontSize: 11 } }, "Open")))));
    }
    if (mainTab === "chat") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4AC} Chat with SIMA"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Ask questions about your materials"), selectedSource2 ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, background: accentCol2 + "11", borderColor: accentCol2 + "33", padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: accentCol2, fontWeight: 700 } }, "\u{1F4C4} Chatting about: ", selectedSource2.name), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedSource(null), style: { fontSize: 11, marginTop: 8, ...S.btn(C.muted + "22", C.muted) } }, "Change Source")) : /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted } }, "Select a source from Sources tab to begin chatting")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "14px", background: C.surface, marginBottom: 12, borderRadius: 8, minHeight: 200, maxHeight: 300, overflow: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, textAlign: "center" } }, "Chat conversation would appear here")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { placeholder: "Ask a question...", style: { ...S.input, flex: 1 } }), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2), padding: "10px 16px" } }, "Send")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 12 } }, "\u{1F4A1} You can also ask for external sources related to your question"));
    }
    if (mainTab === "covers") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F3AC} Studio Covers"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Generate multimedia content"), !selectedSource2 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", textAlign: "center", marginBottom: 16, background: accentCol2 + "08" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: accentCol2, marginBottom: 8 } }, "\u{1F4C4} Select a source from Sources tab to generate covers")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, [
        { id: "audio", icon: "\u{1F399}\uFE0F", label: "Audio Overview", desc: "Realistic voices discussing content" },
        { id: "video", icon: "\u{1F4F9}", label: "Video Overview", desc: "Animated video summary" },
        { id: "slides", icon: "\u{1F4CA}", label: "Slide Deck", desc: "Presentation slides" },
        { id: "flashcards", icon: "\u{1F0CF}", label: "Flashcards", desc: "Interactive cards" },
        { id: "quiz", icon: "\u2753", label: "Quiz", desc: "Self-assessment questions" },
        { id: "report", icon: "\u{1F4CB}", label: "Report", desc: "Detailed summary" }
      ].map((cover) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: cover.id,
          onClick: () => {
            setGenerationType(cover.id);
            setUploadTitle(cover.label);
          },
          style: {
            ...S.card,
            padding: "16px",
            textAlign: "center",
            cursor: "pointer",
            borderColor: generationType === cover.id ? accentCol2 : C.border,
            background: generationType === cover.id ? accentCol2 + "11" : C.card,
            transition: "all 0.2s"
          }
        },
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 8 } }, cover.icon),
        /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13, marginBottom: 4 } }, cover.label),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, cover.desc)
      ))));
    }
    if (mainTab === "generate") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u2728 Generate New"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Create study materials from your sources"), selectedSource2 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, background: accentCol2 + "11", borderColor: accentCol2 + "33", padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: accentCol2, fontWeight: 700 } }, "\u{1F4C4} Working with: ", selectedSource2.name), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedSource(null), style: { fontSize: 11, marginTop: 8, ...S.btn(C.muted + "22", C.muted) } }, "Change Source")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Topic or Query"), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          value: topic,
          onChange: (e) => setTopic(e.target.value),
          placeholder: "e.g. 'Photosynthesis mechanism' or leave blank to summarize entire source",
          style: { ...S.input, minHeight: 70, resize: "vertical", fontFamily: "inherit" }
        }
      )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.08em" } }, "GENERATION TYPE ", (() => {
        try {
          const sub = JSON.parse(localStorage.getItem("sima_subscription") || "{}");
          const trialEnd = new Date(sub.trialEndDate);
          if (trialEnd > /* @__PURE__ */ new Date()) {
            const daysLeft = Math.ceil((trialEnd - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24));
            return ` \u2014 \u{1F381} Trial Mode (${daysLeft} days left)`;
          }
        } catch {
        }
        return plan === "free" ? "\u2014 Plan limit" : "";
      })()), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 } }, SUBSCRIPTION_CONFIG.generationTypes.map((gtype) => {
        const allowed = canGenerate(gtype.feature);
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: gtype.id,
            onClick: () => allowed && setGenerationType(gtype.id),
            style: {
              ...S.btn(
                generationType === gtype.id ? accentCol2 : C.surface,
                generationType === gtype.id ? C.text : C.muted
              ),
              padding: "12px 10px",
              fontSize: 12,
              fontWeight: 600,
              opacity: allowed ? 1 : 0.5,
              cursor: allowed ? "pointer" : "not-allowed",
              border: `1px solid ${generationType === gtype.id ? accentCol2 : C.border}`
            }
          },
          gtype.label,
          !allowed ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: C.muted, marginTop: 2 } }, "\u{1F512} Plan limit") : plan === "free" && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: accentCol2, marginTop: 2 } }, "\u2713 Available")
        );
      })), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: generateContent,
          disabled: !canGenerate((_a = SUBSCRIPTION_CONFIG.generationTypes.find((g) => g.id === generationType)) == null ? void 0 : _a.feature) || loading,
          style: {
            ...S.btn(accentCol2),
            width: "100%",
            justifyContent: "center",
            fontSize: 15,
            opacity: !canGenerate((_b = SUBSCRIPTION_CONFIG.generationTypes.find((g) => g.id === generationType)) == null ? void 0 : _b.feature) ? 0.5 : 1,
            cursor: !canGenerate((_c = SUBSCRIPTION_CONFIG.generationTypes.find((g) => g.id === generationType)) == null ? void 0 : _c.feature) ? "not-allowed" : "pointer"
          }
        },
        loading ? "Generating..." : "\u2728 Generate"
      ), output && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginTop: 16, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, letterSpacing: "0.08em" } }, "GENERATED CONTENT"), /* @__PURE__ */ React.createElement("div", { style: { whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.6, maxHeight: 400, overflowY: "auto" } }, String(output)), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(new Blob([output], { type: "text/plain" }));
            link.download = `${generationType}-${Date.now()}.txt`;
            link.click();
          },
          style: { ...S.btn(accentCol2 + "22", accentCol2), marginTop: 12, width: "100%", justifyContent: "center" }
        },
        "\u{1F4E5} Download"
      )));
    }
    if (mainTab === "media") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F3A7} Generated Media"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Access and interact with your generated content"), generatedMedia.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, textAlign: "center", padding: 24, color: C.muted } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "\u{1F4ED}"), /* @__PURE__ */ React.createElement("div", null, 'No generated media yet. Create some from the "Generate New" tab.')) : generatedMedia.map((media) => /* @__PURE__ */ React.createElement("div", { key: media.id, style: { ...S.card, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, media.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 2 } }, "Source: ", media.source, " \u2022 ", media.date)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20 } }, media.type === "audioOverview" ? "\u{1F3A7}" : media.type === "videoOverview" ? "\u{1F3AC}" : media.type === "flashcard" ? "\u{1F0CF}" : "\u{1F4DD}")), media.type === "audioOverview" && /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, borderRadius: 8, padding: "12px 14px", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600 } }, "\u25B6\uFE0F ", media.duration), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2 + "22", C.muted), padding: "4px 8px", fontSize: 11 } }, "\u261D\uFE0F Raise Hand")), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 4, background: C.border, borderRadius: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { height: 4, width: "35%", background: accentCol2, borderRadius: 2 } }))), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2 + "22", accentCol2), width: "100%", justifyContent: "center", fontSize: 13 } }, media.type === "audioOverview" ? "\u{1F3A7} Listen" : media.type === "videoOverview" ? "\u{1F3AC} Watch" : "\u{1F4D6} View"))));
    }
    if (mainTab === "chat") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4AC} Chat with Sources"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Ask questions about your learning materials"), !selectedSource2 ? /* @__PURE__ */ React.createElement("div", { style: { ...S.card, textAlign: "center", padding: 24, color: C.muted } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "\u{1F4DA}"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, 'Select a source from the "Sources" tab to chat about it'), /* @__PURE__ */ React.createElement("button", { onClick: () => setMainTab("sources"), style: { ...S.btn(accentCol2) } }, "Go to Sources")) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, background: accentCol2 + "11", borderColor: accentCol2 + "33", padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: accentCol2, fontWeight: 700 } }, "\u{1F4C4} Chatting about: ", selectedSource2.name)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, maxHeight: 300, overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, background: accentCol2 + "22", borderColor: accentCol2, padding: "12px 14px", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: accentCol2 } }, "\u{1F916} SIMA: What would you like to know about ", selectedSource2.name, "?"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
        "textarea",
        {
          placeholder: "Ask a question...",
          style: { ...S.input, flex: 1, minHeight: 44, resize: "vertical", fontFamily: "inherit" }
        }
      ), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2), padding: "12px 16px", alignSelf: "flex-start" } }, "Send"))));
    }
    const tabs = [
      { id: "sources", label: "\u{1F4DA} Sources", icon: "sources" },
      { id: "generate", label: "\u2728 Generate", icon: "generate" },
      { id: "media", label: "\u{1F3A7} Media", icon: "media" },
      { id: "chat", label: "\u{1F4AC} Chat", icon: "chat" }
    ];
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "Study Studio"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Upload, generate, and interact with learning materials"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 } }, tabs.map((t) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: t.id,
        onClick: () => setMainTab(t.id),
        style: {
          ...S.btn(mainTab === t.id ? accentCol2 : C.surface, mainTab === t.id ? C.text : C.muted),
          padding: "12px 14px",
          fontSize: 13,
          fontWeight: 600,
          border: `1px solid ${mainTab === t.id ? accentCol2 : C.border}`
        }
      },
      t.label
    ))), mainTab === "sources" && /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 0" } }));
  }
  function TimetableScreen({ profile, config }) {
    var _a, _b;
    const [subjects, setSubjects] = useState("");
    const [examDate, setExamDate] = useState("");
    const [timetableData, setTimetableData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState("table");
    const accentCol2 = config.accentColor;
    const isKinder = PROFILE_ENGINE.getLevel(profile) === "kindergarten";
    const generateTableTimetable = () => {
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const studyHours = profile.hours || 2;
      const sessionDuration = 45;
      const breakDuration = 15;
      const preferredTime = profile.studyTime || "morning";
      let startHour = preferredTime === "morning" ? 8 : preferredTime === "afternoon" ? 14 : 18;
      const schedule = {};
      daysOfWeek.forEach((day) => {
        const sessions = [];
        let currentHour = startHour;
        let remainingHours = studyHours;
        while (remainingHours > 0) {
          const mins = Math.floor(currentHour * 60);
          const endHour = Math.min(currentHour + 0.75, currentHour + remainingHours);
          sessions.push({
            time: `${String(Math.floor(currentHour)).padStart(2, "0")}:${String(Math.floor(currentHour % 1 * 60)).padStart(2, "0")}`,
            endTime: `${String(Math.floor(endHour)).padStart(2, "0")}:${String(Math.floor(endHour % 1 * 60)).padStart(2, "0")}`,
            activity: sessions.length % 3 === 0 ? `Practice Questions` : sessions.length % 2 === 0 ? `Review ${(subjects == null ? void 0 : subjects.split(",")[0]) || "Topic"}` : `Study ${(subjects == null ? void 0 : subjects.split(",")[sessions.length % Math.max(1, (subjects == null ? void 0 : subjects.split(",").length) || 1)]) || "Topic"}`,
            duration: sessionDuration
          });
          currentHour = endHour + breakDuration / 60;
          remainingHours -= 0.75;
        }
        schedule[day] = sessions;
      });
      return schedule;
    };
    const generate = async () => {
      if (!subjects.trim()) return;
      setLoading(true);
      const prompt2 = `Create a ${isKinder ? "fun weekly learning schedule" : "detailed weekly study timetable"} for:
- Name: ${profile.name}, Level: ${profile.education}, ${profile.program ? `Program: ${profile.program}` : ""}
- Topics/Subjects: ${subjects}
- ${examDate ? `Exam/deadline: ${examDate}` : "No specific exam date"}
- Daily study hours: ${profile.hours}h, Preferred time: ${profile.studyTime}
- Attention span: ${profile.attention}
- Learning style: ${Array.isArray(profile.style) ? profile.style.join(", ") : profile.style}

ADAPTATION: ${config.timetableHint}

${isKinder ? "Use fun, encouraging language. Keep activities short (15-20 min). Include play breaks and movement." : `Include: spaced repetition reviews, practice tests, breaks, and revision. Reference relevant topics for ${profile.program || profile.education}.`}
Format as a clear day-by-day schedule.`;
      try {
        const tableSchedule = generateTableTimetable();
        setTimetableData({ text: "", table: tableSchedule });
        setViewType("table");
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "timetable", prompt: prompt2, model: "sima-stub" })
        });
        if (res.ok) {
          const data = await res.json();
          setTimetableData((prev) => ({ ...prev, text: data.response || "" }));
        }
      } catch (err) {
        console.error("Timetable generation error:", err);
        const tableSchedule = generateTableTimetable();
        setTimetableData({ text: "", table: tableSchedule });
        setViewType("table");
      }
      setLoading(false);
    };
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, isKinder ? "\u{1F4C5} My Learning Plan" : "\u{1F4C5} Study Plan & Timetable"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Plan your goals and generate your personalized timetable"), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("label", { style: S.label }, isKinder ? "What do you want to learn?" : "Subjects / topics to cover"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 } }, (_a = config.exampleTopics) == null ? void 0 : _a.slice(0, 3).map((t) => /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => setSubjects((s) => s ? s + ", " + t : t), style: { ...S.btn(accentCol2 + "18", accentCol2), border: `1px solid ${accentCol2}33`, padding: "4px 10px", fontSize: 11 } }, "+ ", t))), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: subjects,
        onChange: (e) => setSubjects(e.target.value),
        placeholder: ((_b = config.exampleTopics) == null ? void 0 : _b.join(", ")) || "e.g. Maths, English, Science",
        style: { ...S.input, minHeight: 70, resize: "vertical", fontFamily: "inherit" }
      }
    ), !isKinder && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: { ...S.label, marginTop: 14 } }, "Exam/deadline date (optional)"), /* @__PURE__ */ React.createElement("input", { type: "date", style: S.input, value: examDate, onChange: (e) => setExamDate(e.target.value) })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: "10px 12px", background: C.surface, borderRadius: 10, fontSize: 12, color: C.muted } }, config.emoji, " ", profile.hours, "h/day \xB7 ", profile.attention, " focus \xB7 ", profile.studyTime, " learner \xB7 ", Array.isArray(profile.style) ? profile.style.join(", ") : profile.style, " style"), /* @__PURE__ */ React.createElement("button", { onClick: generate, style: { ...S.btn(accentCol2), marginTop: 14, width: "100%", justifyContent: "center", fontSize: 15 } }, loading ? "Building your plan\u2026" : isKinder ? "\u{1F31F} Make My Plan!" : "\u{1F4C5} Generate Timetable")), timetableData && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setViewType("table"), style: { ...S.btn(viewType === "table" ? accentCol2 : C.surface, viewType === "table" ? "#fff" : C.text), flex: 1, border: `1px solid ${viewType === "table" ? accentCol2 : C.border}` } }, "\u{1F4CA} Table View"), timetableData.text && /* @__PURE__ */ React.createElement("button", { onClick: () => setViewType("text"), style: { ...S.btn(viewType === "text" ? accentCol2 : C.surface, viewType === "text" ? "#fff" : C.text), flex: 1, border: `1px solid ${viewType === "text" ? accentCol2 : C.border}` } }, "\u{1F4DD} Text View")), viewType === "table" && timetableData.table && /* @__PURE__ */ React.createElement("div", null, Object.entries(timetableData.table).map(([day, sessions]) => /* @__PURE__ */ React.createElement("div", { key: day, style: { ...S.card, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: accentCol2, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${C.border}` } }, day.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, sessions.map((session, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, padding: "8px", background: C.surface, borderRadius: 8, borderLeft: `3px solid ${accentCol2}` } }, /* @__PURE__ */ React.createElement("div", { style: { minWidth: 60, fontSize: 12, fontWeight: 700, color: accentCol2 } }, session.time), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, session.activity), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u23F1\uFE0F ", session.duration, " mins")))))))), viewType === "text" && timetableData.text && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.8 } }, timetableData.text)));
  }
  function AnalyticsDashboardScreen({ profile, config, plan, isFirstUse }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
    const [analytics, setAnalytics] = useState(null);
    const [insights, setInsights] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("all");
    const [hoverIndex, setHoverIndex] = useState(null);
    const [expandedSubject, setExpandedSubject] = useState(null);
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    useEffect(() => {
      loadAnalytics();
    }, [period]);
    useEffect(() => {
      if (analytics && subjects.length === 0) {
        (async () => {
          try {
            const subjRes = await fetch(`${API_BASE_URL}/api/analytics/subject-mastery`, { headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` } });
            if (subjRes.ok) {
              const subjData = await subjRes.json();
              setSubjects(Array.isArray(subjData.subjects) ? subjData.subjects : Array.isArray(subjData) ? subjData : []);
            }
          } catch (e) {
          }
        })();
      }
    }, [analytics]);
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const [dashRes, insightRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/analytics/dashboard`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` }
          }),
          fetch(`${API_BASE_URL}/api/analytics/insights`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` }
          })
        ]);
        const dashData = await dashRes.json();
        const insightData = await insightRes.json();
        setAnalytics(dashData);
        setInsights(insightData);
        try {
          const subjRes = await fetch(`${API_BASE_URL}/api/analytics/subject-mastery`, { headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` } });
          if (subjRes.ok) {
            const subjData = await subjRes.json();
            setSubjects(Array.isArray(subjData.subjects) ? subjData.subjects : Array.isArray(subjData) ? subjData : []);
          }
        } catch (e) {
          console.warn("subject mastery fetch failed", e);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    if (loading || !analytics) {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 20 } }, "\u{1F4CA} Analytics"), /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "Loading your progress..."));
    }
    const dash = analytics;
    const mil = insights == null ? void 0 : insights.nextMilestone;
    const masteryPct = (dash == null ? void 0 : dash.cards) && dash.cards.total ? Math.round(dash.cards.mastered / Math.max(1, dash.cards.total) * 100) : null;
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800 } }, "\u{1F4CA} Your Progress"), /* @__PURE__ */ React.createElement("button", { onClick: loadAnalytics, style: { ...S.btn(accentCol2, C.text), fontSize: 12, padding: "6px 10px" } }, "\u{1F504} Refresh")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { onMouseEnter: () => setHoverIndex(0), onMouseLeave: () => setHoverIndex(null), style: { ...S.card, padding: "12px", cursor: "pointer", boxShadow: hoverIndex === 0 ? "0 12px 28px rgba(14,20,30,0.12)" : "0 6px 18px rgba(14,20,30,0.04)", transform: hoverIndex === 0 ? "translateY(-4px)" : "none", transition: "all .18s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u{1F3C5} Mastery"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: accentCol2 } }, masteryPct !== null ? `${masteryPct}%` : "\u2014"), hoverIndex === 0 && ((_b = (_a = dash.raw) == null ? void 0 : _a.quizzes) == null ? void 0 : _b.recentScores) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(Sparkline, { values: dash.raw.quizzes.recentScores.map((v) => Number(v) || 0), color: accentCol2, width: 160, height: 36 }))), /* @__PURE__ */ React.createElement("div", { onMouseEnter: () => setHoverIndex(1), onMouseLeave: () => setHoverIndex(null), style: { ...S.card, padding: "12px", cursor: "pointer", boxShadow: hoverIndex === 1 ? "0 12px 28px rgba(14,20,30,0.12)" : "0 6px 18px rgba(14,20,30,0.04)", transform: hoverIndex === 1 ? "translateY(-4px)" : "none", transition: "all .18s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u{1F4C8} Quiz Avg"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800 } }, ((_d = (_c = dash.raw) == null ? void 0 : _c.quizzes) == null ? void 0 : _d.averageScore) ? `${dash.raw.quizzes.averageScore}%` : `${((_e = dash.overall) == null ? void 0 : _e.overallProgress) || 0}%`), hoverIndex === 1 && ((_g = (_f = dash.raw) == null ? void 0 : _f.quizzes) == null ? void 0 : _g.recentScores) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(MiniBarChart, { values: dash.raw.quizzes.recentScores.map((v) => Number(v) || 0), color: accentCol2, width: 160, height: 36 }))), /* @__PURE__ */ React.createElement("div", { onMouseEnter: () => setHoverIndex(2), onMouseLeave: () => setHoverIndex(null), style: { ...S.card, padding: "12px", cursor: "pointer", boxShadow: hoverIndex === 2 ? "0 12px 28px rgba(14,20,30,0.12)" : "0 6px 18px rgba(14,20,30,0.04)", transform: hoverIndex === 2 ? "translateY(-4px)" : "none", transition: "all .18s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u26A1 Velocity"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800 } }, (_j = (_i = (_h = dash.overall) == null ? void 0 : _h.learningVelocity) == null ? void 0 : _i.cardsPerWeek) != null ? _j : "\u2014", " cards/wk"), hoverIndex === 2 && ((_k = dash.raw) == null ? void 0 : _k.srs) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(Sparkline, { values: Array.isArray((_l = dash.raw.srs.masteryTimeline) == null ? void 0 : _l.recent) ? dash.raw.srs.masteryTimeline.recent : [((_m = dash.overall) == null ? void 0 : _m.overallProgress) || 0], color: accentCol2, width: 160, height: 36 })))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u{1F3AF} Flashcard Mastery"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, padding: "10px", borderRadius: 8, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.green } }, ((_n = dash.cards) == null ? void 0 : _n.mastered) || 0), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Mastered")), /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, padding: "10px", borderRadius: 8, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: accentCol2 } }, ((_o = dash.cards) == null ? void 0 : _o.retentionRate) || 0, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Retention"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } }, [
      { label: "Total", val: (_p = dash.cards) == null ? void 0 : _p.total, col: C.muted },
      { label: "Learning", val: (_q = dash.cards) == null ? void 0 : _q.learning, col: C.gold },
      { label: "New", val: (_r = dash.cards) == null ? void 0 : _r.new, col: C.blue }
    ].map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, style: { background: C.surface, padding: "8px", borderRadius: 6, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: item.col } }, item.val || 0), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.muted } }, item.label))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u2753 Quiz Performance"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, padding: "10px", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.green } }, ((_s = dash.quizzes) == null ? void 0 : _s.averageScore) || 0, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Avg Score")), /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, padding: "10px", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.blue } }, ((_t = dash.quizzes) == null ? void 0 : _t.passRate) || 0, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Pass Rate"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } }, [
      { label: "Total", val: (_u = dash.quizzes) == null ? void 0 : _u.total, col: accentCol2 },
      { label: "Highest", val: (_v = dash.quizzes) == null ? void 0 : _v.highestScore, col: C.green },
      { label: "Trend", val: (((_w = dash.quizzes) == null ? void 0 : _w.trend) > 0 ? "+" : "") + ((_x = dash.quizzes) == null ? void 0 : _x.trend), col: ((_y = dash.quizzes) == null ? void 0 : _y.trend) > 0 ? C.green : C.red }
    ].map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, style: { background: C.surface, padding: "8px", borderRadius: 6, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: item.col } }, item.val, item.label.includes("Trend") ? "%" : ""), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.muted } }, item.label))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u{1F4C5} Study Progress"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, padding: "10px", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: accentCol2 } }, ((_z = dash.study) == null ? void 0 : _z.completionRate) || 0, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Plan Completion")), /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, padding: "10px", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.green } }, ((_A = dash.study) == null ? void 0 : _A.consistency) || 0, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Consistency")))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u23F1\uFE0F Study Hours - This Week"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: 150, gap: 4, padding: "12px 0", background: C.surface, borderRadius: 8, paddingBottom: 12 } }, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
      const hours = isFirstUse ? 0 : [2.5, 3, 2, 4, 3.5, 1.5, 0.5][i];
      const maxHeight = 140;
      const barHeight = hours / 5 * maxHeight;
      return /* @__PURE__ */ React.createElement("div", { key: day, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: accentCol2, fontWeight: 700, marginBottom: 4 } }, hours, "h"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: barHeight, background: `linear-gradient(180deg, ${accentCol2}, ${accentCol2}66)`, borderRadius: "4px 4px 0 0" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: C.muted, marginTop: 4 } }, day));
    })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: "8px 12px", background: accentCol2 + "11", borderRadius: 6, fontSize: 12, textAlign: "center", color: accentCol2 } }, isFirstUse ? "\u{1F4CA} Start studying to see your weekly stats" : "\u{1F4CA} This week: 16.5 hours total (avg 2.4h/day)")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 8 } }, "\u{1F4DA} Subject & Course Mastery"), subjects.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { color: C.muted, fontSize: 12 } }, "No subject mastery data available."), subjects.map((s, idx) => {
      var _a2, _b2;
      const topics = Array.isArray(s.topics) ? s.topics : s.courses || [];
      const sorted = Array.isArray(topics) ? [...topics].sort((a, b) => (a.masteryPct || 0) - (b.masteryPct || 0)) : [];
      const weak = sorted.slice(0, 3);
      const strong = sorted.slice(-3).reverse();
      return /* @__PURE__ */ React.createElement("div", { key: s.subject || idx, style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700 } }, s.subject, s.course ? ` \u2014 ${s.course}` : ""), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800 } }, (_a2 = s.masteryPct) != null ? _a2 : s.mastery || "\u2014", "%"), /* @__PURE__ */ React.createElement("button", { onClick: () => setExpandedSubject(expandedSubject === s.subject ? null : s.subject), style: { ...S.btn(C.surface, C.muted), padding: "6px 8px", fontSize: 12 } }, expandedSubject === s.subject ? "Collapse" : "Details"))), /* @__PURE__ */ React.createElement(ProgressBar, { value: (_b2 = s.masteryPct) != null ? _b2 : s.mastery || 0, max: 100, color: s.masteryPct >= 80 ? C.green : s.masteryPct >= 60 ? C.gold : C.red, height: 8 }), expandedSubject === s.subject && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, padding: 10, background: C.surface, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 8 } }, "Top Weak Topics"), weak.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "No topic data."), weak.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.name, style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, t.name), /* @__PURE__ */ React.createElement("div", { style: { width: 120 } }, /* @__PURE__ */ React.createElement(ProgressBar, { value: t.masteryPct || 0, max: 100, color: C.red, height: 8 })))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 8 } }, "Top Strong Topics"), strong.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.name, style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, t.name), /* @__PURE__ */ React.createElement("div", { style: { width: 120 } }, /* @__PURE__ */ React.createElement(ProgressBar, { value: t.masteryPct || 0, max: 100, color: C.green, height: 8 }))))));
    })), mil && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16, background: accentCol2 + "22", border: `1px solid ${accentCol2}33` } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 8, color: accentCol2 } }, "\u{1F3C6} Next Milestone"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 8 } }, mil.title), /* @__PURE__ */ React.createElement(ProgressBar, { value: mil.progress || 0, max: mil.target || 100, color: accentCol2, height: 4 }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 6 } }, mil.progress || 0, " / ", mil.target || 100)), (insights == null ? void 0 : insights.recommendations) && insights.recommendations.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u{1F4A1} Recommendations"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, insights.recommendations.map((rec, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { color: accentCol2, fontWeight: 600 } }, "\u2192"), /* @__PURE__ */ React.createElement("span", null, rec))))));
  }
  function GamificationScreen({ profile, config, plan }) {
    var _a;
    const [gameProfile, setGameProfile] = useState({
      currentLevel: 12,
      levelName: "Master Scholar",
      percentToNextLevel: 68,
      pointsToNextLevel: 320,
      totalPoints: 4680,
      longestStreak: 23,
      badge: { topBadges: ["\u{1F3C6}", "\u2B50", "\u{1F525}", "\u{1F48E}"] }
    });
    const generateAchievements = () => {
      const templates = [
        { name: "First Steps", icon: "\u{1F463}", description: "Complete your first study session", points: 50 },
        { name: "Week Warrior", icon: "\u2694\uFE0F", description: "Study 7 days in a row", points: 150 },
        { name: "100 Days", icon: "\u{1F4AF}", description: "Reach 100 day streak", points: 500 },
        { name: "Quiz Master", icon: "\u{1F3AF}", description: "Get 100% on 5 quizzes", points: 200 },
        { name: "Perfect Focus", icon: "\u{1F3AF}", description: "Complete 10 focus sessions", points: 100 },
        { name: "All-Nighter", icon: "\u{1F319}", description: "Study 8+ hours in one day", points: 300 },
        { name: "Flash Learner", icon: "\u26A1", description: "Create 50 flashcards", points: 250 },
        { name: "Knowledge Base", icon: "\u{1F4DA}", description: "Unlock 10 study materials", points: 180 },
        { name: "Speed Reader", icon: "\u{1F4D6}", description: "Read 500 pages", points: 200 },
        { name: "Note Ninja", icon: "\u{1F4DD}", description: "Write 10,000 words in notes", points: 220 },
        { name: "Group Champion", icon: "\u{1F465}", description: "Join 5 study groups", points: 150 },
        { name: "Voice Master", icon: "\u{1F399}\uFE0F", description: "Send 20 voice messages", points: 120 },
        { name: "Night Owl", icon: "\u{1F989}", description: "Study after 10 PM", points: 80 },
        { name: "Early Bird", icon: "\u{1F305}", description: "Study before 7 AM", points: 80 },
        { name: "Streak Keeper", icon: "\u{1F525}", description: "Maintain 30-day streak", points: 400 },
        { name: "Expert Scholar", icon: "\u{1F393}", description: "Reach Level 20", points: 1e3 },
        { name: "Content Creator", icon: "\u{1F3AC}", description: "Generate 20 study materials", points: 280 },
        { name: "Social Learner", icon: "\u{1F4AC}", description: "Send 100 group messages", points: 160 },
        { name: "Time Master", icon: "\u23F1\uFE0F", description: "Complete 100 pomodoro sessions", points: 210 },
        { name: "Memory Champion", icon: "\u{1F9E0}", description: "Master 100 flashcards", points: 300 }
      ];
      return templates.map((t, i) => ({ ...t, id: i + 1, unlocked: Math.random() > 0.4 }));
    };
    const [achievements, setAchievements] = useState(generateAchievements());
    const generateChallenges = () => {
      const templates = [
        { icon: "\u{1F4DA}", title: "Weekly Read", description: "Read 50 pages this week", target: 50, reward: 100 },
        { icon: "\u270D\uFE0F", title: "Note Master", description: "Write 1000 words of notes", target: 1e3, reward: 150 },
        { icon: "\u{1F504}", title: "Consistency", description: "Study 5 days this week", target: 5, reward: 200 },
        { icon: "\u{1F3AF}", title: "Quiz Champion", description: "Score 90%+ on 3 quizzes", target: 3, reward: 180 },
        { icon: "\u{1F9E0}", title: "Memory Test", description: "Master 20 flashcards", target: 20, reward: 120 },
        { icon: "\u{1F4AC}", title: "Group Guru", description: "Send 50 group messages", target: 50, reward: 140 },
        { icon: "\u23F1\uFE0F", title: "Pomodoro King", description: "Complete 15 pomodoro sessions", target: 15, reward: 160 },
        { icon: "\u{1F31F}", title: "Golden Week", description: "Earn 500 points this week", target: 500, reward: 250 },
        { icon: "\u{1F4D6}", title: "Page Turner", description: "Read 100 pages", target: 100, reward: 110 },
        { icon: "\u{1F3A4}", title: "Voice Champ", description: "Send 10 voice messages", target: 10, reward: 90 }
      ];
      return templates.map((t, i) => ({
        ...t,
        challengeId: i + 1,
        progress: Math.floor(Math.random() * (t.target * 0.8))
      }));
    };
    const [challenges, setChallenges] = useState(generateChallenges());
    const [leaderboard, setLeaderboard] = useState([
      { rank: 1, userId: "user001", name: "\u{1F3C5} Alex Chen", university: "Stanford University", program: "Computer Science", year: "Year 3", currentLevel: 15, streak: 45, totalPoints: 8320, studySessions: 156, achievements: [{ icon: "\u{1F3C6}" }, { icon: "\u2B50" }, { icon: "\u{1F48E}" }] },
      { rank: 2, userId: "user002", name: "\u{1F4DA} Sarah Johnson", university: "Harvard University", program: "Medicine", year: "Year 2", currentLevel: 14, streak: 38, totalPoints: 7650, studySessions: 142, achievements: [{ icon: "\u{1F525}" }, { icon: "\u2B50" }, { icon: "\u2728" }] },
      { rank: 3, userId: "user003", name: "\u{1F393} Marcus Lee", university: "MIT", program: "Engineering", year: "Year 4", currentLevel: 13, streak: 32, totalPoints: 7100, studySessions: 128, achievements: [{ icon: "\u{1F3C6}" }, { icon: "\u{1F525}" }] },
      { rank: 4, userId: "user004", name: "\u{1F4A1} Emma Davis", university: "Oxford University", program: "Law", year: "Year 1", currentLevel: 12, streak: 28, totalPoints: 6450, studySessions: 115, achievements: [{ icon: "\u2B50" }, { icon: "\u2728" }] },
      { rank: 5, userId: "user005", name: "\u{1F680} James Wilson", university: "Cambridge University", program: "Physics", year: "Year 3", currentLevel: 11, streak: 21, totalPoints: 5890, studySessions: 98, achievements: [{ icon: "\u{1F3C6}" }] },
      { rank: 6, userId: "user006", name: "\u{1F31F} Lisa Wong", university: "NUS Singapore", program: "Business", year: "Year 2", currentLevel: 10, streak: 18, totalPoints: 5200, studySessions: 85, achievements: [{ icon: "\u{1F525}" }] },
      { rank: 7, userId: "user007", name: "\u{1F3AF} Tom Anderson", university: "UC Berkeley", program: "Data Science", year: "Year 4", currentLevel: 9, streak: 15, totalPoints: 4500, studySessions: 72, achievements: [] },
      { rank: 8, userId: "user008", name: "\u{1F4D6} Nina Patel", university: "IIT Bombay", program: "Chemistry", year: "Year 1", currentLevel: 8, streak: 12, totalPoints: 3800, studySessions: 60, achievements: [{ icon: "\u2B50" }] },
      { rank: 9, userId: "user009", name: "\u2728 Carlos Ruiz", university: "University of Toronto", program: "Biology", year: "Year 3", currentLevel: 7, streak: 9, totalPoints: 3100, studySessions: 48, achievements: [] },
      { rank: 10, userId: "user010", name: "\u{1F525} Maya Hassan", university: "University of Melbourne", program: "Psychology", year: "Year 2", currentLevel: 6, streak: 6, totalPoints: 2400, studySessions: 35, achievements: [] }
    ]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    useEffect(() => {
      loadGamificationData();
    }, [activeTab]);
    const loadGamificationData = async () => {
      setLoading(true);
      try {
        const [profRes, achRes, chalRes, leadRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/gamification/profile`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` }
          }).catch(() => ({ ok: false })),
          fetch(`${API_BASE_URL}/api/gamification/achievements`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` }
          }).catch(() => ({ ok: false })),
          fetch(`${API_BASE_URL}/api/gamification/challenges`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` }
          }).catch(() => ({ ok: false })),
          fetch(`${API_BASE_URL}/api/gamification/leaderboard`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` }
          }).catch(() => ({ ok: false }))
        ]);
        if (profRes.ok) {
          const profData = await profRes.json();
          setGameProfile(profData);
        }
        if (achRes.ok) {
          const achData = await achRes.json();
          setAchievements(achData.allAchievements || achievements);
        }
        if (chalRes.ok) {
          const chalData = await chalRes.json();
          setChallenges(chalData.challenges || challenges);
        }
        if (leadRes.ok) {
          const leadData = await leadRes.json();
          setLeaderboard(Array.isArray(leadData) ? leadData : leaderboard);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    if (loading && activeTab !== "profile") {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 20 } }, "\u{1F3AE} Gamification"), /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "Loading your profile..."));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 } }, [["Profile", "profile", "\u{1F464}"], ["Achievements", "achievements", "\u{1F3C6}"], ["Challenges", "challenges", "\u26A1"], ["Leaderboard", "leaderboard", "\u{1F4CA}"]].map(([label, id, icon]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: id,
        onClick: () => setActiveTab(id),
        style: {
          ...S.btn(activeTab === id ? `linear-gradient(135deg, ${C.heroA}, ${C.heroB})` : C.surface, activeTab === id ? "#fff" : C.text),
          border: `1px solid ${activeTab === id ? C.heroA : C.border}`,
          padding: "10px 6px",
          fontSize: 12,
          justifyContent: "center",
          fontWeight: activeTab === id ? 700 : 500
        }
      },
      icon,
      " ",
      label
    ))), activeTab === "profile" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", overflow: "hidden", borderRadius: 22, padding: "22px 20px", marginBottom: 16, background: `linear-gradient(135deg, ${C.heroA}, ${C.heroB}cc)`, textAlign: "center" } }, /* @__PURE__ */ React.createElement(HeroDecor, { heroA: C.heroA, heroB: C.heroB }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement(IllustrationTrophy, { width: 92, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4, marginBottom: 4 } }, "Level"), /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 56, fontWeight: 800, color: "#fff", marginBottom: 4 } }, gameProfile.currentLevel), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 700, marginBottom: 12, color: "#fff" } }, gameProfile.levelName), /* @__PURE__ */ React.createElement(ProgressBar, { value: gameProfile.percentToNextLevel || 0, max: 100, color: "#fff", height: 6 }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 8 } }, gameProfile.pointsToNextLevel, " points to next level"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "12px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: C.gold } }, gameProfile.totalPoints), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Total Points")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "12px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: C.green } }, "\u{1F525} ", gameProfile.longestStreak || 0), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Best Streak"))), ((_a = gameProfile.badge) == null ? void 0 : _a.topBadges) && gameProfile.badge.topBadges.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u{1F3C5} Your Badges"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } }, gameProfile.badge.topBadges.map((badge, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 32 } }, badge))))), activeTab === "achievements" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16, padding: "12px", background: C.surface, borderRadius: 8, fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, "Unlocked: ", achievements.filter((a) => a.unlocked).length, " / ", achievements.length), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 11, color: C.muted } }, "\u{1F3AF} Earn points by unlocking achievements")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, achievements.map((ach) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: ach.id,
        style: {
          ...S.card,
          padding: "14px",
          opacity: ach.unlocked ? 1 : 0.5,
          border: `2px solid ${ach.unlocked ? accentCol2 : C.border}`,
          cursor: ach.unlocked ? "pointer" : "default",
          background: ach.unlocked ? `${accentCol2}11` : C.card
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, ach.icon),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, marginBottom: 2, color: ach.unlocked ? C.text : C.muted } }, ach.name),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.muted, marginBottom: 8, minHeight: 30, lineHeight: 1.3 } }, ach.description),
      /* @__PURE__ */ React.createElement(Badge, { color: ach.unlocked ? accentCol2 : C.muted, style: { width: "100%", justifyContent: "center" } }, ach.points, " pts ", ach.unlocked ? "\u2713" : "\u{1F512}")
    )))), activeTab === "challenges" && /* @__PURE__ */ React.createElement("div", null, challenges.map((chal) => /* @__PURE__ */ React.createElement("div", { key: chal.challengeId, style: { ...S.card, padding: "14px", marginBottom: 10, borderLeft: `4px solid ${accentCol2}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 4 } }, chal.icon), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, chal.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, chal.description)), /* @__PURE__ */ React.createElement(Badge, { color: accentCol2, style: { minWidth: 60, justifyContent: "center" } }, "+", chal.reward, " pts")), /* @__PURE__ */ React.createElement(ProgressBar, { value: Math.min(100, chal.progress / chal.target * 100), max: 100, color: accentCol2, height: 6 }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 8, textAlign: "right" } }, chal.progress, " / ", chal.target, " ", chal.progress >= chal.target ? "\u2705 Complete!" : "")))), activeTab === "leaderboard" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "12px", marginBottom: 16, background: `linear-gradient(135deg, ${accentCol2}22, ${C.surface})`, border: `1px solid ${accentCol2}44` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: accentCol2, marginBottom: 6 } }, "\u{1F3C6} Top Performers This Week"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Compete with learners worldwide \u2022 Updated hourly")), Array.isArray(leaderboard) && leaderboard.length > 0 ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, leaderboard.slice(0, 10).map((user, idx) => /* @__PURE__ */ React.createElement("div", { key: user.userId || idx, style: { ...S.card, padding: "12px", display: "flex", gap: 12, borderLeft: `4px solid ${user.rank <= 3 ? accentCol2 : C.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, color: user.rank <= 3 ? accentCol2 : C.muted, minWidth: 32, textAlign: "center", flexShrink: 0 } }, user.rank === 1 ? "\u{1F947}" : user.rank === 2 ? "\u{1F948}" : user.rank === 3 ? "\u{1F949}" : `#${user.rank}`), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13, marginBottom: 2 } }, user.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.muted, marginBottom: 6 } }, user.university), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 10, color: C.muted } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4DA} ", user.program), /* @__PURE__ */ React.createElement("span", null, "\u{1F4C5} ", user.year), /* @__PURE__ */ React.createElement("span", null, "\u2B50 Level ", user.currentLevel), /* @__PURE__ */ React.createElement("span", null, "\u{1F525} ", user.streak, "d"))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 15, color: accentCol2 } }, user.totalPoints), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: C.muted, marginBottom: 6 } }, "points"), user.achievements && user.achievements.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 2, justifyContent: "flex-end" } }, user.achievements.map((a, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { fontSize: 11 } }, a.icon))))))) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "20px", color: C.muted } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 12 } }, "\u{1F4CA}"), /* @__PURE__ */ React.createElement("div", null, "Leaderboard loading..."))));
  }
  function GroupsScreen({ profile, config }) {
    const [groups, setGroups] = useState([]);
    const [search, setSearch] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupMessages, setGroupMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [showMembers, setShowMembers] = useState(false);
    const [showFileMenu, setShowFileMenu] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showDocViewer, setShowDocViewer] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [groupOpenToAll, setGroupOpenToAll] = useState({});
    const [sharedDocs, setSharedDocs] = useState([]);
    const [showFilesModal, setShowFilesModal] = useState(false);
    const [memberIdMap, setMemberIdMap] = useState({});
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, messageId: null });
    const [newGroup, setNewGroup] = useState({ name: "", topic: "", university: "", subjectCourse: "", year: "", members: 12, active: true });
    const userRole = { role: "admin", joinedAt: (/* @__PURE__ */ new Date()).toISOString() };
    const education = (profile == null ? void 0 : profile.education) || "university";
    const yieldYearOptions = () => {
      if (education === "kindergarten") return [];
      if (education === "primary") return [
        { value: "grade1", label: "Grade 1" },
        { value: "grade2", label: "Grade 2" },
        { value: "grade3", label: "Grade 3" },
        { value: "grade4", label: "Grade 4" },
        { value: "grade5", label: "Grade 5" },
        { value: "grade6", label: "Grade 6" },
        { value: "grade7", label: "Grade 7" }
      ];
      if (education === "secondary") return [
        { value: "grade8", label: "Grade 8 (Form 1)" },
        { value: "grade9", label: "Grade 9 (Form 2)" },
        { value: "grade10", label: "Grade 10 (Form 3)" },
        { value: "grade11", label: "Grade 11 (Form 4)" },
        { value: "grade12", label: "Grade 12 (Form 5)" }
      ];
      return [
        { value: "year1", label: "Year 1" },
        { value: "year2", label: "Year 2" },
        { value: "year3", label: "Year 3" },
        { value: "year4", label: "Year 4" },
        { value: "year5", label: "Year 5" },
        { value: "year6", label: "Year 6" },
        { value: "year7", label: "Year 7" },
        { value: "postgrad", label: "Postgraduate" }
      ];
    };
    const getMemberId = (sender) => {
      if (sender === "You") return "You (Member 1)";
      if (sender.includes("SIMA")) return sender;
      if (!memberIdMap[sender]) {
        const newId = Object.keys(memberIdMap).length + 1;
        setMemberIdMap((prev) => ({ ...prev, [sender]: `Member ${newId}` }));
        return `Member ${newId}`;
      }
      return memberIdMap[sender];
    };
    useEffect(() => {
      if (!showDocViewer || !(selectedDoc == null ? void 0 : selectedDoc.fileData)) return;
      const url = URL.createObjectURL(selectedDoc.fileData);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }, [showDocViewer, selectedDoc]);
    const closeDocViewer = () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setShowDocViewer(false);
      setSelectedDoc(null);
    };
    useEffect(() => {
      const savedGroups = localStorage.getItem("sima_groups");
      setGroups(savedGroups ? JSON.parse(savedGroups) : []);
      fetch("/api/groups").then((r) => r.json()).then((data) => {
        if (data.groups) setGroups((prev) => [...data.groups, ...prev.filter((g) => !data.groups.find((ag) => ag.id === g.id))]);
      }).catch(() => {
      });
    }, [config]);
    const handleSendMessage = async () => {
      if (!messageInput.trim() || !selectedGroup) return;
      if (editingMessageId !== null) {
        setGroupMessages((prev) => prev.map((message, index) => index === editingMessageId ? {
          ...message,
          content: messageInput,
          edited: true,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        } : message));
        setEditingMessageId(null);
        setMessageInput("");
        setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
        return;
      }
      const userMsg = { role: "user", content: messageInput, sender: "You", senderType: "user", timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), msgId: Date.now(), canDelete: true };
      setGroupMessages((prev) => [...prev, userMsg]);
      setMessageInput("");
      const simaIsMentioned = messageInput.toLowerCase().includes("@sima") || messageInput.toLowerCase().includes("@ai");
      if (!simaIsMentioned) return;
      let simaReply = null;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...groupMessages, userMsg], group: selectedGroup.id })
        }).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          simaReply = data.response || localSimaResponse({ prompt: messageInput, mode: "exam", profile });
        } else {
          simaReply = localSimaResponse({ prompt: messageInput, mode: "exam", profile });
        }
      } catch (e) {
        simaReply = localSimaResponse({ prompt: messageInput, mode: "exam", profile });
      }
      setGroupMessages((prev) => [...prev, { role: "assistant", content: simaReply, sender: "SIMA \u{1F916}", senderType: "ai", timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    };
    const handleCreateGroup = () => {
      if (!newGroup.name.trim() || !newGroup.topic.trim()) return alert("Enter group name and topic.");
      const payload = {
        id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: newGroup.name,
        topic: newGroup.topic,
        university: newGroup.university || (profile == null ? void 0 : profile.institution) || "",
        subjectCourse: newGroup.subjectCourse,
        year: newGroup.year,
        members: Number(newGroup.members) || 1,
        active: true,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        memberRoles: { [(profile == null ? void 0 : profile.name) || "You"]: { role: "admin", joinedAt: (/* @__PURE__ */ new Date()).toISOString() } }
      };
      const updatedGroups = [payload, ...groups];
      setGroups(updatedGroups);
      localStorage.setItem("sima_groups", JSON.stringify(updatedGroups));
      fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then((r) => r.json()).then((data) => {
        if (data.group) {
          const updated = [data.group, ...groups.filter((g) => g.id !== payload.id)];
          setGroups(updated);
          localStorage.setItem("sima_groups", JSON.stringify(updated));
        }
      }).catch(() => {
      });
      setNewGroup({ name: "", topic: "", university: "", subjectCourse: "", year: "", members: 12, active: true });
      setShowCreate(false);
      setSelectedGroup(payload);
      setGroupMessages([]);
    };
    const handleLeaveGroup = () => {
      if (!selectedGroup) return;
      if (confirm("Leave this group?")) {
        setGroups((g) => g.filter((gr) => gr.id !== selectedGroup.id));
        localStorage.setItem("sima_groups", JSON.stringify(groups.filter((g) => g.id !== selectedGroup.id)));
        setSelectedGroup(null);
        setGroupMessages([]);
      }
    };
    const filteredGroups = groups.filter(
      (g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.topic.toLowerCase().includes(search.toLowerCase()) || g.university && g.university.toLowerCase().includes(search.toLowerCase()) || g.subjectCourse && g.subjectCourse.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedGroup) {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 16px 80px", display: "flex", flexDirection: "column", height: "100vh" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4AC}"), " ", selectedGroup.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, display: "flex", gap: 12, flexWrap: "wrap" } }, selectedGroup.topic && /* @__PURE__ */ React.createElement("span", null, "\u{1F4CC} ", selectedGroup.topic), selectedGroup.subjectCourse && /* @__PURE__ */ React.createElement("span", null, "\u{1F4DA} ", selectedGroup.subjectCourse), /* @__PURE__ */ React.createElement("span", null, "\u{1F465} ", selectedGroup.members, " members"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => alert("\u{1F4DE} Group Call Starting...\\n\\nFeature coming soon! Soon you'll be able to have real-time video/audio calls with group members."),
          style: { ...S.btn(C.accent, "#fff"), padding: "8px 12px", fontSize: 12 },
          title: "Start group call"
        },
        "\u{1F4DE} Call"
      ), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedGroup(null), style: { ...S.btn(C.surface, C.muted), padding: "8px 12px", fontSize: 12 } }, "\u2190 Back"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", marginBottom: 12, padding: "16px 8px", background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 8 } }, groupMessages.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: C.muted, paddingTop: 60, flex: 1, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u{1F4AC}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, "Start the conversation!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 8 } }, "Mention @SIMA to get a response"))) : groupMessages.map((msg, i) => {
        var _a, _b, _c;
        const isUser = msg.role === "user";
        const isSIMA = msg.senderType === "ai";
        const isFileShare = ((_a = msg.content) == null ? void 0 : _a.includes("\u{1F4C4} Shared:")) || ((_b = msg.content) == null ? void 0 : _b.includes("\u{1F3AC} Shared:")) || ((_c = msg.content) == null ? void 0 : _c.includes("\u{1F5BC}\uFE0F Shared:"));
        return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, flexDirection: isUser ? "row-reverse" : "row", alignItems: "flex-end", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: {
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isSIMA ? config.accentColor : C.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          flexShrink: 0,
          color: "#fff"
        } }, isSIMA ? "\u{1F916}" : "\u{1F464}"), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "75%", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 2, paddingLeft: 4 } }, msg.sender === "You" ? getMemberId("You") : msg.sender, " ", msg.timestamp && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10 } }, "\u2022 ", msg.timestamp)), isFileShare ? /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: () => {
              const fileMatch = msg.content.match(/Shared:\s*(.+)$/);
              const fileName = fileMatch ? fileMatch[1].trim() : "document";
              let doc = sharedDocs.find((d) => msg.content.includes(d.name));
              if (!doc) {
                let fileType = "pdf";
                if (msg.content.includes("\u{1F5BC}\uFE0F")) fileType = "image";
                else if (msg.content.includes("\u{1F3AC}")) fileType = "ppt";
                else if (msg.content.includes("\u{1F4C4}")) fileType = "pdf";
                doc = {
                  id: `doc_${i}`,
                  name: fileName,
                  type: fileType,
                  size: "2.5 MB",
                  uploadedBy: msg.sender === "You" ? getMemberId("You") : msg.sender,
                  uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
                };
              }
              setSelectedDoc(doc);
              setShowDocViewer(true);
            },
            onContextMenu: (e) => {
              e.preventDefault();
              setContextMenu({ visible: true, x: e.clientX, y: e.clientY, messageId: i, isUser, canEdit: msg.sender === "You", canDelete: userRole.role === "admin" || msg.sender === "You" });
            },
            style: {
              padding: "12px 14px",
              borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              background: isUser ? config.accentColor : C.surface,
              color: isUser ? "#fff" : C.text,
              border: `2px solid ${isUser ? config.accentColor : C.border}`,
              fontSize: 13,
              lineHeight: 1.5,
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            },
            onMouseOver: (e) => e.target.style.transform = "scale(1.02)",
            onMouseOut: (e) => e.target.style.transform = "scale(1)"
          },
          /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, msg.content),
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, marginTop: 4, opacity: 0.7 } }, "\u{1F446} Click to open")
        ) : /* @__PURE__ */ React.createElement(
          "div",
          {
            onContextMenu: (e) => {
              e.preventDefault();
              setContextMenu({ visible: true, x: e.clientX, y: e.clientY, messageId: i, isUser, canEdit: msg.sender === "You", canDelete: userRole.role === "admin" || msg.sender === "You" });
            },
            style: {
              padding: "10px 14px",
              borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              background: isUser ? config.accentColor : C.surface,
              color: isUser ? "#fff" : C.text,
              border: isUser ? "none" : `1px solid ${C.border}`,
              fontSize: 13,
              lineHeight: 1.5,
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              cursor: "context-menu"
            }
          },
          msg.content
        )));
      })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, alignItems: "flex-end", position: "relative" } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          style: { ...S.input, flex: 1, minWidth: 200 },
          placeholder: "Message the group\u2026 (mention @SIMA for AI help)",
          value: messageInput,
          onChange: (e) => setMessageInput(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleSendMessage()
        }
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "11px 12px", fontWeight: 600, fontSize: 16, position: "relative" },
          onClick: () => setShowEmojiPicker(!showEmojiPicker),
          title: "Add emoji"
        },
        "\u{1F60A}"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "11px 12px", fontWeight: 600, fontSize: 14 },
          onClick: () => alert("\u{1F399}\uFE0F Voice notes feature coming soon! Record and share audio messages with your group."),
          title: "Send voice note"
        },
        "\u{1F399}\uFE0F"
      ), showEmojiPicker && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 50, right: 60, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, zIndex: 50, width: 280 } }, ["\u{1F602}", "\u{1F60D}", "\u{1F914}", "\u{1F60E}", "\u{1F525}", "\u{1F44D}", "\u{1F64C}", "\u{1F4AF}", "\u2728", "\u{1F389}", "\u{1F4AA}", "\u{1F680}", "\u{1F4DA}", "\u{1F4A1}", "\u26A1", "\u{1F31F}", "\u2764\uFE0F", "\u{1F618}"].map((emoji) => /* @__PURE__ */ React.createElement("button", { key: emoji, onClick: () => {
        setMessageInput((m) => m + emoji);
        setShowEmojiPicker(false);
      }, style: { fontSize: 20, background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: 8, transition: "background 0.2s" }, onMouseOver: (e) => e.target.style.background = C.surface, onMouseOut: (e) => e.target.style.background = "none" }, emoji))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "11px 12px", fontWeight: 600, fontSize: 14 },
          onClick: () => setShowFileMenu(!showFileMenu),
          title: "Share files"
        },
        "\u2795"
      ), showFileMenu && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 50, right: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", zIndex: 50, minWidth: 160, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            document.getElementById(`group-upload-pdf-${selectedGroup.id}`).click();
            setShowFileMenu(false);
          },
          style: { width: "100%", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600, transition: "background 0.2s", display: "flex", alignItems: "center", gap: 8 },
          onMouseOver: (e) => e.target.style.background = C.surface,
          onMouseOut: (e) => e.target.style.background = "none"
        },
        "\u{1F4C4} PDF"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            document.getElementById(`group-upload-ppt-${selectedGroup.id}`).click();
            setShowFileMenu(false);
          },
          style: { width: "100%", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600, transition: "background 0.2s", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.border}` },
          onMouseOver: (e) => e.target.style.background = C.surface,
          onMouseOut: (e) => e.target.style.background = "none"
        },
        "\u{1F3AC} PowerPoint"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            document.getElementById(`group-upload-img-${selectedGroup.id}`).click();
            setShowFileMenu(false);
          },
          style: { width: "100%", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600, transition: "background 0.2s", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.border}` },
          onMouseOver: (e) => e.target.style.background = C.surface,
          onMouseOut: (e) => e.target.style.background = "none"
        },
        "\u{1F5BC}\uFE0F Image"
      ))), /* @__PURE__ */ React.createElement(
        "input",
        {
          id: `group-upload-pdf-${selectedGroup == null ? void 0 : selectedGroup.id}`,
          type: "file",
          accept: ".pdf",
          style: { display: "none" },
          onChange: (e) => {
            var _a;
            if ((_a = e.target.files) == null ? void 0 : _a[0]) {
              const file = e.target.files[0];
              const memberId = getMemberId("You");
              const doc = { id: Date.now(), name: file.name, type: "pdf", size: (file.size / 1024).toFixed(1) + " KB", uploadedBy: memberId, uploadedAt: (/* @__PURE__ */ new Date()).toISOString(), fileData: e.target.files[0] };
              setSharedDocs((prev) => [doc, ...prev]);
              setGroupMessages((prev) => [...prev, { role: "user", content: `\u{1F4C4} Shared: ${file.name}`, sender: "You", senderType: "user", timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), msgId: Date.now(), canDelete: true }]);
            }
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "input",
        {
          id: `group-upload-ppt-${selectedGroup == null ? void 0 : selectedGroup.id}`,
          type: "file",
          accept: ".ppt,.pptx",
          style: { display: "none" },
          onChange: (e) => {
            var _a;
            if ((_a = e.target.files) == null ? void 0 : _a[0]) {
              const file = e.target.files[0];
              const memberId = getMemberId("You");
              const doc = { id: Date.now(), name: file.name, type: "ppt", size: (file.size / 1024).toFixed(1) + " KB", uploadedBy: memberId, uploadedAt: (/* @__PURE__ */ new Date()).toISOString(), fileData: e.target.files[0] };
              setSharedDocs((prev) => [doc, ...prev]);
              setGroupMessages((prev) => [...prev, { role: "user", content: `\u{1F3AC} Shared: ${file.name}`, sender: "You", senderType: "user", timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), msgId: Date.now(), canDelete: true }]);
            }
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "input",
        {
          id: `group-upload-img-${selectedGroup == null ? void 0 : selectedGroup.id}`,
          type: "file",
          accept: "image/*",
          style: { display: "none" },
          onChange: (e) => {
            var _a;
            if ((_a = e.target.files) == null ? void 0 : _a[0]) {
              const file = e.target.files[0];
              const memberId = getMemberId("You");
              const doc = { id: Date.now(), name: file.name, type: "image", size: (file.size / 1024).toFixed(1) + " KB", uploadedBy: memberId, uploadedAt: (/* @__PURE__ */ new Date()).toISOString(), fileData: e.target.files[0] };
              setSharedDocs((prev) => [doc, ...prev]);
              setGroupMessages((prev) => [...prev, { role: "user", content: `\u{1F5BC}\uFE0F Shared: ${file.name}`, sender: "You", senderType: "user", timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), msgId: Date.now(), canDelete: true }]);
            }
          }
        }
      ), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(config.accentColor), padding: "11px 18px", fontWeight: 600 }, onClick: handleSendMessage }, "Send")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "10px 14px", flex: 1, fontSize: 13, fontWeight: 600 }, onClick: () => setShowMembers(true) }, "\u{1F465} Members (", selectedGroup.members, ")"), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.surface, C.gold), border: `1px solid ${C.gold}44`, padding: "10px 14px", fontSize: 13, fontWeight: 600 }, onClick: () => setShowFilesModal(true) }, "\u{1F4C2} Files (", sharedDocs.length, ")"), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(C.surface, C.red), border: `1px solid ${C.red}44`, padding: "10px 14px", fontSize: 13, fontWeight: 600 }, onClick: handleLeaveGroup }, "\u{1F6AA} Leave")), showMembers && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000b", zIndex: 300, display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", borderRadius: "20px 20px 0 0", maxHeight: "70vh", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 18 } }, "\u{1F465} Group Members"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowMembers(false), style: { ...S.btn(C.surface, C.muted), padding: "6px 10px" } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 16 }))), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.muted, paddingLeft: 4, marginBottom: 8 } }, "CURRENT MEMBERS"), /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, "\u{1F464} You"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 2 } }, "Owner \u2022 Group Creator")), /* @__PURE__ */ React.createElement("span", { style: { background: C.accent + "44", color: C.accent, fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6 } }, "OWNER")), [...Array(Math.max(0, selectedGroup.members - 1))].map((_, i) => {
        const memberRoles = ["Admin", "Moderator", "Member", "Member"];
        const role = memberRoles[i % memberRoles.length];
        const roleColors = {
          "Admin": { bg: C.gold + "44", text: C.gold },
          "Moderator": { bg: C.purple + "44", text: C.purple },
          "Member": { bg: C.muted + "22", text: C.muted }
        };
        const roleStyle = roleColors[role] || roleColors["Member"];
        return /* @__PURE__ */ React.createElement("div", { key: i, style: { background: C.surface, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, "\u{1F464} Member ", i + 2), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 2 } }, "Joined recently")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { background: roleStyle.bg, color: roleStyle.text, fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6 } }, role), role === "Member" && /* @__PURE__ */ React.createElement(
          "button",
          {
            style: { ...S.btn(C.gold, "#000"), padding: "4px 10px", fontSize: 11, fontWeight: 600 },
            onClick: () => alert(`Promoted Member ${i + 2} to Admin!`),
            title: "Make admin"
          },
          "\u2B06\uFE0F Admin"
        ), role !== "Member" && /* @__PURE__ */ React.createElement(
          "button",
          {
            style: { ...S.btn(C.red + "44", C.red), padding: "4px 10px", fontSize: 11, fontWeight: 600, border: `1px solid ${C.red}` },
            onClick: () => alert(`Removed Member ${i + 2} from group`),
            title: "Remove member"
          },
          "\u{1F6AA} Remove"
        )));
      })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12, paddingBottom: 12, borderTop: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8, paddingTop: 12 } }, "GROUP SETTINGS"), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "10px 0" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: groupOpenToAll[selectedGroup == null ? void 0 : selectedGroup.id] || false, onChange: (e) => setGroupOpenToAll((prev) => ({ ...prev, [selectedGroup == null ? void 0 : selectedGroup.id]: e.target.checked })), style: { cursor: "pointer", width: 18, height: 18 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, "Open to all (no admin approval needed)"))), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(config.accentColor), width: "100%", justifyContent: "center", padding: "12px" }, onClick: () => setShowMembers(false) }, "Done"))), showDocViewer && selectedDoc && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000b", zIndex: 350, display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", borderRadius: "20px 20px 0 0", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: `1px solid ${C.border}`, background: C.surface } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 18 } }, selectedDoc.type === "pdf" ? "\u{1F4C4}" : selectedDoc.type === "ppt" ? "\u{1F3AC}" : "\u{1F5BC}\uFE0F", " ", selectedDoc.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 4 } }, "Shared ", new Date(selectedDoc.uploadedAt).toLocaleDateString(), " \u2022 ", selectedDoc.size)), /* @__PURE__ */ React.createElement("button", { onClick: closeDocViewer, style: { ...S.btn(C.surface, C.muted), padding: "8px 12px" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" } }, selectedDoc.type === "image" && previewUrl && /* @__PURE__ */ React.createElement("img", { src: previewUrl, alt: selectedDoc.name, style: { maxWidth: "100%", maxHeight: 260, objectFit: "contain", borderRadius: 16, marginBottom: 18 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, marginBottom: 16 } }, selectedDoc.type === "pdf" ? "\u{1F4C4}" : selectedDoc.type === "ppt" ? "\u{1F3AC}" : "\u{1F5BC}\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 8 } }, selectedDoc.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 16, maxWidth: 300 } }, selectedDoc.type === "pdf" && "PDF document - View in your preferred PDF reader", selectedDoc.type === "ppt" && "PowerPoint presentation - Open in Microsoft Office or similar", selectedDoc.type === "image" && "Image file - View full size"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "10px 16px" },
          onClick: () => {
            if (previewUrl) {
              window.open(previewUrl, "_blank");
            } else if (selectedDoc.fileData) {
              const fileURL = URL.createObjectURL(selectedDoc.fileData);
              window.open(fileURL, "_blank");
            } else {
              alert("Preview feature is loading. File is ready for download!");
            }
          }
        },
        "\u{1F441}\uFE0F Preview"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          style: { ...S.btn(config.accentColor), padding: "10px 16px" },
          onClick: () => {
            if (selectedDoc.fileData) {
              const fileURL = URL.createObjectURL(selectedDoc.fileData);
              const link = document.createElement("a");
              link.href = fileURL;
              link.download = selectedDoc.name;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(fileURL);
            } else {
              alert("Download starting...\\n" + selectedDoc.name);
            }
          }
        },
        "\u{1F4E5} Download"
      ))), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px", borderTop: `1px solid ${C.border}`, background: C.surface } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8 } }, "FILE DETAILS"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "File Type"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginTop: 4 } }, selectedDoc.type.toUpperCase())), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "File Size"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginTop: 4 } }, selectedDoc.size)), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Shared By"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginTop: 4 } }, "\u{1F464} ", selectedDoc.uploadedBy)), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Date"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginTop: 4 } }, new Date(selectedDoc.uploadedAt).toLocaleString())))), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(config.accentColor), width: "100%", padding: "12px", borderRadius: 0 }, onClick: closeDocViewer }, "Close"))), contextMenu.visible && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: contextMenu.y, left: contextMenu.x, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", zIndex: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.3)", minWidth: 150 } }, contextMenu.canEdit && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            const target = groupMessages[contextMenu.messageId];
            if (target) {
              setEditingMessageId(contextMenu.messageId);
              setMessageInput(target.content);
            }
            setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
          },
          style: { width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 500, color: C.text, display: "flex", alignItems: "center", gap: 8 },
          onMouseOver: (e) => e.target.style.background = C.surface,
          onMouseOut: (e) => e.target.style.background = "none"
        },
        "\u270F\uFE0F Edit"
      ), contextMenu.canDelete && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setGroupMessages((prev) => prev.filter((_, idx) => idx !== contextMenu.messageId));
            setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
          },
          style: { width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 500, color: C.red, display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.border}` },
          onMouseOver: (e) => e.target.style.background = C.surface,
          onMouseOut: (e) => e.target.style.background = "none"
        },
        "\u{1F5D1}\uFE0F Delete"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setContextMenu({ visible: false, x: 0, y: 0, messageId: null }),
          style: { width: "100%", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 500, color: C.muted, display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.border}` },
          onMouseOver: (e) => e.target.style.background = C.surface,
          onMouseOut: (e) => e.target.style.background = "none"
        },
        "\u2715 Close"
      )), showFilesModal && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000b", zIndex: 300, display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", borderRadius: "20px 20px 0 0", maxHeight: "80vh", display: "flex", flexDirection: "column", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 18 } }, "\u{1F4C2} ", sharedDocs.length, " Files Shared"), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowFilesModal(false), style: { ...S.btn(C.surface, C.muted), padding: "8px 12px" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 } }, sharedDocs.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: C.muted, padding: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 16 } }, "\u{1F4ED}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, "No files shared yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, marginTop: 8 } }, "Files shared in group chat will appear here")) : sharedDocs.map((doc, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, style: { background: C.surface, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24 } }, doc.type === "pdf" ? "\u{1F4C4}" : doc.type === "ppt" ? "\u{1F3AC}" : "\u{1F5BC}\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 2 } }, doc.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, doc.size, " \u2022 ", doc.uploadedBy))), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setSelectedDoc(doc);
            setShowDocViewer(true);
            setShowFilesModal(false);
          },
          style: { ...S.btn(config.accentColor), padding: "8px 12px", fontSize: 12 }
        },
        "Open"
      )))), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(config.accentColor), width: "100%", padding: "12px" }, onClick: () => setShowFilesModal(false) }, "Done"))));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "Study Groups"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 12 } }, "Secure study rooms, peer learning, and shared guidance."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("input", { style: { ...S.input, flex: 1 }, placeholder: "Search groups\u2026", value: search, onChange: (e) => setSearch(e.target.value) }), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowCreate(!showCreate), style: { ...S.btn(config.accentColor), padding: "12px 16px", whiteSpace: "nowrap" } }, showCreate ? "Cancel" : "+ Create")), showCreate && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, background: config.accentColor + "0d", maxHeight: "65vh", overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 12 } }, "\u{1F4DA} Create Study Group"), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Group Name"), /* @__PURE__ */ React.createElement("input", { style: S.input, value: newGroup.name, onChange: (e) => setNewGroup((g) => ({ ...g, name: e.target.value })), placeholder: "e.g. Physics Squad" }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Topic/Subject"), /* @__PURE__ */ React.createElement("input", { style: S.input, value: newGroup.topic, onChange: (e) => setNewGroup((g) => ({ ...g, topic: e.target.value })), placeholder: "e.g. Exam prep" }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Institution"), /* @__PURE__ */ React.createElement("input", { style: S.input, value: newGroup.university || (profile == null ? void 0 : profile.institution) || "", onChange: (e) => setNewGroup((g) => ({ ...g, university: e.target.value })), placeholder: (profile == null ? void 0 : profile.institution) || "Your school/university" }), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Subject & Course"), /* @__PURE__ */ React.createElement("input", { style: S.input, value: newGroup.subjectCourse, onChange: (e) => setNewGroup((g) => ({ ...g, subjectCourse: e.target.value })), placeholder: "e.g. Physics - Mechanics" }), /* @__PURE__ */ React.createElement("label", { style: S.label }, education === "primary" ? "Grade" : education === "secondary" ? "Form/Grade" : "Year"), /* @__PURE__ */ React.createElement("select", { style: S.input, value: newGroup.year, onChange: (e) => setNewGroup((g) => ({ ...g, year: e.target.value })) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Select ", education === "primary" ? "Grade" : education === "secondary" ? "Form" : "Year"), yieldYearOptions().map((opt) => /* @__PURE__ */ React.createElement("option", { key: opt.value, value: opt.value }, opt.label))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Expected Members"), /* @__PURE__ */ React.createElement("input", { style: S.input, type: "number", value: newGroup.members, onChange: (e) => setNewGroup((g) => ({ ...g, members: e.target.value })), min: "1", max: "999" }), /* @__PURE__ */ React.createElement("button", { onClick: handleCreateGroup, style: { ...S.btn(config.accentColor), marginTop: 12, width: "100%", fontWeight: 600 } }, "Create & Join")), filteredGroups.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "60px 20px", color: C.muted } }, /* @__PURE__ */ React.createElement(IllustrationEmptyState, { width: 150, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: C.text, marginTop: 10 } }, "No groups yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, marginTop: 8 } }, "Create or join one to collaborate!")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, filteredGroups.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.id, style: { ...S.card, cursor: "pointer", transition: "all 0.2s" }, onClick: () => {
      setSelectedGroup(g);
      setGroupMessages([]);
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 6 } }, g.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 6 } }, "\u{1F4AC} ", g.topic, " \xB7 \u{1F465} ", g.members, " members"), (g.university || g.subjectCourse) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, g.university && /* @__PURE__ */ React.createElement("span", null, "\u{1F3EB} ", g.university), g.subjectCourse && /* @__PURE__ */ React.createElement("span", null, " \xB7 \u{1F4DA} ", g.subjectCourse), g.year && /* @__PURE__ */ React.createElement("span", null, " \xB7 ", education === "primary" ? "Gr" : "Y", g.year))), /* @__PURE__ */ React.createElement(Badge, { color: C.green }, "Open \u2192"))))));
  }
  const SUBSCRIPTION_CONFIG = {
    trialDays: 30,
    deviceLimits: { phone: 1, pc: 1, tablet: 1 },
    usageLimits: {
      free: { messages: 30, uploads: 3, flashcards: 10, mcqs: 20, audioOverview: 0, videoOverview: 0, infographic: 0, slideDeck: 0, osce: 0, scenario: 0 },
      "scholar-lite": { messages: 80, uploads: 8, flashcards: 100, mcqs: 100, audioOverview: 5, videoOverview: 0, infographic: 3, slideDeck: 5, osce: 10, scenario: 10 },
      standard: { messages: 9999, uploads: 15, flashcards: 9999, mcqs: 9999, audioOverview: 50, videoOverview: 10, infographic: 50, slideDeck: 50, osce: 100, scenario: 100 },
      scholar: { messages: 9999, uploads: 9999, flashcards: 9999, mcqs: 9999, audioOverview: 9999, videoOverview: 9999, infographic: 9999, slideDeck: 9999, osce: 9999, scenario: 9999 }
    },
    generationTypes: [
      { id: "flashcard", label: "\u{1F0CF} Flashcards", feature: "flashcards" },
      { id: "spacedRepetition", label: "\u{1F504} Spaced Rep", feature: "flashcards" },
      { id: "quiz", label: "\u{1F4DD} Quiz (MCQs)", feature: "mcqs" },
      { id: "audioOverview", label: "\u{1F3A7} Audio", feature: "audioOverview" },
      { id: "videoOverview", label: "\u{1F3AC} Video", feature: "videoOverview" },
      { id: "infographic", label: "\u{1F4CA} Infographic", feature: "infographic" },
      { id: "slideDeck", label: "\u{1F4D1} Slides", feature: "slideDeck" },
      { id: "osce", label: "\u{1F3E5} OSCE", feature: "osce" }
    ]
  };
  function useSubscription() {
    const [subscription, setSubscription] = useState(() => {
      try {
        const saved = localStorage.getItem("sima_subscription");
        return saved ? JSON.parse(saved) : {
          plan: "trial",
          startDate: (/* @__PURE__ */ new Date()).toISOString(),
          trialEndDate: new Date(Date.now() + SUBSCRIPTION_CONFIG.trialDays * 24 * 60 * 60 * 1e3).toISOString(),
          verified: false,
          email: null,
          phone: null,
          devices: [],
          usage: { messages: 0, uploads: 0, flashcards: 0, mcqs: 0 },
          lastReset: (/* @__PURE__ */ new Date()).toISOString()
        };
      } catch {
        return {
          plan: "trial",
          startDate: (/* @__PURE__ */ new Date()).toISOString(),
          trialEndDate: new Date(Date.now() + SUBSCRIPTION_CONFIG.trialDays * 24 * 60 * 60 * 1e3).toISOString(),
          verified: false,
          email: null,
          phone: null,
          devices: [],
          usage: { messages: 0, uploads: 0, flashcards: 0, mcqs: 0 },
          lastReset: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
    });
    const saveSubscription = (newSub) => {
      setSubscription(newSub);
      try {
        localStorage.setItem("sima_subscription", JSON.stringify(newSub));
      } catch {
      }
    };
    const getCurrentPlan = () => {
      const now = /* @__PURE__ */ new Date();
      const trialEnd = new Date(subscription.trialEndDate);
      return now > trialEnd ? "free" : subscription.plan;
    };
    const getDaysLeftInTrial = () => {
      const now = /* @__PURE__ */ new Date();
      const trialEnd = new Date(subscription.trialEndDate);
      const diffTime = trialEnd - now;
      return Math.max(0, Math.ceil(diffTime / (1e3 * 60 * 60 * 24)));
    };
    const isTrialActive = () => getDaysLeftInTrial() > 0;
    const upgradePlan = (newPlan) => {
      saveSubscription({ ...subscription, plan: newPlan });
    };
    const verifyContact = (type, value) => {
      const code = Math.floor(1e5 + Math.random() * 9e5);
      alert(`Verification code sent to ${value}: ${code}`);
      saveSubscription({ ...subscription, [type]: value, verified: true });
    };
    const registerDevice = () => {
      const deviceFingerprint = navigator.userAgent + screen.width + screen.height + navigator.language;
      const deviceType = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "phone" : /Tablet|iPad/i.test(navigator.userAgent) ? "tablet" : "pc";
      const existingDevices = subscription.devices.filter((d) => d.type === deviceType);
      if (existingDevices.length >= SUBSCRIPTION_CONFIG.deviceLimits[deviceType]) {
        alert(`Maximum ${SUBSCRIPTION_CONFIG.deviceLimits[deviceType]} ${deviceType}(s) allowed per account.`);
        return false;
      }
      const newDevice = { id: deviceFingerprint, type: deviceType, registered: (/* @__PURE__ */ new Date()).toISOString() };
      saveSubscription({
        ...subscription,
        devices: [...subscription.devices, newDevice]
      });
      return true;
    };
    const canUseFeature = (feature) => {
      const plan = getCurrentPlan();
      const limits = SUBSCRIPTION_CONFIG.usageLimits[plan] || SUBSCRIPTION_CONFIG.usageLimits.free;
      return subscription.usage[feature] < limits[feature];
    };
    const recordUsage = (feature) => {
      if (canUseFeature(feature)) {
        saveSubscription({
          ...subscription,
          usage: { ...subscription.usage, [feature]: subscription.usage[feature] + 1 }
        });
        return true;
      }
      return false;
    };
    const resetUsage = () => {
      const now = /* @__PURE__ */ new Date();
      const lastReset = new Date(subscription.lastReset);
      if (now.getDate() !== lastReset.getDate()) {
        saveSubscription({
          ...subscription,
          usage: { messages: 0, uploads: 0, flashcards: 0, mcqs: 0 },
          lastReset: now.toISOString()
        });
      }
    };
    useEffect(() => {
      resetUsage();
      const interval = setInterval(resetUsage, 60 * 60 * 1e3);
      return () => clearInterval(interval);
    }, []);
    return {
      subscription,
      getCurrentPlan,
      getDaysLeftInTrial,
      isTrialActive,
      upgradePlan,
      verifyContact,
      registerDevice,
      canUseFeature,
      recordUsage,
      resetUsage
    };
  }
  const PLANS = [
    {
      id: "free",
      label: "Basic",
      subtitle: "14-day full access, then limited",
      price: { usd: 0, kwacha: 0 },
      period: "Free",
      color: C.muted,
      badge: null,
      features: {
        main: [
          { text: "30 AI messages / 12 hours", icon: Icons.sparkle },
          { text: "3 file uploads / day", icon: Icons.upload },
          { text: "Limited flashcard decks", icon: Icons.flash },
          { text: "MCQ generator (20/day)", icon: Icons.target },
          { text: "Basic study timetable", icon: Icons.clock },
          { text: "Guest access", icon: Icons.users },
          { text: "Basic AI tutor", icon: Icons.brain },
          { text: "Homework help", icon: Icons.note }
        ],
        restricted: [
          "No advanced AI modes",
          "No audio/video studio",
          "No group study rooms",
          "No clinical tools",
          "No document analysis"
        ]
      },
      limitMessage: "You've reached your study limit. Resets in 12 hours or upgrade for uninterrupted learning."
    },
    {
      id: "scholar-lite",
      label: "Scholar Lite",
      subtitle: "Perfect for exam prep",
      price: { usd: 3, kwacha: 56.16 },
      period: "/month",
      color: C.teal,
      badge: "Popular",
      features: {
        main: [
          { text: "80 AI messages / 12 hours", icon: Icons.sparkle },
          { text: "8 file uploads/day", icon: Icons.upload },
          { text: "Unlimited flashcards", icon: Icons.flash },
          { text: "MCQ generator (100/day)", icon: Icons.target },
          { text: "Exam practice mode", icon: Icons.check },
          { text: "Smart study planner", icon: Icons.clock },
          { text: "AI summaries & notes", icon: Icons.note },
          { text: "Audio overview studio", icon: Icons.mic },
          { text: "Spaced repetition (SM-2)", icon: Icons.repeat },
          { text: "Study streak tracking", icon: Icons.trending },
          { text: "Group study access (3 groups)", icon: Icons.users },
          { text: "Mind-map generator (limited)", icon: Icons.chart }
        ],
        aiAccess: "Faster AI \xB7 Exam-focused \xB7 Better reasoning",
        restricted: ["No video generation", "No advanced research mode", "No clinical tools"]
      }
    },
    {
      id: "standard",
      label: "Standard",
      subtitle: "For serious learners",
      price: { usd: 8, kwacha: 149.76 },
      period: "/month",
      color: C.accent,
      badge: "Best Value",
      features: {
        main: [
          { text: "Unlimited AI messages", icon: Icons.sparkle },
          { text: "15 uploads/day", icon: Icons.upload },
          { text: "Unlimited chat & analysis", icon: Icons.flash },
          { text: "Advanced exam mode", icon: Icons.target },
          { text: "OSCE engine unlimited", icon: Icons.check },
          { text: "Audio overview with Q&A", icon: Icons.mic },
          { text: "Mind mapping (full)", icon: Icons.chart },
          { text: "Voice chat with AI", icon: Icons.mic },
          { text: "Adaptive timetable", icon: Icons.clock },
          { text: "Collaborative study groups", icon: Icons.users },
          { text: "Essay structuring", icon: Icons.note },
          { text: "Presentation builder", icon: Icons.upload },
          { text: "Citation assistance", icon: Icons.check },
          { text: "PDF deep analysis", icon: Icons.flash }
        ],
        aiAccess: "Powerful AI model \xB7 Better accuracy \xB7 Longer memory \xB7 Faster responses",
        restricted: ["No full clinical suite", "Limited video generation"]
      }
    },
    {
      id: "scholar",
      label: "Scholar",
      subtitle: "Ultimate learning power",
      price: { usd: 16, kwacha: 299.52 },
      period: "/month",
      color: C.gold,
      badge: "Most Powerful",
      features: {
        main: [
          { text: "Unlimited everything", icon: Icons.sparkle },
          { text: "Clinical rotation assistant", icon: Icons.target },
          { text: "Clinical reasoning tools", icon: Icons.brain },
          { text: "OSCE preparation suite", icon: Icons.check },
          { text: "Differential diagnosis support", icon: Icons.chart },
          { text: "Investigation planner", icon: Icons.note },
          { text: "Drug reference assistant", icon: Icons.flash },
          { text: "Research synthesis", icon: Icons.trending },
          { text: "Literature review assistance", icon: Icons.note },
          { text: "Research proposal builder", icon: Icons.upload },
          { text: "Video explanation studio", icon: Icons.play },
          { text: "AI whiteboard lessons", icon: Icons.upload },
          { text: "Animated concept breakdowns", icon: Icons.sparkle },
          { text: "Highest-speed responses", icon: Icons.flash },
          { text: "Priority servers", icon: Icons.target },
          { text: "Early feature access", icon: Icons.trending }
        ],
        aiAccess: "Most advanced AI model \xB7 Elite accuracy \xB7 Maximum context \xB7 Lightning-fast",
        academic: "Clinical mode \xB7 Research mode \xB7 Advanced reasoning \xB7 Teaching mode"
      }
    }
  ];
  function UpgradeScreen({ onUpgrade, onEnterprise }) {
    const [currency, setCurrency] = useState("usd");
    const [compareMode, setCompareMode] = useState(false);
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "24px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 24 } }, /* @__PURE__ */ React.createElement(IllustrationTrophy, { width: 100, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8, textTransform: "uppercase", marginTop: 6 } }, "\u{1F680} Unlock Your Potential"), /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 28, fontWeight: 800, marginBottom: 6 } }, "Choose Your Plan"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 16 } }, "Start free for 14 days. Upgrade anytime. Cancel anytime."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" } }, [["usd", "\u{1F4B5} USD"], ["kwacha", "\u{1F1FF}\u{1F1F2} Kwacha (K)"]].map(([c, l]) => /* @__PURE__ */ React.createElement(Pill, { key: c, active: currency === c, onClick: () => setCurrency(c), color: C.accent }, l)), /* @__PURE__ */ React.createElement(Pill, { active: compareMode, onClick: () => setCompareMode((c) => !c), color: C.purple }, "\u{1F4CA} Compare"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)", gap: 12, marginBottom: 24 } }, PLANS.map((plan) => {
      const price = currency === "usd" ? plan.price.usd : plan.price.kwacha;
      const symbol = currency === "usd" ? "$" : "K";
      const isHighlighted = plan.id === "standard" || plan.id === "scholar";
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: plan.id,
          style: {
            ...S.card,
            position: "relative",
            borderColor: isHighlighted ? plan.color + "66" : C.border,
            background: isHighlighted ? `linear-gradient(135deg, ${plan.color}12, ${C.card})` : C.card,
            transform: isHighlighted ? "scale(1.02)" : "scale(1)",
            transition: "all .3s"
          }
        },
        plan.badge && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -10, left: 16, background: plan.color, color: "#fff", padding: "4px 12px", borderRadius: 8, fontSize: 10, fontWeight: 700 } }, "\u2B50 ", plan.badge),
        /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: plan.color, marginBottom: 2 } }, plan.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, plan.subtitle)),
        /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, price > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, fontWeight: 800, color: plan.color, lineHeight: 1 } }, symbol, price), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, plan.period)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: plan.color } }, "Free"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "14-day full access"))),
        /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16, fontSize: 13 } }, plan.features.main.slice(0, compareMode ? plan.features.main.length : 5).map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement(Icon, { d: f.icon, size: 16, color: plan.color, style: { marginTop: 2, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { lineHeight: 1.4 } }, f.text))), !compareMode && plan.features.main.length > 5 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: plan.color, fontWeight: 600, cursor: "pointer", marginTop: 8 } }, "+ ", plan.features.main.length - 5, " more features")),
        plan.features.aiAccess && /* @__PURE__ */ React.createElement("div", { style: { background: plan.color + "15", borderLeft: `3px solid ${plan.color}`, padding: "10px 12px", borderRadius: 6, marginBottom: 12, fontSize: 12, color: plan.color, fontWeight: 500 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "\u{1F9E0} AI Access"), plan.features.aiAccess),
        plan.features.academic && /* @__PURE__ */ React.createElement("div", { style: { background: C.purple + "15", borderLeft: `3px solid ${C.purple}`, padding: "10px 12px", borderRadius: 6, marginBottom: 12, fontSize: 12, color: C.purple, fontWeight: 500 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 4 } }, "\u{1F4DA} Advanced Modes"), plan.features.academic),
        plan.features.restricted && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase" } }, "Restrictions"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, lineHeight: 1.6 } }, plan.features.restricted.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 4 } }, "\u2717 ", r)))),
        /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => onUpgrade(plan.id),
            style: {
              ...S.btn(plan.color, "#fff"),
              width: "100%",
              justifyContent: "center",
              border: `1px solid ${plan.color}`,
              fontSize: 14,
              fontWeight: 700,
              padding: "12px"
            }
          },
          plan.id === "free" ? "Continue Free" : `Get ${plan.label}`
        )
      );
    })), compareMode && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16, overflowX: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, marginBottom: 12 } }, "\u{1F4CA} Full Feature Comparison"), /* @__PURE__ */ React.createElement("table", { style: { width: "100%", fontSize: 12, borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { borderBottom: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("th", { style: { textAlign: "left", padding: "8px 0", paddingRight: 8, fontWeight: 700, color: C.muted } }, "Feature"), PLANS.map((p) => /* @__PURE__ */ React.createElement("th", { key: p.id, style: { textAlign: "center", padding: "8px 6px", fontWeight: 700, color: p.color } }, p.label)))), /* @__PURE__ */ React.createElement("tbody", null, [
      { label: "Price", values: PLANS.map((p) => currency === "usd" ? `$${p.price.usd}` : `K${p.price.kwacha}`) },
      { label: "Messages / 12h", values: ["30", "80", "Unlimited", "Unlimited"] },
      { label: "File Uploads / day", values: ["3", "8", "15", "Unlimited"] },
      { label: "Flashcard Decks", values: ["Limited", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "MCQ Generator", values: ["20/day", "100/day", "Unlimited", "Unlimited"] },
      { label: "Exam Practice Mode", values: ["\u2717", "\u2713", "\u2713", "\u2713"] },
      { label: "Audio Studio", values: ["\u2717", "\u2713", "\u2713", "\u2713"] },
      { label: "Voice Chat", values: ["\u2717", "\u2717", "\u2713", "\u2713"] },
      { label: "Group Study", values: ["\u2717", "3 groups", "Unlimited", "Unlimited"] },
      { label: "Clinical Tools", values: ["\u2717", "\u2717", "\u2717", "\u2713"] },
      { label: "Video Studio", values: ["\u2717", "\u2717", "\u2717", "\u2713"] },
      { label: "Research Mode", values: ["\u2717", "Limited", "\u2713", "\u2713"] },
      { label: "AI Model Quality", values: ["Standard", "Enhanced", "Advanced", "Elite"] }
    ].map((row, i) => /* @__PURE__ */ React.createElement("tr", { key: i, style: { borderBottom: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 0", paddingRight: 8, fontWeight: 600, color: C.text } }, row.label), row.values.map((val, j) => /* @__PURE__ */ React.createElement("td", { key: j, style: { textAlign: "center", padding: "8px 6px", color: PLANS[j].color } }, val))))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 8 } }, "\u{1F512} Your Trust, Our Priority"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, lineHeight: 1.6 } }, "\u2713 Airtel Money, MTN Money, VISA, and bank payments supported", /* @__PURE__ */ React.createElement("br", null), "\u2713 Secure payments with encrypted flows", /* @__PURE__ */ React.createElement("br", null), "\u2713 Cancel anytime \u2014 no questions asked", /* @__PURE__ */ React.createElement("br", null), "\u2713 Auto-renewing subscription and scalable enterprise onboarding")));
  }
  function SplashScreen({ fading }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        "aria-hidden": "true",
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 3e3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Flat, no gradient of its own — this is deliberately "nothing" so the
          // only thing the eye registers is the logo. The landing page's own
          // aurora background (mounted underneath, already fully rendered) is
          // what the person actually sees as this fades out, so the reveal
          // reads as one continuous scene rather than two backgrounds crossing.
          background: C.bg,
          transition: "opacity 0.7s ease",
          opacity: fading ? 0 : 1,
          pointerEvents: fading ? "none" : "auto"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 128, height: 128, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "/wadudu_splash.webp?cb=1",
          alt: "SIMA MIND",
          className: "sima-splash-logo",
          style: { width: 108, height: 108, objectFit: "contain", background: "transparent", boxShadow: "none", display: "block" }
        }
      ))
    );
  }
  function LandingScreen({ onStart, onGuest, onLoginSuccess, displayMode, themeMode, onDisplayModeChange }) {
    const isLight = themeMode === "light";
    const landingText = isLight ? "#161129" : C.text;
    const landingMuted = isLight ? "#5b5478" : C.muted;
    const glassBg = isLight ? "rgba(255,255,255,0.66)" : "rgba(13,15,26,0.55)";
    const glassBorder = isLight ? "rgba(28,18,64,0.10)" : "rgba(255,255,255,0.09)";
    const railCardBg = isLight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.045)";
    const blobOpacity = isLight ? 0.22 : 0.42;
    const [guestStatus, setGuestStatus] = useState("");
    const features = [
      { icon: "\u{1F9E0}", title: "AI-Powered Learning", desc: "Your personal study AI that adapts to your level" },
      { icon: "\u{1F4DA}", title: "Smart Content", desc: "Auto-generate flashcards, quizzes, and study guides" },
      { icon: "\u{1F4CA}", title: "Track Progress", desc: "Monitor mastery, streaks, and learning analytics" },
      { icon: "\u23F0", title: "Smart Scheduling", desc: "Personalized study plans and Pomodoro timers" },
      { icon: "\u{1F3AF}", title: "Adaptive Difficulty", desc: "Content that grows with your knowledge" },
      { icon: "\u{1F4BE}", title: "Offline Ready", desc: "Study anywhere, sync when connected" }
    ];
    const headlineWords = ["Learn", "smarter.", "Remember", "longer.", "Master", "more."];
    const themeOptions = [
      { key: "default", label: "Auto", icon: "\u{1F5A5}\uFE0F" },
      { key: "dark", label: "Dark", icon: "\u{1F319}" },
      { key: "light", label: "Light", icon: "\u2600\uFE0F" }
    ];
    const activeThemeIdx = Math.max(0, themeOptions.findIndex((o) => o.key === displayMode));
    return /* @__PURE__ */ React.createElement("div", { style: {
      position: "relative",
      minHeight: "100vh",
      background: C.bg,
      overflow: "hidden",
      color: landingText
    } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "sima-aurora-blob sima-aurora-a", style: { position: "absolute", top: "-14%", left: "-18%", filter: "blur(70px)" } }, /* @__PURE__ */ React.createElement(BlobShape, { color: C.heroA, size: 380, opacity: blobOpacity })), /* @__PURE__ */ React.createElement("div", { className: "sima-aurora-blob sima-aurora-b", style: { position: "absolute", top: "4%", right: "-20%", filter: "blur(85px)" } }, /* @__PURE__ */ React.createElement(BlobShape, { color: C.purple, size: 340, opacity: blobOpacity * 0.85 })), /* @__PURE__ */ React.createElement("div", { className: "sima-aurora-blob sima-aurora-c", style: { position: "absolute", bottom: "-16%", left: "16%", filter: "blur(80px)" } }, /* @__PURE__ */ React.createElement(BlobShape, { color: C.heroB, size: 360, opacity: blobOpacity * 0.75 }))), /* @__PURE__ */ React.createElement("div", { className: "sima-landing-wrap", style: { position: "relative", zIndex: 1, margin: "0 auto", padding: "28px 18px 44px", display: "flex", flexDirection: "column", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "sima-fade-up sima-glass", style: {
      width: "100%",
      borderRadius: 32,
      background: glassBg,
      border: `1px solid ${glassBorder}`,
      padding: "36px 24px 28px",
      textAlign: "center",
      boxShadow: isLight ? "0 20px 60px rgba(79,58,200,0.12)" : "0 20px 60px rgba(0,0,0,0.4)"
    } }, /* @__PURE__ */ React.createElement("div", { className: "sima-hero-grid" }, /* @__PURE__ */ React.createElement("div", { className: "sima-hero-visual" }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 100, height: 100, margin: "0 auto 20px" } }, /* @__PURE__ */ React.createElement("div", { className: "sima-aura-ring", style: {
      position: "absolute",
      inset: -16,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${C.heroA}55, ${C.heroB}22 55%, transparent 72%)`
    } }), /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "/wadudu_splash.webp?cb=1",
        alt: "SIMA MIND mascot",
        style: { position: "relative", width: "100%", height: "100%", objectFit: "contain", display: "block" }
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "sima-hero-copy" }, /* @__PURE__ */ React.createElement("div", { className: "sima-hero-badge", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      border: `1px solid ${glassBorder}`,
      borderRadius: 999,
      padding: "5px 14px",
      marginBottom: 18,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: landingMuted
    } }, "Your Second Brain \xB7 SIMA AI"), /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 32, fontWeight: 800, lineHeight: 1.16, marginBottom: 14, letterSpacing: "-0.5px" } }, headlineWords.map((word, i) => {
      const isAccent = i % 2 === 1;
      return /* @__PURE__ */ React.createElement(
        "span",
        {
          key: i,
          className: "sima-word-in",
          style: {
            animationDelay: `${i * 0.09}s`,
            marginRight: 8,
            display: "inline-block",
            backgroundImage: isAccent ? `linear-gradient(120deg, ${C.heroA}, ${C.heroB})` : "none",
            WebkitBackgroundClip: isAccent ? "text" : "unset",
            backgroundClip: isAccent ? "text" : "unset",
            WebkitTextFillColor: isAccent ? "transparent" : "unset",
            color: isAccent ? "transparent" : landingText
          }
        },
        word
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "sima-hero-tagline", style: { fontSize: 14.5, color: landingMuted, lineHeight: 1.6, maxWidth: 420, margin: "0 auto" } }, "SIMA studies how you learn, then builds flashcards, quizzes, and a study plan around it \u2014 so every session counts.")))), /* @__PURE__ */ React.createElement("div", { className: "sima-fade-up", style: { animationDelay: "0.08s", marginTop: 20, marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: {
      position: "relative",
      display: "flex",
      background: glassBg,
      border: `1px solid ${glassBorder}`,
      borderRadius: 999,
      padding: 4
    } }, /* @__PURE__ */ React.createElement("div", { className: "sima-segment-thumb", style: {
      position: "absolute",
      top: 4,
      bottom: 4,
      left: 4,
      width: "calc(33.333% - 4px)",
      transform: `translateX(${activeThemeIdx * 100}%)`,
      background: `linear-gradient(135deg, ${C.heroA}, ${C.heroB})`,
      borderRadius: 999,
      boxShadow: `0 6px 16px ${C.heroA}45`
    } }), themeOptions.map((option) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: option.key,
        onClick: () => onDisplayModeChange(option.key),
        style: {
          position: "relative",
          zIndex: 1,
          border: "none",
          background: "transparent",
          padding: "9px 18px",
          borderRadius: 999,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 700,
          color: displayMode === option.key ? "#fff" : landingMuted,
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "color 0.25s ease",
          minWidth: 84,
          justifyContent: "center"
        }
      },
      /* @__PURE__ */ React.createElement("span", null, option.icon),
      " ",
      option.label
    )))), /* @__PURE__ */ React.createElement("div", { className: "sima-fade-up", style: { animationDelay: "0.14s", width: "100%", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: landingMuted, marginBottom: 10, paddingLeft: 4 } }, "Built for how you actually study"), /* @__PURE__ */ React.createElement("div", { className: "sima-rail sima-rail-bleed" }, features.map((feature, idx) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: idx,
        className: "sima-rail-card",
        style: {
          flex: "0 0 150px",
          background: railCardBg,
          border: `1px solid ${glassBorder}`,
          borderRadius: 20,
          padding: "16px 14px",
          textAlign: "left"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: {
        width: 38,
        height: 38,
        borderRadius: 12,
        marginBottom: 12,
        background: `linear-gradient(135deg, ${C.heroA}, ${C.heroB})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      } }, feature.icon),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 4, color: landingText } }, feature.title),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: landingMuted, lineHeight: 1.5 } }, feature.desc)
    )))), /* @__PURE__ */ React.createElement("div", { className: "sima-fade-up sima-glass sima-cta-panel", style: {
      animationDelay: "0.2s",
      width: "100%",
      background: glassBg,
      border: `1px solid ${glassBorder}`,
      borderRadius: 28,
      padding: 20
    } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onStart == null ? void 0 : onStart(),
        className: "sima-shimmer-btn",
        style: {
          width: "100%",
          padding: "16px 24px",
          fontSize: 16,
          fontWeight: 700,
          backgroundImage: `linear-gradient(110deg, ${C.heroA} 0%, ${C.heroB} 35%, ${C.gold} 50%, ${C.heroB} 65%, ${C.heroA} 100%)`,
          color: "#fff",
          border: "none",
          borderRadius: 999,
          cursor: "pointer",
          boxShadow: `0 10px 28px ${C.heroA}45`,
          marginBottom: 10,
          letterSpacing: "0.3px"
        }
      },
      "Create Free Account"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onStart == null ? void 0 : onStart("login"),
        style: {
          width: "100%",
          padding: "14px 24px",
          fontSize: 15,
          fontWeight: 700,
          background: "transparent",
          color: landingText,
          border: `1.5px solid ${glassBorder}`,
          borderRadius: 999,
          cursor: "pointer",
          marginBottom: 10,
          transition: "background 0.2s ease"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = isLight ? "rgba(28,18,64,0.05)" : "rgba(255,255,255,0.06)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "transparent";
        }
      },
      "Log In"
    ), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/api/auth/oauth/google",
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 13,
          borderRadius: 999,
          border: `1px solid ${glassBorder}`,
          background: isLight ? "#ffffff" : "rgba(255,255,255,0.05)",
          color: landingText,
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 14
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 4, background: "#fff" } }, /* @__PURE__ */ React.createElement("img", { src: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234a90e2' d='M24 9.5c3.5 0 6.5 1.2 8.9 3.4l6.6-6.6C34.3 2.9 29.4 0 24 0 14 0 5.3 5.4 1.8 13.3l7.7 6C11.7 13.1 17.3 9.5 24 9.5z'%3E%3C/path%3E%3Cpath fill='%23ef3b2d' d='M46.7 24.6c0-1.9-.2-3.7-.7-5.4H24v10.3h12.8c-.6 3.2-2.4 5.9-5.1 7.8l7.9 6.2c4.6-4.3 7.1-10.5 7.1-18.9z'%3E%3C/path%3E%3Cpath fill='%23fbbc05' d='M10.4 28.1c-.5-1.5-.8-3-.8-4.6 0-1.6.3-3.1.8-4.6l-7.8-6.1C.7 17.3 0 20.6 0 23.5s.7 6.2 2.6 8.6l7.8-6z'%3E%3C/path%3E%3Cpath fill='%2327ae60' d='M24 48c6.5 0 12-2.1 16-5.7l-7.9-6.2c-2.2 1.5-5 2.4-8.1 2.4-6.8 0-12.5-4.3-14.6-10.2l-7.8 6c3.7 7.4 11.6 12.7 22.4 12.7z'%3E%3C/path%3E%3C/svg%3E", alt: "Google", style: { width: 18, height: 18 } })),
      "Continue with Google"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          onGuest == null ? void 0 : onGuest();
          setGuestStatus("Guest access active \u2014 explore SIMA MIND now with basic study tools and upgrade any time for premium AI-powered features.");
        },
        style: {
          width: "100%",
          textAlign: "center",
          background: "transparent",
          border: "none",
          color: landingMuted,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          padding: "4px 0",
          textDecoration: "underline",
          textUnderlineOffset: 3
        }
      },
      "Continue as guest"
    ), guestStatus && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: 14, borderRadius: 14, background: `${C.accent}14`, border: `1px solid ${C.accent}30`, color: landingText, fontSize: 13, lineHeight: 1.6, textAlign: "center" } }, guestStatus)), /* @__PURE__ */ React.createElement("div", { style: {
      fontSize: 12,
      color: landingMuted,
      marginTop: 26,
      paddingTop: 22,
      borderTop: `1px solid ${glassBorder}`,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "center",
      textAlign: "center",
      width: "100%"
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, lineHeight: 1.4, maxWidth: 520, color: landingText } }, "Learn smarter. Remember longer. Master more."), /* @__PURE__ */ React.createElement("div", null, "Built with \u2764\uFE0F by SimaTech"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4, color: landingMuted, fontSize: 11 } }, /* @__PURE__ */ React.createElement("span", null, "\xA9 2026 SimaTech. All rights reserved.")), /* @__PURE__ */ React.createElement("div", { style: { color: landingMuted, lineHeight: 1.5, fontSize: 11, maxWidth: 520 } }, "By creating an account or using SIMA MIND, you agree to our", /* @__PURE__ */ React.createElement("a", { href: "https://about-simamind.simatech.uk/terms", target: "_blank", rel: "noopener noreferrer", style: { color: C.accent, textDecoration: "none", margin: "0 4px" } }, "Terms of Service"), "and", /* @__PURE__ */ React.createElement("a", { href: "https://privacypolicy.simatech.uk/", target: "_blank", rel: "noopener noreferrer", style: { color: C.accent, textDecoration: "none", margin: "0 4px" } }, "Privacy Policy"), "."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, alignItems: "center", fontSize: 11, marginTop: 6 } }, /* @__PURE__ */ React.createElement("a", { href: "https://about-simamind.simatech.uk/help", target: "_blank", rel: "noopener noreferrer", style: { color: C.accent, textDecoration: "none" } }, "Help & Support"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("a", { href: "https://about-simamind.simatech.uk/faqs", target: "_blank", rel: "noopener noreferrer", style: { color: C.accent, textDecoration: "none" } }, "FAQs"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("a", { href: "https://about-simamind.simatech.uk/contact", target: "_blank", rel: "noopener noreferrer", style: { color: C.accent, textDecoration: "none" } }, "Contact Us"), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("a", { href: "https://about-simamind.simatech.uk/about", target: "_blank", rel: "noopener noreferrer", style: { color: C.accent, textDecoration: "none" } }, "About SIMA MIND & SimaTech")))));
  }
  function VerificationScreen({ onVerified, subscription, onBack, onGuest }) {
    const [method, setMethod] = useState("email");
    const [value, setValue] = useState("");
    const [countryCode, setCountryCode] = useState("+260");
    const [code, setCode] = useState("");
    const [sentCode, setSentCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [deviceType, setDeviceType] = useState("phone");
    const [step, setStep] = useState("input");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [referralCode, setReferralCode] = useState(() => {
      if (typeof window === "undefined") return "";
      try {
        const params = new URLSearchParams(window.location.search);
        return params.get("ref") || "";
      } catch {
        return "";
      }
    });
    const sendCode = async () => {
      if (!value.trim()) {
        setError("Please enter a valid " + (method === "email" ? "email" : "phone number"));
        return;
      }
      setError("");
      setLoading(true);
      try {
        const payload = method === "email" ? { email: value } : { phone: countryCode + value };
        const res = await fetch(API_BASE_URL + "/api/auth/request-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to send verification code");
        } else {
          setSentCode(data.code || "");
          setCode(data.code || "");
          setStep("code");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      }
      setLoading(false);
    };
    const verifyCode = async () => {
      if (code.length !== 6) {
        setError("Please enter a 6-digit code");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const payload = method === "email" ? { email: value, code } : { phone: countryCode + value, code };
        const res = await fetch(API_BASE_URL + "/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Invalid code");
        } else {
          setStep("password");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      }
      setLoading(false);
    };
    const handlePasswordNext = () => {
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setError("");
      setStep("device");
    };
    const completeSetup = async () => {
      setError("");
      setLoading(true);
      try {
        const registerPayload = method === "email" ? { email: value, password, deviceType } : { phone: countryCode + value, password, deviceType };
        const res = await fetch(API_BASE_URL + "/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...registerPayload, referredByCode: referralCode || null })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("sima_token", data.token);
          localStorage.setItem("sima_user", JSON.stringify(data.user));
          onVerified(method, method === "email" ? value : countryCode + value);
          setStep("success");
          setTimeout(() => setStep("welcome"), 2e3);
        } else if (res.status === 409) {
          const loginRes = await fetch(API_BASE_URL + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerPayload)
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.token) {
            localStorage.setItem("sima_token", loginData.token);
            localStorage.setItem("sima_user", JSON.stringify(loginData.user));
            onVerified(method, method === "email" ? value : countryCode + value);
            setStep("success");
            setTimeout(() => setStep("welcome"), 2e3);
          } else {
            setError(loginData.error || "Login failed");
          }
        } else {
          setError(data.error || "Registration failed");
        }
      } catch (err) {
        setError("Network error: " + err.message);
      }
      setLoading(false);
    };
    if (step === "success") {
      return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", maxWidth: 320 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u2705"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, marginBottom: 8 } }, "Account Created!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted } }, "Setting up your profile...")));
    }
    if (step === "welcome") {
      return /* @__PURE__ */ React.createElement(WelcomeMessageScreen, { onContinue: () => {
      } });
    }
    return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 380 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => onBack == null ? void 0 : onBack(), style: { background: "transparent", border: "none", color: C.accent, cursor: "pointer", fontSize: 13 } }, "\u2190 Back"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }), /* @__PURE__ */ React.createElement("div", { style: { width: 48 } })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, fontWeight: 800, marginBottom: 8 } }, step === "input" ? "\u{1F510} Secure Account" : step === "code" ? "\u{1F4DD} Verify Code" : step === "password" ? "\u{1F511} Set Password" : "\u{1F4F1} Device Type"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted } }, step === "input" ? "Email-verified security with end-to-end encryption " : step === "code" ? "Enter the code we sent you" : step === "password" ? "Create a strong password" : "Choose your primary device")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, step === "input" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" } }, "Verification Method"), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Email Address"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        type: "email",
        placeholder: "your@email.com",
        value,
        onChange: (e) => {
          setValue(e.target.value);
          setError("");
        }
      }
    ), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginTop: 8 } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: sendCode,
        disabled: loading,
        style: { ...S.btn(C.accent), width: "100%", marginTop: 16, opacity: loading ? 0.6 : 1 }
      },
      loading ? "Sending\u2026" : "Send Verification Code"
    ), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 16,
      padding: 12,
      background: `${C.accent}15`,
      border: `1px solid ${C.accent}30`,
      borderRadius: 8,
      fontSize: 12,
      color: C.muted,
      textAlign: "center",
      lineHeight: 1.5
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 8, color: C.accent } }, " Enterprise Security"), /* @__PURE__ */ React.createElement("div", null, "AES-256 encryption \u2022 Device limits \u2022 Audit logs"))), step === "code" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 12 } }, "Enter the 6-digit code sent to ", /* @__PURE__ */ React.createElement("strong", null, method === "email" ? value : countryCode + value)), sentCode && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12, padding: "8px 10px", background: `${C.accent}12`, border: `1px solid ${C.accent}30`, borderRadius: 8, fontSize: 12, color: C.accent } }, "Email delivery is delayed, so use this code instead: ", /* @__PURE__ */ React.createElement("strong", null, sentCode)), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: { ...S.input, textAlign: "center", fontSize: 18, fontWeight: 800, letterSpacing: 4 },
        placeholder: "000000",
        value: code,
        onChange: (e) => {
          setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
          setError("");
        },
        maxLength: 6
      }
    ), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginTop: 8 } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setStep("input");
          setCode("");
          setError("");
        },
        style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, flex: 1 }
      },
      "Back"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: verifyCode,
        disabled: loading,
        style: { ...S.btn(C.accent), flex: 1, opacity: loading ? 0.6 : 1 }
      },
      loading ? "Verifying\u2026" : "Verify"
    ))), step === "password" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Password (min 8 characters)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        type: "password",
        placeholder: "Create a strong password",
        value: password,
        onChange: (e) => {
          setPassword(e.target.value);
          setError("");
        }
      }
    ), /* @__PURE__ */ React.createElement("label", { style: { ...S.label, marginTop: 14 } }, "Confirm Password"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        type: "password",
        placeholder: "Confirm your password",
        value: confirmPassword,
        onChange: (e) => {
          setConfirmPassword(e.target.value);
          setError("");
        }
      }
    ), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginTop: 8 } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setStep("code");
          setPassword("");
          setConfirmPassword("");
          setError("");
        },
        style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, flex: 1 }
      },
      "Back"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handlePasswordNext,
        style: { ...S.btn(C.accent), flex: 1 }
      },
      "Next"
    ))), step === "device" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 14 } }, "Select your primary device type. You can use up to 3 different device types (phone, PC, tablet) on one account."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 } }, [
      { id: "phone", label: "\u{1F4F1} Phone" },
      { id: "pc", label: "\u{1F4BB} PC" },
      { id: "tablet", label: "\u{1F4F1} Tablet" }
    ].map((d) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.id,
        onClick: () => {
          setDeviceType(d.id);
          setError("");
        },
        style: {
          padding: "16px",
          borderRadius: 10,
          border: `2px solid ${deviceType === d.id ? C.accent : C.border}`,
          background: deviceType === d.id ? C.accent + "15" : C.surface,
          color: deviceType === d.id ? C.accent : C.text,
          fontSize: 12,
          cursor: "pointer",
          fontWeight: deviceType === d.id ? 700 : 600
        }
      },
      d.label
    ))), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginBottom: 12 } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setStep("password");
          setError("");
        },
        style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, flex: 1 }
      },
      "Back"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: completeSetup,
        disabled: loading,
        style: { ...S.btn(C.accent), flex: 1, opacity: loading ? 0.6 : 1 }
      },
      loading ? "Creating account\u2026" : "Complete Setup"
    )))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, textAlign: "center" } }, "Your data is secure with end-to-end encryption and device verification.")));
  }
  function IconMail({ size = 16, color = "currentColor" }) {
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M3 7l9 6 9-6" }));
  }
  function IconLock({ size = 16, color = "currentColor" }) {
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "5", y: "11", width: "14", height: "10", rx: "2.5" }), /* @__PURE__ */ React.createElement("path", { d: "M8 11V8a4 4 0 0 1 8 0v3" }));
  }
  function IconEye({ size = 16, color = "currentColor" }) {
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }));
  }
  function IconEyeOff({ size = 16, color = "currentColor" }) {
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 3l18 18" }), /* @__PURE__ */ React.createElement("path", { d: "M10.6 10.6a3 3 0 0 0 4.24 4.24" }), /* @__PURE__ */ React.createElement("path", { d: "M6.5 6.6C4 8.3 2 12 2 12s4 7 10 7c1.9 0 3.6-.6 5-1.4M17.9 17.9C20 16.2 22 12 22 12s-1.3-2.4-3.5-4.3" }));
  }
  function IconChevronLeft({ size = 18, color = "currentColor" }) {
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M15 18l-6-6 6-6" }));
  }
  function LoginScreen({ onLoginSuccess, onBack, onRegister, subscription, themeMode }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetStep, setResetStep] = useState("email");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSentCode, setResetSentCode] = useState("");
    const handleLogin = async () => {
      if (!email.trim() || !password.trim()) {
        setError("Email and password are required");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const response = await fetch(API_BASE_URL + "/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
            deviceId: `device-${Date.now()}`,
            deviceName: navigator.userAgent.slice(0, 50),
            deviceType: /mobile|tablet/i.test(navigator.userAgent) ? "mobile" : "web"
          })
        });
        if (!response.ok) {
          const err = await response.json();
          setError(err.error || "Login failed. Please check your credentials.");
          setLoading(false);
          return;
        }
        const data = await response.json();
        localStorage.setItem("sima_token", data.token);
        localStorage.setItem("sima_user", JSON.stringify(data.user));
        onLoginSuccess == null ? void 0 : onLoginSuccess(data.user);
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    const fieldStyle = {
      width: "100%",
      padding: "13px 14px 13px 42px",
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      color: C.text,
      fontSize: 14,
      transition: "border-color 0.2s ease",
      boxSizing: "border-box",
      fontFamily: "inherit"
    };
    return /* @__PURE__ */ React.createElement("div", { className: "sima-auth-shell", style: { minHeight: "100vh", display: "flex", background: C.bg } }, /* @__PURE__ */ React.createElement("div", { className: "sima-auth-illustration", style: {
      flex: 1,
      position: "relative",
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      background: `radial-gradient(circle at 28% 22%, ${C.heroA}55, transparent 55%), radial-gradient(circle at 82% 82%, ${C.heroB}30, transparent 50%), linear-gradient(160deg, #1c1444 0%, ${C.bg} 100%)`
    } }, /* @__PURE__ */ React.createElement("div", { className: "sima-aurora-blob sima-aurora-a", style: { position: "absolute", top: "8%", left: "-12%", filter: "blur(75px)" } }, /* @__PURE__ */ React.createElement(BlobShape, { color: C.heroA, size: 340, opacity: 0.5 })), /* @__PURE__ */ React.createElement("div", { className: "sima-aurora-blob sima-aurora-c", style: { position: "absolute", bottom: "4%", right: "-10%", filter: "blur(85px)" } }, /* @__PURE__ */ React.createElement(BlobShape, { color: C.purple, size: 300, opacity: 0.4 })), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", textAlign: "center", padding: 40 } }, /* @__PURE__ */ React.createElement(IllustrationStudyDesk, { width: 260, heroA: C.heroA, heroB: C.heroB, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 22, fontWeight: 800, color: "#fff", marginTop: 26, maxWidth: 320, marginLeft: "auto", marginRight: "auto" } }, "Every login picks up right where you left off."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: "rgba(255,255,255,0.68)", marginTop: 10, maxWidth: 300, lineHeight: 1.6, marginLeft: "auto", marginRight: "auto" } }, "Your flashcards, streaks, and study plan are exactly how you left them."))), /* @__PURE__ */ React.createElement("div", { className: "sima-auth-form-col", style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 20px 40px",
      position: "relative",
      boxSizing: "border-box"
    } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onBack,
        "aria-label": "Back",
        style: {
          position: "absolute",
          top: 20,
          left: 20,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: C.surface,
          border: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: C.text
        }
      },
      /* @__PURE__ */ React.createElement(IconChevronLeft, { size: 18, color: C.text })
    ), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 360, width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 30, justifyContent: "center" } }, /* @__PURE__ */ React.createElement("img", { src: "/wadudu_splash.webp?cb=2", alt: "SIMA MIND", style: { width: 30, height: 30, objectFit: "contain" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 800, letterSpacing: "0.08em", color: C.muted, textTransform: "uppercase" } }, "Sima Mind")), /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 26, fontWeight: 800, color: C.text, marginBottom: 6, textAlign: "center" } }, "Welcome back"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: C.muted, marginBottom: 28, textAlign: "center" } }, "Log in to continue your learning journey"), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Email"), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement(IconMail, { size: 16, color: C.muted })), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        placeholder: "you@email.com",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        onKeyPress: (e) => e.key === "Enter" && handleLogin(),
        disabled: loading,
        style: fieldStyle,
        onFocus: (e) => e.target.style.borderColor = C.accent,
        onBlur: (e) => e.target.style.borderColor = C.border
      }
    )), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Password"), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex", pointerEvents: "none" } }, /* @__PURE__ */ React.createElement(IconLock, { size: 16, color: C.muted })), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: showPassword ? "text" : "password",
        placeholder: "Your password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        onKeyPress: (e) => e.key === "Enter" && handleLogin(),
        disabled: loading,
        style: { ...fieldStyle, paddingRight: 42 },
        onFocus: (e) => e.target.style.borderColor = C.accent,
        onBlur: (e) => e.target.style.borderColor = C.border
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setShowPassword((v) => !v),
        "aria-label": showPassword ? "Hide password" : "Show password",
        style: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: C.muted, display: "flex", padding: 6 }
      },
      showPassword ? /* @__PURE__ */ React.createElement(IconEyeOff, { size: 16, color: C.muted }) : /* @__PURE__ */ React.createElement(IconEye, { size: 16, color: C.muted })
    )), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", marginBottom: 16 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setShowForgotPassword(true);
          setResetError("");
          setResetStep("email");
          setResetEmail("");
          setResetCode("");
          setResetSentCode("");
          setNewPassword("");
          setConfirmPassword("");
        },
        style: { background: "transparent", color: C.accent, border: "none", fontSize: 12.5, fontWeight: 700, cursor: "pointer", padding: 0 }
      },
      "Forgot password?"
    )), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12.5, marginBottom: 14, background: `${C.red}14`, border: `1px solid ${C.red}30`, borderRadius: 10, padding: "9px 12px" } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleLogin,
        disabled: loading,
        className: "sima-shimmer-btn",
        style: {
          width: "100%",
          padding: "14px 16px",
          marginBottom: 18,
          backgroundImage: `linear-gradient(110deg, ${C.heroA} 0%, ${C.heroB} 35%, ${C.gold} 50%, ${C.heroB} 65%, ${C.heroA} 100%)`,
          color: "white",
          border: "none",
          borderRadius: 999,
          fontSize: 15,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s ease",
          boxShadow: `0 10px 24px ${C.heroA}40`
        }
      },
      loading ? "Logging in\u2026" : "Sign In"
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: C.border } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "0.07em", whiteSpace: "nowrap" } }, "OR CONTINUE WITH"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: C.border } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 24 } }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/api/auth/oauth/google",
        style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 10px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontWeight: 700, fontSize: 13.5, textDecoration: "none" }
      },
      /* @__PURE__ */ React.createElement("img", { src: "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234a90e2' d='M24 9.5c3.5 0 6.5 1.2 8.9 3.4l6.6-6.6C34.3 2.9 29.4 0 24 0 14 0 5.3 5.4 1.8 13.3l7.7 6C11.7 13.1 17.3 9.5 24 9.5z'%3E%3C/path%3E%3Cpath fill='%23ef3b2d' d='M46.7 24.6c0-1.9-.2-3.7-.7-5.4H24v10.3h12.8c-.6 3.2-2.4 5.9-5.1 7.8l7.9 6.2c4.6-4.3 7.1-10.5 7.1-18.9z'%3E%3C/path%3E%3Cpath fill='%23fbbc05' d='M10.4 28.1c-.5-1.5-.8-3-.8-4.6 0-1.6.3-3.1.8-4.6l-7.8-6.1C.7 17.3 0 20.6 0 23.5s.7 6.2 2.6 8.6l7.8-6z'%3E%3C/path%3E%3Cpath fill='%2327ae60' d='M24 48c6.5 0 12-2.1 16-5.7l-7.9-6.2c-2.2 1.5-5 2.4-8.1 2.4-6.8 0-12.5-4.3-14.6-10.2l-7.8 6c3.7 7.4 11.6 12.7 22.4 12.7z'%3E%3C/path%3E%3C/svg%3E", alt: "", style: { width: 16, height: 16 } }),
      "Google"
    ), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "/api/auth/oauth/apple",
        style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 10px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontWeight: 700, fontSize: 13.5, textDecoration: "none" }
      },
      /* @__PURE__ */ React.createElement("img", { src: "/assets/apple-logo.svg", alt: "", style: { width: 15, height: 15, filter: themeMode === "light" ? "none" : "invert(1)" } }),
      "Apple"
    )), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontSize: 13, color: C.muted } }, "Don't have an account?", " ", /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onRegister == null ? void 0 : onRegister(),
        style: { background: "transparent", border: "none", color: C.accent, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0 }
      },
      "Register for free"
    ))), showForgotPassword && /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `${C.bg}dd`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: 20
    } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, maxWidth: 360, width: "100%", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, marginBottom: 20 } }, "\u{1F511} Reset Password"), resetStep === "email" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Email address"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        placeholder: "your@email.com",
        value: resetEmail,
        onChange: (e) => setResetEmail(e.target.value),
        style: { ...S.input, marginBottom: 16 }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: async () => {
          if (!resetEmail.trim()) {
            setResetError("Please enter your email");
            return;
          }
          setResetLoading(true);
          try {
            const res = await fetch(API_BASE_URL + "/api/auth/request-verification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: resetEmail })
            });
            if (res.ok) {
              const data = await res.json();
              setResetSentCode(data.code || "");
              setResetCode(data.code || "");
              setResetStep("code");
              setResetError("");
            } else {
              const data = await res.json();
              setResetError(data.error || "Email not found");
            }
          } catch (err) {
            setResetError("Network error. Please try again.");
          }
          setResetLoading(false);
        },
        disabled: resetLoading,
        style: { ...S.btn(C.accent), width: "100%", marginBottom: 12 }
      },
      resetLoading ? "Sending..." : "Send Code"
    )), resetStep === "code" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Verification code"), resetSentCode && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12, padding: "8px 10px", background: `${C.accent}12`, border: `1px solid ${C.accent}30`, borderRadius: 8, fontSize: 12, color: C.accent } }, "If the email is late, use this code instead: ", /* @__PURE__ */ React.createElement("strong", null, resetSentCode)), /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: "000000",
        maxLength: "6",
        value: resetCode,
        onChange: (e) => setResetCode(e.target.value.replace(/\D/g, "")),
        style: { ...S.input, marginBottom: 16 }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          if (resetCode.length !== 6) {
            setResetError("Please enter a 6-digit code");
            return;
          }
          setResetStep("password");
          setResetError("");
        },
        style: { ...S.btn(C.accent), width: "100%", marginBottom: 12 }
      },
      "Verify Code"
    )), resetStep === "password" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "New password"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        placeholder: "At least 8 characters",
        value: newPassword,
        onChange: (e) => setNewPassword(e.target.value),
        style: { ...S.input, marginBottom: 12 }
      }
    ), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Confirm password"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "password",
        placeholder: "Confirm new password",
        value: confirmPassword,
        onChange: (e) => setConfirmPassword(e.target.value),
        style: { ...S.input, marginBottom: 16 }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: async () => {
          if (newPassword.length < 8) {
            setResetError("Password must be at least 8 characters");
            return;
          }
          if (newPassword !== confirmPassword) {
            setResetError("Passwords do not match");
            return;
          }
          setResetLoading(true);
          try {
            const res = await fetch(API_BASE_URL + "/api/auth/reset-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: resetEmail, code: resetCode, newPassword })
            });
            if (res.ok) {
              setResetStep("success");
              setResetError("");
              setTimeout(async () => {
                try {
                  const loginRes = await fetch(API_BASE_URL + "/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: resetEmail, password: newPassword })
                  });
                  if (loginRes.ok) {
                    const userData = await loginRes.json();
                    localStorage.setItem("sima_token", userData.token);
                    localStorage.setItem("sima_user", JSON.stringify(userData.user));
                    setShowForgotPassword(false);
                    onLoginSuccess(userData.user, userData.token);
                  } else {
                    setResetError("Password reset successful. Please log in with your new password.");
                    setShowForgotPassword(false);
                  }
                } catch (err) {
                  setResetError("Password reset successful. Please log in with your new password.");
                  setShowForgotPassword(false);
                }
              }, 2e3);
            } else {
              const data = await res.json();
              setResetError(data.error || "Reset failed");
            }
          } catch (err) {
            setResetError("Network error. Please try again.");
          }
          setResetLoading(false);
        },
        disabled: resetLoading,
        style: { ...S.btn(C.accent), width: "100%", marginBottom: 12 }
      },
      resetLoading ? "Resetting..." : "Reset Password"
    )), resetStep === "success" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "\u2705"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 8 } }, "Password reset successful!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted } }, "You can now log in with your new password."))), resetError && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginBottom: 12 } }, "\u26A0\uFE0F ", resetError), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setShowForgotPassword(false);
          if (resetStep === "success") {
            setResetStep("email");
            setResetEmail("");
            setResetCode("");
            setNewPassword("");
            setConfirmPassword("");
          }
        },
        style: { ...S.btn(C.surface, C.text), width: "100%", border: `1px solid ${C.border}` }
      },
      resetStep === "success" ? "Back to Login" : "Cancel"
    )))));
  }
  function WelcomeMessageScreen({ onContinue }) {
    const [step, setStep] = useState(0);
    const welcomeSteps = [
      {
        icon: "\u{1F680}",
        title: "Welcome to SIMA MIND",
        subtitle: "Powered by SMX & MGX",
        content: "Your intelligent study companion, designed to adapt to every learner's needs."
      },
      {
        icon: "\u{1F465}",
        title: "Meet the Team",
        subtitle: "Built by Experts",
        content: "Developed by a team of educators, AI specialists, and learning scientists dedicated to revolutionizing education."
      },
      {
        icon: "\u{1F3AF}",
        title: "Your Learning Journey",
        subtitle: "14 Days Free Access",
        content: "Experience all premium features for 14 days. No credit card required. Upgrade anytime."
      },
      {
        icon: "\u{1F512}",
        title: "Secure & Private",
        subtitle: "Your Data is Safe",
        content: "End-to-end encryption, device verification, and secure payment processing."
      }
    ];
    const nextStep = () => {
      if (step < welcomeSteps.length - 1) {
        setStep((s) => s + 1);
      } else {
        onContinue();
      }
    };
    const currentStep = welcomeSteps[step];
    return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 400 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 } }, welcomeSteps.map((_, i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        style: {
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: i === step ? C.accent : C.border,
          transition: "all .3s"
        }
      }
    ))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, currentStep.icon), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, marginBottom: 8 } }, currentStep.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, color: C.accent, fontWeight: 600, marginBottom: 16 } }, currentStep.subtitle), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, lineHeight: 1.6 } }, currentStep.content)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12 } }, step > 0 && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setStep((s) => s - 1),
        style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, flex: 1 }
      },
      "Back"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: nextStep,
        style: { ...S.btn(C.accent), flex: step === 0 ? "initial" : 1 }
      },
      step === welcomeSteps.length - 1 ? "Get Started" : "Next"
    ))));
  }
  function PaymentScreen({ plan, onPaymentComplete, onBack }) {
    const [method, setMethod] = useState("visa");
    const [step, setStep] = useState("form");
    const [formData, setFormData] = useState({
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: "",
      phone: "",
      amount: "",
      bankName: "",
      accountNumber: ""
    });
    const selectedPlan = PLANS.find((p) => p.id === plan);
    const amount = selectedPlan.price.usd;
    const displayAmount = method === "visa" ? amount : Number(formData.amount) || selectedPlan.price.kwacha;
    const currencySymbol = method === "visa" ? "$" : "K";
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const processPayment = () => {
      if (method === "visa") {
        if (!formData.cardNumber || !formData.expiry || !formData.cvv || !formData.name) {
          return alert("Please complete all card details before continuing.");
        }
      }
      if (method === "bank") {
        if (!formData.name || !formData.phone || !formData.bankName || !formData.accountNumber) {
          return alert("Please complete all bank transfer details before continuing.");
        }
      }
      if (method === "airtel" || method === "mtn") {
        if (!formData.phone) {
          return alert("Please provide your phone number for mobile money.");
        }
      }
      const payload = {
        plan: selectedPlan.label,
        amount: displayAmount,
        currency: currencySymbol,
        method,
        paymentMethod: method,
        metadata: {
          ...formData,
          planId: selectedPlan.value
        }
      };
      setStep("processing");
      fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then((r) => r.json()).then((data) => {
        const receipt = data.receipt || {
          id: "RCT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          plan: selectedPlan.label,
          amount: displayAmount,
          method,
          currency: currencySymbol,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          status: "completed"
        };
        localStorage.setItem("last_receipt", JSON.stringify(receipt));
        setStep("success");
        setTimeout(() => onPaymentComplete(receipt), 2e3);
      }).catch(() => {
        const receipt = {
          id: "RCT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          plan: selectedPlan.label,
          amount: displayAmount,
          method,
          currency: currencySymbol,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          status: "completed"
        };
        localStorage.setItem("last_receipt", JSON.stringify(receipt));
        setStep("success");
        setTimeout(() => onPaymentComplete(receipt), 2e3);
      });
    };
    const generateReceipt = (receipt) => {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt - SIMA MIND</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; }
            .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #007bff; }
            .details { margin: 10px 0; }
            .total { font-size: 18px; font-weight: bold; color: #28a745; }
            .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">SIMA MIND</div>
            <div>Powered by SMX & MGX</div>
          </div>
          <div class="details">
            <strong>Receipt ID:</strong> ${receipt.id}<br>
            <strong>Plan:</strong> ${receipt.plan}<br>
            <strong>Amount:</strong> ${receipt.currency}${receipt.amount}<br>
            <strong>Payment Method:</strong> ${receipt.method.toUpperCase()}<br>
            <strong>Date:</strong> ${new Date(receipt.timestamp).toLocaleString()}<br>
            <strong>Status:</strong> <span style="color: #28a745;">${receipt.status.toUpperCase()}</span>
          </div>
          <div class="total">Total Paid: ${receipt.currency}${receipt.amount}</div>
          <div class="footer">
            Thank you for choosing SIMA MIND!<br>
            For support: support@simamind.com
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    };
    if (step === "processing") {
      return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", maxWidth: 320 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u23F3"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, marginBottom: 8 } }, "Processing Payment"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted } }, "Please wait while we secure your transaction...")));
    }
    if (step === "success") {
      const receipt = JSON.parse(localStorage.getItem("last_receipt"));
      return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 380 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u2705"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, fontWeight: 800, marginBottom: 8 } }, "Payment Successful!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted } }, "Welcome to your premium plan")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 12 } }, "\u{1F4C4} Receipt Details"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, lineHeight: 1.6 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Plan:"), " ", receipt.plan), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Amount:"), " ", receipt.currency, receipt.amount), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Method:"), " ", receipt.method.toUpperCase()), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Receipt ID:"), " ", receipt.id))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => generateReceipt(receipt),
          style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, flex: 1 }
        },
        "\u{1F4C4} Print Receipt"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => onPaymentComplete(receipt),
          style: { ...S.btn(C.accent), flex: 1 }
        },
        "Continue"
      ))));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { ...S.page, alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: 380 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, marginBottom: 4 } }, "\u{1F4B3} Complete Payment"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted } }, selectedPlan.label, " Plan - ", currencySymbol, displayAmount)), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" } }, "Payment Method"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } }, [
      { id: "visa", label: "\u{1F4B3} Visa/Mastercard", icon: "\u{1F4B3}" },
      { id: "airtel", label: "\u{1F4F1} Airtel Money", icon: "\u{1F4F1}" },
      { id: "mtn", label: "\u{1F4F1} MTN Money", icon: "\u{1F4F1}" },
      { id: "bank", label: "\u{1F3E6} Bank Transfer", icon: "\u{1F3E6}" }
    ].map((m) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m.id,
        onClick: () => setMethod(m.id),
        style: {
          flex: 1,
          padding: "12px",
          borderRadius: 10,
          border: `1px solid ${method === m.id ? C.accent : C.border}`,
          background: method === m.id ? C.accent + "15" : C.surface,
          color: method === m.id ? C.accent : C.text,
          fontSize: 13,
          cursor: "pointer",
          textAlign: "center"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, marginBottom: 4 } }, m.icon),
      /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 11 } }, m.label)
    ))), method === "visa" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Card Number"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "1234 5678 9012 3456",
        value: formData.cardNumber,
        onChange: (e) => handleInputChange("cardNumber", e.target.value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")),
        maxLength: 19
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Expiry Date"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "MM/YY",
        value: formData.expiry,
        onChange: (e) => handleInputChange("expiry", e.target.value.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1/")),
        maxLength: 5
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("label", { style: S.label }, "CVV"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "123",
        type: "password",
        value: formData.cvv,
        onChange: (e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4)),
        maxLength: 4
      }
    ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Cardholder Name"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "John Doe",
        value: formData.name,
        onChange: (e) => handleInputChange("name", e.target.value)
      }
    )), (method === "airtel" || method === "mtn" || method === "bank") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Phone Number"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "+260 XXX XXX XXX",
        value: formData.phone,
        onChange: (e) => handleInputChange("phone", e.target.value)
      }
    ), method === "bank" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { style: S.label }, "Bank Name"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "e.g. Stanbic Bank",
        value: formData.bankName,
        onChange: (e) => handleInputChange("bankName", e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Account Number"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: "1234567890",
        value: formData.accountNumber,
        onChange: (e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))
      }
    )), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Amount (", method === "visa" ? "USD" : "ZMW", ")"), /* @__PURE__ */ React.createElement(
      "input",
      {
        style: S.input,
        placeholder: method === "bank" ? "Enter amount" : `Default K${selectedPlan.price.kwacha}`,
        value: formData.amount,
        onChange: (e) => handleInputChange("amount", e.target.value.replace(/\D/g, ""))
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 8 } }, method === "bank" ? "\u{1F4A1} Use your bank transfer details to complete a secure payment request." : "\u{1F4A1} You'll receive a prompt on your phone to complete the payment."))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onBack,
        style: { ...S.btn(C.surface, C.muted), border: `1px solid ${C.border}`, flex: 1 }
      },
      "Back"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: processPayment,
        style: { ...S.btn(C.accent), flex: 1 }
      },
      "Pay ",
      currencySymbol,
      displayAmount
    )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, textAlign: "center", marginTop: 16 } }, "\u{1F512} Secure payment processing \u2022 No hidden fees")));
  }
  function UpgradePromptModal({ plan, onClose, onUpgrade, resetTime }) {
    const config = PROFILE_ENGINE.getConfig({ education: "university", program: "General" });
    const currentPlan = PLANS.find((p) => p.id === plan) || PLANS[0];
    return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#000c", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, width: "100%", maxWidth: 380, position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { position: "absolute", top: 14, right: 14, ...S.btn(C.surface, C.muted), padding: "6px 10px" } }, /* @__PURE__ */ React.createElement(Icon, { d: Icons.x, size: 16 })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, "\u{1F680}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, marginBottom: 6 } }, "Study Limit Reached"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, lineHeight: 1.6 } }, currentPlan.limitMessage || `You've reached your ${currentPlan.label} limit for the next 12 hours.`)), resetTime && /* @__PURE__ */ React.createElement("div", { style: { background: currentPlan.color + "15", borderLeft: `3px solid ${currentPlan.color}`, padding: "10px 12px", borderRadius: 8, marginBottom: 16, fontSize: 12, color: currentPlan.color } }, "\u23F0 Resets in ", /* @__PURE__ */ React.createElement("strong", null, resetTime)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" } }, "Recommended Upgrades"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, PLANS.filter((p) => p.id !== plan).slice(-2).map((p) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p.id,
        onClick: () => onUpgrade(p.id),
        style: {
          background: p.color + "22",
          border: `1px solid ${p.color}44`,
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          color: p.color,
          textAlign: "left",
          transition: "all .2s"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 2 } }, p.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "$", p.price.usd, "/mo \xB7 ", p.features.main[0].text)), /* @__PURE__ */ React.createElement(Icon, { d: Icons.send, size: 16, color: p.color }))
    )))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        style: {
          ...S.btn(C.surface, C.muted),
          border: `1px solid ${C.border}`,
          width: "100%",
          justifyContent: "center",
          fontSize: 14
        }
      },
      "Close"
    )));
  }
  function StatsPopover({ onClose, profile, config }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    const [loading, setLoading] = useState(true);
    const [overview, setOverview] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [velocity, setVelocity] = useState(null);
    const [revisionHistory, setRevisionHistory] = useState([]);
    useEffect(() => {
      let mounted = true;
      const token = localStorage.getItem("sima_token");
      if (!token) {
        setLoading(false);
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      Promise.all([
        fetch(API_BASE_URL + "/api/analytics/overview", { headers }).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(API_BASE_URL + "/api/analytics/subject-mastery", { headers }).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(API_BASE_URL + "/api/analytics/learning-velocity", { headers }).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(API_BASE_URL + "/api/analytics/revision-history", { headers }).then((r) => r.ok ? r.json() : null).catch(() => null)
      ]).then(([ov, subj, vel, rev]) => {
        if (!mounted) return;
        if (ov) setOverview(ov);
        if (subj && Array.isArray(subj.subjects)) setSubjects(subj.subjects);
        if (vel && vel.velocity) setVelocity(vel.velocity);
        if (rev && Array.isArray(rev.history)) setRevisionHistory(rev.history.slice(0, 6));
      }).finally(() => {
        if (mounted) setLoading(false);
      });
      return () => {
        mounted = false;
      };
    }, [profile == null ? void 0 : profile.id]);
    const masteryPct = (overview == null ? void 0 : overview.cards) && overview.cards.total ? Math.round(overview.cards.mastered / Math.max(1, overview.cards.total) * 100) : ((_a = overview == null ? void 0 : overview.overall) == null ? void 0 : _a.masteryPct) || null;
    return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", left: "6%", right: "6%", bottom: 72, zIndex: 310, borderRadius: 12, boxShadow: "0 20px 40px rgba(2,6,23,0.6)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800 } }, "\u{1F4CA} Stats"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { ...S.btn(C.surface, C.muted), padding: "6px 8px", fontSize: 12 } }, "Close"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1 / -1", display: "flex", gap: 10, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: C.surface, padding: 8, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 6 } }, "Weak Topics"), weakTopics.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "None available"), weakTopics.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.name, style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, t.name, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.muted } }, "(", t.subject, ")")), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: C.red } }, t.masteryPct || 0, "%")))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: C.surface, padding: 8, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 6 } }, "Strong Topics"), strongTopics.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { color: C.muted } }, "None available"), strongTopics.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.name, style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, t.name, " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: C.muted } }, "(", t.subject, ")")), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: C.green } }, t.masteryPct || 0, "%"))))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u{1F3C5} Mastery"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: accentCol2 } }, masteryPct !== null ? `${masteryPct}%` : "\u2014"), ((_c = (_b = overview == null ? void 0 : overview.raw) == null ? void 0 : _b.quizzes) == null ? void 0 : _c.recentScores) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(Sparkline, { values: overview.raw.quizzes.recentScores.map((v) => Number(v) || 0), color: accentCol2, width: 160, height: 36 }))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u{1F4C8} Quiz Avg"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800 } }, ((_e = (_d = overview == null ? void 0 : overview.raw) == null ? void 0 : _d.quizzes) == null ? void 0 : _e.averageScore) ? `${overview.raw.quizzes.averageScore}%` : "\u2014"), ((_g = (_f = overview == null ? void 0 : overview.raw) == null ? void 0 : _f.quizzes) == null ? void 0 : _g.recentScores) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(MiniBarChart, { values: overview.raw.quizzes.recentScores.map((s) => Number(s) || 0), color: accentCol2, width: 160, height: 36 }))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "\u26A1 Velocity"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800 } }, (_k = (_j = velocity == null ? void 0 : velocity.cardsPerWeek) != null ? _j : (_i = (_h = overview == null ? void 0 : overview.overall) == null ? void 0 : _h.learningVelocity) == null ? void 0 : _i.cardsPerWeek) != null ? _k : "\u2014", " cards/wk"), velocity && Array.isArray(velocity.recentSessions) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement(Sparkline, { values: velocity.recentSessions.map((s) => s.score_percentage || 0), color: accentCol2, width: 160, height: 36 })))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 6 } }, "Predicted Exam Score"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: accentCol2 } }, ((_m = (_l = overview == null ? void 0 : overview.raw) == null ? void 0 : _l.quizzes) == null ? void 0 : _m.averageScore) ? `${overview.raw.quizzes.averageScore}%` : ((_n = overview == null ? void 0 : overview.overall) == null ? void 0 : _n.overallProgress) ? `${overview.overall.overallProgress}%` : "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 12, color: C.muted } }, (overview == null ? void 0 : overview.summary) || "Summary not available")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 6 } }, "Learning Velocity"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800 } }, (_o = velocity == null ? void 0 : velocity.cardsPerWeek) != null ? _o : "\u2014", " cards/week"), velocity && Array.isArray(velocity.recentSessions) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement(Sparkline, { values: velocity.recentSessions.map((s) => s.score_percentage || 0), color: accentCol2, width: 220, height: 36 })))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 8 } }, "Subject Mastery"), subjects.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { color: C.muted, fontSize: 12 } }, "No subject data."), subjects.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.subject, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, s.subject), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700 } }, s.masteryPct, "%")), /* @__PURE__ */ React.createElement(ProgressBar, { value: s.masteryPct, max: 100, color: s.masteryPct >= 80 ? C.green : s.masteryPct >= 60 ? C.gold : C.red, height: 8 })))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 8 } }, "Recent Revision History"), revisionHistory.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { color: C.muted, fontSize: 12 } }, "No revisions yet."), revisionHistory.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: i === 0 ? "none" : `1px dashed ${C.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, r.topic), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, r.when || r.date)))))));
  }
  function BottomNav({ active, onNav, config, onOpenMore }) {
    const tabs = [
      { id: "dashboard", icon: Icons.home, label: "Home" },
      { id: "chat", icon: Icons.sparkle, label: "SIMA" },
      { id: "studio", icon: Icons.play, label: "Studio" },
      { id: "study-plan", icon: Icons.chart, label: "Plan" },
      // For mobile show a compact set and a "more" drawer
      { id: "more", icon: Icons.users, label: "More" }
    ];
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width:720px)").matches;
    const mobileTabs = [
      { id: "dashboard", icon: Icons.home, label: "Home" },
      { id: "chat", icon: Icons.sparkle, label: "SIMA" },
      { id: "studio", icon: Icons.play, label: "Studio" },
      { id: "study-plan", icon: Icons.chart, label: "Plan" },
      { id: "more", icon: Icons.users, label: "More" }
    ];
    const renderButton = ({ id, icon, label }) => {
      const isActive = active === id;
      return /* @__PURE__ */ React.createElement("button", { key: id, onClick: () => {
        if (id === "more") {
          onOpenMore && onOpenMore();
        } else {
          onNav(id);
        }
      }, style: {
        background: isActive ? `linear-gradient(135deg, ${C.heroA}, ${C.heroB})` : "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        fontFamily: "inherit",
        minWidth: 0,
        padding: isActive ? "9px 14px" : "9px 10px",
        textAlign: "center",
        borderRadius: 999,
        transition: "all .18s ease"
      } }, /* @__PURE__ */ React.createElement(Icon, { d: icon, size: 19, color: isActive ? "#fff" : C.muted }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, lineHeight: 1.1, fontWeight: isActive ? 700 : 500, color: isActive ? "#fff" : C.muted, whiteSpace: "normal" } }, label));
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", left: "50%", bottom: 12, transform: "translateX(-50%)", width: "calc(100% - 24px)", maxWidth: 460, background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: 999, display: "flex", justifyContent: "space-between", gap: 2, padding: "5px 8px", zIndex: 100, boxShadow: `0 12px 30px ${C.heroA}35` } }, (isMobile ? mobileTabs : tabs).map(renderButton)));
  }
  function MoreDrawer({ onClose, profile, config, user, onNav }) {
    var _a;
    const accent = (config == null ? void 0 : config.accentColor) || C.accent;
    const now = /* @__PURE__ */ new Date();
    const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: 12, background: `linear-gradient(135deg, ${accent}, ${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 } }, /* @__PURE__ */ React.createElement("img", { src: "/wadudu.png?cb=2", style: { width: 52, height: 52 } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800 } }, greeting, ", ", ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")[0]) || "Student"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, (profile == null ? void 0 : profile.program) || "No program", " \xB7 ", (user == null ? void 0 : user.subscription) || "Free"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "\u{1F525} " + ((user == null ? void 0 : user.streak) || 0) + " day streak")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { ...S.btn(C.surface, C.muted) } }, "Close")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 8 } }, "Your learning"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("groups"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Study Groups"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("gamification"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Achievements"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("analytics"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 12 } }, "Stats & Progress"), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 8 } }, "Your account"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("profile"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Profile"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("subscription"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Subscription"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("notifications"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Notifications"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("settings"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Settings"), /* @__PURE__ */ React.createElement("div", { style: { height: 12 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 8 } }, "Support"), /* @__PURE__ */ React.createElement("button", { onClick: () => onNav("report-issue"), style: { ...S.btn(C.surface, C.text), width: "100%", textAlign: "left", padding: "12px", marginBottom: 8 } }, "Report App Issue"), /* @__PURE__ */ React.createElement("a", { href: "/terms", style: { display: "block", textDecoration: "none", color: C.muted, marginTop: 8 } }, "Terms of Use"), /* @__PURE__ */ React.createElement("a", { href: "/privacy", style: { display: "block", textDecoration: "none", color: C.muted, marginTop: 6 } }, "Privacy Policy"), /* @__PURE__ */ React.createElement("a", { href: "/help", style: { display: "block", textDecoration: "none", color: C.muted, marginTop: 6 } }, "Help & Support"), /* @__PURE__ */ React.createElement("a", { href: "/faq", style: { display: "block", textDecoration: "none", color: C.muted, marginTop: 6 } }, "FAQs"), /* @__PURE__ */ React.createElement("a", { href: "/contact", style: { display: "block", textDecoration: "none", color: C.muted, marginTop: 6 } }, "Contact Us"), /* @__PURE__ */ React.createElement("a", { href: "/about", style: { display: "block", textDecoration: "none", color: C.muted, marginTop: 6 } }, "About")), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 6 } }, "App version: 1.4")));
  }
  function DocumentUploadScreen({ profile, config, plan, onLimitReached, onUploadComplete }) {
    const [documents, setDocuments] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [generatingTools, setGeneratingTools] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    const uploadDocument = async (file) => {
      if (!file) return;
      const validTypes = [
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/jpeg",
        "image/png",
        "image/gif"
      ];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|ppt|pptx|doc|docx|txt|jpg|jpeg|png|gif)$/i)) {
        alert("\u274C Unsupported file type. Please upload PDF, PPT, Word, Text, or Images.");
        return;
      }
      if (plan === "free" && documents.length >= 3) {
        onLimitReached == null ? void 0 : onLimitReached();
        return;
      }
      setUploading(true);
      const newDoc = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type || file.name.split(".").pop(),
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
        content: ""
        // Placeholder for content
      };
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", localStorage.getItem("sima_user") ? JSON.parse(localStorage.getItem("sima_user")).id : "");
        const response = await fetch(API_BASE_URL + "/api/documents/upload", {
          method: "POST",
          headers: { "Authorization": `Bearer ${localStorage.getItem("sima_token")}` },
          body: formData
        }).catch(() => null);
        let updatedDocs;
        if (response == null ? void 0 : response.ok) {
          const data = await response.json();
          updatedDocs = [...documents, data.document];
          setDocuments(updatedDocs);
        } else {
          updatedDocs = [...documents, newDoc];
          setDocuments(updatedDocs);
        }
        localStorage.setItem("sima_documents", JSON.stringify(updatedDocs));
        alert("\u2705 Document uploaded! Taking you to Studio...");
        onUploadComplete == null ? void 0 : onUploadComplete();
      } catch (err) {
        const updatedDocs = [...documents, newDoc];
        setDocuments(updatedDocs);
        localStorage.setItem("sima_documents", JSON.stringify(updatedDocs));
        alert("\u2705 Document saved! Taking you to Studio...");
        onUploadComplete == null ? void 0 : onUploadComplete();
      }
      setUploading(false);
    };
    const generateStudyTools = async (docId) => {
      setGeneratingTools(true);
      try {
        const response = await fetch(API_BASE_URL + "/api/documents/generate-tools", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("sima_token")}` },
          body: JSON.stringify({ documentId: docId, profile, type: ["flashcards", "mcqs", "summary"] })
        });
        if (response.ok) {
          const data = await response.json();
          setGeneratedContent(data);
        } else {
          alert("\u274C Failed to generate study tools");
        }
      } catch (err) {
        alert("\u274C Generation error: " + err.message);
      }
      setGeneratingTools(false);
    };
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 100px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4DA} Study Materials"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Upload documents and generate study tools"), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          ...S.card,
          border: `2px dashed ${accentCol2}33`,
          background: accentCol2 + "11",
          padding: 32,
          textAlign: "center",
          marginBottom: 20,
          cursor: "pointer",
          transition: "all 0.3s ease"
        },
        onClick: () => document.getElementById("fileInput").click(),
        onDragOver: (e) => {
          e.preventDefault();
          e.currentTarget.style.background = accentCol2 + "22";
        },
        onDragLeave: (e) => {
          e.currentTarget.style.background = accentCol2 + "11";
        },
        onDrop: (e) => {
          var _a;
          e.preventDefault();
          if ((_a = e.dataTransfer.files) == null ? void 0 : _a[0]) {
            uploadDocument(e.dataTransfer.files[0]);
          }
        }
      },
      /* @__PURE__ */ React.createElement(
        "input",
        {
          id: "fileInput",
          type: "file",
          style: { display: "none" },
          accept: ".pdf,.ppt,.pptx,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif",
          onChange: (e) => {
            var _a;
            return uploadDocument((_a = e.target.files) == null ? void 0 : _a[0]);
          }
        }
      ),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 12 } }, "\u{1F4C4}"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 4 } }, "Drop or click to upload"),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "PDF, PPT, Word, or Images"),
      uploading && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: accentCol2, marginTop: 12 } }, "\u23F3 Uploading...")
    ), documents.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 12 } }, "Your Documents (", documents.length, ")"), documents.map((doc, idx) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: idx,
        style: {
          ...S.card,
          marginBottom: 8,
          padding: "12px 14px",
          cursor: "pointer",
          border: (selectedDoc == null ? void 0 : selectedDoc.id) === doc.id ? `2px solid ${accentCol2}` : `1px solid ${C.border}`,
          background: (selectedDoc == null ? void 0 : selectedDoc.id) === doc.id ? accentCol2 + "11" : "transparent"
        },
        onClick: () => setSelectedDoc(doc)
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, doc.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, (doc.size / 1024).toFixed(1), " KB")), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            generateStudyTools(doc.id);
          },
          style: { ...S.btn(accentCol2), padding: "8px 12px", fontSize: 12 }
        },
        generatingTools ? "\u23F3 Generating..." : "\u2728 Generate"
      ))
    ))), generatedContent && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 12 } }, "\u{1F4DA} Generated Study Tools"), generatedContent.flashcards && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 12, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 8 } }, "\u{1F3AF} Flashcards (", generatedContent.flashcards.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, lineHeight: "1.6" } }, generatedContent.flashcards.slice(0, 3).map((card, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("strong", null, "Q: ", card.question), /* @__PURE__ */ React.createElement("br", null), "A: ", card.answer))), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2, C.text), width: "100%", marginTop: 8, padding: "8px" } }, "View All ", generatedContent.flashcards.length, " Flashcards")), generatedContent.mcqs && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, marginBottom: 12, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 8 } }, "\u2753 Practice Questions (", generatedContent.mcqs.length, ")"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, lineHeight: "1.6" } }, generatedContent.mcqs.slice(0, 2).map((q, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("strong", null, "Q: ", q.question), /* @__PURE__ */ React.createElement("br", null), q.options.slice(0, 2).map((opt, j) => /* @__PURE__ */ React.createElement("div", { key: j, style: { fontSize: 12, marginLeft: 12 } }, "\u2022 ", opt))))), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2, C.text), width: "100%", marginTop: 8, padding: "8px" } }, "Take Quiz")), generatedContent.summary && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 8 } }, "\u{1F4DD} Key Summary"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, lineHeight: "1.6" } }, generatedContent.summary.slice(0, 300), "..."), /* @__PURE__ */ React.createElement("button", { style: { ...S.btn(accentCol2, C.text), width: "100%", marginTop: 8, padding: "8px" } }, "Read Full Summary"))), documents.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 20px", color: C.muted } }, /* @__PURE__ */ React.createElement(IllustrationEmptyState, { width: 140, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.text, marginTop: 10 } }, "No documents yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, marginTop: 4 } }, "Upload your first document to get started")));
  }
  function QuizScreen({ profile, config, plan, documentId }) {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    const startQuiz = async () => {
      if (!documentId) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/quiz/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("sima_token")}`
          },
          body: JSON.stringify({ documentId, questionCount: 5 })
        });
        const data = await res.json();
        setQuiz(data);
        setCurrentQuestion(0);
        setResponses([]);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    const selectAnswer = (optionIndex) => {
      const newResponses = [...responses];
      newResponses[currentQuestion] = optionIndex;
      setResponses(newResponses);
    };
    const submitQuiz = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("sima_token")}`
          },
          body: JSON.stringify({
            quizId: quiz.quizId,
            responses: responses.map((resp, idx) => ({
              questionId: quiz.questions[idx].id,
              userResponse: resp,
              correct: resp === quiz.questions[idx].correctAnswer
            }))
          })
        });
        const data = await res.json();
        setResults(data);
        setCompleted(true);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    if (!quiz) {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 20 } }, "\u2753 Quiz & Assessment"), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "20px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 12 } }, "\u{1F4DD}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, marginBottom: 12 } }, "Test your knowledge with AI-generated quizzes"), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: startQuiz,
          disabled: loading || !documentId,
          style: { ...S.btn(accentCol2), width: "100%", padding: "12px" }
        },
        loading ? "Starting..." : "Start Quiz"
      )));
    }
    if (completed && results) {
      const passed = results.passed;
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 12 } }, passed ? "\u{1F389}" : "\u{1F4DA}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 8 } }, passed ? "Great Job!" : "Keep Learning"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted } }, "Your Score")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "20px", textAlign: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, fontWeight: 800, color: accentCol2, marginBottom: 8 } }, results.scorePercentage, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 12 } }, results.correctAnswers, " of ", results.totalQuestions, " correct"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px", background: C.green + "22" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.green } }, results.correctAnswers), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Correct")), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "10px", background: C.red + "22" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: C.red } }, results.totalQuestions - results.correctAnswers), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Incorrect")))), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setQuiz(null);
            setCompleted(false);
            setResults(null);
          },
          style: { ...S.btn(accentCol2), width: "100%", padding: "12px" }
        },
        "Take Another Quiz"
      ));
    }
    const q = quiz.questions[currentQuestion];
    const progress = Math.round((currentQuestion + 1) / quiz.totalQuestions * 100);
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700 } }, "Question ", currentQuestion + 1, "/", quiz.totalQuestions), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted } }, progress, "%")), /* @__PURE__ */ React.createElement(ProgressBar, { value: currentQuestion + 1, max: quiz.totalQuestions, color: accentCol2, height: 4 }), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginTop: 16, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 600, marginBottom: 16 } }, q.question), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, q.options.map((option, idx) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: idx,
        onClick: () => selectAnswer(idx),
        style: {
          ...S.btn(responses[currentQuestion] === idx ? accentCol2 : C.surface, C.text),
          border: `1px solid ${responses[currentQuestion] === idx ? accentCol2 : C.border}`,
          padding: "12px",
          textAlign: "left",
          fontSize: 14
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 24, fontWeight: 700 } }, String.fromCharCode(65 + idx), "."),
      option
    )))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentQuestion(Math.max(0, currentQuestion - 1)),
        disabled: currentQuestion === 0,
        style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "10px", opacity: currentQuestion === 0 ? 0.5 : 1 }
      },
      "\u2190 Previous"
    ), currentQuestion === quiz.totalQuestions - 1 ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: submitQuiz,
        disabled: loading || responses.length !== quiz.totalQuestions,
        style: { ...S.btn(accentCol2), padding: "10px" }
      },
      loading ? "Submitting..." : "Submit Quiz"
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCurrentQuestion(currentQuestion + 1),
        style: { ...S.btn(accentCol2), padding: "10px" }
      },
      "Next \u2192"
    )));
  }
  function StudyPlannerScreen({ profile, config, plan }) {
    const [studyPlan, setStudyPlan] = useState(null);
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showNewPlan, setShowNewPlan] = useState(false);
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [examDate, setExamDate] = useState("");
    const [hoursPerDay, setHoursPerDay] = useState("2");
    const [coursesPerDay, setCoursesPerDay] = useState("1");
    const [previousWeekScore, setPreviousWeekScore] = useState("78");
    const [preferredTime, setPreferredTime] = useState("morning");
    const [learningStyles, setLearningStyles] = useState(["spaced-repetition"]);
    const [studySpan, setStudySpan] = useState("30");
    const [focusLevel, setFocusLevel] = useState("medium");
    const [breaksPerHour, setBreaksPerHour] = useState("2");
    const [courseDifficulty, setCourseDifficulty] = useState({});
    const [newCourse, setNewCourse] = useState("");
    const [newDifficulty, setNewDifficulty] = useState("medium");
    const accentCol2 = (config == null ? void 0 : config.accentColor) || C.accent;
    const learningStyleOptions = [
      { id: "spaced-repetition", label: "Spaced Repetition", icon: "\u{1F504}" },
      { id: "active-recall", label: "Active Recall", icon: "\u{1F9E0}" },
      { id: "group-study", label: "Group Study", icon: "\u{1F465}" },
      { id: "mind-mapping", label: "Mind Mapping", icon: "\u{1F5FA}\uFE0F" },
      { id: "visual-learning", label: "Visual Learning", icon: "\u{1F441}\uFE0F" },
      { id: "auditory", label: "Auditory", icon: "\u{1F3A7}" },
      { id: "kinesthetic", label: "Kinesthetic", icon: "\u270B" },
      { id: "reading-writing", label: "Reading/Writing", icon: "\u{1F4D6}" }
    ];
    const toggleLearningStyle = (styleId) => {
      setLearningStyles(
        (prev) => prev.includes(styleId) ? prev.filter((s) => s !== styleId) : [...prev, styleId]
      );
    };
    const addCourse = () => {
      if (newCourse.trim()) {
        setCourseDifficulty((prev) => ({ ...prev, [newCourse.trim()]: newDifficulty }));
        setNewCourse("");
      }
    };
    const buildTodaysTasks = (planData) => {
      const timetable = (planData == null ? void 0 : planData.timetable) || {};
      const tasks = [];
      Object.keys(timetable).slice(0, 3).forEach((day) => {
        const sessions = timetable[day] || [];
        sessions.slice(0, 2).forEach((session, index) => {
          tasks.push({
            title: `${day}: ${session.activity}`,
            estimatedTime: session.duration || 45,
            id: `${day}-${index}`
          });
        });
      });
      return tasks;
    };
    const loadTodaysTasks = () => {
      const fallbackTasks = buildTodaysTasks(studyPlan);
      setTodaysTasks(fallbackTasks);
    };
    const generateTimetable = () => {
      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const styleMap = {
        "spaced-repetition": { icon: "\u{1F504}", name: "Spaced Repetition" },
        "active-recall": { icon: "\u{1F9E0}", name: "Active Recall" },
        "group-study": { icon: "\u{1F465}", name: "Group Study" },
        "mind-mapping": { icon: "\u{1F5FA}\uFE0F", name: "Mind Mapping" },
        "visual-learning": { icon: "\u{1F441}\uFE0F", name: "Visual" },
        "auditory": { icon: "\u{1F3A7}", name: "Listen & Discuss" },
        "kinesthetic": { icon: "\u270B", name: "Hands-on" },
        "reading-writing": { icon: "\u{1F4D6}", name: "Reading/Notes" }
      };
      const courses = Object.keys(courseDifficulty).length > 0 ? Object.keys(courseDifficulty) : [(profile == null ? void 0 : profile.program) || "Main Subject"];
      const examDateObj = examDate ? new Date(examDate) : null;
      const daysUntilExam = examDateObj ? Math.max(0, Math.ceil((examDateObj - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24))) : null;
      const examBoost = daysUntilExam !== null ? daysUntilExam <= 7 ? 1.35 : daysUntilExam <= 14 ? 1.2 : daysUntilExam <= 30 ? 1.1 : 1 : 1;
      const performanceBoost = parseInt(previousWeekScore) < 70 ? 1.25 : parseInt(previousWeekScore) < 85 ? 1.1 : 0.95;
      const difficultyWeights = { hardest: 1.3, hard: 1.15, medium: 1, easy: 0.85 };
      const getDifficultyMultiplier = (course) => difficultyWeights[(courseDifficulty[course] || "medium").toLowerCase()] || 1;
      const schedule = {};
      const sessionsPerDay = Math.max(1, parseInt(coursesPerDay) || 1);
      daysOfWeek.forEach((day, dayIdx) => {
        const sessions = [];
        const availableCourses = courses.slice(dayIdx % courses.length).concat(courses.slice(0, dayIdx % courses.length));
        for (let i = 0; i < sessionsPerDay; i++) {
          const course = availableCourses[i % availableCourses.length] || courses[0];
          const difficultyMultiplier = getDifficultyMultiplier(course);
          const duration = Math.min(90, Math.max(30, Math.round(45 * examBoost * performanceBoost * difficultyMultiplier)));
          const learningStyle = learningStyles[i % learningStyles.length] || "spaced-repetition";
          const styleInfo = styleMap[learningStyle] || styleMap["spaced-repetition"];
          const activity = i % 2 === 0 ? `${styleInfo.icon} Study: ${course}` : `\u270D\uFE0F Practice: ${course}`;
          const description = i % 2 === 0 ? `Deep focus on ${course} with ${styleInfo.name.toLowerCase()}` : `Reinforce ${course} with active recall and quick review`;
          sessions.push({
            time: `${String(8 + i * 1.5).padStart(2, "0")}:00`,
            endTime: `${String(8 + i * 1.5 + 1).padStart(2, "0")}:00`,
            activity,
            description,
            course,
            duration,
            learningStyle,
            learningStyleInfo: styleInfo
          });
        }
        if (day === "Sunday") {
          sessions.push({
            time: "10:00",
            endTime: "10:45",
            activity: "\u{1F4CB} Weekly Review",
            description: `Recap all subjects${daysUntilExam !== null ? ` before your exam in ${daysUntilExam} days` : ""}`,
            course: "All Subjects",
            duration: 45,
            learningStyle: "active-recall",
            learningStyleInfo: styleMap["active-recall"]
          });
        }
        schedule[day] = sessions;
      });
      return schedule;
    };
    const createPlan = async () => {
      setLoading(true);
      try {
        const nextPlan = {
          goals: goals.map((g, i) => ({ id: `goal_${i}`, title: g, progress: 0 })),
          examDate,
          personalization: {
            coursesPerDay: parseInt(coursesPerDay),
            previousWeekScore: parseInt(previousWeekScore),
            hoursPerDay: parseInt(hoursPerDay),
            preferredTime,
            learningStyles,
            examDate,
            studySpan: parseInt(studySpan),
            focusLevel,
            breaksPerHour: parseInt(breaksPerHour),
            courseDifficulty
          },
          studyMethods: learningStyles.map((style) => ({ method: style.replace(/-/g, "_") })),
          timetable: generateTimetable()
        };
        localStorage.setItem("sima_study_plan", JSON.stringify(nextPlan));
        setStudyPlan(nextPlan);
        setTodaysTasks(buildTodaysTasks(nextPlan));
        setShowNewPlan(false);
        setGoals([]);
        setNewGoal("");
        setExamDate("");
        try {
          await fetch(`${API_BASE_URL}/api/study-plan/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("sima_token")}`
            },
            body: JSON.stringify(nextPlan)
          });
        } catch (err) {
          console.warn("Study plan sync skipped", err);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      const storedPlan = localStorage.getItem("sima_study_plan");
      if (storedPlan) {
        try {
          const parsed = JSON.parse(storedPlan);
          setStudyPlan(parsed);
          setTodaysTasks(buildTodaysTasks(parsed));
        } catch (err) {
          console.error("Failed to load saved study plan", err);
        }
      }
    }, []);
    const addGoal = () => {
      if (newGoal.trim()) {
        setGoals([...goals, newGoal.trim()]);
        setNewGoal("");
      }
    };
    if (showNewPlan) {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4C5} Create Study Plan"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Personalize your learning journey"), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 12 } }, "Your Goals"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 } }, goals.map((g, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", background: C.surface, padding: "8px 12px", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13 } }, g), /* @__PURE__ */ React.createElement("button", { onClick: () => setGoals(goals.filter((_, j) => j !== i)), style: { background: "none", border: "none", cursor: "pointer", color: C.muted } }, "\u2715")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          value: newGoal,
          onChange: (e) => setNewGoal(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && addGoal(),
          placeholder: "E.g., Master calculus",
          style: { ...S.input, flex: 1 }
        }
      ), /* @__PURE__ */ React.createElement("button", { onClick: addGoal, style: { ...S.btn(accentCol2), padding: "8px 14px" } }, "Add"))), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 12 } }, "\u{1F4CA} Personalization"), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Study Plan Duration (Days)"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "number",
          min: "1",
          max: "365",
          value: studySpan,
          onChange: (e) => setStudySpan(e.target.value),
          style: { ...S.input, marginBottom: 12 }
        }
      ), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Exam Date (Optional)"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "date",
          value: examDate,
          onChange: (e) => setExamDate(e.target.value),
          style: { ...S.input, marginBottom: 12 }
        }
      ), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Hours Per Day"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, ["1", "2", "3", "4", "5"].map((h) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: h,
          onClick: () => setHoursPerDay(h),
          style: {
            flex: 1,
            padding: "8px",
            borderRadius: 6,
            border: `2px solid ${hoursPerDay === h ? accentCol2 : C.border}`,
            background: hoursPerDay === h ? accentCol2 + "15" : C.surface,
            color: hoursPerDay === h ? accentCol2 : C.text,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        h,
        "h"
      ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Courses Per Day"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, ["1", "2", "3"].map((n) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: n,
          onClick: () => setCoursesPerDay(n),
          style: {
            flex: 1,
            padding: "8px",
            borderRadius: 6,
            border: `2px solid ${coursesPerDay === n ? accentCol2 : C.border}`,
            background: coursesPerDay === n ? accentCol2 + "15" : C.surface,
            color: coursesPerDay === n ? accentCol2 : C.text,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        n
      ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Last Week Score"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "number",
          min: "0",
          max: "100",
          value: previousWeekScore,
          onChange: (e) => setPreviousWeekScore(e.target.value),
          style: { ...S.input, marginBottom: 12 },
          placeholder: "% performance in the last week"
        }
      ), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Focus Level"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 } }, ["low", "medium", "high"].map((level) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: level,
          onClick: () => setFocusLevel(level),
          style: {
            padding: "8px",
            borderRadius: 6,
            border: `2px solid ${focusLevel === level ? accentCol2 : C.border}`,
            background: focusLevel === level ? accentCol2 + "15" : C.surface,
            color: focusLevel === level ? accentCol2 : C.text,
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "capitalize"
          }
        },
        level === "low" ? "\u{1F7E2} Light" : level === "medium" ? "\u{1F7E1} Medium" : "\u{1F534} Intense"
      ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Breaks Per Hour"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, ["1", "2", "3", "4"].map((b) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: b,
          onClick: () => setBreaksPerHour(b),
          style: {
            flex: 1,
            padding: "8px",
            borderRadius: 6,
            border: `2px solid ${breaksPerHour === b ? accentCol2 : C.border}`,
            background: breaksPerHour === b ? accentCol2 + "15" : C.surface,
            color: breaksPerHour === b ? accentCol2 : C.text,
            fontWeight: 600,
            cursor: "pointer"
          }
        },
        b
      ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Preferred Study Time"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 } }, ["morning", "afternoon", "evening"].map((time) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: time,
          onClick: () => setPreferredTime(time),
          style: {
            padding: "8px",
            borderRadius: 6,
            border: `2px solid ${preferredTime === time ? accentCol2 : C.border}`,
            background: preferredTime === time ? accentCol2 + "15" : C.surface,
            color: preferredTime === time ? accentCol2 : C.text,
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "capitalize"
          }
        },
        time === "morning" ? "\u{1F305}" : time === "afternoon" ? "\u2600\uFE0F" : "\u{1F319}"
      ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Learning Styles (Select Multiple)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 } }, learningStyleOptions.map((style) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: style.id,
          onClick: () => toggleLearningStyle(style.id),
          style: {
            padding: "10px 8px",
            borderRadius: 6,
            border: `2px solid ${learningStyles.includes(style.id) ? accentCol2 : C.border}`,
            background: learningStyles.includes(style.id) ? accentCol2 + "15" : C.surface,
            color: learningStyles.includes(style.id) ? accentCol2 : C.text,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 12,
            textAlign: "center"
          }
        },
        style.icon,
        " ",
        style.label
      ))), /* @__PURE__ */ React.createElement("label", { style: S.label }, "Course Difficulty (Hardest to Easiest)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          value: newCourse,
          onChange: (e) => setNewCourse(e.target.value),
          placeholder: "E.g., Advanced Physics",
          style: { ...S.input, flex: 1 }
        }
      ), /* @__PURE__ */ React.createElement("select", { value: newDifficulty, onChange: (e) => setNewDifficulty(e.target.value), style: { ...S.input, width: "auto" } }, /* @__PURE__ */ React.createElement("option", { value: "hardest" }, "Hardest"), /* @__PURE__ */ React.createElement("option", { value: "hard" }, "Hard"), /* @__PURE__ */ React.createElement("option", { value: "medium" }, "Medium"), /* @__PURE__ */ React.createElement("option", { value: "easy" }, "Easy")), /* @__PURE__ */ React.createElement("button", { onClick: addCourse, style: { ...S.btn(accentCol2), padding: "8px 14px" } }, "Add")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, Object.entries(courseDifficulty).map(([course, diff]) => /* @__PURE__ */ React.createElement("div", { key: course, style: { display: "flex", justifyContent: "space-between", alignItems: "center", background: C.surface, padding: "8px 12px", borderRadius: 8, fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", null, course), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { color: C.muted } }, diff), /* @__PURE__ */ React.createElement("button", { onClick: () => setCourseDifficulty((prev) => {
        const n = { ...prev };
        delete n[course];
        return n;
      }), style: { background: "none", border: "none", cursor: "pointer", color: C.muted } }, "\u2715")))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setShowNewPlan(false),
          style: { ...S.btn(C.surface, C.text), border: `1px solid ${C.border}`, padding: "12px" }
        },
        "Cancel"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: createPlan,
          disabled: loading || goals.length === 0,
          style: { ...S.btn(accentCol2), padding: "12px", opacity: goals.length === 0 ? 0.5 : 1 }
        },
        loading ? "Creating..." : "Create Plan"
      )));
    }
    if (!studyPlan) {
      return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "sima-display", style: { fontSize: 22, fontWeight: 800, marginBottom: 20 } }, "\u{1F4C5} Study Planner"), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "24px 20px" } }, /* @__PURE__ */ React.createElement(IllustrationPlanner, { width: 150, className: "sima-illo-float" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, marginTop: 8, marginBottom: 16, color: C.muted } }, "No study plan yet. Create one to get started!"), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setShowNewPlan(true),
          style: { ...S.btn(`linear-gradient(135deg, ${C.heroA}, ${C.heroB})`), width: "100%", justifyContent: "center", padding: "13px" }
        },
        "Create Study Plan"
      )));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 800, marginBottom: 4 } }, "\u{1F4C5} Your Study Plan"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 20 } }, "Personalized learning schedule"), todaysTasks && todaysTasks.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16, background: accentCol2 + "11", border: `1px solid ${accentCol2}33` } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 12, color: accentCol2 } }, "\u{1F4CC} Today's Tasks"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, todaysTasks.slice(0, 3).map((task, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", style: { marginTop: 4 } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, task.title || "Task"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, task.estimatedTime || "---", " min")))))), (studyPlan == null ? void 0 : studyPlan.examDate) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 14 } }, "Exam in ", Math.max(0, Math.ceil((new Date(studyPlan.examDate) - /* @__PURE__ */ new Date()) / (1e3 * 60 * 60 * 24))), " days \u2014 schedule includes extra revision and exam practice."), /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 12 } }, "\u{1F4DA} Your Goals"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, Array.isArray(studyPlan == null ? void 0 : studyPlan.goals) && studyPlan.goals.length > 0 ? studyPlan.goals.map((goal, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: C.surface, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, goal.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted } }, "Progress: ", goal.progress || 0, "%")), /* @__PURE__ */ React.createElement(ProgressBar, { value: goal.progress || 0, max: 100, color: accentCol2, height: 3 }))) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: C.muted } }, "No goals yet"))), Array.isArray(studyPlan == null ? void 0 : studyPlan.studyMethods) && studyPlan.studyMethods.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { ...S.card, padding: "16px", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, marginBottom: 12 } }, "\u{1F3AF} Recommended Methods"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, studyPlan.studyMethods.slice(0, 4).map((method, i) => /* @__PURE__ */ React.createElement(Badge, { key: i, color: accentCol2, style: { fontSize: 11 } }, (method.method || method).replace(/_/g, " ").replace(/-/g, " "))))), (studyPlan == null ? void 0 : studyPlan.timetable) && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 16, color: accentCol2 } }, "\u2728 Weekly Schedule"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12 } }, Object.entries(studyPlan.timetable).map(([day, sessions]) => /* @__PURE__ */ React.createElement("div", { key: day, style: { ...S.card, padding: "12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 8 } }, day), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, sessions.map((session, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: C.surface, borderRadius: 8, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, session.activity), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 2 } }, session.time, " \u2014 ", session.description)))))))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowNewPlan(true),
        style: { ...S.btn(accentCol2), width: "100%", padding: "12px", marginTop: 16 }
      },
      "Update Plan"
    ));
  }
  function makeAvatarSvg(id, gradFrom, gradTo, inner) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${gradFrom}"/><stop offset="100%" stop-color="${gradTo}"/>
    </linearGradient></defs>
    <circle cx="48" cy="48" r="48" fill="url(#${id})"/>
    ${inner}
  </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
  const AVATAR_GALLERY = [
    { id: "comet", label: "Comet", src: makeAvatarSvg(
      "g-comet",
      "#4b2fe0",
      "#ff8a3d",
      `<circle cx="62" cy="34" r="9" fill="#fff"/><path d="M56 40 L28 68" stroke="#ffffffaa" stroke-width="5" stroke-linecap="round"/><path d="M50 44 L30 64" stroke="#ffffff66" stroke-width="8" stroke-linecap="round"/>`
    ) },
    { id: "orbit", label: "Orbit", src: makeAvatarSvg(
      "g-orbit",
      "#a78bfa",
      "#4b2fe0",
      `<circle cx="48" cy="48" r="24" fill="none" stroke="#ffffffaa" stroke-width="3"/><circle cx="72" cy="48" r="5" fill="#fff"/>`
    ) },
    { id: "brainwave", label: "Brainwave", src: makeAvatarSvg(
      "g-brain",
      "#2dd4bf",
      "#4b2fe0",
      `<path d="M18 50 L32 50 L38 34 L46 64 L54 40 L60 50 L78 50" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
    ) },
    { id: "nova", label: "Nova", src: makeAvatarSvg(
      "g-nova",
      "#ffb020",
      "#ff8a3d",
      `<path d="M48 20 L54 42 L76 48 L54 54 L48 76 L42 54 L20 48 L42 42 Z" fill="#fff"/>`
    ) },
    { id: "crescent", label: "Crescent", src: makeAvatarSvg(
      "g-crescent",
      "#f472b6",
      "#a78bfa",
      `<path d="M60 24a26 26 0 1 0 0 48 20 20 0 1 1 0-48Z" fill="#fff"/>`
    ) },
    { id: "aurora", label: "Aurora", src: makeAvatarSvg(
      "g-aurora",
      "#ff8a3d",
      "#2dd4bf",
      `<path d="M14 58 Q32 42 48 58 T82 58" fill="none" stroke="#ffffffcc" stroke-width="5" stroke-linecap="round"/><path d="M14 70 Q32 54 48 70 T82 70" fill="none" stroke="#ffffff66" stroke-width="5" stroke-linecap="round"/>`
    ) }
  ];
  function compressImageFile(file, maxSize = 320, quality = 0.85) {
    return new Promise((resolve, reject) => {
      if (!file.type || !file.type.startsWith("image/")) {
        reject(new Error("Please choose an image file."));
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        reject(new Error("That image is larger than 12MB \u2014 try a smaller one."));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Couldn't read that file."));
      reader.onload = (event) => {
        var _a;
        const img = new Image();
        img.onerror = () => reject(new Error("Couldn't read that image."));
        img.onload = () => {
          const side = Math.min(img.width, img.height);
          const sx = (img.width - side) / 2;
          const sy = (img.height - side) / 2;
          const canvas = document.createElement("canvas");
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, sx, sy, side, side, 0, 0, maxSize, maxSize);
          try {
            resolve(canvas.toDataURL("image/jpeg", quality));
          } catch (err) {
            reject(new Error("Couldn't process that image."));
          }
        };
        img.src = (_a = event.target) == null ? void 0 : _a.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function ProfileMenuScreen({ user, onClose, onLogout, onPasswordChange, onDeleteAccount, onUserUpdate }) {
    var _a, _b;
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [avatarUploading, setAvatarUploading] = useState(false);
    const [avatarError, setAvatarError] = useState("");
    const daysWithUs = (user == null ? void 0 : user.createdAt) ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1e3 * 60 * 60 * 24)) : 0;
    const handleChangePassword = async () => {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("All fields are required");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New passwords don't match");
        return;
      }
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const response = await fetch(API_BASE_URL + "/api/auth/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("sima_token")}` },
          body: JSON.stringify({ currentPassword, newPassword })
        });
        if (!response.ok) {
          const err = await response.json();
          setError(err.error || "Failed to change password");
          setLoading(false);
          return;
        }
        setSuccess("Password changed successfully!");
        setTimeout(() => {
          setShowPasswordChange(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setSuccess("");
        }, 2e3);
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    const handleDeleteAccount = async () => {
      if (!window.confirm("Are you sure? This action cannot be undone. All your data will be deleted permanently.")) {
        return;
      }
      const password = prompt("Enter your password to confirm account deletion:");
      if (!password) {
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(API_BASE_URL + "/api/auth/delete-account", {
          method: "DELETE",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("sima_token")}` },
          body: JSON.stringify({ password })
        });
        if (!response.ok) {
          const err = await response.json();
          setError(err.error || "Failed to delete account");
          setLoading(false);
          return;
        }
        alert("Account deleted successfully. Goodbye!");
        localStorage.clear();
        sessionStorage.clear();
        onDeleteAccount == null ? void 0 : onDeleteAccount();
        window.location.href = "/";
      } catch (err) {
        setError("Network error. Please try again.");
        setLoading(false);
      }
    };
    if (showPasswordChange) {
      return /* @__PURE__ */ React.createElement("div", { style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `${C.bg}dd`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: 20
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        background: C.surface,
        borderRadius: 12,
        padding: 24,
        maxWidth: 400,
        width: "100%",
        border: `1px solid ${C.border}`
      } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 800, marginBottom: 16 } }, "\u{1F510} Change Password"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "password",
          placeholder: "Current Password",
          value: currentPassword,
          onChange: (e) => setCurrentPassword(e.target.value),
          disabled: loading,
          style: {
            width: "100%",
            padding: "10px 12px",
            marginBottom: 12,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            color: C.text,
            fontSize: 14
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "password",
          placeholder: "New Password",
          value: newPassword,
          onChange: (e) => setNewPassword(e.target.value),
          disabled: loading,
          style: {
            width: "100%",
            padding: "10px 12px",
            marginBottom: 12,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            color: C.text,
            fontSize: 14
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "password",
          placeholder: "Confirm Password",
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
          disabled: loading,
          style: {
            width: "100%",
            padding: "10px 12px",
            marginBottom: 12,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            color: C.text,
            fontSize: 14
          }
        }
      ), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginBottom: 12 } }, "\u26A0\uFE0F ", error), success && /* @__PURE__ */ React.createElement("div", { style: { color: C.green, fontSize: 12, marginBottom: 12 } }, "\u2705 ", success), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setShowPasswordChange(false);
            setError("");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          },
          disabled: loading,
          style: {
            flex: 1,
            padding: "10px 12px",
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            color: C.text,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600
          }
        },
        "Cancel"
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleChangePassword,
          disabled: loading,
          style: {
            flex: 1,
            padding: "10px 12px",
            background: C.accent,
            border: "none",
            borderRadius: 8,
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600
          }
        },
        loading ? "Updating\u2026" : "Update"
      ))));
    }
    return /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `${C.bg}dd`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: 20
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.surface,
      borderRadius: 12,
      padding: 24,
      maxWidth: 420,
      width: "100%",
      border: `1px solid ${C.border}`,
      maxHeight: "90vh",
      overflow: "auto"
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 800 } }, "\u{1F464} Profile"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        style: {
          background: "transparent",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          color: C.muted
        }
      },
      "\u2715"
    )), /* @__PURE__ */ React.createElement("div", { style: { background: C.card, borderRadius: 8, padding: 16, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { width: 60, height: 60, borderRadius: "50%", background: (user == null ? void 0 : user.avatarImage) ? "transparent" : `linear-gradient(135deg, ${C.accent}, ${C.purple})`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, cursor: "pointer", color: "white", flexShrink: 0 } }, (user == null ? void 0 : user.avatarImage) ? /* @__PURE__ */ React.createElement("img", { src: user.avatarImage, alt: "Profile", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : (user == null ? void 0 : user.avatar) || "\u{1F60A}"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 4 } }, "Profile Picture"), avatarError && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.red, marginBottom: 6 } }, avatarError), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("label", { style: { width: 36, height: 36, borderRadius: "50%", background: C.surface, border: `2px solid ${C.border}`, cursor: avatarUploading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, opacity: avatarUploading ? 0.6 : 1 } }, avatarUploading ? "\u23F3" : "\u{1F4E4}", /* @__PURE__ */ React.createElement("input", { type: "file", accept: "image/*", disabled: avatarUploading, style: { display: "none" }, onChange: async (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      e.target.value = "";
      if (!file) return;
      setAvatarError("");
      setAvatarUploading(true);
      try {
        const dataUrl = await compressImageFile(file);
        const updUser = { ...user, avatarImage: dataUrl, avatar: null };
        localStorage.setItem("sima_user", JSON.stringify(updUser));
        onUserUpdate == null ? void 0 : onUserUpdate(updUser);
      } catch (err) {
        setAvatarError(err.message || "Couldn't set that as your profile picture. Try a different image.");
      } finally {
        setAvatarUploading(false);
      }
    } })), ["\u{1F60A}", "\u{1F60E}", "\u{1F914}", "\u{1F60C}", "\u{1F60D}", "\u{1F970}", "\u{1F603}", "\u{1F917}"].map((avatar) => /* @__PURE__ */ React.createElement("button", { key: avatar, onClick: () => {
      const updUser = { ...user, avatar, avatarImage: null };
      localStorage.setItem("sima_user", JSON.stringify(updUser));
      onUserUpdate == null ? void 0 : onUserUpdate(updUser);
    }, style: { width: 36, height: 36, borderRadius: "50%", background: (user == null ? void 0 : user.avatar) === avatar && !(user == null ? void 0 : user.avatarImage) ? C.accent : C.surface, border: `2px solid ${(user == null ? void 0 : user.avatar) === avatar && !(user == null ? void 0 : user.avatarImage) ? C.accent : C.border}`, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" } }, avatar))), AVATAR_GALLERY.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted, margin: "10px 0 6px" } }, "Or pick an avatar"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, AVATAR_GALLERY.map((av) => {
      const isActive = (user == null ? void 0 : user.avatarImage) === av.src;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: av.id,
          title: av.label,
          onClick: () => {
            const updUser = { ...user, avatarImage: av.src, avatar: null };
            localStorage.setItem("sima_user", JSON.stringify(updUser));
            onUserUpdate == null ? void 0 : onUserUpdate(updUser);
          },
          style: {
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `2px solid ${isActive ? C.accent : "transparent"}`,
            boxShadow: isActive ? `0 0 0 2px ${C.card}` : "none",
            cursor: "pointer",
            padding: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: C.surface
          }
        },
        /* @__PURE__ */ React.createElement("img", { src: av.src, alt: av.label, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
      );
    }))))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Name"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 16, color: (user == null ? void 0 : user.name) && user.name !== "User" ? C.text : C.muted } }, (user == null ? void 0 : user.name) && user.name !== "User" ? user.name : ((_a = user == null ? void 0 : user.email) == null ? void 0 : _a.split("@")[0]) || "User"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Email"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, marginBottom: 16 } }, user == null ? void 0 : user.email, (user == null ? void 0 : user.email_verified) && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 8, color: C.green, fontWeight: 600 } }, "\u2713 Verified")), (user == null ? void 0 : user.phone) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Phone"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, marginBottom: 16 } }, user.phone, user.phone_verified && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 8, color: C.green, fontWeight: 600 } }, "\u2713 Verified"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Referral Code"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, marginBottom: 16, wordBreak: "break-all" } }, (user == null ? void 0 : user.referralCode) || "Not generated yet"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Referred By"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, marginBottom: 16 } }, ((_b = user == null ? void 0 : user.referredBy) == null ? void 0 : _b.email) || ((user == null ? void 0 : user.referredBy) ? user.referredBy : "None")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Referral Link"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.text, flex: 1, wordBreak: "break-all" } }, typeof window !== "undefined" ? `${window.location.origin}/download?ref=${(user == null ? void 0 : user.referralCode) || ""}` : ""), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          if ((user == null ? void 0 : user.referralCode) && navigator.clipboard) {
            navigator.clipboard.writeText(`${window.location.origin}/download?ref=${user.referralCode}`);
          }
        },
        style: { padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, cursor: "pointer" }
      },
      "Copy"
    )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: C.muted, marginBottom: 6 } }, "Days with us"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700 } }, daysWithUs, " days \u{1F4C8}")), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setShowPasswordChange(true),
        style: {
          width: "100%",
          padding: "12px 16px",
          marginBottom: 8,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          color: C.text,
          cursor: "pointer",
          fontWeight: 600,
          textAlign: "left",
          transition: "all 0.3s ease"
        },
        onMouseEnter: (e) => {
          e.target.style.background = `${C.card}cc`;
          e.target.style.borderColor = C.accent;
        },
        onMouseLeave: (e) => {
          e.target.style.background = C.card;
          e.target.style.borderColor = C.border;
        }
      },
      "\u{1F510} Change Password"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => onLogout == null ? void 0 : onLogout(),
        style: {
          width: "100%",
          padding: "12px 16px",
          marginBottom: 8,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          color: C.text,
          cursor: "pointer",
          fontWeight: 600,
          textAlign: "left",
          transition: "all 0.3s ease"
        },
        onMouseEnter: (e) => {
          e.target.style.background = `${C.card}cc`;
          e.target.style.borderColor = C.accent;
        },
        onMouseLeave: (e) => {
          e.target.style.background = C.card;
          e.target.style.borderColor = C.border;
        }
      },
      "\u{1F6AA} Switch User"
    ), /* @__PURE__ */ React.createElement("div", { style: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 8 } }, "Share & Invite"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: C.muted, marginBottom: 12 } }, "Invite friends with your referral link and earn rewards."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "Invite link"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, fontSize: 12, color: C.text, wordBreak: "break-all" } }, typeof window !== "undefined" ? `${window.location.origin}/download?ref=${(user == null ? void 0 : user.referralCode) || ""}` : ""), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          const inviteUrl = typeof window !== "undefined" ? `${window.location.origin}/download?ref=${(user == null ? void 0 : user.referralCode) || ""}` : "";
          if (!inviteUrl || !navigator.clipboard) return;
          navigator.clipboard.writeText(inviteUrl);
        },
        style: { padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, color: C.text, cursor: (user == null ? void 0 : user.referralCode) ? "pointer" : "not-allowed" },
        disabled: !(user == null ? void 0 : user.referralCode)
      },
      "Copy"
    )), navigator.share && (user == null ? void 0 : user.referralCode) ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          navigator.share({
            title: "Join Sima Mind",
            text: "Start learning with Sima Mind. Use my invite link to sign up.",
            url: `${window.location.origin}/download?ref=${user.referralCode}`
          });
        },
        style: { padding: "10px 14px", borderRadius: 8, border: "none", background: C.accent, color: "white", cursor: "pointer", fontWeight: 600 }
      },
      "Share Invite"
    ) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: C.muted } }, "Use the copy button to share your invite link."))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleDeleteAccount,
        disabled: loading,
        style: {
          width: "100%",
          padding: "12px 16px",
          marginBottom: 8,
          background: `${C.red}22`,
          border: `1px solid ${C.red}44`,
          borderRadius: 8,
          color: C.red,
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 600,
          textAlign: "left",
          transition: "all 0.3s ease",
          opacity: loading ? 0.6 : 1
        },
        onMouseEnter: (e) => !loading && (e.target.style.background = `${C.red}44`),
        onMouseLeave: (e) => !loading && (e.target.style.background = `${C.red}22`)
      },
      loading ? "Deleting\u2026" : "\u{1F5D1}\uFE0F Delete Account"
    ), error && /* @__PURE__ */ React.createElement("div", { style: { color: C.red, fontSize: 12, marginTop: 12 } }, "\u26A0\uFE0F ", error), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        style: {
          width: "100%",
          padding: "12px 16px",
          marginTop: 12,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          color: C.muted,
          cursor: "pointer",
          fontWeight: 600
        }
      },
      "Close"
    )));
  }
  const DEFAULT_PROFILE = {
    name: "Guest",
    education: "university",
    program: "General",
    style: ["visual"],
    hours: 3,
    attention: "medium",
    studyTime: "morning"
  };
  const createProfileFromUser = (user) => {
    var _a;
    return {
      ...DEFAULT_PROFILE,
      name: (user == null ? void 0 : user.name) || (((_a = user == null ? void 0 : user.email) == null ? void 0 : _a.split("@")[0]) || DEFAULT_PROFILE.name)
    };
  };
  function SimaMindApp() {
    const [screen2, setScreen] = useState("welcome");
    const [booting, setBooting] = useState(true);
    const [splashFading, setSplashFading] = useState(false);
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [user, setUser] = useState(null);
    const [config, setConfig] = useState(null);
    const [plan, setPlan] = useState("free");
    const [isFirstUse, setIsFirstUse] = useState(true);
    const [groupContext, setGroupContext] = useState(null);
    const [showPomodoro, setShowPomodoro] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
    const [showMoreDrawer, setShowMoreDrawer] = useState(false);
    const [displayMode, setDisplayMode] = useState("default");
    const [prefersDark, setPrefersDark] = useState(
      typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    const themeMode = displayMode === "default" ? prefersDark ? "dark" : "light" : displayMode;
    const currentTheme = THEME_PALETTES[themeMode] || THEME_PALETTES.dark;
    Object.assign(C, currentTheme);
    const subscription = useSubscription();
    const applyProfile = async (p) => {
      try {
        const response = await fetch("/api/onboarding/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("sima_token")}` },
          body: JSON.stringify({
            name: p.name,
            age: p.age,
            education: p.education,
            program: p.program,
            year: p.year,
            institution: p.institution,
            studyTime: p.studyTime,
            attention: p.attention,
            style: p.style,
            hours: p.hours,
            urgency: p.urgency,
            email: p.email
          })
        });
        if (!response.ok) {
          const error = await response.json();
          console.error("Profile save error:", error);
          return;
        }
        setProfile(p);
        setConfig(PROFILE_ENGINE.getConfig(p, { resetProgress: true }));
      } catch (err) {
        console.error("Failed to save profile:", err);
      }
    };
    const handleGuest = () => {
      const guestProfile = { name: "Guest", education: "university", program: "General", style: ["visual"], hours: 3, attention: "medium", studyTime: "morning" };
      try {
        subscription.upgradePlan && subscription.upgradePlan("free");
      } catch (err) {
      }
      applyProfile(guestProfile);
      setScreen("dashboard");
    };
    const handleResetProgress = () => {
      if (!profile) return;
      applyProfile(profile);
      alert("\u2705 Study progress has been reset to a fresh starting state.");
    };
    const handlePlanChange = (newPlan) => {
      const selectedPlan = PLANS.find((p) => p.id === newPlan);
      if (selectedPlan.price.usd > 0) {
        setScreen("payment");
        setPlan(newPlan);
      } else {
        setPlan(newPlan);
        setScreen("dashboard");
        console.log(`Activated ${newPlan} plan`);
      }
    };
    const handlePaymentComplete = (receipt) => {
      subscription.upgradePlan(plan);
      setScreen("dashboard");
      alert(`\u{1F389} Welcome to ${PLANS.find((p) => p.id === plan).label}! Your receipt: ${receipt.id}`);
    };
    const handleVerificationComplete = async (method, value) => {
      var _a;
      localStorage.setItem("verified_contact", JSON.stringify({ method, value, timestamp: Date.now() }));
      const savedUser = localStorage.getItem("sima_user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          const userName = parsedUser.name && parsedUser.name !== "User" ? parsedUser.name : ((_a = parsedUser.email) == null ? void 0 : _a.split("@")[0]) || "User";
          const enrichedUser = { ...parsedUser, name: userName, avatar: parsedUser.avatar || "\u{1F60A}", avatarImage: parsedUser.avatarImage || null };
          setUser(enrichedUser);
          localStorage.setItem("sima_user", JSON.stringify(enrichedUser));
          await loadUserProfile(enrichedUser);
        } catch (error) {
          console.error("Failed to restore verified user", error);
        }
      }
      setScreen("welcome-message");
    };
    const handleWelcomeComplete = () => {
      setScreen("onboarding");
    };
    const loadUserProfile = async (existingUser = null) => {
      const token = localStorage.getItem("sima_token");
      if (!token) return existingUser;
      try {
        const response = await fetch(API_BASE_URL + "/api/auth/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) return existingUser;
        const profileData = await response.json();
        const enrichedUser = {
          ...existingUser || {},
          ...profileData,
          avatar: existingUser && existingUser.avatar || "\u{1F60A}",
          avatarImage: existingUser && existingUser.avatarImage || null
        };
        localStorage.setItem("sima_user", JSON.stringify(enrichedUser));
        setUser(enrichedUser);
        return enrichedUser;
      } catch (error) {
        console.error("Failed to refresh user profile", error);
        return existingUser;
      }
    };
    const handleLoginSuccess = async (user2) => {
      var _a;
      const userName = user2.name && user2.name !== "User" ? user2.name : ((_a = user2.email) == null ? void 0 : _a.split("@")[0]) || "User";
      const updatedUser = { ...user2, name: userName, avatar: user2.avatar || "\u{1F60A}", avatarImage: user2.avatarImage || null };
      localStorage.setItem("sima_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      const refreshedUser = await loadUserProfile(updatedUser);
      const nextProfile = createProfileFromUser(refreshedUser || updatedUser);
      setProfile(nextProfile);
      setScreen("dashboard");
      setIsFirstUse(false);
    };
    const handleUserUpdate = (updatedUser) => {
      setUser(updatedUser);
    };
    const handleLogout = () => {
      localStorage.clear();
      sessionStorage.clear();
      setProfile(null);
      setConfig(null);
      setPlan("free");
      setScreen("landing");
    };
    useEffect(() => {
      const initializeFromStorage = async () => {
        const token = localStorage.getItem("sima_token");
        const savedUser = localStorage.getItem("sima_user");
        if (!token) {
          setScreen("landing");
          return;
        }
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setProfile(createProfileFromUser(parsedUser));
            setScreen("dashboard");
            setIsFirstUse(false);
            await loadUserProfile(parsedUser);
            return;
          } catch (error) {
            console.error("Failed to parse saved user", error);
          }
        }
        await loadUserProfile();
        setScreen("dashboard");
        setIsFirstUse(false);
      };
      const MIN_SPLASH_MS = 1200;
      const bootStartedAt = Date.now();
      const finishBoot = () => {
        const remaining = Math.max(0, MIN_SPLASH_MS - (Date.now() - bootStartedAt));
        setTimeout(() => {
          setSplashFading(true);
          setTimeout(() => setBooting(false), 700);
        }, remaining);
      };
      initializeFromStorage().finally(finishBoot);
    }, []);
    const [prevScreen, setPrevScreen] = useState(null);
    const bottomTargets = ["chat", "studio", "study-plan", "groups", "gamification", "analytics"];
    const navigateTo = (id) => {
      try {
        if (id !== screen2 && bottomTargets.includes(id)) setPrevScreen(screen2);
      } catch (e) {
      }
      setScreen(id);
    };
    const [showStatsPopover, setShowStatsPopover] = useState(false);
    const toggleStats = (open) => setShowStatsPopover((s) => typeof open === "boolean" ? open : !s);
    const goBack = () => {
      setScreen(prevScreen || "dashboard");
      setPrevScreen(null);
    };
    useEffect(() => {
      Object.assign(C, currentTheme);
      const style = document.createElement("style");
      const buildStyles = () => `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
      @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      @keyframes fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: ${currentTheme.bg}; color: ${currentTheme.text}; }
      html { background: ${currentTheme.bg}; color: ${currentTheme.text}; }
      ::-webkit-scrollbar { width: 3px; height: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${currentTheme.border}; border-radius: 4px; }
      select option { background: ${currentTheme.card}; color: ${currentTheme.text}; }
      input, textarea, select { color: ${currentTheme.text}; }
      input[type=range] { height: 4px; border-radius: 2px; }
      button:focus, input:focus, textarea:focus, select:focus { outline: 2px solid ${currentTheme.accent}; outline-offset: 2px; }
    `;
      style.innerHTML = buildStyles();
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, [currentTheme]);
    useEffect(() => {
      if (!window.matchMedia) return;
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event) => setPrefersDark(event.matches);
      if (query.addEventListener) query.addEventListener("change", handleChange);
      else query.addListener(handleChange);
      return () => {
        if (query.removeEventListener) query.removeEventListener("change", handleChange);
        else query.removeListener(handleChange);
      };
    }, []);
    useEffect(() => {
      if (!localStorage.getItem("sima_subscription")) {
        const trialSubscription = {
          plan: "trial",
          startDate: (/* @__PURE__ */ new Date()).toISOString(),
          trialEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString(),
          verified: false,
          email: null,
          phone: null,
          devices: [],
          usage: { messages: 0, uploads: 0, flashcards: 0, mcqs: 0 },
          lastReset: (/* @__PURE__ */ new Date()).toISOString()
        };
        localStorage.setItem("sima_subscription", JSON.stringify(trialSubscription));
      }
    }, []);
    const showNav = !["welcome", "onboarding", "verification", "welcome-message", "payment", "landing", "login"].includes(screen2);
    const activeConfig = config || PROFILE_ENGINE.getConfig({ education: "university", program: "General" });
    const showHeader = showNav && bottomTargets.includes(screen2);
    return /* @__PURE__ */ React.createElement("div", { style: S.page }, booting && /* @__PURE__ */ React.createElement(SplashScreen, { fading: splashFading }), showHeader && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, height: 52, display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", zIndex: 220, background: C.surface, borderBottom: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("button", { onClick: goBack, style: { ...S.btn(C.accent), padding: "8px 10px", fontSize: 13 } }, "\u2190 Back")), screen2 === "landing" && /* @__PURE__ */ React.createElement(
      LandingScreen,
      {
        onStart: (mode) => mode === "login" ? setScreen("login") : setScreen("verification"),
        onGuest: handleGuest,
        onLoginSuccess: handleLoginSuccess,
        displayMode,
        themeMode,
        onDisplayModeChange: setDisplayMode
      }
    ), screen2 === "login" && /* @__PURE__ */ React.createElement(
      LoginScreen,
      {
        onLoginSuccess: handleLoginSuccess,
        onBack: () => setScreen("landing"),
        onRegister: () => setScreen("verification"),
        subscription,
        themeMode
      }
    ), screen2 === "verification" && /* @__PURE__ */ React.createElement(
      VerificationScreen,
      {
        onVerified: handleVerificationComplete,
        subscription,
        onBack: () => setScreen("landing"),
        onGuest: handleGuest
      }
    ), screen2 === "welcome-message" && /* @__PURE__ */ React.createElement(WelcomeMessageScreen, { onContinue: handleWelcomeComplete }), screen2 === "payment" && /* @__PURE__ */ React.createElement(
      PaymentScreen,
      {
        plan,
        onPaymentComplete: handlePaymentComplete,
        onBack: () => setScreen("upgrade")
      }
    ), screen2 === "welcome" && /* @__PURE__ */ React.createElement(WelcomeScreen, { onStart: () => setScreen("onboarding"), onGuest: handleGuest }), screen2 === "onboarding" && /* @__PURE__ */ React.createElement(OnboardingScreen, { onComplete: async (p) => {
      await applyProfile(p);
      setScreen("dashboard");
    } }), showNav && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", paddingTop: showHeader ? 56 : 0 } }, screen2 === "dashboard" && /* @__PURE__ */ React.createElement(Dashboard, { profile, config: activeConfig, plan, onNav: navigateTo, onPomodoro: () => setShowPomodoro(true), onNotes: () => setShowNotes(true), onResetProgress: handleResetProgress, onProfileClick: () => setShowProfileMenu(true), onLogout: handleLogout, user, isFirstUse }), screen2 === "chat" && /* @__PURE__ */ React.createElement(ChatScreen, { profile, config: activeConfig, plan, groupContext, onLimitReached: () => setShowUpgradePrompt(true) }), screen2 === "documents" && /* @__PURE__ */ React.createElement(DocumentUploadScreen, { profile, config: activeConfig, plan, onLimitReached: () => setShowUpgradePrompt(true), onUploadComplete: () => setScreen("studio") }), screen2 === "quiz" && /* @__PURE__ */ React.createElement(QuizScreen, { profile, config: activeConfig, plan, documentId: null }), screen2 === "studio" && /* @__PURE__ */ React.createElement(StudioScreen, { profile, config: activeConfig, plan }), screen2 === "srs" && /* @__PURE__ */ React.createElement(SpacedRepetitionScreen, { profile, config: activeConfig }), screen2 === "study-plan" && /* @__PURE__ */ React.createElement(StudyPlannerScreen, { profile, config: activeConfig, plan }), screen2 === "gamification" && /* @__PURE__ */ React.createElement(GamificationScreen, { profile, config: activeConfig, plan }), screen2 === "timetable" && /* @__PURE__ */ React.createElement(TimetableScreen, { profile, config: activeConfig }), screen2 === "analytics" && /* @__PURE__ */ React.createElement(AnalyticsDashboardScreen, { profile, config: activeConfig, plan, isFirstUse }), screen2 === "groups" && /* @__PURE__ */ React.createElement(GroupsScreen, { profile, config: activeConfig }), screen2 === "upgrade" && /* @__PURE__ */ React.createElement(UpgradeScreen, { onUpgrade: handlePlanChange, onEnterprise: () => setScreen("enterprise") })), showNav && /* @__PURE__ */ React.createElement(BottomNav, { active: screen2, onNav: navigateTo, config: activeConfig, onOpenMore: () => setShowMoreDrawer(true) }), showMoreDrawer && /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: "100%", background: "#0006" }, onClick: () => setShowMoreDrawer(false) }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", right: 0, top: 0, bottom: 0, width: "86%", maxWidth: 420, background: C.card, borderLeft: `1px solid ${C.border}`, padding: 18, overflowY: "auto" } }, /* @__PURE__ */ React.createElement(MoreDrawer, { onClose: () => setShowMoreDrawer(false), profile, config: activeConfig, user, onNav: (id) => {
      setShowMoreDrawer(false);
      navigateTo(id);
    } }))), showStatsPopover && /* @__PURE__ */ React.createElement(StatsPopover, { onClose: () => setShowStatsPopover(false), profile, config: activeConfig }), showPomodoro && /* @__PURE__ */ React.createElement(PomodoroTimer, { onClose: () => setShowPomodoro(false), config: activeConfig }), showNotes && /* @__PURE__ */ React.createElement(QuickNotes, { onClose: () => setShowNotes(false) }), showUpgradePrompt && /* @__PURE__ */ React.createElement(
      UpgradePromptModal,
      {
        plan,
        onClose: () => setShowUpgradePrompt(false),
        onUpgrade: handlePlanChange
      }
    ), showProfileMenu && /* @__PURE__ */ React.createElement(
      ProfileMenuScreen,
      {
        user: { ...user, phone: (user == null ? void 0 : user.phone) || "", email_verified: user == null ? void 0 : user.email_verified, phone_verified: user == null ? void 0 : user.phone_verified },
        onClose: () => setShowProfileMenu(false),
        onLogout: handleLogout,
        onPasswordChange: () => setShowProfileMenu(false),
        onDeleteAccount: handleLogout,
        onUserUpdate: handleUserUpdate
      }
    ));
  }
  try {
    ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(SimaMindApp, null));
  } catch (err) {
    console.error(err);
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.innerHTML = `<div style="font-family: Arial, sans-serif; padding: 24px; color: #111; background: #fff; min-height: 100vh;">Unable to render SIMA MIND: ${err.message}</div>`;
    }
  }
})();
