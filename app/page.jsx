"use client";
import { useState, useEffect, useRef } from "react";
// Menggunakan font bawaan Next.js untuk menghilangkan error render-blocking & Best Practices Google Fonts
import { Outfit, DM_Mono } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"] });

/* ─── DATA REALIGNMENT WITH OFFICIAL LOGOS ───────────────────────────────── */
const SERVICES = [
  { icon:"🌐", title:"Web Development", desc:"Full-stack web apps with modern frameworks. From landing pages to complex SaaS platforms.", tech:["Laravel","React","MySQL","TypeScript"], color:"var(--accent)" },
  { icon:"📱", title:"Mobile Development", desc:"Cross-platform mobile apps for iOS and Android with modern engines.", tech:["React Native","Flutter","Firebase"], color:"var(--sage)" },
  { icon:"📱", title:"Cybersecurity", desc:"Data encryption, secure authentication, and security system design to protect sensitive data.", tech:["Python","Cryptography","JWT"], color:"var(--violet)" },
  { icon:"☪️", title:"Islamic Tech", desc:"Apps serving the Muslim community — Qur'an apps, prayer time systems, Islamic learning AI.", tech:["Flutter","AI/ML","Firebase"], color:"var(--gold)" },
  { icon:"🤖", title:"AI Integration", desc:"Integrating ML and AI features into applications — recommendations, NLP, computer vision.", tech:["Python","TensorFlow","OpenAI"], color:"var(--coral)" },
  { icon:"🏗️", title:"System Architecture", desc:"Scalable, maintainable architectures including microservices, REST APIs, and database design.", tech:["Docker","REST API","MySQL"], color:"var(--accent)" },
];

const PROJECTS = [
  { num:"01", tag:"Social Impact", cat:"Web", icon:"🏛️", name:"Bazma × Pertamina Bansos", year:"2024", org:"SMK TI Bazma", desc:"Responsive web platform managing social assistance distribution with real-time tracking, transparent data management, and reporting.", tech:["Laravel","MySQL","Blade","JS"], color:"var(--accent)" },
  { num:"02", tag:"EdTech", cat:"Web", icon:"📚", name:"IQRA App — School Monitor", year:"2024", org:"SMK TI Bazma", desc:"Full-stack school monitoring with Qur'an memorization tracking and multi-role dashboards for teachers, students, and parents.", tech:["React","Laravel","MySQL","TS"], color:"var(--sage)" },
  { num:"03", tag:"Mobile", cat:"Mobile", icon:"🏠", name:"Dormitory Attendance App", year:"2024", org:"SMK TI Bazma", desc:"Real-time attendance tracking with secure login, live monitoring, automated reporting, and supervisor notifications.", tech:["React Native","Laravel","MySQL"], color:"var(--violet)" },
  { num:"04", tag:"E-Commerce", cat:"Web", icon:"🛒", name:"E-Commerce Platform", year:"2024", org:"SMK TI Bazma", desc:"Complete online store with product catalog, cart, checkout, order tracking, and admin dashboard for inventory and analytics.", tech:["Laravel","Blade","MySQL","JS"], color:"var(--gold)" },
  { num:"05", tag:"Cybersecurity", cat:"Security", icon:"🔐", name:"Bazma Cipher", year:"2024", org:"SMK TI Bazma", desc:"Prototype encryption system with custom cipher algorithms and industry-standard cryptography protecting sensitive application data.", tech:["Python","JavaScript","Crypto"], color:"var(--coral)" },
  { num:"06", tag:"AI · Islamic · Mobile", cat:"Mobile", icon:"☪️", name:"KajianQu — AI Qur'an App", year:"2025", org:"Personal Project", desc:"AI-powered Qur'an mobile app: smart Tajweed guidance via ML, spaced-repetition memorization, Arabic OCR, tafsir browser, and offline-first.", tech:["Flutter","Python","AI/ML","TF"], color:"var(--accent)" },
];

const TECH_STACK = [
  { id: "javascript", name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", type: "Programming Language", exp: "Dynamic scripting, asynchronous event-loops, ES6+ architectures, and DOM optimization blueprints.", color: "var(--gold)" },
  { id: "typescript", name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", type: "Programming Language", exp: "Strict type-safety definitions, granular interfaces design, and robust scalable engineering control.", color: "var(--cyan)" },
  { id: "php", name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", type: "Programming Language", exp: "Server-side state tracking, object-oriented modern backends, and traditional native scripting loops.", color: "var(--violet)" },
  { id: "python", name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", type: "Programming Language", exp: "Automation scripts, heavy data-handling routines, cryptographic modules, and core AI processing layers.", color: "var(--sage)" },
  { id: "c", name: "C Language", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", type: "Programming Language", exp: "Low-level resource handling, memory allocation pointer configurations, and micro-optimization mechanics.", color: "var(--accent)" },
  { id: "react", name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", type: "Frontend Framework", exp: "Virtual DOM diffing algorithms, complex state hooks, dynamic component reusability, and SPA layouts.", color: "var(--cyan)" },
  { id: "reactnative", name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", type: "Mobile Framework", exp: "Cross-platform core bridges, native layout rendering engines, and modular device hardware interfaces.", color: "var(--cyan)" },
  { id: "nextjs", name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", type: "React Framework", exp: "Hybrid SSR / SSG production architectures, atomic route optimization, and secure API middleware pipes.", color: "var(--text-main)" },
  { id: "laravel", name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", type: "Backend Framework", exp: "Artisan ecosystem command suites, Eloquent ORM transaction modeling, secure authentication, and jobs scheduling.", color: "var(--coral)" },
  { id: "flutter", name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", type: "Mobile Framework", exp: "Dart compilations, high-frequency Skia/Impeller UI rendering, and offline atomic storage synchronizations.", color: "var(--cyan)" },
  { id: "tailwindcss", name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", type: "CSS Technology", exp: "Utility-first design workflows, responsive responsive breakpoints, component layouts, and strict token implementations.", color: "var(--cyan)" },
  { id: "vuejs", name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", type: "Frontend Framework", exp: "Reactive state tracking arrays, declarative templates, and lightweight component view modeling.", color: "var(--sage)" },
  { id: "mysql", name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", type: "Database Engine", exp: "Relational database models, structured querying optimization indexes, and ACID transaction safety rules.", color: "var(--gold)" },
  { id: "git", name: "Git & GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", type: "Version Tools", exp: "Branch management routines, merge conflict operations, remote synchronization, and continuous version actions.", color: "var(--coral)" },
  { id: "vercel", name: "Vercel & Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", type: "Deployment Tools", exp: "Serverless server distribution, edge functions deployments, REST API setups, and Midtrans payment gateway hooks.", color: "var(--text-main)" },
];

const HUMAN_LANGS = [
  { id: "id", name: "Indonesian", icon: "🇮🇩", type: "Native Fluency", exp: "Native speaker. Exceptional team leadership, technical documentation, and systemic presentation communication.", color: "var(--coral)" },
  { id: "en", name: "English", icon: "🇬🇧", type: "Intermediate Fluency", exp: "Proficient comprehension of international engineering documentation, technical stack tracking, and product communication.", color: "var(--accent)" },
  { id: "de", name: "German", icon: "🇩🇪", type: "Basic Level", exp: "Technical term recognition, foundational text understanding, and fundamental grammar knowledge.", color: "var(--gold)" },
  { id: "jp", name: "Japanese", icon: "🇯🇵", type: "Basic Level", exp: "Everyday workspace terminology, introductory layout commands, and expanding conversational context.", color: "var(--violet)" },
];

const TIMELINE = [
  { year:"2025", role:"Personal AI Project", company:"Self-Directed", icon:"🤖", active:true, points:["Developing KajianQu — AI Qur'an mobile app with Flutter + TensorFlow.","Researching ML models for Arabic text recognition and Tajweed correction."] },
  { year:"2024", role:"Software Developer (Project-Based)", company:"SMK TI Bazma · Ciampea, Bogor", icon:"💼", active:false, points:["Built Bazma × Pertamina Bansos web platform for social assistance management.","Developed IQRA multi-role school monitoring system.","Implemented Bazma Cipher encryption and security module.","Delivered 4 production systems used by students, teachers, and staff daily."] },
  { year:"2023", role:"IT Student · Started Journey", company:"SMK TI Bazma", icon:"🎓", active:false, points:["Enrolled in Network Information Systems and Applications program.","Began learning web development, databases, and cybersecurity fundamentals.","First hands-on project: Dormitory Attendance Application."] },
];

const ACHIEVEMENTS = [
  { icon:"🏆", title:"6 Production Projects", desc:"Delivered 6 real-world systems used by schools, organizations, and communities.", badge:"2023–2025" },
  { icon:"🔐", title:"Cybersecurity Innovation", desc:"Designed Bazma Cipher — a custom encryption system protecting sensitive school data.", badge:"Security" },
  { icon:"☪️", title:"Islamic Tech Pioneer", desc:"Building KajianQu — AI-powered Qur'an learning app by an Indonesian student developer.", badge:"AI · 2025" },
  { icon:"📱", title:"Cross-Platform Developer", desc:"Shipped production-ready mobile apps in both React Native and Flutter.", badge:"Mobile" },
  { icon:"🌍", title:"4 Human Languages", desc:"Communicates professionally in Indonesian (native), English, Japanese, and German.", badge:"Multilingual" },
  { icon:"⚡", title:"Full-Stack Mastery", desc:"Proficient across the full stack: frontend, backend, database, mobile, IoT, and security.", badge:"11 Technologies" },
];

const SOFT_SKILLS = [["🧠","Problem Solving"],["🤝","Teamwork"],["🔍","Analytical Thinking"],["⚡","Fast Learner"],["🗣️","Communication"],["📐","System Design"]];
const PROJ_CATS = ["All","Web","Mobile","Security"];

const MORPH_SHAPES = [
  "M 200,100 L 300,300 L 100,300 Z",
  "M 200,80 L 320,220 L 260,360 L 140,360 L 80,220 Z",
  "M 200,70 C 260,60 320,120 340,180 C 360,240 340,300 280,340 C 220,380 180,380 120,340 C 60,300 40,240 60,180 C 80,120 140,60 200,70 Z",
];

const MOTION_PATH_D = "M 0,150 C 150,50 300,250 450,150 S 650,50 800,150 S 950,250 1100,150";

/* ─── STYLING CSS (DENGAN PERBAIKAN CONTACT & ACCESSIBILITY) ─────────────── */
const CSS = `
.theme-dark{--bg-void:#050508;--bg-void-rgb:5,5,8;--bg-space:#0A0B12;--bg-card:#111322;--border:rgba(255,255,255,0.08);--border-hover:rgba(232,163,79,0.5);--text-main:rgba(255,255,255,0.92);--text-dim:rgba(255,255,255,0.75);--text-muted:rgba(255,255,255,0.55);--accent:#E8A34F;--accent-rgb:232,163,79;--sage:#5FC89B;--violet:#9B7FE8;--cyan:#4FD1E8;--coral:#E86B5F;--gold:#D4A843;--shadow:0 8px 32px rgba(0,0,0,0.4);--glow:0 0 40px rgba(var(--accent-rgb),0.15)}
.theme-light{--bg-void:#FDFAF5;--bg-void-rgb:253,250,245;--bg-space:#F8F4EC;--bg-card:#FFFFFF;--border:rgba(200,180,150,0.4);--border-hover:rgba(200,132,92,0.6);--text-main:#251B12;--text-dim:#4A3E31;--text-muted:#6B5E4F;--accent:#B36336;--accent-rgb:179,99,54;--sage:#4E7354;--violet:#6D5FA8;--cyan:#2E8BA1;--coral:#A84E4E;--gold:#947113;--shadow:0 8px 30px rgba(46,31,15,0.06);--glow:0 0 40px rgba(var(--accent-rgb),0.15)}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:auto}
::selection{background:rgba(var(--accent-rgb),0.3);color:var(--bg-void)}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg-void)}::-webkit-scrollbar-thumb{background:var(--accent);border-radius:10px}

/* PRELOADER */
.preloader{position:fixed;inset:0;background:#050508;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.preloader-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
.liquid-text{--bg-x:0%;--bg-y:1.5em;font-size:clamp(3.5rem,12vw,8.5rem);font-weight:700;letter-spacing:0.05em;position:relative;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.15)}
.liquid-text::before{content:attr(data-text);position:absolute;inset:0;color:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke:0px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='2000' viewBox='0 0 1000 2000'%3E%3Cpath d='M0,50 C250,0 250,100 500,50 C750,0 750,100 1000,50 L1000,2000 L0,2000 Z' fill='rgba(232,163,79,0.4)'/%3E%3Cpath d='M0,75 C250,125 250,25 500,75 C750,125 750,25 1000,75 L1000,2000 L0,2000 Z' fill='%23E8A34F'/%3E%3C/svg%3E");background-repeat:repeat-x;background-size:200% auto;background-position:var(--bg-x) var(--bg-y);-webkit-background-clip:text;background-clip:text;z-index:2}

/* ANIMATIONS */
@keyframes lp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
.live-dot{animation:lp 2s infinite}
.mq-track{animation:mq 35s linear infinite}
.cursor-blink::after{content:'|';animation:cursorBlink 1s infinite;color:var(--accent);margin-left:2px}

/* NAV */
.nlink{font-size:.9rem;font-weight:500;color:var(--text-dim);text-decoration:none;position:relative;transition:color .3s;letter-spacing:.02em}
.nlink::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--accent);transition:width 0.4s cubic-bezier(0.16,1,0.3,1);border-radius:2px}
.nlink:hover{color:var(--text-main)}.nlink:hover::after{width:100%}
.ncta{padding:.6rem 1.6rem;background:var(--text-main);color:var(--bg-void)!important;border-radius:50px;font-weight:600;transition:all 0.4s!important}
.ncta::after{display:none!important}
.ncta:hover{background:var(--accent);transform:translateY(-2px)!important;box-shadow:var(--glow)}
.theme-toggle{background:var(--border);border:none;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;color:var(--text-main);font-size:1.1rem;transition:all 0.4s;cursor:pointer}
.theme-toggle:hover{background:var(--accent);color:var(--bg-void);transform:rotate(15deg) scale(1.05)}
.bfill{padding:1rem 2.5rem;background:var(--accent);color:var(--bg-void);border:none;border-radius:50px;font-size:.9rem;font-weight:600;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);text-decoration:none;display:inline-block}
.bfill:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(var(--accent-rgb),0.3)}
.boutl{padding:1rem 2.5rem;background:transparent;border:1px solid var(--border);color:var(--text-main);border-radius:50px;font-size:.9rem;font-weight:600;transition:all 0.4s;text-decoration:none;display:inline-block}
.boutl:hover { border-color:var(--accent); background:rgba(232,163,79,0.05); transform:translateY(-3px); }
.pf-btn{padding:.6rem 1.5rem;border-radius:50px;background:var(--bg-void);border:1px solid var(--border);font-size:.85rem;font-weight:500;color:var(--text-dim);transition:all 0.3s;cursor:pointer}
.pf-btn.on{background:var(--text-main);border-color:var(--text-main);color:var(--bg-void)}

/* CARDS */
.srv-card,.proj-card,.ach-card{background:var(--bg-card);border-radius:24px;padding:2.2rem;border:1px solid var(--border);box-shadow:var(--shadow);position:relative;transition:border-color 0.4s,box-shadow 0.4s,transform 0.4s}
.srv-card:hover,.proj-card:hover,.ach-card:hover{border-color:var(--border-hover);box-shadow:var(--glow);transform:translateY(-4px)}
.info-item,.soft-item{display:flex;align-items:center;gap:1rem;padding:.8rem 1.2rem;background:var(--bg-card);border-radius:14px;border:1px solid var(--border);font-size:.88rem;color:var(--text-dim);transition:all 0.4s;cursor:default}
.info-item:hover{border-color:var(--accent);color:var(--text-main);transform:translateX(6px);box-shadow:var(--glow)}
.soft-item{padding:.8rem 1rem;gap:.7rem;font-size:.85rem}
.tl-item{display:grid;grid-template-columns:56px 1fr;gap:1.8rem;margin-bottom:3rem}
.tl-content{background:var(--bg-card);border-radius:24px;padding:1.8rem;border:1px solid var(--border);box-shadow:var(--shadow);transition:all 0.4s}

/* FREESTYLE GIANT TRIANGLE CANVAS STYLES */
.pyramid-freestyle-canvas {
  position: relative;
  width: 100%;
  min-height: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 4rem 0;
  border-radius: 40px;
}
.pyramid-freestyle-canvas::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 820px;
  height: 100%;
  background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.05) 0%, rgba(var(--accent-rgb), 0.005) 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  border: 1px solid rgba(var(--accent-rgb), 0.15);
  z-index: 1;
}

@keyframes floatParticle1 { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; } 50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; } }
@keyframes floatParticle2 { 0%, 100% { transform: translate(0, 0); opacity: 0.3; } 50% { transform: translate(20px, -40px); opacity: 0.7; } }

.canvas-particle {
  position: absolute;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  filter: blur(1px);
}

.pyramid-freestyle-grid {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.freestyle-tier-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
}
.pyramid-freestyle-node {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 95px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow);
  padding: 18px;
}
.pyramid-freestyle-node .node-img-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(1) opacity(0.25);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.pyramid-freestyle-node .node-hover-tag {
  position: absolute;
  bottom: -32px;
  background: var(--bg-space);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-size: 0.68rem;
  padding: 3px 12px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow);
}
.pyramid-freestyle-node:hover {
  transform: scale(1.22) translateY(-8px);
  border-color: var(--accent);
  box-shadow: var(--glow);
  z-index: 12;
}
.pyramid-freestyle-node:hover .node-img-logo {
  filter: grayscale(0) opacity(1);
}
.pyramid-freestyle-node:hover .node-hover-tag {
  opacity: 1;
  transform: translateY(0);
  color: var(--text-main);
}

/* HUMAN LANGUAGES HORIZONTAL CARD STYLES */
.lang-horizontal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}
.lang-premium-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.lang-premium-card:hover {
  transform: translateX(6px);
  border-color: var(--border-hover);
  box-shadow: var(--glow);
}
.lang-meta-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.lang-flag-box {
  font-size: 2.5rem;
}
.lang-title-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}
.lang-badge-status {
  font-size: 0.72rem;
  color: var(--accent);
  letter-spacing: 0.05em;
}

/* PREMIUM RIGHT-SIDE SLIDE COMPONENT DRAWER */
.premium-sidebar-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 440px;
  height: 100vh;
  background: linear-gradient(180deg, var(--bg-card), var(--bg-void));
  border-left: 1px solid var(--border);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
  z-index: 2000;
  padding: 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  transform: translateX(105%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.premium-sidebar-drawer.drawer-active {
  transform: translateX(0);
}
.drawer-overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 8, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.drawer-overlay-backdrop.backdrop-active {
  opacity: 1;
  pointer-events: auto;
}
.drawer-close-trigger {
  align-self: flex-end;
  background: var(--border);
  border: none;
  width: 44px; /* Touch target optimized */
  height: 44px;
  border-radius: 50%;
  color: var(--text-main);
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.drawer-close-trigger:hover {
  background: var(--accent);
  color: var(--bg-void);
  transform: rotate(90deg);
}

/* ─── FIXES FOR PREMIUM CONTACT SECTION ─── */
.premium-contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3.5rem;
  align-items: start;
  margin-top: 2rem;
}
.contact-glass-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
}
.contact-form-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 28px;
  padding: 3rem;
  box-shadow: var(--shadow);
}
.contact-hub-link {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
  border-radius: 16px;
  background: var(--bg-void);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: all 0.3s ease;
  min-height: 48px; /* Touch Target Optimization */
}
.contact-hub-link:hover {
  border-color: var(--accent);
  transform: translateX(4px);
  box-shadow: var(--glow);
}
.hub-icon-box {
  width: 44px;
  height: 44px;
  background: rgba(var(--accent-rgb), 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--accent);
}
.cf-in {
  width: 100%;
  padding: 1.1rem 1.4rem;
  background: var(--bg-void);
  border: 1px solid var(--border);
  border-radius: 14px;
  color: var(--text-main);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-height: 48px; /* Touch Target Optimization */
}
.cf-in:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.15);
}

/* GRIDS & LAYOUT RESPONSIVE */
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem}
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}

/* DRAW SVG */
.draw-svg-path{stroke-dasharray:1000;stroke-dashoffset:1000;fill:none;stroke:var(--accent);stroke-width:2;opacity:0.5}

.hover-image-text{display:inline-block;position:relative}
.hover-image-text::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--accent);transition:width 0.4s ease}
.hover-image-text:hover::after{width:100%}

/* SCRAMBLE & TYPEWRITER */
.scramble-label{font-size:.72rem;font-weight:600;color:var(--accent);letter-spacing:0.22em;text-transform:uppercase;display:flex;align-items:center;gap:.7rem;margin-bottom:.8rem}
.typewriter-wrap{font-size:.85rem;color:var(--accent);letter-spacing:0.1em;margin-bottom:1rem;min-height:1.2em}
.morph-bg{position:absolute;right:3%;top:50%;transform:translateY(-50%);z-index:0;opacity:0.1;pointer-events:none}

@media(max-width:1024px) {
  .srv-grid{grid-template-columns:1fr 1fr}
  .premium-sidebar-drawer{width:400px}
  .premium-contact-wrapper{grid-template-columns:1fr}
}
@media(max-width:768px) {
  .lang-horizontal-grid{grid-template-columns:1fr}
  .nav-links{display:none}
  .premium-sidebar-drawer{width:100%}
}
@media(max-width:600px) {
  .srv-grid{grid-template-columns:1fr}
  section{padding:5rem 1.5rem!important}
  .h-title{font-size:3rem!important}
  .contact-form-panel{padding: 1.8rem;}
}
`;

/* ─── MAIN PORTFOLIO COMPONENT ───────────────────────────────────────────── */
export default function BerkePortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [cat, setCat] = useState("All");
  const [sendStatus, setSend] = useState("idle");
  const [isLoaded, setIsLoaded] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);

  const preloaderRef = useRef(null);
  const progressRef  = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroTitleRef  = useRef(null);
  const typewriterRef = useRef(null);
  const morphPathRef  = useRef(null);
  const morphSvgRef   = useRef(null);
  const motionBallRef = useRef(null);
  const gsapRef       = useRef(null);

  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === cat);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("theme-dark");
      root.classList.remove("theme-light");
    } else {
      root.classList.add("theme-light");
      root.classList.remove("theme-dark");
    }
  }, [isDark]);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger }  = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
      const { TextPlugin }     = await import("gsap/TextPlugin");
      const { Draggable }      = await import("gsap/Draggable");
      const { Flip }           = await import("gsap/Flip");
      const { Observer }       = await import("gsap/Observer");
      const { MotionPathPlugin } = await import("gsap/MotionPathPlugin");

      let SplitText = null, DrawSVGPlugin = null, MorphSVGPlugin = null, ScrollSmoother = null, InertiaPlugin = null;
      try { ({ SplitText } = await import("gsap/SplitText")); } catch {}
      try { ({ DrawSVGPlugin } = await import("gsap/DrawSVGPlugin")); } catch {}
      try { ({ MorphSVGPlugin } = await import("gsap/MorphSVGPlugin")); } catch {}
      try { ({ ScrollSmoother } = await import("gsap/ScrollSmoother")); } catch {}
      try { ({ InertiaPlugin } = await import("gsap/InertiaPlugin")); } catch {}

      const plugins = [ScrollTrigger, ScrollToPlugin, TextPlugin, Draggable, Flip, Observer, MotionPathPlugin];
      if (SplitText) plugins.push(SplitText);
      if (DrawSVGPlugin) plugins.push(DrawSVGPlugin);
      if (MorphSVGPlugin) plugins.push(MorphSVGPlugin);
      if (ScrollSmoother) plugins.push(ScrollSmoother);
      if (InertiaPlugin) plugins.push(InertiaPlugin);
      
      gsap.registerPlugin(...plugins);

      gsapRef.current = { 
        gsap, ScrollTrigger, ScrollToPlugin, TextPlugin, Draggable, Flip, Observer,
        SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, ScrollSmoother, InertiaPlugin 
      };
      
      setGsapReady(true);
    };
    
    loadGSAP();
  }, []);

  useEffect(() => {
    if (!gsapReady || !gsapRef.current) return;
    const { gsap } = gsapRef.current;
    
    document.body.style.overflow = "hidden";
    let prog = { val: 0 };
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100, duration: 1.2, ease: "expo.inOut",
          onComplete: () => {
            setIsLoaded(true);
            document.body.style.overflow = "";
            if (preloaderRef.current) preloaderRef.current.style.display = "none";
          }
        });
      }
    });
    
    gsap.fromTo(".liquid-text", { "--bg-x": "0%" }, { "--bg-x": "-100%", duration: 2.5, ease: "none", repeat: -1 });
    tl.fromTo(".liquid-text", { "--bg-y": "1.2em" }, { "--bg-y": "-0.2em", duration: 3.5, ease: "power2.inOut" }, 0);
    tl.to(prog, {
      val: 100, duration: 3.5, ease: "power2.inOut",
      onUpdate: () => { if (progressRef.current) progressRef.current.textContent = Math.round(prog.val) + "%"; }
    }, 0);
    
    return () => tl.kill();
  }, [gsapReady]);

  useEffect(() => {
    if (!isLoaded || !gsapReady || !gsapRef.current) return;
    const { gsap, ScrollTrigger, SplitText, ScrollSmoother, Observer } = gsapRef.current;

    let ctx = gsap.context(() => {
      if (ScrollSmoother && document.querySelector("#smooth-wrapper") && document.querySelector("#smooth-content")) {
        if (!ScrollSmoother.get()) {
          ScrollSmoother.create({
            wrapper: "#smooth-wrapper", content: "#smooth-content",
            smooth: 1.4, effects: true, smoothTouch: 0.1
          });
        }
      }

      if (SplitText && heroTitleRef.current && !heroTitleRef.current.classList.contains("splitted")) {
        heroTitleRef.current.classList.add("splitted");
        const split = new SplitText(heroTitleRef.current, { type: "chars,words" });
        if (split.chars && split.chars.length > 0) {
          gsap.set(split.chars, { opacity: 0, y: 80, rotationX: -90 });
          gsap.to(split.chars, {
            opacity: 1, y: 0, rotationX: 0,
            duration: 1.2, ease: "back.out(2)", stagger: 0.035, delay: 0.4
          });
        }
      }

      gsap.timeline({ delay: 0.2 })
        .fromTo(".h-badge", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0)
        .fromTo(".h-typewriter", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, 0.3)
        .fromTo(".h-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, 0.5)
        .fromTo(".h-para", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, 0.7)
        .fromTo(".h-btns", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.9);

      if (document.querySelector("#hero")) {
        gsap.to(".hero-parallax-wrapper", {
          y: -100, opacity: 0,
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
        });
      }

      const scrambleElements = Array.from(document.querySelectorAll(".scramble-text"));
      scrambleElements.forEach(el => {
        if (!el || el.classList.contains("scrambled-init")) return;
        el.classList.add("scrambled-init");
        const orig = el.textContent || "";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop0123456789!@#$";
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => {
            let itr = 0;
            const max = orig.length * 3;
            const iv = setInterval(() => {
              el.textContent = orig.split("").map((c, j) =>
                j < Math.floor(itr / 3) ? orig[j] : chars[Math.floor(Math.random() * chars.length)]
              ).join("");
              if (++itr > max) { clearInterval(iv); el.textContent = orig; }
            }, 28);
          }
        });
      });

      const counterElements = Array.from(document.querySelectorAll(".counter-anim"));
      counterElements.forEach(el => {
        if (!el || el.classList.contains("counter-init")) return;
        el.classList.add("counter-init");
        const to = parseInt(el.getAttribute("data-to") || "0");
        const suf = el.getAttribute("data-suffix") || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to, duration: 2.5, ease: "power2.out",
          onUpdate: function() { if (el) el.textContent = Math.round(obj.v) + suf; },
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        });
      });

      const pathElements = Array.from(document.querySelectorAll(".draw-svg-path"));
      pathElements.forEach(path => {
        try {
          if (!path) return;
          const len = path.getTotalLength ? path.getTotalLength() : 600;
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut",
            scrollTrigger: { trigger: path, start: "top 80%", once: true }
          });
        } catch {}
      });

      if (morphPathRef.current) {
        gsap.to(morphSvgRef.current, {
          rotation: 360, scale: 1.1, duration: 10, ease: "none",
          repeat: -1, yoyo: true, transformOrigin: "200px 200px"
        });
      }

      if (motionBallRef.current) {
        gsap.to(motionBallRef.current, {
          x: "+=900", duration: 5, ease: "none", repeat: -1,
          modifiers: { x: x => (parseFloat(x) % 1100) + "px" }
        });
      }

      if (document.querySelector("#about-chapters")) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#about-chapters", start: "top top", end: "+=3500", pin: true, scrub: 1.2,
          }
        });

        tl.to({}, { duration: 0.5 })
          .to(".ch-1", { opacity: 0, y: -120, scale: 0.92, filter: "blur(10px)", duration: 1.2, ease: "power2.inOut" }, "step1")
          .fromTo(".ch-2", { opacity: 0, y: 120, scale: 1.08, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.inOut" }, "step1")
          .to({}, { duration: 1.5 })
          .to(".ch-2", { opacity: 0, y: -120, scale: 0.92, filter: "blur(10px)", duration: 1.2, ease: "power2.inOut" }, "step2")
          .fromTo(".ch-3", { opacity: 0, y: 120, scale: 1.08, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.inOut" }, "step2")
          .from(".ch-3 span, .ch-3 .counter-anim", { scale: 0.8, opacity: 0, stagger: 0.05, duration: 0.6, ease: "back.out(1.5)" }, "step2+=0.4")
          .to({}, { duration: 1.5 })
          .to(".ch-3", { opacity: 0, y: -120, scale: 0.92, filter: "blur(10px)", duration: 1.2, ease: "power2.inOut" }, "step3")
          .fromTo(".ch-4", { opacity: 0, y: 120, scale: 1.08, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.inOut" }, "step3")
          .from(".soft-item", { y: 30, opacity: 0, stagger: 0.06, duration: 0.8, ease: "power3.out" }, "step3+=0.3")
          .to({}, { duration: 0.5 });
      }

      document.querySelectorAll("a[href^='#']").forEach(a => {
        a.addEventListener("click", e => {
          e.preventDefault();
          const tgt = a.getAttribute("href");
          if (tgt && document.querySelector(tgt)) gsap.to(window, { duration: 1.2, scrollTo: { y: tgt, offsetY: 80 }, ease: "power3.inOut" });
        });
      });

      if (Observer && document.querySelector("#services")) {
        Observer.create({
          target: "#services", type: "wheel,touch,pointer",
          onDown: () => {
            const cards = Array.from(document.querySelectorAll(".srv-card"));
            if (cards.length) gsap.to(cards, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.2)" });
          },
          onUp: () => {
            const cards = Array.from(document.querySelectorAll(".srv-card"));
            if (cards.length) gsap.to(cards, { y: 15, opacity: 0.8, scale: 0.98, stagger: 0.05, duration: 0.4, ease: "power2.out" });
          }
        });
      }

      const revealCards = Array.from(document.querySelectorAll(".reveal-card"));
      revealCards.forEach(el => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        });
      });
      
      const timelineItems = Array.from(document.querySelectorAll(".tl-item"));
      timelineItems.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, x: -40, scale: 0.95 }, {
          opacity: 1, x: 0, scale: 1, duration: 1.2, delay: i * 0.15, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        });
      });

      const pyramidNodes = gsap.utils.toArray(".pyramid-freestyle-node");
      if (pyramidNodes.length > 0) {
        gsap.fromTo(pyramidNodes, 
          { opacity: 0, scale: 0.5, y: 40, rotation: -15 },
          { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.2, stagger: 0.05, ease: "elastic.out(1, 0.6)", scrollTrigger: { trigger: ".freestyle-trigger-hook", start: "top 75%" } }
        );
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isLoaded, gsapReady]);

  useEffect(() => {
    if (!isLoaded || !gsapReady || !typewriterRef.current) return;
    const roles = ["Full-Stack Developer", "Mobile App Engineer", "Cybersecurity Builder", "Islamic Tech Pioneer", "AI Integration Specialist"];
    let idx = 0, tInv = null, eInv = null, isDestroyed = false;

    const type = () => {
      if (isDestroyed || !typewriterRef.current) return;
      const text = roles[idx % roles.length];
      let i = 0; typewriterRef.current.textContent = "";

      tInv = setInterval(() => {
        if (!typewriterRef.current) return clearInterval(tInv);
        typewriterRef.current.textContent += text[i++];
        if (i >= text.length) {
          clearInterval(tInv);
          setTimeout(() => erase(text), 2000);
        }
      }, 75);
    };

    const erase = (text) => {
      if (isDestroyed || !typewriterRef.current) return;
      let l = text.length;

      eInv = setInterval(() => {
        if (!typewriterRef.current) return clearInterval(eInv);
        typewriterRef.current.textContent = text.substring(0, --l);
        if (l <= 0) {
          clearInterval(eInv); idx++;
          setTimeout(type, 350);
        }
      }, 40);
    };

    const startTimeout = setTimeout(type, 2200);
    return () => {
      isDestroyed = true; clearTimeout(startTimeout);
      if (tInv) clearInterval(tInv); if (eInv) clearInterval(eInv);
    };
  }, [isLoaded, gsapReady]);

  useEffect(() => {
    if (!isLoaded || !gsapReady) return;
    const { gsap, Flip } = gsapRef.current;
    if (!Flip) return;
    const grid = document.querySelector(".proj-grid");
    if (!grid) return;
    const cards = grid.querySelectorAll(".proj-card");
    const state = Flip.getState(cards);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration:0.7, ease:"power2.inOut", stagger:0.05, absolute:true,
        onEnter: els => gsap.fromTo(els, { opacity:0, scale:0.8 }, { opacity:1, scale:1, duration:0.5 }),
        onLeave: els => gsap.to(els, { opacity:0, scale:0.8, duration:0.3 })
      });
    });
  }, [cat, isLoaded, gsapReady]);

  useEffect(() => {
    if (!isLoaded || !gsapReady) return;
    const { gsap } = gsapRef.current;
    const dot = cursorDotRef.current, ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const pos = { x: 0, y: 0 }, rp = { x: 0, y: 0 };
    let raf;

    const onMove = e => {
      pos.x = e.clientX; pos.y = e.clientY;
      if (dot) { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; }
    };
    
    const animRing = () => {
      rp.x += (pos.x - rp.x) * 0.14; rp.y += (pos.y - rp.y) * 0.14;
      if (ring) { ring.style.left = rp.x + "px"; ring.style.top = rp.y + "px"; }
      raf = requestAnimationFrame(animRing);
    };
    animRing();
    window.addEventListener("mousemove", onMove);

    const onMouseOverGlobal = (e) => {
      const target = e.target.closest("a, button, .tilt-card, .srv-card, .proj-card, .ach-card, .pyramid-freestyle-node, .lang-premium-card, .contact-hub-link");
      if (target && ring && dot) {
        gsap.to(ring, { scale: 2.3, opacity: 0.45, duration: 0.35, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      }
    };

    const onMouseOutGlobal = (e) => {
      const target = e.target.closest("a, button, .tilt-card, .srv-card, .proj-card, .ach-card, .pyramid-freestyle-node, .lang-premium-card, .contact-hub-link");
      if (target && ring && dot) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    window.addEventListener("mouseover", onMouseOverGlobal);
    window.addEventListener("mouseout", onMouseOutGlobal);

    return () => { 
      window.removeEventListener("mousemove", onMove); 
      window.removeEventListener("mouseover", onMouseOverGlobal);
      window.removeEventListener("mouseout", onMouseOutGlobal);
      cancelAnimationFrame(raf);
    };
  }, [isLoaded, gsapReady]);

  if (!mounted) return null;

  const W   = { maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:2 };
  const sec = bg => ({ position:"relative", padding:"8rem 3rem", background: bg || "var(--bg-void)" });

  const SLabel = ({text}) => (  
    <div className={`scramble-label ${dmMono.className}`}>
      <span style={{width:24,height:1,background:"var(--accent)",display:"inline-block",flexShrink:0}}/>
      <span className="scramble-text">{text}</span>
    </div>
  );

  const SHead = ({label,title,center=false}) => (
    <div style={{textAlign:center?"center":"left",marginBottom:"1rem"}}>
      <SLabel text={label}/>
      <h2 style={{fontSize:"clamp(2.5rem,4.5vw,3.6rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.1,marginBottom:"2.8rem"}}
        dangerouslySetInnerHTML={{__html:title}}/>
    </div>
  );

  return (
    <div className={`${outfit.className}`} style={{background:"var(--bg-void)",color:"var(--text-main)",overflowX:"hidden",transition:"background 0.5s,color 0.5s"}}>
      <style>{CSS}</style>

      {/* Cursors */}
      <div ref={cursorDotRef} style={{position:"fixed",width:6,height:6,background:"var(--accent)",borderRadius:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9999}}/>
      <div ref={cursorRingRef} style={{position:"fixed",width:32,height:32,border:"1.5px solid rgba(232,163,79,0.6)",borderRadius:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9998,backdropFilter:"invert(0.08)"}}/>

      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{position:"fixed",top:0,left:0,height:"4px",background:"linear-gradient(90deg,var(--accent),var(--sage),var(--cyan))",zIndex:999,width:"0%",pointerEvents:"none"}}/>

      {/* PRELOADER */}
      <div ref={preloaderRef} className="preloader">
        <div className="preloader-grid"/>
        <div className="liquid-text" data-text="PORTFOLIO">PORTFOLIO</div>
        <div ref={progressRef} className={`${dmMono.className}`} style={{position:"absolute",bottom:"10%",fontSize:"1.2rem",fontWeight:600,color:"#E8A34F",letterSpacing:"0.2em",zIndex:2,textShadow:"0 0 20px rgba(232,163,79,0.5)"}}>0%</div>
      </div>

      {/* SIDEBAR DETAIL DRAWER CONTAINER */}
      <div className={`drawer-overlay-backdrop ${activeDetail ? "backdrop-active" : ""}`} onClick={() => setActiveDetail(null)} />
      <div className={`premium-sidebar-drawer ${activeDetail ? "drawer-active" : ""}`}>
        <button className="drawer-close-trigger" onClick={() => setActiveDetail(null)}>✕</button>
        {activeDetail && (
          <div style={{marginTop: "3.5rem", display:"flex", flexDirection:"column", height:"100%"}}>
            {activeDetail.logo ? (
              <div style={{width: "80px", height: "80px", marginBottom: "1.2rem", filter: `drop-shadow(0 0 15px ${activeDetail.color})`}}>
                <img src={activeDetail.logo} alt="" style={{width:"100%", height:"100%", objectFit:"contain"}}/>
              </div>
            ) : (
              <div style={{fontSize: "5rem", marginBottom: "1.2rem", filter: `drop-shadow(0 0 15px ${activeDetail.color})` }}>{activeDetail.icon}</div>
            )}
            <div style={{fontSize: "2.6rem", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.2}}>{activeDetail.name}</div>
            <div className={`${dmMono.className}`} style={{fontSize: "0.85rem", color: activeDetail.color, letterSpacing: "0.12em", marginTop: "0.5rem", textTransform: "uppercase"}}>{activeDetail.type}</div>
            
            <div style={{width: "50px", height: "2px", background: activeDetail.color, margin: "2.5rem 0"}} />
            
            <p style={{fontSize: "1.05rem", color: "var(--text-dim)", lineHeight: 1.85}}>
              {activeDetail.exp}
            </p>
            
            <div style={{marginTop:"auto", background:"var(--bg-space)", padding:"1.5rem", borderRadius:"18px", border:"1px solid var(--border)"}}>
              <div className={`${dmMono.className}`} style={{fontSize:"0.7rem", color:"var(--text-muted)", textTransform:"uppercase", marginBottom:"6px"}}>Status</div>
              <div style={{fontSize:"0.95rem", fontWeight:600, color:"var(--text-main)", display:"flex", alignItems:"center", gap:"8px"}}>
                <span style={{width:"10px", height:"10px", background:"var(--sage)", borderRadius:"50%"}}/> Verified Production Ready
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="smooth-wrapper" style={{overflow:"hidden"}}>
        <div id="smooth-content">

          {/* NAVBAR */}
          <nav id="main-nav" style={{ 
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, 
            padding: "1.1rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", 
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", borderBottom: "2px solid transparent", background: "transparent" 
          }}>
            <div className="nav-logo-text" style={{ 
              fontSize: "1.5rem", letterSpacing: "-0.5px", color: isDark ? "rgba(255,255,255,0.92)" : "#251B12",
              fontWeight:700, transition: "color 0.4s ease", cursor: "pointer"
            }}>
              Berke<span style={{ color: "var(--accent)" }}>.dev</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
                {["About", "Services", "Projects", "Skills", "Contact"].map(s => (
                  <li key={s}>
                    <a href={s === "Skills" ? "#skills-tech" : `#${s.toLowerCase()}`} className={`nlink ${s === "Contact" ? "ncta" : ""}`} style={{ color: s !== "Contact" && !isDark ? "#251B12" : "" }}>
                      {s === "Contact" ? "Hire Me ↗" : s}
                    </a>
                  </li>
                ))}
              </ul>
              <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </nav>

          {/* HERO */}
          <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"7rem 3rem 4rem",background:"var(--bg-void)",overflow:"hidden",position:"relative"}}>
            <div ref={morphSvgRef} className="morph-bg">
              <svg width="400" height="400" viewBox="0 0 400 400">
                <path ref={morphPathRef} d={MORPH_SHAPES[0]} fill="var(--accent)"/>
              </svg>
            </div>

            <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>
              <svg width="100%" height="100%" style={{position:"absolute",inset:0}} preserveAspectRatio="none">
                <path className="draw-svg-path" d="M0 250 Q 400 50 800 250 T 1600 250" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
                <path className="draw-svg-path" d="M0 150 Q 300 350 600 150 T 1200 150 T 1800 150" stroke="var(--sage)" strokeWidth="1" opacity="0.2"/>
              </svg>
            </div>

            <div style={{position:"absolute",width:"100%",height:"200px",top:"20%",zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
              <svg width="100%" height="200" style={{position:"absolute"}}>
                <path id="motion-path-svg" d={MOTION_PATH_D} fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.08"/>
              </svg>
              <div ref={motionBallRef} style={{position:"absolute",width:14,height:14,background:"var(--accent)",borderRadius:"50%",filter:"blur(2px)",boxShadow:"0 0 20px var(--accent)",top:0,left:0}}/>
            </div>

            <div style={{position:"absolute",inset:0,zIndex:1,background:"radial-gradient(circle at 50% 50%,transparent 20%,rgba(var(--bg-void-rgb),0.75) 80%),linear-gradient(180deg,transparent 0%,rgba(var(--bg-void-rgb),1) 100%)",pointerEvents:"none"}}/>

            <div className="hero-parallax-wrapper" style={{position:"relative",zIndex:2,maxWidth:850,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",pointerEvents:"none"}}>
              <div className="h-badge" style={{display:"inline-flex",alignItems:"center",gap:".7rem",padding:".5rem 1.4rem",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:50,fontSize:".75rem",fontWeight:500,color:"var(--text-main)",letterSpacing:"0.12em",marginBottom:"1.5rem",opacity:0,boxShadow:"var(--shadow)"}}>
                <div className="live-dot" style={{width:8,height:8,background:"var(--sage)",borderRadius:"50%",flexShrink:0,boxShadow:"0 0 10px var(--sage)"}}/>
                Available for Collaboration
              </div>

              <div className={`h-typewriter typewriter-wrap ${dmMono.className}`} style={{marginBottom:"1rem"}}>
                <span ref={typewriterRef} className="cursor-blink">Full-Stack Developer</span>
              </div>

              <h1 ref={heroTitleRef} className="h-title" style={{fontSize: "clamp(3.8rem, 8vw, 7.2rem)", fontWeight: 700, lineHeight: 1.05, color: "var(--text-main)", marginBottom: "1.8rem", letterSpacing: "-.02em", opacity: 0, textShadow: "0 10px 40px rgba(0,0,0,0.5)"}}>
                Qiageng <em style={{color:"var(--accent)", fontStyle:"italic", fontWeight:600}}>Berke</em><br/>
                Jaisyurrohman
              </h1>
              
              <p className="h-para" style={{fontSize:"1.15rem",fontWeight:400,color:"var(--text-dim)",lineHeight:1.8,maxWidth:600,marginBottom:"3.5rem",opacity:0}}>
                A passionate <strong style={{color:"var(--text-main)",fontWeight:600}}>Full-Stack Developer & IT Student</strong>. Building web systems, mobile apps, and cybersecurity solutions that create real impact.
              </p>

              <div className="h-btns" style={{display:"flex",gap:"1.4rem",justifyContent:"center",flexWrap:"wrap",opacity:0,pointerEvents:"auto"}}>
                <a href="#projects" className="bfill">Explore My Work</a>
                <a href="#about" className="boutl">Read My Story</a>
              </div>
            </div>

            <div style={{position:"absolute",bottom:"3rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeInUp 1s 2.5s both",zIndex:2,pointerEvents:"none"}}>
              <span className={`${dmMono.className}`} style={{fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.25em",textTransform:"uppercase"}}>Scroll</span>
              <div style={{width:1,height:50,background:"linear-gradient(180deg,var(--accent),transparent)"}}/>
            </div>
          </section>

          {/* MARQUEE */}
          <div style={{padding:"1.5rem 0",background:"var(--bg-card)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",overflow:"hidden",position:"relative",zIndex:2}}>
            <div className="mq-track" style={{display:"flex",gap:"3.5rem",whiteSpace:"nowrap"}}>
              {[...Array(2)].map((_,r)=>["Web Development","Mobile Apps","Cybersecurity","Laravel","React","Flutter","MySQL","TypeScript","AI/ML","SIOT","React Native","Python","Astro","Full-Stack"].map((t,i)=>(
                <div key={`${r}-${i}`} style={{display:"flex",alignItems:"center",gap:"1.2rem",flexShrink:0}}>
                  <span className={`${dmMono.className}`} style={{fontSize:".8rem",fontWeight:500,color:"var(--text-dim)",letterSpacing:"0.16em",textTransform:"uppercase"}}>{t}</span>
                  <div style={{width:5,height:5,background:"var(--accent)",borderRadius:"50%",flexShrink:0}}/>
                </div>
              )))}
            </div>
          </div>

          {/* ABOUT */}
          <section id="about" style={{background:"var(--bg-void)",position:"relative"}}>
            <div id="about-chapters" style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
              <div style={{position:"relative",width:"100%",maxWidth:1100,padding:"0 3rem",height:"65vh",display:"flex",alignItems:"center"}}>
                <div className="ch-1" style={{position:"absolute",width:"100%",left:0,padding:"0 3rem"}}>
                  <div style={{maxWidth:700}}>
                    <SLabel text="Chapter 01"/>
                    <h2 style={{fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Origin</em> Story</h2>
                    <p style={{fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"1.2rem"}}>A highly motivated IT student specializing in <strong style={{color:"var(--text-main)",fontWeight:600}}>Web Development, Mobile Applications, and Cybersecurity</strong>. Berke has built real-world systems serving actual users in production.</p>
                    <p style={{fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2.2rem"}}>Passionate about clean code, data security, and technology that creates <strong style={{color:"var(--text-main)",fontWeight:600}}>real impact for communities</strong>.</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".8rem"}}>
                      {[["📍","Bekasi, Indonesia"],["📧","berkejaisyurrohman95@gmail.com"],["📱","+62 895-0614-7763"]].map(([ico,val])=>(
                        <div key={val} className="info-item" style={{padding:"0.6rem 1.2rem",fontSize:"0.85rem"}}>
                          <div style={{width:28,height:28,background:"rgba(232,163,79,0.15)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--accent)"}}>{ico}</div>{val}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ch-2" style={{position:"absolute",width:"100%",left:0,padding:"0 3rem",opacity:0}}>
                  <div style={{maxWidth:700}}>
                    <SLabel text="Chapter 02"/>
                    <h2 style={{fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>My <em style={{color:"var(--accent)",fontStyle:"italic"}}>Roots</em></h2>
                    <div className="tilt-card" style={{background:"var(--bg-card)",borderRadius:24,padding:"2.2rem",border:"1px solid var(--border)",boxShadow:"var(--shadow)",position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:"linear-gradient(180deg,var(--accent),var(--gold))",borderRadius:"4px 0 0 4px"}}/>
                      <div className={`${dmMono.className}`} style={{fontSize:".7rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.14em",marginBottom:".6rem"}}>JUNE 2023 – PRESENT</div>
                      <div style={{fontSize:"1.8rem",fontWeight:700,color:"var(--text-main)",marginBottom:".4rem"}}>SMK TI Bazma</div>
                      <div style={{fontSize:"1rem",color:"var(--text-muted)",marginBottom:"1.2rem"}}>Network Information Systems & Applications · Bogor</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:".4rem"}}>
                        {["Web Dev","Database","Networking","Cybersecurity"].map(t=>(
                          <span key={t} className={`${dmMono.className}`} style={{padding:".35rem 1rem",background:"var(--bg-void)",border:"1px solid var(--border)",borderRadius:50,fontSize:".75rem",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ch-3" style={{position:"absolute",width:"100%",left:0,padding:"0 3rem",opacity:0}}>
                  <div style={{maxWidth:700}}>
                    <SLabel text="Chapter 03"/>
                    <h2 style={{fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Arsenal</em></h2>
                    <p style={{fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"1.8rem"}}>My daily drivers — modern frameworks and robust backend technologies for seamless, secure digital experiences.</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".6rem",marginBottom:"2.5rem"}}>
                      {[["var(--accent)","React"],["var(--sage)","Flutter"],["var(--violet)","Laravel"],["var(--gold)","TypeScript"],["var(--accent)","MySQL"],["var(--sage)","Python"],["var(--violet)","React Native"],["var(--gold)","Next.js"],["var(--accent)","Astro"]].map(([c,t])=>(
                        <span key={t} className={`${dmMono.className}`} style={{padding:".45rem 1rem",borderRadius:50,background:`rgba(232,163,79,0.1)`,fontSize:".85rem",fontWeight:500,color:c,border:`1px solid var(--border)`}}>{t}</span>
                      ))}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
                      {[["6","Projects"],["2","Years"],["4","Languages"]].map(([n,l])=>(
                        <div key={l} style={{background:"var(--bg-card)",borderRadius:16,padding:"1.2rem",textAlign:"center",border:"1px solid var(--border)"}}>
                          <div className="counter-anim" data-to={parseInt(n)} data-suffix="+" style={{fontSize:"2.4rem",fontWeight:700,color:"var(--text-main)"}}>{n}+</div>
                          <div className={`${dmMono.className}`} style={{fontSize:".7rem",fontWeight:600,color:"var(--text-muted)"}}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ch-4" style={{position:"absolute",width:"100%",left:0,padding:"0 3rem",opacity:0}}>
                  <div style={{maxWidth:700}}>
                    <SLabel text="Chapter 04"/>
                    <h2 style={{fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Philosophy</em></h2>
                    <p style={{fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2 Guan"}}>Technology is only as good as the mind wielding it. Clear communication, analytical thinking, and team synergy turn ideas into reality.</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
                      {SOFT_SKILLS.map(([ico,s])=>(
                        <div key={s} className="soft-item"><span style={{fontSize:"1.4rem"}}>{ico}</span><span style={{fontSize:"1rem",fontWeight:500}}>{s}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-space)" }}>
            <div style={W}>
              <SHead label="What I Do" title="Services &<br/><em style='color:var(--accent);font-style:italic'>Specializations</em>"/>
              <div className="srv-grid">
                {SERVICES.map(s=>(
                  <div key={s.title} className="srv-card tilt-card reveal-card">
                    <div style={{width:55,height:55,borderRadius:16,background:`rgba(232,163,79,0.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",marginBottom:"1.5rem",border:`1px solid var(--border)`}}>{s.icon}</div>
                    <div style={{fontSize:"1.35rem",fontWeight:600,color:"var(--text-main)",marginBottom:".6rem"}}>{s.title}</div>
                    <p style={{fontSize:".88rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{s.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".35rem"}}>
                      {s.tech.map(t=><span key={t} className={`${dmMono.className}`} style={{padding:".25rem .75rem",borderRadius:50,background:"var(--bg-void)",border:"1px solid var(--border)",fontSize:".65rem",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-void)" }}>    
            <div style={W}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"2.5rem",flexWrap:"wrap",gap:"2rem"}}>
                <SHead label="Selected Work" title="Projects &<br/><em style='color:var(--accent);font-style:italic'>Case Studies</em>"/>
                <div style={{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"2.8rem"}}>
                  {PROJ_CATS.map(c=><button key={c} className={`pf-btn${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
                </div>
              </div>
              <div className="proj-grid" key={cat}>
                {filtered.map(p=>(
                  <div key={p.num} className="proj-card tilt-card reveal-card">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.2rem"}}>
                      <div style={{width:50,height:50,borderRadius:16,background:`rgba(232,163,79,0.15)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",border:`1px solid var(--border)`}}>{p.icon}</div>
                      <span className={`${dmMono.className}`} style={{fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",background:"var(--bg-void)",border:"1px solid var(--border)",padding:".3rem .8rem",borderRadius:50}}>{p.year}</span>
                    </div>
                    <div className={`${dmMono.className}`} style={{fontSize:".65rem",fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:p.color,marginBottom:".5rem"}}>{p.tag}</div>
                    
                    <div className="hover-image-text" style={{fontSize:"1.4rem",fontWeight:600,color:"var(--text-main)",marginBottom:".4rem",lineHeight:1.2,display:"inline-block"}}>
                      {p.name}
                    </div>
                    
                    <div style={{fontSize:".75rem",color:"var(--text-muted)",marginBottom:".85rem"}}>{p.org}</div>
                    <p style={{fontSize:".86rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{p.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".35rem",marginBottom:"1.4rem"}}>
                      {p.tech.map(t=><span key={t} className={`${dmMono.className}`} style={{padding:".25rem .75rem",borderRadius:50,background:"var(--bg-void)",border:"1px solid var(--border)",fontSize:".65rem",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>)}
                    </div>
                    <div style={{display:"flex",gap:"1.2rem"}}>
                      {["Demo ↗","Code ↗"].map(l=><a key={l} href="#" style={{fontSize:".85rem",fontWeight:600,color:"var(--accent)",textDecoration:"none"}}>{l}</a>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SKILLS MATRIX (PYRAMID) */}
          <section id="skills-tech" style={sec("var(--bg-space)")}>
            <div style={W}>
              <div className="freestyle-trigger-hook" style={{marginBottom:"1rem"}}>
                <SLabel text="The Core Matrix"/>
              </div>
              <SHead label="" title="Triangle<br/><em style='color:var(--accent);font-style:italic'>Tech Stack Ecosystem</em>"/>

              <div className="pyramid-freestyle-canvas">
                <div className="canvas-particle" style={{width: 6, height: 6, left: "25%", top: "40%", animation: "floatParticle1 6s infinite ease-in-out"}}/>
                <div className="canvas-particle" style={{width: 4, height: 4, right: "30%", top: "25%", animation: "floatParticle2 8s infinite ease-in-out"}}/>
                <div className="canvas-particle" style={{width: 8, height: 8, left: "45%", bottom: "15%", animation: "floatParticle1 7s infinite ease-in-out", background: "var(--sage)"}}/>
                <div className="canvas-particle" style={{width: 5, height: 5, right: "20%", bottom: "35%", animation: "floatParticle2 5s infinite ease-in-out", background: "var(--cyan)"}}/>

                <div className="pyramid-freestyle-grid">
                  <div className="freestyle-tier-row">
                    <button className="pyramid-freestyle-node" onClick={() => setActiveDetail(TECH_STACK[0])} aria-label={TECH_STACK[0].name}>
                      <img className="node-img-logo" src={TECH_STACK[0].logo} alt="" />
                      <span className={`node-hover-tag ${dmMono.className}`}>{TECH_STACK[0].name}</span>
                    </button>
                  </div>

                  <div className="freestyle-tier-row">
                    {[TECH_STACK[1], TECH_STACK[2]].map(node => (
                      <button key={node.id} className="pyramid-freestyle-node" onClick={() => setActiveDetail(node)} aria-label={node.name}>
                        <img className="node-img-logo" src={node.logo} alt="" />
                        <span className={`node-hover-tag ${dmMono.className}`}>{node.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="freestyle-tier-row">
                    {[TECH_STACK[3], TECH_STACK[4], TECH_STACK[5]].map(node => (
                      <button key={node.id} className="pyramid-freestyle-node" onClick={() => setActiveDetail(node)} aria-label={node.name}>
                        <img className="node-img-logo" src={node.logo} alt="" />
                        <span className={`node-hover-tag ${dmMono.className}`}>{node.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="freestyle-tier-row">
                    {[TECH_STACK[6], TECH_STACK[7], TECH_STACK[8], TECH_STACK[9]].map(node => (
                      <button key={node.id} className="pyramid-freestyle-node" onClick={() => setActiveDetail(node)} aria-label={node.name}>
                        <img className="node-img-logo" src={node.logo} alt="" />
                        <span className={`node-hover-tag ${dmMono.className}`}>{node.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="freestyle-tier-row">
                    {[TECH_STACK[10], TECH_STACK[11], TECH_STACK[12], TECH_STACK[13], TECH_STACK[14]].map(node => (
                      <button key={node.id} className="pyramid-freestyle-node" onClick={() => setActiveDetail(node)} aria-label={node.name}>
                        <img className="node-img-logo" src={node.logo} alt="" />
                        <span className={`node-hover-tag ${dmMono.className}`}>{node.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HUMAN LANGUAGES */}
          <section id="skills-languages" style={sec("var(--bg-void)")}>
            <div style={W}>
              <div style={{marginBottom:"1rem"}}>
                <SLabel text="Global Communications"/>
              </div>
              <SHead label="" title="Premium Linguistics<br/><em style='color:var(--accent);font-style:italic'>Human Languages</em>"/>

              <div className="lang-horizontal-grid">
                {HUMAN_LANGS.map(lang => (
                  <div key={lang.id} className="lang-premium-card reveal-card" onClick={() => setActiveDetail(lang)}>
                    <div className="lang-meta-left">
                      <div className="lang-flag-box">{lang.icon}</div>
                      <div>
                        <div style={{fontSize: "1.5rem", fontWeight: 700, color: "var(--text-main)"}}>{lang.name}</div>
                        <div className={`${dmMono.className} lang-badge-status`}>{lang.type}</div>
                      </div>
                    </div>
                    <div style={{fontSize:"0.85rem", color:"var(--accent)", opacity: 0.85, fontWeight: 500}}>
                      View Detail ↗
                    </div>
                  </div>
                ))}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.5rem",marginTop:"6rem"}} className="two-col">
                {[["15","Skills Mastered",""],["6","Projects Shipped",""],["2","Years Coding","+"],["4","Human Languages",""]].map(([n,l,s])=>(
                  <div key={l} style={{background:"var(--bg-card)",borderRadius:20,padding:"1.5rem",textAlign:"center",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                    <div className="counter-anim" data-to={parseInt(n)} data-suffix={s} style={{fontSize:"3rem",fontWeight:700,color:"var(--accent)"}}>{n}{s}</div>
                    <div className={`${dmMono.className}`} style={{fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.08em",marginTop:".4rem"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-space)" }}>
            <div style={W}>
              <SHead label="Career Timeline" title="My <em style='color:var(--accent);font-style:italic'>Journey</em>" center/>
              <div style={{display:"flex",justifyContent:"center",marginBottom:"2rem"}}>
                <svg width="2" height="60" style={{overflow:"visible"}}>
                  <path className="draw-svg-path" d="M1,0 L1,60" stroke="var(--accent)" strokeWidth="2"/>
                </svg>
              </div>
              <div style={{maxWidth:750,margin:"0 auto",position:"relative"}}>
                <div style={{position:"absolute",left:28,top:10,bottom:0,width:2,background:"linear-gradient(180deg,transparent,var(--accent),transparent)"}}/>
                {TIMELINE.map((t,i)=>(
                  <div key={i} className="tl-item">
                    <div style={{width:56,height:56,background:t.active?"var(--accent)":"var(--bg-card)",border:`2px solid ${t.active?"var(--accent)":"var(--border)"}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0,zIndex:1,boxShadow:t.active?`0 0 20px rgba(var(--accent-rgb),0.4)`:undefined}}>
                      {t.icon}
                    </div>
                    <div className="tl-content">
                      <div className={`${dmMono.className}`} style={{fontSize:".75rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.14em",marginBottom:".5rem"}}>{t.year}</div>
                      <div style={{fontSize:"1.4rem",fontWeight:700,color:"var(--text-main)",marginBottom:".3rem"}}>{t.role}</div>
                      <div style={{fontSize:".9rem",color:"var(--text-muted)",marginBottom:"1.2rem"}}>{t.company}</div>
                      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".7rem"}}>
                        {t.points.map((pt,j)=>(
                          <li key={j} style={{display:"flex",gap:".8rem",fontSize:"0.95rem",color:"var(--text-dim)",lineHeight:1.75}}>
                            <div style={{width:6,height:6,background:"var(--accent)",borderRadius:"50%",flexShrink:0,marginTop:".6rem"}}/>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUOTE */}
          <section id="quote" style={{...sec("var(--bg-card)"),textAlign:"center",overflow:"hidden",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",padding:"8rem 2rem"}}>
            <div style={{position:"absolute",width:600,height:600,background:"radial-gradient(circle,rgba(232,163,79,0.08),transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
            <p className="q-text" style={{fontSize:"clamp(1.8rem,4vw,3.2rem)",fontStyle:"italic",fontWeight:500,color:"var(--text-main)",lineHeight:1.4,maxWidth:850,margin:"0 auto 2rem"}}>
              "Technology should not just be functional — it should create genuine impact for the people who use it."
            </p>
            <p className={`q-author ${dmMono.className}`} style={{fontSize:".8rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.18em"}}>
              — Berke Jaisyurrohman · IT Student & Developer
            </p>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-space)" }}>
            <div style={W}>
              <SHead label="Recognition" title="Achievements &<br/><em style='color:var(--accent);font-style:italic'>Milestones</em>"/>
              <div className="ach-grid">
                {ACHIEVEMENTS.map(a=>(
                  <div key={a.title} className="ach-card tilt-card reveal-card">
                    <div style={{fontSize:"2.2rem",marginBottom:"1.2rem"}}>{a.icon}</div>
                    <div style={{fontSize:"1.25rem",fontWeight:600,color:"var(--text-main)",marginBottom:".5rem"}}>{a.title}</div>
                    <p style={{fontSize:".86rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{a.desc}</p>
                    <span className={`ach-badge ${dmMono.className}`} style={{color:"var(--accent)", fontSize: "0.75rem", fontWeight: 500}}>{a.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OPTIMIZED CONTACT SECTION (DENGAN REFRESH TAMPILAN) */}
          <section id="contact" style={{...sec("var(--bg-void)"), overflow:"hidden"}}>
            <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,rgba(232,163,79,0.08),transparent 75%)",top:-100,right:-100,pointerEvents:"none"}}/>
            <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,rgba(95,200,155,0.06),transparent 75%)",bottom:-150,left:-150,pointerEvents:"none"}}/>
            
            <div style={W}>
              <div className="premium-contact-wrapper">
                
                {/* LEFT PANEL: INFO DETAILS */}
                <div className="contact-glass-panel reveal-card">
                  <div>
                    <SLabel text="Let's Connect"/>
                    <h2 style={{fontSize:"clamp(2.5rem,4.2vw,3.8rem)",fontWeight:700,color:"var(--text-main)",lineHeight:1.1,marginBottom:"1.5rem"}}>
                      Ready to Build<br/><em style={{color:"var(--accent)",fontStyle:"italic"}}>Something Great?</em>
                    </h2>
                    <p style={{fontSize:"1rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"3rem",maxWidth:"440px"}}>
                      Always open to digital innovations, systems architecture designs, or mobile developments challenge. Let's start the dialogue.
                    </p>
                  </div>

                  <div style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
                    {[
                      ["✉️","Email","berkejaisyurrohman95@gmail.com","mailto:berkejaisyurrohman95@gmail.com"],
                      ["📱","Phone","+62 895-0614-7763","tel:+6289506147763"],
                      ["📍","Location","Bekasi, Indonesia","#"],
                      ["🌐","Website","www.berkeja.dev","https://www.berkeja.dev"]
                    ].map(([ico,lbl,val,linkUrl])=>(
                      <a key={lbl} href={linkUrl} target={linkUrl.startsWith("http")?"_blank":"_self"} className="contact-hub-link">
                        <div className="hub-icon-box">{ico}</div>
                        <div>
                          <div className={`${dmMono.className}`} style={{fontSize:".68rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:2}}>{lbl}</div>
                          <div style={{fontSize:".95rem",fontWeight:500,color:"var(--text-main)"}}>{val}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* RIGHT PANEL: FORM INPUT */}
                <div className="contact-form-panel reveal-card">
                  <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
                    {["Name","Email","Subject"].map(f=>(
                      <div key={f}>
                        <label htmlFor={`input-${f.toLowerCase()}`} style={{display:"block", fontSize:"0.85rem", fontWeight:500, marginBottom:"0.5rem", color:"var(--text-dim)"}}>{f}</label>
                        <input id={`input-${f.toLowerCase()}`} type={f==="Email"?"email":"text"} className="cf-in" placeholder={f==="Name"?"Your full name":f==="Email"?"your@email.com":"Project architectural scope..."}/>
                      </div>
                    ))}
                    <div>
                      <label htmlFor="input-message" style={{display:"block", fontSize:"0.85rem", fontWeight:500, marginBottom:"0.5rem", color:"var(--text-dim)"}}>Message</label>
                      <textarea id="input-message" className="cf-in" rows={5} placeholder="Describe your project idea or message summary..."/>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSend("sending");
                        setTimeout(() => setSend("sent"), 1500);
                        setTimeout(() => setSend("idle"), 4500);
                      }}
                      style={{
                        padding:"1.1rem 2.5rem",
                        background:sendStatus==="sent"?"var(--sage)":"var(--text-main)",
                        color:"var(--bg-void)",
                        border:"none",
                        borderRadius:50,
                        fontSize:".95rem",
                        fontWeight:600,
                        opacity:sendStatus==="sending"?.65:1,
                        marginTop:".5rem",
                        boxShadow: sendStatus==="sent"?"0 8px 20px rgba(95,200,155,0.3)":"none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        minHeight: "48px"
                      }}
                    >
                      {sendStatus==="idle"?"Send Message ✦":sendStatus==="sending"?"Sending Package…":"Sent Successfully! ✓"}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{background:"var(--bg-void)",borderTop:"1px solid var(--border)",padding:"1.8rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",position:"relative",zIndex:3}}>
            <p className={`${dmMono.className}`} style={{fontSize:".75rem",fontWeight:500,color:"var(--text-muted)"}}>© 2026 <span style={{color:"var(--text-main)"}}>Berke Jaisyurrohman</span>. Bekasi, Indonesia.</p>
            <p className={`${dmMono.className}`} style={{fontSize:".75rem",fontWeight:500,color:"var(--text-muted)"}}>Built with <span style={{color:"var(--accent)"}}>Next.js</span> · <span style={{color:"var(--gold)"}}>GSAP</span> · <span style={{color:"var(--cyan)"}}>Interactive Workspace ✓</span></p>
            <p className={`${dmMono.className}`} style={{fontSize:".75rem",fontWeight:500,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:".5rem"}}><span style={{color:"var(--sage)"}}>●</span> Available for collaboration</p>
          </footer>

        </div>
      </div>
    </div>
  );
}