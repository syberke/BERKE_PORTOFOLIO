"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Script from "next/script";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

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
  { num:"01", tag:"Social Impact", cat:"Web", icon:"🏛️", name:"Bazma × Pertamina Bansos", year:"2024", org:"SMK TI Bazma", desc:"Responsive web platform managing social assistance distribution with real-time tracking, transparent data management, and reporting.", tech:["Laravel","MySQL","Blade","JS"], color:"var(--accent)", featured:false },
  { num:"02", tag:"EdTech", cat:"Web", icon:"📚", name:"IQRA App — School Monitor", year:"2024", org:"SMK TI Bazma", desc:"Full-stack school monitoring with Qur'an memorization tracking and multi-role dashboards for teachers, students, and parents.", tech:["React","Laravel","MySQL","TS"], color:"var(--sage)", featured:false },
  { num:"03", tag:"Mobile", cat:"Mobile", icon:"🏠", name:"Dormitory Attendance App", year:"2024", org:"SMK TI Bazma", desc:"Real-time attendance tracking with secure login, live monitoring, automated reporting, and supervisor notifications.", tech:["React Native","Laravel","MySQL"], color:"var(--violet)", featured:false },
  { num:"04", tag:"E-Commerce", cat:"Web", icon:"🛒", name:"E-Commerce Platform", year:"2024", org:"SMK TI Bazma", desc:"Complete online store with product catalog, cart, checkout, order tracking, and admin dashboard for inventory and analytics.", tech:["Laravel","Blade","MySQL","JS"], color:"var(--gold)", featured:false },
  { num:"05", tag:"Cybersecurity", cat:"Security", icon:"🔐", name:"Bazma Cipher", year:"2024", org:"SMK TI Bazma", desc:"Prototype encryption system with custom cipher algorithms and industry-standard cryptography protecting sensitive application data.", tech:["Python","JavaScript","Crypto"], color:"var(--coral)", featured:false },
  { num:"06", tag:"AI · Islamic · Mobile", cat:"Mobile", icon:"☪️", name:"KajianQu — AI Qur'an App", year:"2025", org:"Personal Project", desc:"AI-powered Qur'an mobile app: smart Tajweed guidance via ML, spaced-repetition memorization, Arabic OCR, tafsir browser, and offline-first.", tech:["Flutter","Python","AI/ML","TF"], color:"var(--accent)", featured:false },
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

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function use3DTilt(ref, strength = 12) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { rotateX:(e.clientY-r.top-r.height/2)/r.height*-strength, rotateY:(e.clientX-r.left-r.width/2)/r.width*strength, duration:.5, ease:"power3.out", transformPerspective:1000 });
    };
    const leave = () => gsap.to(el, { rotateX:0, rotateY:0, duration:1.2, ease:"elastic.out(1, 0.3)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
}

function useReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: options.y || 40, scale: options.scale || 0.98, rotationX: options.rotX || 0 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: options.duration || 1.2, delay: options.delay || 0, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }
    );
  }, []);
}

/* ─── CURSOR ─────────────────────────────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({x:0,y:0}), rp = useRef({x:0,y:0});
  useEffect(() => {
    const mv = e => { pos.current={x:e.clientX,y:e.clientY}; if(dot.current){dot.current.style.left=e.clientX+"px";dot.current.style.top=e.clientY+"px";} };
    window.addEventListener("mousemove", mv);
    let id;
    const a = () => {
      rp.current.x += (pos.current.x-rp.current.x)*0.15;
      rp.current.y += (pos.current.y-rp.current.y)*0.15;
      if(ring.current){ring.current.style.left=rp.current.x+"px";ring.current.style.top=rp.current.y+"px";}
      id=requestAnimationFrame(a);
    };
    a();
    return () => { window.removeEventListener("mousemove",mv); cancelAnimationFrame(id); };
  }, []);
  return (
    <>
      <div ref={dot} style={{position:"fixed",width:6,height:6,background:"var(--accent)",borderRadius:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9999}}/>
      <div ref={ring} style={{position:"fixed",width:32,height:32,border:`1.5px solid rgba(var(--accent-rgb),0.5)`,borderRadius:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9998,transition:"width 0.2s, height 0.2s, background 0.2s", backdropFilter: "invert(0.1)"}}/>
    </>
  );
}

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */
function SHead({ label, title, center=false }) {
  const lRef = useRef(null), tRef = useRef(null);
  useReveal(lRef); useReveal(tRef, {delay: 0.1, y: 40});
  return (
    <div style={{textAlign:center?"center":"left",marginBottom:"1rem"}}>
      <div ref={lRef} style={{fontFamily:"'DM Mono',monospace",fontSize:".72rem",fontWeight:500,color:"var(--accent)",letterSpacing:"0.22em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".7rem",marginBottom:".8rem",justifyContent:center?"center":"flex-start",opacity:0}}>
        {!center && <span style={{width:24,height:1,background:"var(--accent)",display:"inline-block",flexShrink:0}}/>}{label}
      </div>
      <h2 ref={tRef} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,3.6rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.1,marginBottom:"2.8rem",opacity:0}} dangerouslySetInnerHTML={{__html:title}}/>
    </div>
  );
}

function ServiceCard({ s }) {
  const ref = useRef(null);
  use3DTilt(ref, 12); 
  return (
    <div ref={ref} className="srv-card reveal-card">
      <div style={{width:55,height:55,borderRadius:16,background:`color-mix(in srgb, ${s.color} 15%, transparent)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",marginBottom:"1.5rem", border:`1px solid color-mix(in srgb, ${s.color} 30%, transparent)`}}>{s.icon}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",fontWeight:600,color:"var(--text-main)",marginBottom:".6rem"}}>{s.title}</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".88rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{s.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:".35rem"}}>
        {s.tech.map(t=><span key={t} style={{padding:".25rem .75rem",borderRadius:50,background:"var(--bg-void)", border:"1px solid var(--border)", fontSize:".65rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>)}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  const ref = useRef(null);
  use3DTilt(ref, 10);
  return (
    <div ref={ref} className={`proj-card reveal-card ${p.featured ? 'featured' : ''}`}>
      {p.featured && <div className="feat-badge">★ Featured</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.2rem"}}>
        <div style={{width:50,height:50,borderRadius:16,background:`color-mix(in srgb, ${p.color} 15%, transparent)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem", border:`1px solid color-mix(in srgb, ${p.color} 30%, transparent)`}}>{p.icon}</div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,color:"var(--text-muted)",background:"var(--bg-void)",border:"1px solid var(--border)",padding:".3rem .8rem",borderRadius:50}}>{p.year}</span>
      </div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:p.color,marginBottom:".5rem"}}>{p.tag}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:600,color:"var(--text-main)",marginBottom:".4rem",lineHeight:1.2}}>{p.name}</div>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".75rem",color:"var(--text-muted)",marginBottom:".85rem"}}>{p.org}</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".86rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{p.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:".35rem",marginBottom:"1.4rem"}}>
        {p.tech.map(t=><span key={t} style={{padding:".25rem .75rem",borderRadius:50,background:"var(--bg-void)", border:"1px solid var(--border)", fontSize:".65rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:"var(--text-dim)"}}>{t}</span>)}
      </div>
      <div style={{display:"flex",gap:"1.2rem"}}>
        {["Demo ↗","Code ↗"].map(l=><a key={l} href="#" style={{fontFamily:"'Outfit',sans-serif",fontSize:".8rem",fontWeight:500,color:"var(--accent)",textDecoration:"none",cursor:"none",transition:"opacity .2s"}}>{l}</a>)}
      </div>
    </div>
  );
}

function SkillBar({ name, lvl, badge }) {
  const fillRef = useRef(null);
  useEffect(() => {
    if (!fillRef.current) return;
    const o = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ gsap.to(fillRef.current,{scaleX:1,duration:1.5,ease:"expo.out", delay: 0.1}); o.disconnect(); }
    },{threshold:.3});
    o.observe(fillRef.current);
    return ()=>o.disconnect();
  },[]);
  return (
    <div style={{marginBottom:"1.5rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:".92rem",fontWeight:500,color:"var(--text-main)"}}>{name}</span>
          {badge && <span style={{fontSize:".58rem",padding:".2rem .6rem",borderRadius:50,background:"color-mix(in srgb, var(--gold) 15%, transparent)",color:"var(--gold)",fontFamily:"'DM Mono',monospace",fontWeight:500, border:"1px solid color-mix(in srgb, var(--gold) 30%, transparent)"}}>{badge}</span>}
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:500,color:"var(--accent)"}}>{lvl}%</span>
      </div>
      <div style={{height:6,background:"var(--border)",borderRadius:50,overflow:"hidden"}}>
        <div ref={fillRef} style={{height:"100%",width:lvl+"%",borderRadius:50,background:`linear-gradient(90deg,var(--accent),var(--cyan))`,transform:"scaleX(0)",transformOrigin:"left"}}/>
      </div>
    </div>
  );
}

function LangCard({ lang, lvl, flag, label, color }) {
  const fillRef = useRef(null), cardRef = useRef(null);
  use3DTilt(cardRef, 8);
  useEffect(() => {
    if (!fillRef.current) return;
    const o = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ gsap.to(fillRef.current,{width:lvl+"%",duration:1.5,ease:"expo.out", delay: 0.1}); o.disconnect(); }
    },{threshold:.3});
    o.observe(fillRef.current);
    return ()=>o.disconnect();
  },[]);
  return (
    <div ref={cardRef} className="lang-card reveal-card">
      <div style={{display:"flex",alignItems:"center",gap:".9rem",marginBottom:"1rem"}}>
        <span style={{fontSize:"1.8rem"}}>{flag}</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".95rem",fontWeight:500,color:"var(--text-main)"}}>{lang}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color,marginTop:2}}>{label}</div>
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:500,color:"var(--accent)"}}>{lvl}%</span>
      </div>
      <div style={{height:5,background:"var(--border)",borderRadius:50,overflow:"hidden"}}>
        <div ref={fillRef} style={{height:"100%",width:"0%",borderRadius:50,background:`linear-gradient(90deg,${color},var(--accent))`}}/>
      </div>
    </div>
  );
}

function AchCard({ a }) {
  const ref = useRef(null);
  use3DTilt(ref, 9);
  return (
    <div ref={ref} className="ach-card reveal-card">
      <div style={{fontSize:"2.2rem",marginBottom:"1.2rem"}}>{a.icon}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.25rem",fontWeight:600,color:"var(--text-main)",marginBottom:".5rem"}}>{a.title}</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".86rem",color:"var(--text-dim)",lineHeight:1.8,marginBottom:"1.2rem"}}>{a.desc}</p>
      <span className="ach-badge">{a.badge}</span>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function BerkePortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [cat, setCat] = useState("All");
  const [sendStatus, setSend] = useState("idle");

  // PRELOADER STATE
  const [isLoaded, setIsLoaded] = useState(false);
  const preloaderRef = useRef(null);
  const progressRef = useRef(null);

  const filtered = cat==="All" ? PROJECTS : PROJECTS.filter(p=>p.cat===cat);

  // Kunci scroll saat loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoaded]);

  // Preloader Liquid GSAP Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let progress = { val: 0 };
      
      const tl = gsap.timeline({
        onComplete: () => {
           // Slide up preloader jika loading selesai
           gsap.to(preloaderRef.current, {
              yPercent: -100,
              duration: 1.2,
              ease: "expo.inOut",
              onComplete: () => {
                 setIsLoaded(true);
                 if (preloaderRef.current) preloaderRef.current.style.display = "none";
              }
           });
        }
      });

      // 1. Animasi Ombak (Kiri-Kanan) - Berjalan terus-menerus
      gsap.fromTo(".liquid-text", 
        { "--bg-x": "0%" },
        { "--bg-x": "-100%", duration: 2.5, ease: "none", repeat: -1 }
      );

      // 2. Animasi Cairan Naik (DARI BAWAH KE ATAS - FULL RESPONSIVE)
      // "1.2em" berarti cairan dimulai dari bawah teks (sesuai ukuran font)
      // "-0.2em" berarti cairan ditarik naik melewati atas teks
      tl.fromTo(".liquid-text", 
        { "--bg-y": "1.2em" }, 
        { "--bg-y": "-0.2em", duration: 3.5, ease: "power2.inOut" }, 
      0);

      // 3. Angka persentase loading
      tl.to(progress, {
        val: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if(progressRef.current) progressRef.current.innerText = Math.round(progress.val) + "%";
        }
      }, 0);
    });
    
    return () => ctx.revert();
  }, []);

  // Scroll progress (Bar biru di atas layar)
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const update = () => {
      if (!bar) return;
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / max * 100) + "%";
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Main GSAP Animations
  useLayoutEffect(() => {
    if (!isLoaded) return; // Tunggu preloader selesai baru jalankan!

    let ctx = gsap.context(() => {
      
      // 1. Hero Entrance - Dengan efek blur yang premium
      const tl = gsap.timeline({delay: 0.1});
      tl.fromTo(".h-badge", { opacity:0, y: 30, scale: 0.9, filter: "blur(5px)" }, { opacity:1, y:0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" })
        .fromTo(".h-title", { opacity:0, y: 50, rotationX: -10, filter: "blur(12px)" }, { opacity:1, y:0, rotationX: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, "-=0.9")
        .fromTo(".h-para", { opacity:0, y: 30, filter: "blur(8px)" }, { opacity:1, y:0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }, "-=1.1")
        .fromTo(".h-btns", { opacity:0, y: 20, filter: "blur(5px)" }, { opacity:1, y:0, filter: "blur(0px)", duration: 1, ease: "expo.out" }, "-=0.9");

      // Hero Parallax Scroll
      gsap.to(".hero-parallax-wrapper", { 
        y: -120, 
        opacity: 0, 
        scrollTrigger: { 
          trigger: "#hero", 
          start: "top top", 
          end: "bottom top", 
          scrub: true 
        }
      });

      // 2. Cinematic Pinned Chapters (ABOUT)
      if (document.querySelector("#about-chapters")) {
        const chapTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#about-chapters",
            start: "top top",
            end: "+=3500", 
            pin: true,
            scrub: 1, 
          }
        });

        chapTl
          .to({}, {duration: 0.5})
          .to(".ch-1", { opacity: 0, y: -100, scale: 0.95, filter: "blur(10px)", duration: 1 }, "step1")
          .fromTo(".ch-2", { opacity: 0, y: 100, scale: 1.05, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1 }, "step1")
          .to({}, {duration: 1.5})
          .to(".ch-2", { opacity: 0, y: -100, scale: 0.95, filter: "blur(10px)", duration: 1 }, "step2")
          .fromTo(".ch-3", { opacity: 0, y: 100, scale: 1.05, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1 }, "step2")
          .to({}, {duration: 1.5})
          .to(".ch-3", { opacity: 0, y: -100, scale: 0.95, filter: "blur(10px)", duration: 1 }, "step3")
          .fromTo(".ch-4", { opacity: 0, y: 100, scale: 1.05, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1 }, "step3")
          .to({}, {duration: 1});
      }

      // 3. Reveal Cards
      gsap.utils.toArray(".reveal-card").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true }
          }
        );
      });

      // 4. Timeline
      gsap.utils.toArray(".tl-item").forEach((el,i) => {
        gsap.fromTo(el, 
          {opacity: 0, x: -40, scale: 0.95}, 
          {opacity: 1, x: 0, scale: 1, duration: 1.2, delay: i * 0.15, ease: "expo.out", 
          scrollTrigger: {trigger: el, start: "top 85%", once: true}}
        );
      });

      // 5. Quote
      if (document.querySelector("#quote")) {
        gsap.fromTo(".q-text", {opacity: 0, y: 40, filter: "blur(8px)"}, {opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out", scrollTrigger: {trigger: "#quote", start: "top 75%", once: true}});
        gsap.fromTo(".q-author", {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "expo.out", scrollTrigger: {trigger: "#quote", start: "top 75%", once: true}});
      }

      // 6. Navbar Smooth Blur
      ScrollTrigger.create({start:"top -80", onUpdate:s => {
        const nav = document.getElementById("main-nav");
        if(!nav) return;
        if(s.direction === 1){ 
          nav.style.background="rgba(var(--bg-void-rgb), 0.85)"; 
          nav.style.backdropFilter="blur(24px) saturate(180%)"; 
          nav.style.borderBottom="1px solid var(--border)"; 
          nav.style.padding="0.8rem 3rem"; 
        } else { 
          nav.style.background="transparent"; 
          nav.style.backdropFilter="none"; 
          nav.style.borderBottom="1px solid transparent"; 
          nav.style.padding="1.1rem 3rem";
        }
      }});
    });

    setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => ctx.revert();
  }, [isLoaded, cat]);

  const submit = () => { setSend("sending"); setTimeout(()=>setSend("sent"),1500); setTimeout(()=>setSend("idle"),4500); };
  const W = {maxWidth:1100,margin:"0 auto",width:"100%",position:"relative",zIndex:2};
  const sec = (bgVar) => ({position:"relative",padding:"8rem 3rem",background:bgVar||"var(--bg-void)"});

  return (
    <div className={isDark ? "theme-dark" : "theme-light"} style={{fontFamily:"'Outfit',sans-serif",background:"var(--bg-void)",color:"var(--text-main)",overflowX:"hidden",cursor:"none",transition:"background 0.5s ease, color 0.5s ease"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        
        /* ─── THEME VARIABLES ─── */
        .theme-dark {
          --bg-void: #050508;
          --bg-void-rgb: 5, 5, 8;
          --bg-space: #0A0B12;
          --bg-card: #111322;
          --border: rgba(255,255,255,0.08);
          --border-hover: rgba(232,163,79,0.5);
          --text-main: rgba(255,255,255,0.92);
          --text-dim: rgba(255,255,255,0.65);
          --text-muted: rgba(255,255,255,0.4);
          --accent: #E8A34F;
          --accent-rgb: 232, 163, 79;
          --sage: #5FC89B;
          --violet: #9B7FE8;
          --cyan: #4FD1E8;
          --coral: #E86B5F;
          --gold: #D4A843;
          --shadow: 0 8px 32px rgba(0,0,0,0.4);
          --glow: 0 0 40px rgba(var(--accent-rgb), 0.15);
        }
        .theme-light {
          --bg-void: #FDFAF5;
          --bg-void-rgb: 253, 250, 245;
          --bg-space: #F8F4EC;
          --bg-card: #FFFFFF;
          --border: rgba(200,180,150,0.4);
          --border-hover: rgba(200,132,92,0.6);
          --text-main: #251B12;
          --text-dim: #5C5042;
          --text-muted: #9C8C7A;
          --accent: #C8845C;
          --accent-rgb: 200, 132, 92;
          --sage: #6B9472;
          --violet: #8B7EC8;
          --cyan: #4FADC8; 
          --coral: #C46B6B;
          --gold: #B89222;
          --shadow: 0 8px 30px rgba(46,31,15,0.06);
          --glow: 0 0 40px rgba(var(--accent-rgb), 0.15);
        }

        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(var(--accent-rgb),0.3); color: var(--bg-void)}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:var(--bg-void)}
        ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:10px}
        body{-webkit-font-smoothing:antialiased; text-rendering: optimizeLegibility;}

        /* Modern Grain Texture Overlay */
        body::before {
          content: "";
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 9999;
        }

        /* ── PRELOADER CSS ── */
        .preloader {
          position: fixed;
          inset: 0;
          background: #050508;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .preloader-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        
        /* Outline teks & Layer pembungkus */
        .liquid-text {
          --bg-x: 0%;
          --bg-y: 1.5em; /* Mulai di bawah teks */
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 12vw, 8.5rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          position: relative;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
        }
        
        /* Cairan di dalam teks */
        .liquid-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: transparent;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0px;
          /* SVG Ombak Ganda yang dalam (tinggi 2000) agar bagian bawah cairan tidak terpotong saat ditarik ke atas */
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='2000' viewBox='0 0 1000 2000'%3E%3Cpath d='M0,50 C250,0 250,100 500,50 C750,0 750,100 1000,50 L1000,2000 L0,2000 Z' fill='rgba(232, 163, 79, 0.4)'/%3E%3Cpath d='M0,75 C250,125 250,25 500,75 C750,125 750,25 1000,75 L1000,2000 L0,2000 Z' fill='%23E8A34F'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-size: 200% auto;
          background-position: var(--bg-x) var(--bg-y);
          -webkit-background-clip: text;
          background-clip: text;
          z-index: 2;
        }

        /* ── ANIMATIONS ── */
        @keyframes lp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        
        .live-dot{animation:lp 2s infinite}
        .mq-track{animation:mq 35s linear infinite}

        /* ── NAV & BUTTONS ── */
        .nlink{
          font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:500;
          color:var(--text-dim);text-decoration:none;cursor:none;
          position:relative;transition:color .3s;letter-spacing:.02em;
        }
        .nlink::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--accent);transition:width 0.4s cubic-bezier(0.16, 1, 0.3, 1);border-radius:2px}
        .nlink:hover{color:var(--text-main)}.nlink:hover::after{width:100%}
        
        .ncta{
          padding:.5rem 1.5rem;background:var(--text-main);color:var(--bg-void)!important;
          border-radius:50px;font-weight:600;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1)!important;
        }
        .ncta::after{display:none!important}
        .ncta:hover{background:var(--accent); transform:translateY(-2px)!important; box-shadow: var(--glow)}

        .theme-toggle {
          background:var(--border);border:none;border-radius:50%;width:40px;height:40px;
          display:flex;align-items:center;justify-content:center;cursor:none;
          color:var(--text-main);font-size:1.1rem;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .theme-toggle:hover { background:var(--accent);color:var(--bg-void); transform: rotate(15deg) scale(1.05); }

        .bfill{
          padding:1rem 2.5rem;background:var(--accent);color:var(--bg-void);
          border:none;border-radius:50px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:600;
          cursor:none;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);text-decoration:none;display:inline-block;
        }
        .bfill:hover{transform:translateY(-3px);box-shadow: 0 14px 30px rgba(var(--accent-rgb),0.3)}
        
        .boutl{
          padding:1rem 2.5rem;background:transparent;
          border:1px solid var(--border);color:var(--text-main);
          border-radius:50px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:600;
          cursor:none;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);text-decoration:none;display:inline-block;
        }
        .boutl:hover{border-color:var(--accent); background:color-mix(in srgb, var(--accent) 5%, transparent); transform:translateY(-3px);}

        /* ── FILTER TABS ── */
        .pf-btn{
          padding:.5rem 1.4rem;border-radius:50px;
          background:var(--bg-void);border:1px solid var(--border);
          font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;
          color:var(--text-dim);cursor:none;transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pf-btn:hover{border-color: var(--border-hover); color: var(--text-main);}
        .pf-btn.on{background:var(--text-main);border-color:var(--text-main);color:var(--bg-void)}

        /* ── CARDS & BLOCKS ── */
        .info-item, .soft-item {
          display:flex;align-items:center;gap:1rem;
          padding:.8rem 1.2rem;background:var(--bg-card);border-radius:14px;
          border:1px solid var(--border);
          font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:400;
          color:var(--text-dim);transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);cursor:default;
        }
        .info-item:hover{border-color:var(--accent);color:var(--text-main);transform:translateX(6px);box-shadow: var(--glow)}
        .soft-item { padding:.8rem 1rem;gap:.7rem;font-size:.85rem; }

        .srv-card, .proj-card, .ach-card, .lang-card {
          background:var(--bg-card);borderRadius:24px;padding:2.2rem;
          border:1px solid var(--border);box-shadow:var(--shadow);
          cursor:none;position:relative;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .srv-card:hover, .proj-card:hover, .ach-card:hover, .lang-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--glow);
        }
        .proj-card { padding:2rem; }
        .proj-card.featured { border-color:var(--border-hover); background:linear-gradient(145deg, var(--bg-card), color-mix(in srgb, var(--accent) 3%, transparent)); }
          .feat-badge {
            position:absolute;top:1.2rem;right:1.2rem;background:color-mix(in srgb, var(--accent) 15%, transparent);
            color:var(--accent);font-size:.6rem;font-family:'DM Mono',monospace;
            font-weight:600;letter-spacing:0.12em;padding:.35rem .9rem;border-radius:50px;
            border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          }
        .ach-badge {
          display:inline-block;padding:.3rem .85rem;border-radius:50px;font-family:'DM Mono',monospace;
          font-size:.65rem;font-weight:600;letter-spacing:0.08em;background:var(--bg-void);color:var(--text-dim);
          border: 1px solid var(--border);
        }

        .tl-item{display:grid;grid-template-columns:56px 1fr;gap:1.8rem;margin-bottom:3rem;}
        .tl-content{
          background:var(--bg-card);border-radius:24px;padding:1.8rem;
          border:1px solid var(--border);box-shadow:var(--shadow);transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tl-content:hover{border-color:var(--accent);transform:translateX(8px); box-shadow: var(--glow)}

        /* ── CONTACT FORM ── */
        .ct-link{
          display:flex;align-items:center;gap:1.1rem;padding:.9rem 1.2rem;
          background:var(--bg-card);
          border:1px solid var(--border);border-radius:16px;
          font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:400;
          color:var(--text-dim);text-decoration:none;cursor:none;transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ct-link:hover{background:color-mix(in srgb, var(--accent) 8%, transparent);border-color:var(--accent);color:var(--text-main);transform:translateX(6px);box-shadow: var(--glow)}
        
        .cf-label{
          display:block;font-family:'DM Mono',monospace;font-size:.7rem;font-weight:500;
          color:var(--text-dim);letter-spacing:.15em;text-transform:uppercase;margin-bottom:.6rem;
        }
        .cf-in{
          width:100%;background:var(--bg-space);
          border:1px solid var(--border);border-radius:14px;padding:1rem 1.2rem;
          font-family:'Outfit',sans-serif;font-size:.9rem;color:var(--text-main);
          outline:none;transition:all 0.3s ease;resize:none;
        }
        .cf-in:focus{border-color:var(--accent); background:var(--bg-card); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 15%, transparent);}
        .cf-in::placeholder{color:var(--text-muted);font-size:.88rem}

        /* ── GRIDS ── */
        .srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
        .proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem}
        .ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}
        .lang-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem}

        @media(max-width:900px){
          .srv-grid{grid-template-columns:1fr 1fr}
          .two-col{grid-template-columns:1fr!important; gap: 3rem!important}
          .nav-links{display:none}
        }
        @media(max-width:600px){
          .srv-grid{grid-template-columns:1fr}
          .liquid-text{font-size: 3rem!important}
          section{padding:5rem 1.5rem!important}
          .h-title{font-size: 3rem!important}
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          PRELOADER (LIQUID FILL ANIMATION)
      ══════════════════════════════════════════════════════ */}
      <div ref={preloaderRef} className="preloader">
        <div className="preloader-grid" />
        
        {/* Atribut data-text diperlukan agar CSS Content ::before bisa membacanya */}
        <div className="liquid-text" data-text="PORTFOLIO">PORTFOLIO</div>
        
        <div ref={progressRef} style={{
          position: "absolute",
          bottom: "10%",
          fontFamily: "'DM Mono', monospace",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "#E8A34F",
          letterSpacing: "0.2em",
          zIndex: 2,
          textShadow: "0 0 20px rgba(232, 163, 79, 0.5)"
        }}>
          0%
        </div>
      </div>

      {/* SCRIPT SPLINE NEXT.JS */}
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.90/build/spline-viewer.js" strategy="lazyOnload" />

      <Cursor/>

      {/* Progress bar */}
      <div id="scroll-progress" style={{position:"fixed",top:0,left:0,height:"4px",background:`linear-gradient(90deg,var(--accent),var(--sage),var(--cyan))`,zIndex:999,width:"0%",pointerEvents:"none", transition: "width 0.1s ease-out"}}/>

      {/* ── NAV ── */}
      <nav id="main-nav" style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"1.1rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.5s cubic-bezier(0.16, 1, 0.3, 1)", borderBottom:"1px solid transparent"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"var(--text-main)",cursor:"none",letterSpacing:"-.01em"}}>
          Berke<em style={{color:"var(--accent)",fontStyle:"italic"}}>.</em>dev
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"2.5rem"}}>
          <ul className="nav-links" style={{display:"flex",gap:"2.2rem",listStyle:"none",alignItems:"center"}}>
            {["About","Services","Projects","Skills","Experience","Contact"].map(s=>(
              <li key={s}><a href={`#${s.toLowerCase()}`} className={`nlink${s==="Contact"?" ncta":""}`}>{s==="Contact"?"Hire Me":s}</a></li>
            ))}
          </ul>
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"7rem 3rem 4rem",background:"var(--bg-void)",overflow:"hidden",position:"relative"}}>
        
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <spline-viewer 
            key={isDark ? "dark-bg" : "light-bg"}
            url={isDark ? "https://prod.spline.design/vwbI4Bn4uLcKtPs3/scene.splinecode" : "https://prod.spline.design/TOWPhMs1COn4zhG7/scene.splinecode"} 
            style={{width: '100%', height: '100%', pointerEvents: 'auto'}}
          ></spline-viewer>
        </div>

        <div style={{position:"absolute",inset:0,zIndex:1,background:`radial-gradient(circle at 50% 50%, transparent 20%, rgba(var(--bg-void-rgb), 0.8) 80%), linear-gradient(180deg, transparent 0%, rgba(var(--bg-void-rgb), 1) 100%)`,pointerEvents:"none"}}/>

        <div className="hero-parallax-wrapper" style={{position:"relative", zIndex:2, maxWidth: 850, textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", pointerEvents:"none"}}>
          
          <div className="h-badge" style={{display:"inline-flex",alignItems:"center",gap:".7rem",padding:".5rem 1.4rem",background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:50,fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:500,color:"var(--text-main)",letterSpacing:"0.12em",marginBottom:"2.5rem",opacity:0, boxShadow: "var(--shadow)"}}>
            <div className="live-dot" style={{width:8,height:8,background:"var(--sage)",borderRadius:"50%",flexShrink:0, boxShadow: "0 0 10px var(--sage)"}}/>
            Available for Collaboration
          </div>

          <h1 className="h-title" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3.8rem, 8vw, 7.2rem)",fontWeight:700,lineHeight:1.05,color:"var(--text-main)",marginBottom:"1.8rem",letterSpacing:"-.02em",opacity:0, textShadow: "0 10px 40px rgba(0,0,0,0.5)"}}>
            Qiageng <em style={{color:"var(--accent)",fontStyle:"italic",fontWeight:600}}>Berke</em><br/>
            Jaisyurrohman
          </h1>

          <p className="h-para" style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.15rem",fontWeight:400,color:"var(--text-dim)",lineHeight:1.8,maxWidth:600,marginBottom:"3.5rem",opacity:0}}>
            A passionate <strong style={{color:"var(--text-main)",fontWeight:600}}>Full-Stack Developer & IT Student</strong>. Building web systems, mobile apps, and cybersecurity solutions that create real impact.
          </p>

          <div className="h-btns" style={{display:"flex",gap:"1.4rem",justifyContent:"center",flexWrap:"wrap",opacity:0, pointerEvents:"auto"}}>
            <a href="#projects" className="bfill">Explore My Work</a>
            <a href="#about" className="boutl">Read My Story</a>
          </div>
        </div>

        <div style={{position:"absolute",bottom:"3rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeInUp 1s 2.5s both cubic-bezier(0.16, 1, 0.3, 1)",zIndex:2, pointerEvents:"none"}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.25em",textTransform:"uppercase"}}>Scroll</span>
          <div style={{width:1,height:50,background:`linear-gradient(180deg,var(--accent),transparent)`}}/>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{padding:"1.5rem 0",background:"var(--bg-card)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",overflow:"hidden",position:"relative",zIndex:2}}>
        <div className="mq-track" style={{display:"flex",gap:"3.5rem",whiteSpace:"nowrap"}}>
          {[...Array(2)].map((_,r)=>["Web Development","Mobile Apps","Cybersecurity","Laravel","React","Flutter","MySQL","TypeScript","AI / ML","SIOT","React Native","Python","Astro","Full-Stack"].map((t,i)=>(
            <div key={`${r}-${i}`} style={{display:"flex",alignItems:"center",gap:"1.2rem",flexShrink:0}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:".8rem",fontWeight:500,color:"var(--text-dim)",letterSpacing:"0.16em",textTransform:"uppercase"}}>{t}</span>
              <div style={{width:5,height:5,background:"var(--accent)",borderRadius:"50%",flexShrink:0}}/>
            </div>
          )))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ABOUT: CINEMATIC PINNED CHAPTERS
      ══════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "var(--bg-void)", position: "relative" }}>
        <div id="about-chapters" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          
          <div style={{ position: "relative", width: "100%", maxWidth: 1100, padding: "0 3rem", height: "65vh", display: "flex", alignItems: "center" }}>
            
            {/* CHAPTER 01 */}
            <div className="ch-1" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem" }}>
              <div style={{ maxWidth: 700 }}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"1rem"}}><span style={{width:30,height:1,background:"var(--accent)",display:"inline-block",marginRight:".8rem", verticalAlign:"middle"}}/>Chapter 01</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Origin</em> Story</h2>
                <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",fontWeight:400,color:"var(--text-dim)",lineHeight:1.9,marginBottom:"1.2rem"}}>
                  A highly motivated IT student specializing in <strong style={{color:"var(--text-main)",fontWeight:600}}>Web Development, Mobile Applications, and Cybersecurity</strong>. Berke has built real-world systems serving actual users in production.
                </p>
                <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2.2rem"}}>
                  Passionate about clean code, data security, and technology that creates <strong style={{color:"var(--text-main)",fontWeight:600}}>real impact for communities</strong> across Indonesia and beyond.
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:".8rem"}}>
                  {[["📍","Bekasi, Indonesia"],["📧","berkejaisyurrohman95@gmail.com"],["📱","+62 895-0614-7763"]].map(([ico,val])=>(
                    <div key={val} className="info-item" style={{padding: "0.6rem 1.2rem", fontSize: "0.85rem"}}>
                      <div style={{width:28,height:28,background:"color-mix(in srgb, var(--accent) 15%, transparent)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0, color:"var(--accent)"}}>{ico}</div>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CHAPTER 02 */}
            <div className="ch-2" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem", opacity: 0 }}>
              <div style={{ maxWidth: 700 }}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"1rem"}}><span style={{width:30,height:1,background:"var(--accent)",display:"inline-block",marginRight:".8rem", verticalAlign:"middle"}}/>Chapter 02</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>My <em style={{color:"var(--accent)",fontStyle:"italic"}}>Roots</em></h2>
                <div style={{background:"var(--bg-card)",borderRadius:24,padding:"2.2rem",border:"1px solid var(--border)",boxShadow:"var(--shadow)",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:`linear-gradient(180deg,var(--accent),var(--gold))`,borderRadius:"4px 0 0 4px"}}/>
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

            {/* CHAPTER 03 */}
            <div className="ch-3" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem", opacity: 0 }}>
              <div style={{ maxWidth: 700 }}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"1rem"}}><span style={{width:30,height:1,background:"var(--accent)",display:"inline-block",marginRight:".8rem", verticalAlign:"middle"}}/>Chapter 03</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Arsenal</em></h2>
                <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"1.8rem"}}>
                  My daily drivers. I leverage modern frameworks and robust backend technologies to build seamless, secure digital experiences.
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:".6rem",marginBottom:"2.5rem"}}>
                  {[["var(--accent)","React"],["var(--sage)","Flutter"],["var(--violet)","Laravel"],["var(--gold)","TypeScript"],["var(--accent)","MySQL"],["var(--sage)","Python"],["var(--violet)","SIOT"],["var(--gold)","React Native"],["var(--accent)","Next.js"],["var(--sage)","Astro"],["var(--violet)","Blade"]].map(([c,t])=>(
                    <span key={t} style={{padding:".45rem 1rem",borderRadius:50,background:`color-mix(in srgb, ${c} 10%, transparent)`,fontSize:".85rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:c,border:`1px solid color-mix(in srgb, ${c} 30%, transparent)`}}>{t}</span>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
                  {[["6+","Projects"],["2+","Years"],["4","Languages"]].map(([n,l])=>(
                    <div key={l} style={{background:"var(--bg-card)",borderRadius:16,padding:"1.2rem",textAlign:"center",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.4rem",fontWeight:700,color:"var(--text-main)"}}>{n}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.05em"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CHAPTER 04 */}
            <div className="ch-4" style={{ position: "absolute", width: "100%", left: 0, padding: "0 3rem", opacity: 0 }}>
              <div style={{ maxWidth: 700 }}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"1rem"}}><span style={{width:30,height:1,background:"var(--accent)",display:"inline-block",marginRight:".8rem", verticalAlign:"middle"}}/>Chapter 04</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5vw,4.2rem)",fontWeight:600,color:"var(--text-main)",lineHeight:1.05,marginBottom:"1.8rem"}}>The <em style={{color:"var(--accent)",fontStyle:"italic"}}>Philosophy</em></h2>
                <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1.1rem",color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2rem"}}>
                  Technology is only as good as the mind wielding it. I prioritize clear communication, analytical thinking, and team synergy to turn ideas into reality.
                </p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1rem"}}>
                  {SOFT_SKILLS.map(([ico,s])=>(
                    <div key={s} className="soft-item">
                      <span style={{fontSize:"1.4rem"}}>{ico}</span>
                      <span style={{fontSize:"1rem", fontWeight:500}}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={sec("var(--bg-space)")}>
        <div style={W}>
          <SHead label="What I Do" title={`Services &<br/><em style="color:var(--accent);font-style:italic">Specializations</em>`}/>
          <div className="srv-grid">
            {SERVICES.map((s,i)=><ServiceCard key={s.title} s={s}/>)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={sec()}>
        <div style={W}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"2.5rem",flexWrap:"wrap",gap:"2rem"}}>
            <SHead label="Selected Work" title={`Projects &<br/><em style="color:var(--accent);font-style:italic">Case Studies</em>`}/>
            <div style={{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"2.8rem"}}>
              {PROJ_CATS.map(c=>(
                <button key={c} className={`pf-btn${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="proj-grid">
            {filtered.map((p,i)=><ProjectCard key={p.num} p={p}/>)}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={sec("var(--bg-space)")}>
        <div style={W}>
          <SHead label="Expertise" title={`Tech Stack &<br/><em style="color:var(--accent);font-style:italic">Languages</em>`}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4.5rem",marginBottom:"5rem"}} className="two-col">
            <div>{SKILLS.slice(0,6).map(s=><SkillBar key={s.name} {...s}/>)}</div>
            <div>{SKILLS.slice(6).map(s=><SkillBar key={s.name} {...s}/>)}</div>
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"var(--text-main)",marginBottom:"2rem"}}>Human Languages</div>
          <div className="lang-grid">
            {LANGS.map(l=><LangCard key={l.lang} {...l}/>)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={sec()}>
        <div style={W}>
          <SHead label="Career Timeline" title={`My <em style="color:var(--accent);font-style:italic">Journey</em>`} center/>
          <div style={{maxWidth:750,margin:"0 auto",position:"relative",marginTop:"3rem"}}>
            <div style={{position:"absolute",left:28,top:10,bottom:0,width:2,background:`linear-gradient(180deg,transparent,var(--accent),transparent)`}}/>
            {TIMELINE.map((t,i)=>(
              <div key={i} className="tl-item">
                <div style={{width:56,height:56,background:t.active?"var(--accent)":"var(--bg-card)",border:`2px solid ${t.active?"var(--accent)":"var(--border)"}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0,zIndex:1,boxShadow:t.active?`0 0 20px rgba(var(--accent-rgb),0.4), 0 0 0 8px color-mix(in srgb, var(--accent) 15%, transparent)`:undefined, transition: "all 0.3s ease"}}>
                  {t.icon}
                </div>
                <div className="tl-content">
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.14em",marginBottom:".5rem"}}>{t.year}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"var(--text-main)",marginBottom:".3rem"}}>{t.role}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".9rem",fontWeight:400,color:"var(--text-muted)",marginBottom:"1.2rem"}}>{t.company}</div>
                  <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".7rem"}}>
                    {t.points.map((pt,j)=>(
                      <li key={j} style={{display:"flex",gap:".8rem",fontFamily:"'Outfit',sans-serif",fontSize:".9rem",fontWeight:400,color:"var(--text-dim)",lineHeight:1.75}}>
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

      {/* ── QUOTE ── */}
      <section id="quote" style={{...sec("var(--bg-card)"),textAlign:"center",overflow:"hidden",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)", padding:"8rem 2rem"}}>
        <div style={{position:"absolute",width:600,height:600,background:"radial-gradient(circle,color-mix(in srgb, var(--accent) 8%, transparent),transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <p className="q-text" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontStyle:"italic",fontWeight:500,color:"var(--text-main)",lineHeight:1.4,maxWidth:850,margin:"0 auto 2rem",opacity:0}}>
          {"Technology should not just be functional — it should create genuine impact for the people who use it."}
        </p>
        <p className="q-author" style={{fontFamily:"'DM Mono',monospace",fontSize:".8rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.18em",opacity:0}}>
          — Berke Jaisyurrohman · IT Student & Developer
        </p>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={sec("var(--bg-space)")}>
        <div style={W}>
          <SHead label="Recognition" title={`Achievements &<br/><em style="color:var(--accent);font-style:italic">Milestones</em>`}/>
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a,i)=><AchCard key={a.title} a={a}/>)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{...sec("var(--bg-card)"),overflow:"hidden"}}>
        <div style={{position:"absolute",width:600,height:600,background:"radial-gradient(circle,color-mix(in srgb, var(--accent) 12%, transparent),transparent 70%)",top:-150,right:-150,pointerEvents:"none"}}/>
        <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,color-mix(in srgb, var(--sage) 12%, transparent),transparent 70%)",bottom:-150,left:-150,pointerEvents:"none"}}/>
        <div style={W}>
          <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"6rem",alignItems:"start"}} className="two-col">
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:600,color:"var(--accent)",letterSpacing:"0.22em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".8rem",marginBottom:"1rem"}}>
                <span style={{width:30,height:1,background:"var(--accent)",display:"inline-block"}}/>{"Let's Connect"}
              </div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,4rem)",fontWeight:700,color:"var(--text-main)",lineHeight:1.1,marginBottom:"1.8rem"}}>
                Ready to Build<br/>
                <em style={{color:"var(--accent)",fontStyle:"italic"}}>Something Great?</em>
              </h2>
              <p style={{fontFamily:"'Outfit',sans-serif",fontSize:"1rem",fontWeight:400,color:"var(--text-dim)",lineHeight:1.9,marginBottom:"2.5rem"}}>
                {"Always open to new opportunities and collaborations. Whether it's a web system, mobile app, or cybersecurity challenge — let's create together."}
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                {[["✉️","Email","berkejaisyurrohman95@gmail.com"],["📱","Phone","+62 895-0614-7763"],["📍","Location","Bekasi, Indonesia"],["🌐","Website","www.jaisyporto.com"]].map(([ico,lbl,val])=>(
                  <a key={lbl} href={lbl==="Email"?`mailto:${val}`:"#"} className="ct-link">
                    <div style={{width:40,height:40,background:"color-mix(in srgb, var(--accent) 15%, transparent)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0, fontSize:"1.2rem"}}>{ico}</div>
                    <div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:600,color:"var(--text-muted)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>{lbl}</div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".95rem",fontWeight:500, color:"var(--text-main)"}}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"1.4rem", background:"var(--bg-void)", padding:"2.5rem", borderRadius:"24px", border:"1px solid var(--border)", boxShadow:"var(--shadow)"}}>
              {["Name","Email","Subject"].map(f=>(
                <div key={f}>
                  <label className="cf-label">{f}</label>
                  <input type={f==="Email"?"email":"text"} className="cf-in" placeholder={f==="Name"?"Your name":f==="Email"?"your@email.com":"Project idea, collaboration..."}/>
                </div>
              ))}
              <div>
                <label className="cf-label">Message</label>
                <textarea className="cf-in" rows={5} placeholder="Tell me about your project..."/>
              </div>
              <button onClick={submit} style={{padding:"1.1rem 2.5rem",background:sendStatus==="sent"?"var(--sage)":"var(--text-main)",color:"var(--bg-void)",border:"none",borderRadius:50,fontFamily:"'Outfit',sans-serif",fontSize:".95rem",fontWeight:600,cursor:"none",transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",opacity:sendStatus==="sending"?.65:1,letterSpacing:".01em", marginTop:"0.5rem"}}>
                {sendStatus==="idle"?"Send Message ✦":sendStatus==="sending"?"Sending…":"Sent! ✓"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRE-FOOTER 
      ══════════════════════════════════════════════════════ */}
      <section style={{position:"relative", height:"75vh", minHeight:"500px", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", borderTop:"1px solid var(--border)"}}>
        
        <div style={{position:"absolute", inset:0, zIndex:0}}>
          <spline-viewer url="https://prod.spline.design/lPs9-DJQKPd0qXUs/scene.splinecode"></spline-viewer>
        </div>

        <div style={{position:"absolute", inset:0, zIndex:1, background:`linear-gradient(to top, var(--bg-void), transparent 60%, var(--bg-void))`, pointerEvents:"none"}} />
        <div style={{position:"absolute", inset:0, zIndex:1, background:"color-mix(in srgb, var(--bg-void) 30%, transparent)", pointerEvents:"none"}} />

        <div style={{position:"relative", zIndex:2, textAlign:"center", padding:"0 2rem", maxWidth:"700px", pointerEvents:"none"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem, 6vw, 5rem)", fontWeight:700, color:"var(--text-main)", marginBottom:"1.5rem", textShadow:"0 10px 30px rgba(0,0,0,0.5)"}}>
            {"Let's Sail"} <em style={{color:"var(--accent)", fontStyle:"italic"}}>Forward</em>
          </h2>
          <p style={{fontFamily:"'Outfit',sans-serif", fontSize:"1.1rem", color:"var(--text-dim)", lineHeight:1.9}}>
            {"Thank you for scrolling. I'm always looking for new adventures and challenges. Reach out and let's build something impactful together."}
          </p>
        </div>
      </section>

      {/* ── FOOTER BOTTOM BAR ── */}
      <footer style={{background:"var(--bg-void)",borderTop:"1px solid var(--border)",padding:"1.8rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",position:"relative",zIndex:3}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"var(--text-muted)"}}>© 2025 <span style={{color:"var(--text-main)"}}>Berke Jaisyurrohman</span>. Bekasi, Indonesia.</p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"var(--text-muted)"}}>Built with <span style={{color:"var(--accent)"}}>Next.js</span> · <span style={{color:"var(--gold)"}}>GSAP</span> · <span style={{color:"var(--cyan)"}}>Spline</span></p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"var(--text-muted)",display:"flex",alignItems:"center",gap:".5rem"}}><span style={{color:"var(--sage)", boxShadow:"0 0 8px var(--sage)", borderRadius:"50%"}}>●</span> Available for collaboration</p>
      </footer>
    </div>
  );
}