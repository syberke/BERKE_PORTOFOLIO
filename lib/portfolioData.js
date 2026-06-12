/* Portfolio Data Constants */

export const SERVICES = [
  { icon:"🌐", title:"Web Development", desc:"Full-stack web apps with modern frameworks. From landing pages to complex SaaS platforms.", tech:["Laravel","React","MySQL","TypeScript"], color:"var(--accent)" },
  { icon:"📱", title:"Mobile Development", desc:"Cross-platform mobile apps for iOS and Android with native-quality experiences.", tech:["React Native","Flutter","Firebase"], color:"var(--sage)" },
  { icon:"🔐", title:"Cybersecurity", desc:"Data encryption, secure authentication, and security system design to protect sensitive data.", tech:["Python","Cryptography","JWT"], color:"var(--violet)" },
  { icon:"☪️", title:"Islamic Tech", desc:"Apps serving the Muslim community — Qur'an apps, prayer time systems, Islamic learning AI.", tech:["Flutter","AI/ML","Firebase"], color:"var(--gold)" },
  { icon:"🤖", title:"AI Integration", desc:"Integrating ML and AI features into applications — recommendations, NLP, computer vision.", tech:["Python","TensorFlow","OpenAI"], color:"var(--coral)" },
  { icon:"🏗️", title:"System Architecture", desc:"Scalable, maintainable architectures including microservices, REST APIs, and database design.", tech:["Docker","REST API","MySQL"], color:"var(--accent)" },
];

export const PROJECTS = [
  { num:"01", tag:"Social Impact", cat:"Web", icon:"🏛️", name:"Bazma × Pertamina Bansos", year:"2024", org:"SMK TI Bazma", desc:"Responsive web platform managing social assistance distribution with real-time tracking, transparent data management, and reporting.", tech:["Laravel","MySQL","Blade","JS"], color:"var(--accent)" },
  { num:"02", tag:"EdTech", cat:"Web", icon:"📚", name:"IQRA App — School Monitor", year:"2024", org:"SMK TI Bazma", desc:"Full-stack school monitoring with Qur'an memorization tracking and multi-role dashboards for teachers, students, and parents.", tech:["React","Laravel","MySQL","TS"], color:"var(--sage)" },
  { num:"03", tag:"Mobile", cat:"Mobile", icon:"🏠", name:"Dormitory Attendance App", year:"2024", org:"SMK TI Bazma", desc:"Real-time attendance tracking with secure login, live monitoring, automated reporting, and supervisor notifications.", tech:["React Native","Laravel","MySQL"], color:"var(--violet)" },
  { num:"04", tag:"E-Commerce", cat:"Web", icon:"🛒", name:"E-Commerce Platform", year:"2024", org:"SMK TI Bazma", desc:"Complete online store with product catalog, cart, checkout, order tracking, and admin dashboard for inventory and analytics.", tech:["Laravel","Blade","MySQL","JS"], color:"var(--gold)" },
  { num:"05", tag:"Cybersecurity", cat:"Security", icon:"🔐", name:"Bazma Cipher", year:"2024", org:"SMK TI Bazma", desc:"Prototype encryption system with custom cipher algorithms and industry-standard cryptography protecting sensitive application data.", tech:["Python","JavaScript","Crypto"], color:"var(--coral)" },
  { num:"06", tag:"AI · Islamic · Mobile", cat:"Mobile", icon:"☪️", name:"KajianQu — AI Qur'an App", year:"2025", org:"Personal Project", desc:"AI-powered Qur'an mobile app: smart Tajweed guidance via ML, spaced-repetition memorization, Arabic OCR, tafsir browser, and offline-first.", tech:["Flutter","Python","AI/ML","TF"], color:"var(--accent)" },
];

export const SKILLS = [
  { name:"JavaScript", lvl:90 }, { name:"TypeScript", lvl:78 },
  { name:"Python", lvl:70, badge:"Entry" }, { name:"React", lvl:85 },
  { name:"Astro", lvl:65, badge:"Entry" }, { name:"Laravel", lvl:88 },
  { name:"Blade", lvl:82 }, { name:"MySQL", lvl:84 },
  { name:"React Native", lvl:80 }, { name:"Flutter", lvl:75 }, { name:"SIOT", lvl:70 },
];

export const LANGS = [
  { lang:"Indonesian", lvl:100, flag:"🇮🇩", label:"Native", color:"var(--sage)" },
  { lang:"English", lvl:75, flag:"🇬🇧", label:"Professional", color:"var(--accent)" },
  { lang:"Japanese", lvl:35, flag:"🇯🇵", label:"Basic", color:"var(--violet)" },
  { lang:"German", lvl:32, flag:"🇩🇪", label:"Basic", color:"var(--gold)" },
];

export const TIMELINE = [
  { year:"2025", role:"Personal AI Project", company:"Self-Directed", icon:"🤖", active:true, points:["Developing KajianQu — AI Qur'an mobile app with Flutter + TensorFlow.","Researching ML models for Arabic text recognition and Tajweed correction."] },
  { year:"2024", role:"Software Developer (Project-Based)", company:"SMK TI Bazma · Ciampea, Bogor", icon:"💼", active:false, points:["Built Bazma × Pertamina Bansos web platform for social assistance management.","Developed IQRA multi-role school monitoring system.","Implemented Bazma Cipher encryption and security module.","Delivered 4 production systems used by students, teachers, and staff daily."] },
  { year:"2023", role:"IT Student · Started Journey", company:"SMK TI Bazma", icon:"🎓", active:false, points:["Enrolled in Network Information Systems and Applications program.","Began learning web development, databases, and cybersecurity fundamentals.","First hands-on project: Dormitory Attendance Application."] },
];

export const ACHIEVEMENTS = [
  { icon:"🏆", title:"6 Production Projects", desc:"Delivered 6 real-world systems used by schools, organizations, and communities.", badge:"2023–2025" },
  { icon:"🔐", title:"Cybersecurity Innovation", desc:"Designed Bazma Cipher — a custom encryption system protecting sensitive school data.", badge:"Security" },
  { icon:"☪️", title:"Islamic Tech Pioneer", desc:"Building KajianQu — AI-powered Qur'an learning app by an Indonesian student developer.", badge:"AI · 2025" },
  { icon:"📱", title:"Cross-Platform Developer", desc:"Shipped production-ready mobile apps in both React Native and Flutter.", badge:"Mobile" },
  { icon:"🌍", title:"4 Human Languages", desc:"Communicates professionally in Indonesian (native), English, Japanese, and German.", badge:"Multilingual" },
  { icon:"⚡", title:"Full-Stack Mastery", desc:"Proficient across the full stack: frontend, backend, database, mobile, IoT, and security.", badge:"11 Technologies" },
];

export const SOFT_SKILLS = [["🧠","Problem Solving"],["🤝","Teamwork"],["🔍","Analytical Thinking"],["⚡","Fast Learner"],["🗣️","Communication"],["📐","System Design"]];
export const PROJ_CATS = ["All","Web","Mobile","Security"];

export const TECH_STACK = [
  {name:"React",icon:"⚛️",color:"var(--accent)"},{name:"Laravel",icon:"🏗️",color:"var(--sage)"},
  {name:"Flutter",icon:"📱",color:"var(--violet)"},{name:"TypeScript",icon:"📘",color:"var(--cyan)"},
  {name:"Python",icon:"🐍",color:"var(--gold)"},{name:"MySQL",icon:"🗄️",color:"var(--coral)"},
  {name:"React Native",icon:"📲",color:"var(--accent)"},{name:"TensorFlow",icon:"🤖",color:"var(--sage)"},
  {name:"Next.js",icon:"▲",color:"var(--violet)"},{name:"Astro",icon:"🚀",color:"var(--gold)"},
  {name:"Docker",icon:"🐳",color:"var(--cyan)"},{name:"Firebase",icon:"🔥",color:"var(--coral)"},
];

export const MORPH_SHAPES = [
  "M 200,100 L 300,300 L 100,300 Z",
  "M 200,80 L 320,220 L 260,360 L 140,360 L 80,220 Z",
  "M 200,70 C 260,60 320,120 340,180 C 360,240 340,300 280,340 C 220,380 180,380 120,340 C 60,300 40,240 60,180 C 80,120 140,60 200,70 Z",
];

export const MOTION_PATH_D = "M 0,150 C 150,50 300,250 450,150 S 650,50 800,150 S 950,250 1100,150";
