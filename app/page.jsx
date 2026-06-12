"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon:"🌐", title:"Web Development", desc:"Full-stack web apps with modern frameworks. From landing pages to complex SaaS platforms.", tech:["Laravel","React","MySQL","TypeScript"], color:"var(--accent)" },
  { icon:"📱", title:"Mobile Development", desc:"Cross-platform mobile apps for iOS and Android with native-quality experiences.", tech:["React Native","Flutter","Firebase"], color:"var(--sage)" },
  { icon:"🔐", title:"Cybersecurity", desc:"Data encryption, secure authentication, and security system design to protect sensitive data.", tech:["Python","Cryptography","JWT"], color:"var(--violet)" },
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

const SKILLS = [
  { name:"JavaScript", lvl:90 }, { name:"TypeScript", lvl:78 },
  { name:"Python", lvl:70, badge:"Entry" }, { name:"React", lvl:85 },
  { name:"Astro", lvl:65, badge:"Entry" }, { name:"Laravel", lvl:88 },
  { name:"Blade", lvl:82 }, { name:"MySQL", lvl:84 },
  { name:"React Native", lvl:80 }, { name:"Flutter", lvl:75 }, { name:"SIOT", lvl:70 },
];

const LANGS = [
  { lang:"Indonesian", lvl:100, flag:"🇮🇩", label:"Native", color:"var(--sage)" },
  { lang:"English", lvl:75, flag:"🇬🇧", label:"Professional", color:"var(--accent)" },
  { lang:"Japanese", lvl:35, flag:"🇯🇵", label:"Basic", color:"var(--violet)" },
  { lang:"German", lvl:32, flag:"🇩🇪", label:"Basic", color:"var(--gold)" },
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

const TECH_STACK = [
  {name:"React",icon:"⚛️",color:"var(--accent)"},{name:"Laravel",icon:"🏗️",color:"var(--sage)"},
  {name:"Flutter",icon:"📱",color:"var(--violet)"},{name:"TypeScript",icon:"📘",color:"var(--cyan)"},
  {name:"Python",icon:"🐍",color:"var(--gold)"},{name:"MySQL",icon:"🗄️",color:"var(--coral)"},
  {name:"React Native",icon:"📲",color:"var(--accent)"},{name:"TensorFlow",icon:"🤖",color:"var(--sage)"},
  {name:"Next.js",icon:"▲",color:"var(--violet)"},{name:"Astro",icon:"🚀",color:"var(--gold)"},
  {name:"Docker",icon:"🐳",color:"var(--cyan)"},{name:"Firebase",icon:"🔥",color:"var(--coral)"},
];

const MORPH_SHAPES = [
  "M 200,100 L 300,300 L 100,300 Z",
  "M 200,80 L 320,220 L 260,360 L 140,360 L 80,220 Z",
  "M 200,70 C 260,60 320,120 340,180 C 360,240 340,300 280,340 C 220,380 180,380 120,340 C 60,300 40,240 60,180 C 80,120 140,60 200,70 Z",
];

const MOTION_PATH_D = "M 0,150 C 150,50 300,250 450,150 S 650,50 800,150 S 950,250 1100,150";

/* ─── STYLING CSS ────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
.theme-dark{--bg-void:#050508;--bg-void-rgb:5,5,8;--bg-space:#0A0B12;--bg-card:#111322;--border:rgba(255,255,255,0.08);--border-hover:rgba(232,163,79,0.5);--text-main:rgba(255,255,255,0.92);--text-dim:rgba(255,255,255,0.65);--text-muted:rgba(255,255,255,0.4);--accent:#E8A34F;--accent-rgb:232,163,79;--sage:#5FC89B;--violet:#9B7FE8;--cyan:#4FD1E8;--coral:#E86B5F;--gold:#D4A843;--shadow:0 8px 32px rgba(0,0,0,0.4);--glow:0 0 40px rgba(var(--accent-rgb),0.15)}
.theme-light{--bg-void:#FDFAF5;--bg-void-rgb:253,250,245;--bg-space:#F8F4EC;--bg-card:#FFFFFF;--border:rgba(200,180,150,0.4);--border-hover:rgba(200,132,92,0.6);--text-main:#251B12;--text-dim:#5C5042;--text-muted:#9C8C7A;--accent:#C8845C;--accent-rgb:200,132,92;--sage:#6B9472;--violet:#8B7EC8;--cyan:#4FADC8;--coral:#C46B6B;--gold:#B89222;--shadow:0 8px 30px rgba(46,31,15,0.06);--glow:0 0 40px rgba(var(--accent-rgb),0.15)}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:auto}
::selection{background:rgba(var(--accent-rgb),0.3);color:var(--bg-void)}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg-void)}::-webkit-scrollbar-thumb{background:var(--accent);border-radius:10px}
body{-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;top:0;left:0;width:100vw;height:100vh;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.035;pointer-events:none;z-index:9999}

/* PRELOADER */
.preloader{position:fixed;inset:0;background:#050508;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.preloader-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
.liquid-text{--bg-x:0%;--bg-y:1.5em;font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,12vw,8.5rem);font-weight:700;letter-spacing:0.05em;position:relative;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.15)}
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
.nlink{font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:500;color:var(--text-dim);text-decoration:none;position:relative;transition:color .3s;letter-spacing:.02em}
.nlink::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--accent);transition:width 0.4s cubic-bezier(0.16,1,0.3,1);border-radius:2px}
.nlink:hover{color:var(--text-main)}.nlink:hover::after{width:100%}
.ncta{padding:.5rem 1.5rem;background:var(--text-main);color:var(--bg-void)!important;border-radius:50px;font-weight:600;transition:all 0.4s!important}
.ncta::after{display:none!important}
.ncta:hover{background:var(--accent);transform:translateY(-2px)!important;box-shadow:var(--glow)}
.theme-toggle{background:var(--border);border:none;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:var(--text-main);font-size:1.1rem;transition:all 0.4s}
.theme-toggle:hover{background:var(--accent);color:var(--bg-void);transform:rotate(15deg) scale(1.05)}
.bfill{padding:1rem 2.5rem;background:var(--accent);color:var(--bg-void);border:none;border-radius:50px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:600;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);text-decoration:none;display:inline-block}
.bfill:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(var(--accent-rgb),0.3)}
.boutl{padding:1rem 2.5rem;background:transparent;border:1px solid var(--border);color:var(--text-main);border-radius:50px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:600;transition:all 0.4s;text-decoration:none;display:inline-block}
.boutl:hover { border-color:var(--accent); background:rgba(232,163,79,0.05); transform:translateY(-3px); }
.pf-btn{padding:.5rem 1.4rem;border-radius:50px;background:var(--bg-void);border:1px solid var(--border);font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;color:var(--text-dim);transition:all 0.3s}
.pf-btn:hover{border-color:var(--border-hover);color:var(--text-main)}
.pf-btn.on{background:var(--text-main);border-color:var(--text-main);color:var(--bg-void)}

/* CARDS */
.tilt-card{transform-style:preserve-3d;will-change:transform}
.srv-card,.proj-card,.ach-card,.lang-card{background:var(--bg-card);border-radius:24px;padding:2.2rem;border:1px solid var(--border);box-shadow:var(--shadow);position:relative;transition:border-color 0.4s,box-shadow 0.4s}
.srv-card:hover,.proj-card:hover,.ach-card:hover,.lang-card:hover{border-color:var(--border-hover);box-shadow:var(--glow)}
.proj-card{padding:2rem}
.feat-badge{position:absolute;top:1.2rem;right:1.2rem;background:rgba(232,163,79,0.15);color:var(--accent);font-size:.6rem;font-family:'DM Mono',monospace;font-weight:600;letter-spacing:0.12em;padding:.35rem .9rem;border-radius:50px;border:1px solid rgba(232,163,79,0.3)}
.ach-badge{display:inline-block;padding:.3rem .85rem;border-radius:50px;font-family:'DM Mono',monospace;font-size:.65rem;font-weight:600;letter-spacing:0.08em;background:var(--bg-void);color:var(--text-dim);border:1px solid var(--border)}
.info-item,.soft-item{display:flex;align-items:center;gap:1rem;padding:.8rem 1.2rem;background:var(--bg-card);border-radius:14px;border:1px solid var(--border);font-family:'Outfit',sans-serif;font-size:.88rem;color:var(--text-dim);transition:all 0.4s;cursor:default}
.info-item:hover{border-color:var(--accent);color:var(--text-main);transform:translateX(6px);box-shadow:var(--glow)}
.soft-item{padding:.8rem 1rem;gap:.7rem;font-size:.85rem}
.tl-item{display:grid;grid-template-columns:56px 1fr;gap:1.8rem;margin-bottom:3rem}
.tl-content{background:var(--bg-card);border-radius:24px;padding:1.8rem;border:1px solid var(--border);box-shadow:var(--shadow);transition:all 0.4s}
.tl-content:hover{border-color:var(--border-hover);box-shadow:var(--glow)}
.ct-link{display:flex;align-items:center;gap:1.1rem;padding:.9rem 1.2rem;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;font-family:'Outfit',sans-serif;font-size:.88rem;color:var(--text-dim);text-decoration:none;transition:all 0.4s}
.ct-link:hover{background:rgba(232,163,79,0.08);border-color:var(--accent);color:var(--text-main);transform:translateX(6px);box-shadow:var(--glow)}
.cf-label{display:block;font-family:'DM Mono',monospace;font-size:.7rem;font-weight:500;color:var(--text-dim);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.6rem}
.cf-in{width:100%;background:var(--bg-space);border:1px solid var(--border);border-radius:14px;padding:1rem 1.2rem;font-family:'Outfit',sans-serif;font-size:.9rem;color:var(--text-main);outline:none;transition:all 0.3s;resize:none}
.cf-in:focus{border-color:var(--accent);background:var(--bg-card);box-shadow:0 0 0 4px rgba(232,163,79,0.15)}
.cf-in::placeholder{color:var(--text-muted);font-size:.88rem}

/* GRIDS */
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem}
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}
.lang-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem}

/* HORIZONTAL SCROLL */
.h-scroll-section{overflow:hidden;position:relative;height:100vh;background:var(--bg-space)}
.h-track{display:flex;gap:2rem;padding:0 3rem;align-items:center;white-space:nowrap;will-change:transform}
.h-tech-card{flex-shrink:0;width:200px;height:220px;background:var(--bg-card);border:1px solid var(--border);border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;transition:border-color 0.3s;white-space:normal}
.h-tech-card:hover{border-color:var(--border-hover)}

/* WEBGL CANVAS WORKSPACE */
.story-3d-workspace{position:relative;height:100vh;overflow:hidden;background:var(--bg-space)}
.narrative-layer{position:absolute;inset:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:0 7rem;pointer-events:none}
.story-block{pointer-events:auto;max-width:380px}

/* DRAW SVG */
.draw-svg-path{stroke-dasharray:1000;stroke-dashoffset:1000;fill:none;stroke:var(--accent);stroke-width:2;opacity:0.5}

/* DRAGGABLE */
.draggable-container{position:relative;height:250px;overflow:hidden;border-radius:24px;background:var(--bg-card);border:1px solid var(--border)}
.draggable-orb{position:absolute;width:80px;height:80px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:1.3rem;cursor:grab;touch-action:none;user-select:none;border:2px solid var(--border);box-shadow:var(--shadow);will-change:transform}
.draggable-orb:active{cursor:grabbing}

.hover-image-text{display:inline-block;position:relative}
.hover-image-text::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--accent);transition:width 0.4s ease}
.hover-image-text:hover::after{width:100%}

/* SCRAMBLE & TYPEWRITER */
.scramble-label{font-family:'DM Mono',monospace;font-size:.72rem;font-weight:500;color:var(--accent);letter-spacing:0.22em;text-transform:uppercase;display:flex;align-items:center;gap:.7rem;margin-bottom:.8rem}
.typewriter-wrap{font-family:'DM Mono',monospace;font-size:.85rem;color:var(--accent);letter-spacing:0.1em;margin-bottom:1rem;min-height:1.2em}

/* MORPH BG */
.morph-bg{position:absolute;right:3%;top:50%;transform:translateY(-50%);z-index:0;opacity:0.1;pointer-events:none}

@media(max-width:900px){.srv-grid{grid-template-columns:1fr 1fr}.two-col{grid-template-columns:1fr!important;gap:3rem!important}.nav-links{display:none}.narrative-layer{flex-direction:column;justify-content:center;gap:3rem;padding:2rem}}
@media(max-width:600px){.srv-grid{grid-template-columns:1fr}section{padding:5rem 1.5rem!important}.h-title{font-size:3rem!important}}
`;

/* ─── WEBGL SHADER SHAPES SUB-COMPONENT ─────────────────────────────────── */
function FluidBlobMesh() {
  const meshRef = useRef(null);
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_intensity: { value: 0.35 }
  }), []);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={`
          uniform float u_time;
          uniform float u_intensity;
          varying vec2 vUv;
          varying vec3 vNormal;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute( permute( permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                      + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                      + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
          }

          void main() {
            vUv = uv;
            vNormal = normal;
            float noise = snoise(vec3(position * 1.5 + u_time * 0.4));
            vec3 newPosition = position + normal * noise * u_intensity;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
            float lighting = dot(vNormal, lightDirection);
            vec3 baseColor = vec3(0.91, 0.64, 0.31); 
            vec3 finalColor = baseColor * (lighting * 0.6 + 0.5);
            gl_FragColor = vec4(finalColor, 0.88);
          }
        `}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

/* ─── MAIN PORTFOLIO COMPONENT ───────────────────────────────────────────── */
export default function BerkePortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [cat, setCat] = useState("All");
  const [sendStatus, setSend] = useState("idle");
  const [isLoaded, setIsLoaded] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);

  const preloaderRef = useRef(null);
  const progressRef  = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroTitleRef  = useRef(null);
  const typewriterRef = useRef(null);
  const morphPathRef  = useRef(null);
  const morphSvgRef   = useRef(null);
  const motionBallRef = useRef(null);
  const horizontalRef = useRef(null);
  const gsapRef       = useRef(null);

  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === cat);

  /* ─── 0. Unified Load & Context Setup ──────────────────────────────────── */
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

  /* ─── 1. PRELOADER ENGINE ──────────────────────────────────── */
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

  /* ─── 2. MAIN CORE ANIMATIONS ─────────────────────── */
  useEffect(() => {
    if (!isLoaded || !gsapReady || !gsapRef.current) return;
    const { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, ScrollSmoother, Observer } = gsapRef.current;

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

      if (horizontalRef.current) {
        const track = horizontalRef.current.querySelector(".h-track");
        if (track) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 60),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalRef.current, start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth + 200}`,
              pin: true, scrub: 1,
            }
          });
        }
      }

      // 12. WEBGL INTERACTIVE CANVAS SEQUENCER
      if (document.querySelector("#story-3d-trigger")) {
        const meshTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#story-3d-trigger", start: "top top", end: "+=4000", pin: true, scrub: 1
          }
        });

        meshTimeline.to("#webgl-layer-canvas", { x: "22vw", rotation: 15, scale: 1.1, duration: 1.2, ease: "power2.inOut" }, "scene1")
                    .fromTo(".story-node-1", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.6 }, "scene1+=0.4")
                    .to({}, { duration: 1.5 })
                    
                    .to(".story-node-1", { opacity: 0, x: -40, duration: 0.4 }, "scene2")
                    .to("#webgl-layer-canvas", { x: "-22vw", rotation: -15, scale: 0.95, duration: 1.4, ease: "power2.inOut" }, "scene2")
                    .fromTo(".story-node-2", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6 }, "scene2+=0.5")
                    .to({}, { duration: 1.5 })
                    
                    .to("#webgl-layer-canvas", { x: "0vw", rotation: 0, scale: 1.25, duration: 1.2, ease: "back.out(1.1)" }, "scene3")
                    .to(".story-node-1", { opacity: 1, x: 0, duration: 0.5 }, "scene3+=0.4")
                    .to(".story-node-2", { opacity: 1, x: 0, duration: 0.5 }, "scene3+=0.4")
                    .to({}, { duration: 0.5 });
      }

      if (document.querySelector(".skills-pin-label") && document.querySelector("#skills")) {
        ScrollTrigger.create({
          trigger: "#skills", start: "top top",
          end: "+=400", pin: ".skills-pin-label", pinSpacing: false
        });
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
        switch (true) {
          default:
            gsap.fromTo(el, { opacity: 0, y: 50 }, {
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true }
            });
        }
      });
      
      const timelineItems = Array.from(document.querySelectorAll(".tl-item"));
      timelineItems.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, x: -40, scale: 0.95 }, {
          opacity: 1, x: 0, scale: 1, duration: 1.2, delay: i * 0.15, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        });
      });

      if (document.querySelector("#quote")) {
        gsap.fromTo(".q-text", { opacity: 0, y: 40, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: "#quote", start: "top 75%", once: true } });
        gsap.fromTo(".q-author", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "expo.out", scrollTrigger: { trigger: "#quote", start: "top 75%", once: true } });
      }

      const skillFills = Array.from(document.querySelectorAll(".skill-fill"));
      skillFills.forEach(f => {
        if (!f) return;
        gsap.set(f, { scaleX: 0, transformOrigin: "left" });
        gsap.to(f, {
          scaleX: 1, duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: f, start: "top 88%", once: true }
        });
      });

      const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
      tiltCards.forEach(el => {
        if (!el) return;
        const handleMove = e => {
          const r = el.getBoundingClientRect();
          gsap.to(el, { rotateX: (e.clientY - r.top - r.height / 2) / r.height * -10, rotateY: (e.clientX - r.left - r.width / 2) / r.width * 10, duration: 0.5, ease: "power3.out", transformPerspective: 1000 });
        };
        const handleLeave = () => {
          gsap.to(el, { rotateX: 0, rotateY: 0, duration: 1.2, ease: "elastic.out(1,0.3)" });
        };
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
      });

      ScrollTrigger.create({
        start: "top -80",
        onUpdate: s => {
          const nav = document.getElementById("main-nav");
          if (!nav) return;
          if (s.direction === 1) {
            Object.assign(nav.style, { 
              background: isDark ? "rgba(5,5,8,0.9)" : "rgba(253,250,245,0.9)", 
              backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)", padding: "0.8rem 3rem"
            });
            nav.querySelectorAll(".nlink, .nav-logo-text").forEach(el => {
              if (!el.classList.contains("ncta")) { el.style.color = isDark ? "rgba(255,255,255,0.92)" : "#251B12"; }
            });
          } else {
            Object.assign(nav.style, { 
              background: "transparent", backdropFilter: "none", borderBottom: "1px solid transparent", padding: "1.1rem 3rem"
            });
            nav.querySelectorAll(".nlink, .nav-logo-text").forEach(el => {
              if (!el.classList.contains("ncta")) { el.style.color = ""; }
            });
          }
        }
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isLoaded, gsapReady, isDark]);

  /* ─── 3. DRAGGABLE ISOLATED ENGINE ─── */
  useEffect(() => {
    if (!isLoaded || !gsapReady || !gsapRef.current) return;
    const { gsap, Draggable } = gsapRef.current;
    if (!Draggable) return;

    const orbs = document.querySelectorAll(".draggable-orb");
    const container = document.querySelector(".draggable-container");
    let draggableInstances = [];

    if (orbs.length > 0 && container) {
      try {
        draggableInstances = Draggable.create(orbs, {
          type: "x,y", bounds: ".draggable-container",
          inertia: !!gsapRef.current.InertiaPlugin, edgeResistance: 0.65,
          onDragStart() { gsap.to(this.target, { scale: 1.2, duration: 0.3, ease: "back.out(2)" }); },
          onDragEnd() { gsap.to(this.target, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.4)" }); }
        });
      } catch (err) {}
    }

    return () => {
      if (draggableInstances.length > 0) {
        draggableInstances.forEach(instance => { if (instance && typeof instance.kill === "function") instance.kill(); });
      }
    };
  }, [isLoaded, gsapReady]);

  /* ─── 4. MOUSE MOVE MAGNETIC ENGINE FOR SKILLS ─── */
  useEffect(() => {
    if (!isLoaded || !gsapReady || !gsapRef.current) return;
    const { gsap } = gsapRef.current;
    const orbs = document.querySelectorAll(".draggable-orb");

    const onMouseMoveMagnetic = (e) => {
      orbs.forEach(orb => {
        const rect = orb.getBoundingClientRect();
        const orbX = rect.left + rect.width / 2;
        const orbY = rect.top + rect.height / 2;
        const distX = e.clientX - orbX;
        const distY = e.clientY - orbY;
        const distance = Math.hypot(distX, distY);

        if (distance < 120) {
          gsap.to(orb, { x: `+=${distX * 0.18}`, y: `+=${distY * 0.18}`, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(orb, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
        }
      });
    };

    window.addEventListener("mousemove", onMouseMoveMagnetic);
    return () => window.removeEventListener("mousemove", onMouseMoveMagnetic);
  }, [isLoaded, gsapReady]);

  /* ─── 5. TYPEWRITER SUB-MODULE ──────────────────── */
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

  /* ─── 6. FLIP ON CATEGORY CHANGE ────────────────── */
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

  /* ─── 7. GLOBAL EVENT DELEGATION CURSOR ────────── */
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
      const target = e.target.closest("a, button, .tilt-card, .draggable-orb, .srv-card, .proj-card, .ach-card, .lang-card");
      if (target && ring && dot) {
        gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.35, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      }
    };

    const onMouseOutGlobal = (e) => {
      const target = e.target.closest("a, button, .tilt-card, .draggable-orb, .srv-card, .proj-card, .ach-card, .lang-card");
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

  const W   = { maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:2 };
  const sec = bg => ({ position:"relative", padding:"8rem 3rem", background: bg || "var(--bg-void)" });

  const SLabel = ({text}) => (  
    <div className="scramble-label">
      <span style={{width:24,height:1,background:"var(--accent)",display:"inline-block",flexShrink:0}}/>
      <span className="scramble-text">{text}</span>
    </div>
  );

  const SHead = ({label,title,center=false}) => (
    <div style={{textAlign:center?"center":"left",marginBottom:"1rem"}}>
      <SLabel text={label}/>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,3.6rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.1,marginBottom:"2.8rem"}}
        dangerouslySetInnerHTML={{__html:title}}/>
    </div>
  );

  return (
    <div className={isDark?"theme-dark":"theme-light"} style={{fontFamily:"'Outfit',sans-serif",background:"var(--bg-void)",color:"var(--text-main)",overflowX:"hidden",transition:"background 0.5s,color 0.5s"}}>
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
        <div ref={progressRef} style={{position:"absolute",bottom:"10%",fontFamily:"'DM Mono',monospace",fontSize:"1.2rem",fontWeight:600,color:"#E8A34F",letterSpacing:"0.2em",zIndex:2,textShadow:"0 0 20px rgba(232,163,79,0.5)"}}>0%</div>
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
              fontSize: "1.5rem", letterSpacing: "-0.5px", color: isDark ? "var(--text-main)" : "#251B12",
              fontFamily:"'Cormorant Garamond',serif", fontWeight:700, transition: "color 0.4s ease" 
            }}>
              Berke<span style={{ color: "var(--accent)" }}>.dev</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              <ul className="nav-links" style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}>
                {["About", "Services", "Projects", "Skills", "Contact"].map(s => (
                  <li key={s}>
                    <a href={`#${s.toLowerCase()}`} className={`nlink ${s === "Contact" ? "ncta" : ""}`} style={{ color: s !== "Contact" && !isDark ? "#251B12" : "" }}>
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
              <div className="h-badge" style={{display:"inline-flex",alignItems:"center",gap:".7rem",padding:".5rem 1.4rem",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:50,fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:500,color:"var(--text-main)",letterSpacing:"0.12em",marginBottom:"1.5rem",opacity:0,boxShadow:"var(--shadow)"}}>
                <div className="live-dot" style={{width:8,height:8,background:"var(--sage)",borderRadius:"50%",flexShrink:0,boxShadow:"0 0 10px var(--sage)"}}/>
                Available for Collaboration
              </div>

              <div className="h-typewriter typewriter-wrap" style={{marginBottom:"1rem"}}>
                <span ref={typewriterRef} className="cursor-blink">Full-Stack Developer</span>
              </div>

              <h1 ref={heroTitleRef} className="h-title" style={{fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3.8rem, 8vw, 7.2rem)", fontWeight: 700, lineHeight: 1.05, color: "var(--text-main)", marginBottom: "1.8rem", letterSpacing: "-.02em", opacity: 0, textShadow: "0 10px 40px rgba(0,0,0,0.5)"}}>
                Qiageng <em style={{color:"var(--accent)", fontStyle:"italic", fontWeight:600}}>Berke</em><br/>
                Jaisyurrohman
              </h1>
              
              <p className="h-para" style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.15rem",fontWeight:400,color:"var(--text-dim)",lineHeight:1.8,maxWidth:600,marginBottom:"3.5rem",opacity:0}}>
                A passionate <strong style={{color:"var(--text-main)",fontWeight:600}}>Full-Stack Developer & IT Student</strong>. Building web systems, mobile apps, and cybersecurity solutions that create real impact.
              </p>

              <div className="h-btns" style={{display:"flex",gap:"1.4rem",justifyContent:"center",flexWrap:"wrap",opacity:0,pointerEvents:"auto"}}>
                <a href="#projects" className="bfill">Explore My Work</a>
                <a href="#about" className="boutl">Read My Story</a>
              </div>
            </div>

            <div style={{position:"absolute",bottom:"3rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeInUp 1s 2.5s both",zIndex:2,pointerEvents:"none"}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.25em",textTransform:"uppercase"}}>Scroll</span>
              <div style={{width:1,height:50,background:"linear-gradient(180deg,var(--accent),transparent)"}}/>
            </div>
          </section>

          {/* MARQUEE */}
          <div style={{padding:"1.5rem 0",background:"var(--bg-card)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",overflow:"hidden",position:"relative",zIndex:2}}>
            <div className="mq-track" style={{display:"flex",gap:"3.5rem",whiteSpace:"nowrap"}}>
              {[...Array(2)].map((_,r)=>["Web Development","Mobile Apps","Cybersecurity","Laravel","React","Flutter","MySQL","TypeScript","AI/ML","SIOT","React Native","Python","Astro","Full-Stack"].map((t,i)=>(
                <div key={`${r}-${i}`} style={{display:"flex",alignItems:"center",gap:"1.2rem",flexShrink:0}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:".8rem",fontWeight:500,color:"var(--text-dim)",letterSpacing:"0.16em",textTransform:"uppercase"}}>{t}</span>
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
                    <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Origin</em> Story</h2>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"1.2rem"}}>A highly motivated IT student specializing in <strong style={{color:"var(--text-main)",fontWeight:600}}>Web Development, Mobile Applications, and Cybersecurity</strong>. Berke has built real-world systems serving actual users in production.</p>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2.2rem"}}>Passionate about clean code, data security, and technology that creates <strong style={{color:"var(--text-main)",fontWeight:600}}>real impact for communities</strong>.</p>
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
                    <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>My <em style={{color:"var(--accent)",fontStyle:"italic"}}>Roots</em></h2>
                    <div className="tilt-card" style={{background:"var(--bg-card)",borderRadius:24,padding:"2.2rem",border:"1px solid var(--border)",boxShadow:"var(--shadow)",position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:"linear-gradient(180deg,var(--accent),var(--gold))",borderRadius:"4px 0 0 4px"}}/>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.14em",marginBottom:".6rem"}}>JUNE 2023 – PRESENT</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:"var(--text-main)",marginBottom:".4rem"}}>SMK TI Bazma</div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:"1rem",color:"var(--text-muted)",marginBottom:"1.2rem"}}>Network Information Systems & Applications · Bogor</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:".4rem"}}>
                        {["Web Dev","Database","Networking","Cybersecurity"].map(t=>(
                          <span key={t} style={{padding:".35rem 1rem",background:"var(--bg-void)",border:"1px solid var(--border)",borderRadius:50,fontSize:".75rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ch-3" style={{position:"absolute",width:"100%",left:0,padding:"0 3rem",opacity:0}}>
                  <div style={{maxWidth:700}}>
                    <SLabel text="Chapter 03"/>
                    <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Arsenal</em></h2>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"1.8rem"}}>My daily drivers — modern frameworks and robust backend technologies for seamless, secure digital experiences.</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".6rem",marginBottom:"2.5rem"}}>
                      {[["var(--accent)","React"],["var(--sage)","Flutter"],["var(--violet)","Laravel"],["var(--gold)","TypeScript"],["var(--accent)","MySQL"],["var(--sage)","Python"],["var(--violet)","React Native"],["var(--gold)","Next.js"],["var(--accent)","Astro"]].map(([c,t])=>(
                        <span key={t} style={{padding:".45rem 1rem",borderRadius:50,background:`rgba(232,163,79,0.1)`,fontSize:".85rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:c,border:`1px solid var(--border)`}}>{t}</span>
                      ))}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
                      {[["6","Projects"],["2","Years"],["4","Languages"]].map(([n,l])=>(
                        <div key={l} style={{background:"var(--bg-card)",borderRadius:16,padding:"1.2rem",textAlign:"center",border:"1px solid var(--border)"}}>
                          <div className="counter-anim" data-to={parseInt(n)} data-suffix="+" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.4rem",fontWeight:700,color:"var(--text-main)"}}>{n}+</div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:600,color:"var(--text-muted)"}}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ch-4" style={{position:"absolute",width:"100%",left:0,padding:"0 3rem",opacity:0}}>
                  <div style={{maxWidth:700}}>
                    <SLabel text="Chapter 04"/>
                    <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Philosophy</em></h2>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2rem"}}>Technology is only as good as the mind wielding it. Clear communication, analytical thinking, and team synergy turn ideas into reality.</p>
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

          {/* HORIZONTAL SCROLL */}
          <div ref={horizontalRef} className="h-scroll-section">
            <div style={{position:"absolute",top:"3rem",left:"3rem",zIndex:5}}>
              <SLabel text="Tech Stack"/>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3vw,2.8rem)",fontWeight:600,color:"var(--text-main)"}}>Scroll & Discover →</h2>
            </div>
            <div className="h-track" style={{paddingTop:"10rem"}}>
              {TECH_STACK.map(t=>(
                <div key={t.name} className="h-tech-card tilt-card">
                  <div style={{fontSize:"3rem"}}>{t.icon}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:600,color:"var(--text-main)"}}>{t.name}</div>
                  <div style={{width:40,height:3,borderRadius:4,background:t.color}}/>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <section id="services" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-space)" }}>
            <div style={W}>
              <SHead label="What I Do" title="Services &<br/><em style='color:var(--accent);font-style:italic'>Specializations</em>"/>
              <div className="srv-grid">
                {SERVICES.map(s=>(
                  <div key={s.title} className="srv-card tilt-card reveal-card">
                    <div style={{width:55,height:55,borderRadius:16,background:`rgba(232,163,79,0.1)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",marginBottom:"1.5rem",border:`1px solid var(--border)`}}>{s.icon}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",fontWeight:600,color:"var(--text-main)",marginBottom:".6rem"}}>{s.title}</div>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".88rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{s.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".35rem"}}>
                      {s.tech.map(t=><span key={t} style={{padding:".25rem .75rem",borderRadius:50,background:"var(--bg-void)",border:"1px solid var(--border)",fontSize:".65rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE CREATIVE LAYER MESH TRANSITION (PODIUM ENGINE) */}
          <div id="story-3d-trigger" className="story-3d-workspace">
            
            {/* LAYER 1: TEXT CONTENT (DEPAN) */}
            <div className="narrative-layer">
              <div className="story-block story-node-1" style={{ opacity: 0 }}>
                <SLabel text="Visionary Engineering"/>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", color: "var(--accent)", marginBottom: "1rem" }}>Premium UX Aesthetics</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", color: "var(--text-dim)", lineHeight: 1.8 }}>
                  Menggabungkan rancangan matematika shader WebGL dengan logika Next.js untuk menciptakan interaksi website yang kaya, adaptif, dan responsif.
                </p>
              </div>

              <div className="story-block story-node-2" style={{ opacity: 0 }}>
                <SLabel text="Secure Infrastructure"/>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", color: "var(--sage)", marginBottom: "1rem" }}>Data Masking Protection</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", color: "var(--text-dim)", lineHeight: 1.8 }}>
                  Fokus penuh pada enkripsi data sensitif (Bazma Cipher) untuk perlindungan backend sistem, memastikan seluruh gerak data dienkripsi dengan standar industri tinggi.
                </p>
              </div>
            </div>

            {/* LAYER 2: WEBGL INTERACTIVE CANVAS LAYER (BELAKANG) */}
            <div id="webgl-layer-canvas" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <FluidBlobMesh />
              </Canvas>
            </div>

          </div>

          {/* PROJECTS */}
          <section id="projects" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-void)" }}>    
            <div style={W}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"2.5rem",flexWrap:"wrap",gap:"2rem"}}>
                <SHead label="Selected Work" title="Projects &<br/><em style='color:var(--accent);font-style:italic'>Case Studies</em>"/>
                <div style={{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"2.8rem"}}>
                  {PROJ_CATS.map(c=><button key={c} className={`pf-btn${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
                </div>
              </div>
              <div className="proj-grid">
                {filtered.map(p=>(
                  <div key={p.num} className="proj-card tilt-card reveal-card">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.2rem"}}>
                      <div style={{width:50,height:50,borderRadius:16,background:`rgba(232,163,79,0.15)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",border:`1px solid var(--border)`}}>{p.icon}</div>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,color:"var(--text-muted)",background:"var(--bg-void)",border:"1px solid var(--border)",padding:".3rem .8rem",borderRadius:50}}>{p.year}</span>
                    </div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:p.color,marginBottom:".5rem"}}>{p.tag}</div>
                    
                    <div className="hover-image-text" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:600,color:"var(--text-main)",marginBottom:".4rem",lineHeight:1.2,display:"inline-block"}}>
                      {p.name}
                    </div>
                    
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".75rem",color:"var(--text-muted)",marginBottom:".85rem"}}>{p.org}</div>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".86rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{p.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".35rem",marginBottom:"1.4rem"}}>
                      {p.tech.map(t=><span key={t} style={{padding:".25rem .75rem",borderRadius:50,background:"var(--bg-void)",border:"1px solid var(--border)",fontSize:".65rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>)}
                    </div>
                    <div style={{display:"flex",gap:"1.2rem"}}>
                      {["Demo ↗","Code ↗"].map(l=><a key={l} href="#" style={{fontFamily:"'Outfit',sans-serif",fontSize:".8rem",fontWeight:500,color:"var(--accent)",textDecoration:"none"}}>{l}</a>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" style={sec("var(--bg-space)")}>
            <div style={W}>
              <div className="skills-pin-label" style={{marginBottom:"1rem"}}>
                <SLabel text="Expertise"/>
              </div>
              <SHead label="" title="Tech Stack &<br/><em style='color:var(--accent);font-style:italic'>Languages</em>"/>

              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.5rem",marginBottom:"4rem"}} className="two-col">
                {[["90","Skills Mastered","%"],["6","Projects Shipped",""],["2","Years Coding","+"],["11","Technologies",""]].map(([n,l,s])=>(
                  <div key={l} style={{background:"var(--bg-card)",borderRadius:20,padding:"1.5rem",textAlign:"center",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                    <div className="counter-anim" data-to={parseInt(n)} data-suffix={s} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"3rem",fontWeight:700,color:"var(--accent)"}}>{n}{s}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.08em",marginTop:".4rem"}}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4.5rem",marginBottom:"5rem"}} className="two-col">
                <div>{SKILLS.slice(0,6).map(s=>(
                  <div key={s.name} style={{marginBottom:"1.5rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontFamily:"'Outfit',sans-serif",fontSize:".92rem",fontWeight:500,color:"var(--text-main)"}}>{s.name}</span>
                        {s.badge&&<span style={{fontSize:".58rem",padding:".2rem .6rem",borderRadius:50,background:"rgba(212,168,67,0.15)",color:"var(--gold)",fontFamily:"'DM Mono',monospace",border:"1px solid var(--border)"}}>{s.badge}</span>}
                      </div>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",color:"var(--accent)"}}>{s.lvl}%</span>
                    </div>
                    <div style={{height:6,background:"var(--border)",borderRadius:50,overflow:"hidden"}}>
                      <div className="skill-fill" data-lvl={s.lvl} style={{height:"100%",width:s.lvl+"%",borderRadius:50,background:"linear-gradient(90deg,var(--accent),var(--cyan))"}}/>
                    </div>
                  </div>
                ))}</div>
                <div>{SKILLS.slice(6).map(s=>(
                  <div key={s.name} style={{marginBottom:"1.5rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <span style={{fontFamily:"'Outfit',sans-serif",fontSize:".92rem",fontWeight:500,color:"var(--text-main)"}}>{s.name}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",color:"var(--accent)"}}>{s.lvl}%</span>
                    </div>
                    <div style={{height:6,background:"var(--border)",borderRadius:50,overflow:"hidden"}}>
                      <div className="skill-fill" data-lvl={s.lvl} style={{height:"100%",width:s.lvl+"%",borderRadius:50,background:"linear-gradient(90deg,var(--sage),var(--cyan))"}}/>
                    </div>
                  </div>
                ))}</div>
              </div>

              {/* DRAGGABLE SKILLS CONTAINER */}
              <div style={{marginBottom:"3rem"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:600,color:"var(--text-main)",marginBottom:".5rem"}}>Drag & Explore Skills</div>
                <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".85rem",color:"var(--text-muted)",marginBottom:"1.5rem"}}>These skill orbs are draggable — grab and throw them around!</p>
                <div className="draggable-container">
                  {[["⚛️","React","var(--accent)",{left:"5%",top:"30%"}],["🏗️","Laravel","var(--sage)",{left:"18%",top:"55%"}],["📱","Flutter","var(--violet)",{left:"32%",top:"20%"}],["📘","TS","var(--gold)",{left:"46%",top:"50%"}],["🐍","Python","var(--coral)",{left:"60%",top:"18%"}],["🗄️","MySQL","var(--cyan)",{left:"72%",top:"55%"}],["📲","RN","var(--accent)",{left:"84%",top:"28%"}]].map(([ico,name,color,pos])=>(
                    <div key={name} className="draggable-orb" style={{...pos,background:`var(--bg-card)`,borderColor:color}}>
                      <div style={{fontSize:"1.3rem"}}>{ico}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".45rem",color:"var(--text-muted)",marginTop:"2px"}}>{name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"var(--text-main)",marginBottom:"2rem"}}>Human Languages</div>
              <div className="lang-grid">
                {LANGS.map(l=>(
                  <div key={l.lang} className="lang-card tilt-card reveal-card">
                    <div style={{display:"flex",alignItems:"center",gap:".9rem",marginBottom:"1rem"}}>
                      <span style={{fontSize:"1.8rem"}}>{l.flag}</span>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".95rem",fontWeight:500,color:"var(--text-main)"}}>{l.lang}</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color:l.color,marginTop:2}}>{l.label}</div>
                      </div>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",color:"var(--accent)"}}>{l.lvl}%</span>
                    </div>
                    <div style={{height:5,background:"var(--border)",borderRadius:50,overflow:"hidden"}}>
                      <div className="lang-fill" data-lvl={l.lvl} style={{height:"100%",width:"0%",borderRadius:50,background:`linear-gradient(90deg,${l.color},var(--accent))`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ position:"relative", padding:"8rem 3rem", background:"var(--bg-void)" }}>
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
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.14em",marginBottom:".5rem"}}>{t.year}</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"var(--text-main)",marginBottom:".3rem"}}>{t.role}</div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".9rem",color:"var(--text-muted)",marginBottom:"1.2rem"}}>{t.company}</div>
                      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".7rem"}}>
                        {t.points.map((pt,j)=>(
                          <li key={j} style={{display:"flex",gap:".8rem",fontFamily:"'Outfit',sans-serif",fontSize:"0.9rem",color:"var(--text-dim)",lineHeight:1.75}}>
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
            <p className="q-text" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontStyle:"italic",fontWeight:500,color:"var(--text-main)",lineHeight:1.4,maxWidth:850,margin:"0 auto 2rem",opacity:0}}>
              "Technology should not just be functional — it should create genuine impact for the people who use it."
            </p>
            <p className="q-author" style={{fontFamily:"'DM Mono',monospace",fontSize:".8rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.18em",opacity:0}}>
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
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.25rem",fontWeight:600,color:"var(--text-main)",marginBottom:".5rem"}}>{a.title}</div>
                    <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".86rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{a.desc}</p>
                    <span className="ach-badge">{a.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" style={{...sec("var(--bg-card)"),overflow:"hidden"}}>
            <div style={{position:"absolute",width:600,height:600,background:"radial-gradient(circle,rgba(232,163,79,0.12),transparent 70%)",top:-150,right:-150,pointerEvents:"none"}}/>
            <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,rgba(95,200,155,0.12),transparent 70%)",bottom:-150,left:-150,pointerEvents:"none"}}/>
            <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
              <svg width="100%" height="100%" style={{position:"absolute",inset:0}}>
                <path className="draw-svg-path" d="M0,300 C300,100 600,500 900,300 S1200,100 1500,300" stroke="var(--accent)" strokeWidth="1.5" opacity="0.2"/>
              </svg>
            </div>
            <div style={W}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"6rem",alignItems:"start"}} className="two-col">
                <div>
                  <SLabel text="Let's Connect"/>
                  <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,4rem)",fontWeight:700,color:"var(--text-main)",lineHeight:1.1,marginBottom:"1.8rem"}}>
                    Ready to Build<br/><em style={{color:"var(--accent)",fontStyle:"italic"}}>Something Great?</em>
                  </h2>
                  <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2.5rem"}}>
                    Always open to opportunities and collaborations. Web system, mobile app, or cybersecurity challenge — let's create together.
                  </p>
                  <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                    {[["✉️","Email","berkejaisyurrohman95@gmail.com"],["📱","Phone","+62 895-0614-7763"],["📍","Location","Bekasi, Indonesia"],["🌐","Website","www.jaisyporto.com"]].map(([ico,lbl,val])=>(
                      <a key={lbl} href={lbl==="Email"?`mailto:${val}`:"#"} className="ct-link">
                        <div style={{width:40,height:40,background:"rgba(232,163,79,0.15)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"1.2rem"}}>{ico}</div>
                        <div>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>{lbl}</div>
                          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".95rem",fontWeight:500,color:"var(--text-main)"}}>{val}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"1.4rem",background:"var(--bg-void)",padding:"2.5rem",borderRadius:"24px",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                  {["Name","Email","Subject"].map(f=>(
                    <div key={f}>
                      <label className="cf-label">{f}</label>
                      <input suppressHydrationWarning type={f==="Email"?"email":"text"} className="cf-in" placeholder={f==="Name"?"Your name":f==="Email"?"your@email.com":"Project idea..."}/>
                    </div>
                  ))}
                  <div>
                    <label className="cf-label">Message</label>
                    <textarea suppressHydrationWarning className="cf-in" rows={5} placeholder="Tell me about your project..."/>
                  </div>
                  <button 
                    onClick={() => {
                      setSend("sending");
                      setTimeout(() => setSend("sent"), 1500);
                      setTimeout(() => setSend("idle"), 4500);
                    }}
                    style={{padding:"1.1rem 2.5rem",background:sendStatus==="sent"?"var(--sage)":"var(--text-main)",color:"var(--bg-void)",border:"none",borderRadius:50,fontFamily:"'Outfit',sans-serif",fontSize:".95rem",fontWeight:600,opacity:sendStatus==="sending"?.65:1,marginTop:".5rem"}}
                  >
                    {sendStatus==="idle"?"Send Message ✦":sendStatus==="sending"?"Sending…":"Sent! ✓"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{background:"var(--bg-void)",borderTop:"1px solid var(--border)",padding:"1.8rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",position:"relative",zIndex:3}}>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"var(--text-muted)"}}>© 2026 <span style={{color:"var(--text-main)"}}>Berke Jaisyurrohman</span>. Bekasi, Indonesia.</p>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"var(--text-muted)"}}>Built with <span style={{color:"var(--accent)"}}>Next.js</span> · <span style={{color:"var(--gold)"}}>GSAP</span> · <span style={{color:"var(--cyan)"}}>20 Animations ✓</span></p>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:".5rem"}}><span style={{color:"var(--sage)"}}>●</span> Available for collaboration</p>
          </footer>

        </div>
      </div>
    </div>
  );
}