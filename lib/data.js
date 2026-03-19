// ─── SITE DATA ───────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Berke Jaisyurrohman",
  fullName: "Qiageng Berke Jaisyurrohman",
  location: "Bekasi, Indonesia",
  email: "berkejaisyurrohman95@gmail.com",
  phone: "+62 895-0614-7763",
  website: "www.reallygreatsite.com",
  school: "SMK TI Bazma",
  major: "Network Information Systems and Applications",
  status: "Available for collaboration",
};

export const SCENES = [
  { id: "scene-hero",    label: "Home" },
  { id: "scene-about",  label: "About" },
  { id: "scene-proj-1", label: "IQRA App" },
  { id: "scene-proj-2", label: "Bazma Cipher" },
  { id: "scene-proj-3", label: "KajianQu" },
  { id: "scene-skills", label: "Skills" },
  { id: "scene-contact",label: "Contact" },
];

export const PROJECTS = [
  {
    num: "01",
    cat: "EdTech · Full-Stack",
    tag: "Web · React · 2024",
    title: ["IQRA", "School", "Monitor"],
    emoji: "📚",
    org: "SMK TI Bazma · 2024",
    desc: "Full-stack school monitoring with Qur'an memorization tracking and multi-role dashboards for teachers, students, and parents. JWT authentication with normalized database integration.",
    tech: ["React", "Laravel", "MySQL", "TypeScript"],
    accentColor: "#6A8C72",
    sceneClass: "scene-proj-1",
    catColor: "#6A8C72",
    linkColor: "#6A8C72",
    featured: false,
    mirror: false,
  },
  {
    num: "02",
    cat: "Cybersecurity · Encryption",
    tag: "Security · Python · 2024",
    title: ["Bazma", "Cipher", "System"],
    emoji: "🔐",
    org: "SMK TI Bazma · 2024",
    desc: "Custom cipher algorithms alongside industry-standard cryptography to protect sensitive application data. Safeguards student and staff records at a school-wide level.",
    tech: ["Python", "JavaScript", "Cryptography"],
    accentColor: "#C8845C",
    sceneClass: "scene-proj-2",
    catColor: "#C8845C",
    linkColor: "#C8845C",
    featured: false,
    mirror: true,
  },
  {
    num: "03",
    cat: "AI · Mobile · Islamic Tech",
    tag: "Flutter · AI/ML · 2025 · Featured",
    title: ["KajianQu", "AI Qur'an", "App"],
    emoji: "☪️",
    org: "Personal Project · 2025",
    desc: "AI-powered Qur'an app: Tajweed guidance via ML, spaced-repetition memorization, Arabic OCR, tafsir browser, GPS prayer times, and offline-first architecture — bridging classical Islamic learning with modern AI.",
    tech: ["Flutter", "Python", "TensorFlow", "Firebase"],
    accentColor: "#9090CC",
    sceneClass: "scene-proj-3",
    catColor: "#9090CC",
    linkColor: "#9090CC",
    featured: true,
    mirror: false,
  },
];

export const SKILLS = [
  { name: "JavaScript",   pct: 90 },
  { name: "TypeScript",   pct: 88 },
  { name: "Python",       pct: 70, badge: "Entry" },
  { name: "React",        pct: 85 },
  { name: "Laravel",      pct: 95 },
  { name: "MySQL",        pct: 90 },
  { name: "React Native", pct: 90 },
  { name: "Flutter",      pct: 90 },
  { name: "Blade",        pct: 95 },
  { name: "SIOT",         pct: 85 },
  { name: "Astro",        pct: 72, badge: "Entry" },
];

export const LANGUAGES = [
  { flag: "🇮🇩", name: "Indonesian", level: "Native" },
  { flag: "🇬🇧", name: "English",    level: "Professional" },
  { flag: "🇯🇵", name: "Japanese",   level: "Basic" },
  { flag: "🇩🇪", name: "German",     level: "Basic" },
];

export const SOFT_SKILLS = [
  { name: "Problem Solving",    level: "Core" },
  { name: "Analytical Thinking",level: "Core" },
  { name: "System Design",      level: "Developing" },
  { name: "Teamwork",           level: "Core" },
  { name: "Fast Learner",       level: "Core" },
];

export const ABOUT_INFO = [
  { label: "Location",  value: "Bekasi, Indonesia" },
  { label: "Education", value: "SMK TI Bazma · Network Info Systems" },
  { label: "Status",    value: "Open to Work", highlight: true },
  { label: "Projects",  value: "6+ in Production" },
  { label: "Languages", value: "Indonesian · English · Japanese · German" },
];