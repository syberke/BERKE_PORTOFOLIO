"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const P = {
  cream:"#FDFAF5", warm:"#FFF9F0", sand:"#F2EAD8", tan:"#D6C4A4",
  brown:"#8C6D45", dark:"#2E1F0F", charcoal:"#2C2C2C", slate:"#5C5042",
  muted:"#9C8C7A", accent:"#C8845C", sage:"#7B9E80", lavender:"#8B7EC8",
  gold:"#C4A035", rose:"#C46B6B",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"🌐", title:"Web Development", desc:"Full-stack web apps with modern frameworks. From landing pages to complex SaaS platforms.", tech:["Laravel","React","MySQL","TypeScript"], color:P.accent },
  { icon:"📱", title:"Mobile Development", desc:"Cross-platform mobile apps for iOS and Android with native-quality experiences.", tech:["React Native","Flutter","Firebase"], color:P.sage },
  { icon:"🔐", title:"Cybersecurity", desc:"Data encryption, secure authentication, and security system design to protect sensitive data.", tech:["Python","Cryptography","JWT"], color:P.lavender },
  { icon:"☪️", title:"Islamic Tech", desc:"Apps serving the Muslim community — Qur'an apps, prayer time systems, Islamic learning AI.", tech:["Flutter","AI/ML","Firebase"], color:P.gold },
  { icon:"🤖", title:"AI Integration", desc:"Integrating ML and AI features into applications — recommendations, NLP, computer vision.", tech:["Python","TensorFlow","OpenAI"], color:P.rose },
  { icon:"🏗️", title:"System Architecture", desc:"Scalable, maintainable architectures including microservices, REST APIs, and database design.", tech:["Docker","REST API","MySQL"], color:P.accent },
];

const PROJECTS = [
  { num:"01", tag:"Social Impact", cat:"Web", icon:"🏛️", name:"Bazma × Pertamina Bansos", year:"2024", org:"SMK TI Bazma", desc:"Responsive web platform managing social assistance distribution with real-time tracking, transparent data management, and reporting for the Pertamina collaboration.", tech:["Laravel","MySQL","Blade","JS"], color:P.accent, featured:false },
  { num:"02", tag:"EdTech", cat:"Web", icon:"📚", name:"IQRA App — School Monitor", year:"2024", org:"SMK TI Bazma", desc:"Full-stack school monitoring with Qur'an memorization tracking and multi-role dashboards for teachers, students, and parents. JWT authentication.", tech:["React","Laravel","MySQL","TS"], color:P.sage, featured:false },
  { num:"03", tag:"Mobile", cat:"Mobile", icon:"🏠", name:"Dormitory Attendance App", year:"2024", org:"SMK TI Bazma", desc:"Real-time attendance tracking with secure login, live monitoring, automated reporting, and supervisor notifications for dormitory management.", tech:["React Native","Laravel","MySQL"], color:P.lavender, featured:false },
  { num:"04", tag:"E-Commerce", cat:"Web", icon:"🛒", name:"E-Commerce Platform", year:"2024", org:"SMK TI Bazma", desc:"Complete online store with product catalog, cart, checkout, order tracking, and admin dashboard for inventory and analytics.", tech:["Laravel","Blade","MySQL","JS"], color:P.gold, featured:false },
  { num:"05", tag:"Cybersecurity", cat:"Security", icon:"🔐", name:"Bazma Cipher", year:"2024", org:"SMK TI Bazma", desc:"Prototype encryption system with custom cipher algorithms and industry-standard cryptography protecting sensitive application data.", tech:["Python","JavaScript","Crypto"], color:P.rose, featured:false },
  { num:"06", tag:"AI · Islamic · Mobile", cat:"Mobile", icon:"☪️", name:"KajianQu — AI Qur'an App", year:"2025", org:"Personal Project", desc:"AI-powered Qur'an mobile app: smart Tajweed guidance via ML, spaced-repetition memorization, Arabic OCR, tafsir browser, GPS prayer times, and offline-first architecture.", tech:["Flutter","Python","AI/ML","TF"], color:P.accent, featured:true },
];

const SKILLS = [
  { name:"JavaScript", lvl:90 }, { name:"TypeScript", lvl:78 },
  { name:"Python", lvl:50, badge:"Entry" }, { name:"React", lvl:85 },
  { name:"Astro", lvl:52, badge:"Entry" }, { name:"Laravel", lvl:88 },
  { name:"Blade", lvl:82 }, { name:"MySQL", lvl:84 },
  { name:"React Native", lvl:80 }, { name:"Flutter", lvl:75 }, { name:"SIOT", lvl:70 },
];

const LANGS = [
  { lang:"Indonesian", lvl:100, flag:"🇮🇩", label:"Native", color:P.sage },
  { lang:"English", lvl:75, flag:"🇬🇧", label:"Professional", color:P.accent },
  { lang:"Japanese", lvl:35, flag:"🇯🇵", label:"Basic", color:P.lavender },
  { lang:"German", lvl:32, flag:"🇩🇪", label:"Basic", color:P.gold },
];

const TIMELINE = [
  { year:"2025", role:"Personal AI Project", company:"Self-Directed", icon:"🤖", active:true, points:["Developing KajianQu — AI Qur'an mobile app with Flutter + TensorFlow.","Researching ML models for Arabic text recognition and Tajweed correction."] },
  { year:"2024", role:"Strategy & Operation Intern", company:"SMK TI Bazma · Ciampea, Bogor", icon:"💼", active:false, points:["Built Bazma × Pertamina Bansos web platform for social assistance management.","Developed IQRA multi-role school monitoring system.","Implemented Bazma Cipher encryption and security module.","Delivered 4 production systems used by students, teachers, and staff daily."] },
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

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function use3DTilt(ref, strength = 12) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { rotateX:(e.clientY-r.top-r.height/2)/r.height*-strength, rotateY:(e.clientX-r.left-r.width/2)/r.width*strength, duration:.3, ease:"power2.out", transformPerspective:700 });
    };
    const leave = () => gsap.to(el, { rotateX:0, rotateY:0, duration:.9, ease:"elastic.out(1,.5)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
}

function useReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity:0, y:options.y||28 },
      { opacity:1, y:0, duration:options.duration||.85, delay:options.delay||0, ease:"power3.out",
        scrollTrigger:{ trigger:ref.current, start:"top 88%", once:true } }
    );
  }, []);
}

// ─── CURSOR ──────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({x:0,y:0}), rp = useRef({x:0,y:0});
  useEffect(() => {
    const mv = e => { pos.current={x:e.clientX,y:e.clientY}; if(dot.current){dot.current.style.left=e.clientX+"px";dot.current.style.top=e.clientY+"px";} };
    window.addEventListener("mousemove", mv);
    let id;
    const a = () => {
      rp.current.x += (pos.current.x-rp.current.x)*.1;
      rp.current.y += (pos.current.y-rp.current.y)*.1;
      if(ring.current){ring.current.style.left=rp.current.x+"px";ring.current.style.top=rp.current.y+"px";}
      id=requestAnimationFrame(a);
    };
    a();
    return () => { window.removeEventListener("mousemove",mv); cancelAnimationFrame(id); };
  }, []);
  return (
    <>
      <div ref={dot} style={{position:"fixed",width:8,height:8,background:P.accent,borderRadius:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9999}}/>
      <div ref={ring} style={{position:"fixed",width:36,height:36,border:`1.5px solid rgba(200,132,92,.4)`,borderRadius:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:9998,transition:"width .3s,height .3s"}}/>
    </>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SHead({ label, title, center=false, light=false }) {
  const lRef = useRef(null), tRef = useRef(null);
  useReveal(lRef); useReveal(tRef, {delay:.1});
  const clr = light ? "rgba(214,196,164,.8)" : P.accent;
  return (
    <div style={{textAlign:center?"center":"left",marginBottom:"1rem"}}>
      <div ref={lRef} style={{fontFamily:"'DM Mono',monospace",fontSize:".72rem",fontWeight:500,color:clr,letterSpacing:"0.22em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".7rem",marginBottom:".8rem",justifyContent:center?"center":"flex-start",opacity:0}}>
        {!center && <span style={{width:24,height:1,background:clr,display:"inline-block",flexShrink:0}}/>}{label}
      </div>
      <h2 ref={tRef} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,3.8vw,3.2rem)",fontWeight:600,color:light?"#FDFAF5":P.dark,lineHeight:1.1,marginBottom:"2.8rem",opacity:0}} dangerouslySetInnerHTML={{__html:title}}/>
    </div>
  );
}

// ─── SERVICE CARD ────────────────────────────────────────────────────────────
function ServiceCard({ s, i }) {
  const ref = useRef(null);
  use3DTilt(ref, 10); useReveal(ref, {delay:i*.08});
  return (
    <div ref={ref} style={{background:"white",borderRadius:20,padding:"2rem",border:`1px solid rgba(214,196,164,.35)`,boxShadow:"0 4px 24px rgba(46,31,15,.06)",opacity:0,cursor:"none",position:"relative"}}>
      <div style={{width:50,height:50,borderRadius:14,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",marginBottom:"1.2rem"}}>{s.icon}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.25rem",fontWeight:600,color:P.dark,marginBottom:".5rem"}}>{s.title}</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".84rem",color:P.slate,lineHeight:1.8,marginBottom:"1rem"}}>{s.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:".3rem"}}>
        {s.tech.map(t=><span key={t} style={{padding:".22rem .65rem",borderRadius:50,background:P.sand,fontSize:".62rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:P.brown}}>{t}</span>)}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const ref = useRef(null);
  use3DTilt(ref, 9); useReveal(ref, {delay:i*.07});
  return (
    <div ref={ref} style={{background:p.featured?"linear-gradient(150deg,#fff,#FFF6F0)":"white",borderRadius:20,padding:"1.8rem",border:`1px solid ${p.featured?"rgba(200,132,92,.45)":"rgba(214,196,164,.35)"}`,boxShadow:"0 4px 20px rgba(46,31,15,.06)",opacity:0,cursor:"none",position:"relative"}}>
      {p.featured && <div style={{position:"absolute",top:"1rem",right:"1rem",background:`linear-gradient(135deg,${P.accent},${P.gold})`,color:"white",fontSize:".56rem",fontFamily:"'DM Mono',monospace",fontWeight:500,letterSpacing:"0.12em",padding:".3rem .8rem",borderRadius:50}}>★ Featured</div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.1rem"}}>
        <div style={{width:46,height:46,borderRadius:14,background:`${p.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"}}>{p.icon}</div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,color:P.muted,background:P.sand,padding:".25rem .7rem",borderRadius:50}}>{p.year}</span>
      </div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:p.color,marginBottom:".4rem"}}>{p.tag}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:600,color:P.dark,marginBottom:".3rem",lineHeight:1.25}}>{p.name}</div>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".72rem",color:P.muted,marginBottom:".75rem"}}>{p.org}</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".82rem",color:P.slate,lineHeight:1.8,marginBottom:"1.1rem"}}>{p.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:"1.1rem"}}>
        {p.tech.map(t=><span key={t} style={{padding:".22rem .65rem",borderRadius:50,background:P.sand,fontSize:".62rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:P.brown}}>{t}</span>)}
      </div>
      <div style={{display:"flex",gap:"1.2rem"}}>
        {["Demo ↗","Code ↗"].map(l=><a key={l} href="#" style={{fontFamily:"'Outfit',sans-serif",fontSize:".78rem",fontWeight:500,color:P.accent,textDecoration:"none",cursor:"none",transition:"opacity .2s"}}>{l}</a>)}
      </div>
    </div>
  );
}

// ─── SKILL BAR ───────────────────────────────────────────────────────────────
function SkillBar({ name, lvl, badge }) {
  const fillRef = useRef(null);
  useEffect(() => {
    if (!fillRef.current) return;
    const o = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ gsap.to(fillRef.current,{scaleX:1,duration:1.4,ease:"power3.out"}); o.disconnect(); }
    },{threshold:.3});
    o.observe(fillRef.current);
    return ()=>o.disconnect();
  },[]);
  return (
    <div style={{marginBottom:"1.4rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:".88rem",fontWeight:500,color:P.dark}}>{name}</span>
          {badge && <span style={{fontSize:".58rem",padding:".18rem .55rem",borderRadius:50,background:"rgba(196,160,53,.15)",color:P.gold,fontFamily:"'DM Mono',monospace",fontWeight:500}}>{badge}</span>}
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:".72rem",fontWeight:500,color:P.accent}}>{lvl}%</span>
      </div>
      <div style={{height:6,background:P.sand,borderRadius:50,overflow:"hidden"}}>
        <div ref={fillRef} style={{height:"100%",width:lvl+"%",borderRadius:50,background:lvl<60?`linear-gradient(90deg,${P.gold},${P.lavender})`:`linear-gradient(90deg,${P.accent},${P.sage})`,transform:"scaleX(0)",transformOrigin:"left"}}/>
      </div>
    </div>
  );
}

// ─── LANG CARD ───────────────────────────────────────────────────────────────
function LangCard({ lang, lvl, flag, label, color }) {
  const fillRef = useRef(null), cardRef = useRef(null);
  use3DTilt(cardRef, 8);
  useEffect(() => {
    if (!fillRef.current) return;
    const o = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ gsap.to(fillRef.current,{width:lvl+"%",duration:1.5,ease:"power3.out"}); o.disconnect(); }
    },{threshold:.3});
    o.observe(fillRef.current);
    return ()=>o.disconnect();
  },[]);
  return (
    <div ref={cardRef} style={{background:"white",borderRadius:14,padding:"1.3rem",border:"1px solid rgba(214,196,164,.4)",boxShadow:"0 2px 12px rgba(46,31,15,.05)",cursor:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:".9rem"}}>
        <span style={{fontSize:"1.6rem"}}>{flag}</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".9rem",fontWeight:500,color:P.dark}}>{lang}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,color,marginTop:2}}>{label}</div>
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:".72rem",fontWeight:500,color:P.accent}}>{lvl}%</span>
      </div>
      <div style={{height:5,background:P.sand,borderRadius:50,overflow:"hidden"}}>
        <div ref={fillRef} style={{height:"100%",width:"0%",borderRadius:50,background:`linear-gradient(90deg,${color},${P.accent})`}}/>
      </div>
    </div>
  );
}

// ─── ACHIEVEMENT CARD ────────────────────────────────────────────────────────
function AchCard({ a, i }) {
  const ref = useRef(null);
  use3DTilt(ref, 9); useReveal(ref, {delay:i*.07});
  const colors = [P.gold,P.lavender,P.accent,P.sage,P.gold,P.accent];
  return (
    <div ref={ref} style={{background:"white",borderRadius:20,padding:"1.8rem",border:"1px solid rgba(214,196,164,.35)",boxShadow:"0 4px 20px rgba(46,31,15,.05)",opacity:0,cursor:"none"}}>
      <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{a.icon}</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:600,color:P.dark,marginBottom:".4rem"}}>{a.title}</div>
      <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".82rem",color:P.slate,lineHeight:1.8,marginBottom:".9rem"}}>{a.desc}</p>
      <span style={{display:"inline-block",padding:".25rem .78rem",borderRadius:50,fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,letterSpacing:"0.08em",background:`${colors[i]}18`,color:colors[i]}}>{a.badge}</span>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function BerkePortfolio() {
  const [cat, setCat] = useState("All");
  const [sendStatus, setSend] = useState("idle");
  const hcardRef = useRef(null);
  use3DTilt(hcardRef, 16);

  const filtered = cat==="All" ? PROJECTS : PROJECTS.filter(p=>p.cat===cat);

  // Scroll progress
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({delay:.25});
      tl.fromTo(".h-badge",{opacity:0,y:18},{opacity:1,y:0,duration:.7,ease:"power3.out"})
        .fromTo(".h-title",{opacity:0,y:36},{opacity:1,y:0,duration:1.1,ease:"power3.out"},"-=.4")
        .fromTo(".h-para",{opacity:0,y:22},{opacity:1,y:0,duration:.9,ease:"power3.out"},"-=.55")
        .fromTo(".h-btns",{opacity:0,y:18},{opacity:1,y:0,duration:.7,ease:"power3.out"},"-=.45")
        .fromTo(".h-card",{opacity:0,x:50,rotateY:-14},{opacity:1,x:0,rotateY:0,duration:1.2,ease:"power3.out"},"-=.9");

      // Hero parallax
      gsap.to(".blob1",{y:-60,x:30,scrollTrigger:{trigger:"#hero",scrub:1.5}});
      gsap.to(".blob2",{y:-80,scrollTrigger:{trigger:"#hero",scrub:2}});
      gsap.to(".h-title",{y:-35,scrollTrigger:{trigger:"#hero",start:"top top",end:"bottom top",scrub:1.5}});
      gsap.to(".h-para",{y:-20,scrollTrigger:{trigger:"#hero",start:"top top",end:"bottom top",scrub:1}});

      // Counters
      [["#c1",6],["#c2",2],["#c3",11],["#c4",4]].forEach(([sel,n])=>{
        const el = document.querySelector(sel);
        if(!el) return;
        ScrollTrigger.create({trigger:el,start:"top 90%",once:true,onEnter:()=>{
          gsap.fromTo(el,{textContent:0},{textContent:n,duration:1.8,ease:"power2.out",snap:{textContent:1},
            onUpdate(){ if(el) el.textContent=Math.round(+el.textContent); }});
        }});
      });

      // Batch reveals
      ScrollTrigger.batch(".reveal",{
        onEnter:els=>gsap.to(els,{opacity:1,y:0,duration:.85,stagger:.1,ease:"power3.out"}),
        start:"top 88%",
      });

      // Timeline items
      gsap.utils.toArray(".tl-item").forEach((el,i)=>{
        gsap.fromTo(el,{opacity:0,x:-28},{opacity:1,x:0,duration:.75,delay:i*.12,ease:"power3.out",
          scrollTrigger:{trigger:el,start:"top 85%",once:true}});
      });

      // Quote
      gsap.fromTo(".q-text",{opacity:0,y:30},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:"#quote",start:"top 75%",once:true}});
      gsap.fromTo(".q-author",{opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.25,ease:"power3.out",scrollTrigger:{trigger:"#quote",start:"top 75%",once:true}});

      // Nav bg on scroll
      ScrollTrigger.create({start:"top -80",onUpdate:s=>{
        const nav = document.getElementById("main-nav");
        if(!nav) return;
        if(s.direction===1){ nav.style.background="rgba(253,250,245,.94)"; nav.style.backdropFilter="blur(24px)"; nav.style.borderBottom="1px solid rgba(214,196,164,.3)"; nav.style.boxShadow="0 4px 32px rgba(46,31,15,.07)"; }
        else { nav.style.background="transparent"; nav.style.backdropFilter="none"; nav.style.borderBottom="none"; nav.style.boxShadow="none"; }
      }});
    });
    return ()=>ctx.revert();
  }, [cat]);

  const submit = () => { setSend("sending"); setTimeout(()=>setSend("sent"),1500); setTimeout(()=>setSend("idle"),4500); };
  const W = {maxWidth:1100,margin:"0 auto",width:"100%"};
  const sec = (bg) => ({position:"relative",padding:"7rem 3rem",background:bg||P.cream});

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:P.cream,color:P.dark,overflowX:"hidden",cursor:"none"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(200,132,92,.22)}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#FDFAF5}
        ::-webkit-scrollbar-thumb{background:#D6C4A4;border-radius:3px}

        /* ── core body text: Outfit is warm and highly legible ── */
        body{font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased}

        /* ── animations ── */
        @keyframes lp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes mb{0%,100%{border-radius:50%}33%{border-radius:60% 40% 70% 30%/40% 60% 50% 70%}66%{border-radius:30% 70% 40% 60%/60% 30% 70% 40%}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .live-dot{animation:lp 2s infinite}
        .mq-track{animation:mq 28s linear infinite}
        .morph-blob{animation:mb 8s ease-in-out infinite}

        /* ── reveal utility ── */
        .reveal{opacity:0;transform:translateY(24px)}

        /* ── nav links ── */
        .nlink{
          font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;
          color:#5C5042;text-decoration:none;cursor:none;
          position:relative;transition:color .3s;letter-spacing:.01em;
        }
        .nlink::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:#C8845C;transition:width .3s;border-radius:1px}
        .nlink:hover{color:#C8845C}.nlink:hover::after{width:100%}
        .ncta{
          padding:.48rem 1.4rem;
          background:#2E1F0F;color:#FDFAF5!important;
          border-radius:50px;font-weight:500;
          transition:all .3s!important;
        }
        .ncta::after{display:none!important}
        .ncta:hover{background:#C8845C!important;transform:translateY(-2px)!important}

        /* ── buttons ── */
        .bfill{
          padding:.9rem 2.3rem;background:#2E1F0F;color:#FDFAF5;
          border:none;border-radius:50px;
          font-family:'Outfit',sans-serif;font-size:.86rem;font-weight:500;
          cursor:none;transition:all .35s;text-decoration:none;display:inline-block;
          letter-spacing:.01em;
        }
        .bfill:hover{background:#C8845C;transform:translateY(-3px);box-shadow:0 14px 36px rgba(200,132,92,.35)}
        .boutl{
          padding:.9rem 2.3rem;background:transparent;
          border:1.5px solid #D6C4A4;color:#2E1F0F;
          border-radius:50px;font-family:'Outfit',sans-serif;font-size:.86rem;font-weight:500;
          cursor:none;transition:all .35s;text-decoration:none;display:inline-block;
          letter-spacing:.01em;
        }
        .boutl:hover{border-color:#C8845C;color:#C8845C;transform:translateY(-3px)}

        /* ── filter buttons ── */
        .pf-btn{
          padding:.42rem 1.1rem;border-radius:50px;
          background:white;border:1.5px solid #D6C4A4;
          font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:500;
          color:#9C8C7A;cursor:none;transition:all .25s;
        }
        .pf-btn.on{background:#2E1F0F;border-color:#2E1F0F;color:white}

        /* ── info row ── */
        .info-item{
          display:flex;align-items:center;gap:.9rem;
          padding:.72rem 1rem;background:white;border-radius:12px;
          border:1px solid rgba(214,196,164,.4);
          font-family:'Outfit',sans-serif;font-size:.84rem;font-weight:400;
          color:#5C5042;transition:all .3s;cursor:default;
        }
        .info-item:hover{border-color:#C8845C;transform:translateX(6px)}

        /* ── soft skill ── */
        .soft-item{
          display:flex;align-items:center;gap:.65rem;
          padding:.72rem .9rem;background:white;border-radius:12px;
          border:1px solid rgba(214,196,164,.3);
          font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:400;
          color:#5C5042;
        }

        /* ── timeline ── */
        .tl-item{display:grid;grid-template-columns:52px 1fr;gap:1.5rem;margin-bottom:2.5rem;opacity:0;transform:translateX(-22px)}
        .tl-content{
          background:white;border-radius:20px;padding:1.6rem;
          border:1px solid rgba(214,196,164,.35);
          box-shadow:0 4px 18px rgba(46,31,15,.05);transition:all .3s;
        }
        .tl-content:hover{box-shadow:0 14px 40px rgba(46,31,15,.1);transform:translateX(5px)}

        /* ── contact links ── */
        .ct-link{
          display:flex;align-items:center;gap:.9rem;
          padding:.82rem 1rem;background:rgba(253,250,245,.04);
          border:1px solid rgba(253,250,245,.1);border-radius:12px;
          font-family:'Outfit',sans-serif;font-size:.84rem;font-weight:400;
          color:rgba(214,196,164,.75);text-decoration:none;cursor:none;transition:all .3s;
        }
        .ct-link:hover{background:rgba(200,132,92,.12);border-color:rgba(200,132,92,.3);color:#C8845C;transform:translateX(5px)}

        /* ── contact form ── */
        .cf-label{
          display:block;font-family:'DM Mono',monospace;font-size:.65rem;font-weight:500;
          color:rgba(214,196,164,.65);letter-spacing:.15em;text-transform:uppercase;
          margin-bottom:.5rem;
        }
        .cf-in{
          width:100%;background:rgba(253,250,245,.05);
          border:1px solid rgba(253,250,245,.12);border-radius:12px;
          padding:.88rem 1rem;
          font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:400;
          color:#FDFAF5;outline:none;transition:border-color .3s;resize:none;
        }
        .cf-in:focus{border-color:rgba(200,132,92,.55)}
        .cf-in::placeholder{color:rgba(253,250,245,.22);font-size:.84rem}

        /* ── grids ── */
        .srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
        .proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.3rem}
        .ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.2rem}
        .lang-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}

        @media(max-width:900px){
          .srv-grid{grid-template-columns:1fr 1fr}
          .two-col{grid-template-columns:1fr!important}
          .nav-links{display:none}
        }
        @media(max-width:600px){
          .srv-grid{grid-template-columns:1fr}
          section{padding:5rem 1.5rem!important}
        }
      `}</style>

      <Cursor/>

      {/* Progress bar */}
      <div id="scroll-progress" style={{position:"fixed",top:0,left:0,height:"2.5px",background:`linear-gradient(90deg,${P.accent},${P.gold},${P.sage})`,zIndex:999,width:"0%",pointerEvents:"none"}}/>

      {/* ── NAV ── */}
      <nav id="main-nav" style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"1.1rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .4s"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.45rem",fontWeight:700,color:P.dark,cursor:"none",letterSpacing:"-.01em"}}>
          Berke<em style={{color:P.accent,fontStyle:"italic"}}>.</em>dev
        </div>
        <ul className="nav-links" style={{display:"flex",gap:"2rem",listStyle:"none",alignItems:"center"}}>
          {["About","Services","Projects","Skills","Experience","Contact"].map(s=>(
            <li key={s}><a href={`#${s.toLowerCase()}`} className={`nlink${s==="Contact"?" ncta":""}`}>{s==="Contact"?"Hire Me":s}</a></li>
          ))}
        </ul>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="hero" style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:"7rem 3rem 4rem",background:P.warm,overflow:"hidden",position:"relative"}}>
        <div className="blob1" style={{position:"absolute",width:600,height:600,background:"rgba(200,132,92,.1)",top:-150,right:-150,borderRadius:"50%",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div className="blob2" style={{position:"absolute",width:500,height:500,background:"rgba(123,158,128,.08)",bottom:-100,left:-100,borderRadius:"50%",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div className="morph-blob" style={{position:"absolute",width:300,height:300,background:"rgba(196,160,53,.07)",top:"40%",left:"35%",filter:"blur(60px)",pointerEvents:"none"}}/>

        <div style={{...W,display:"grid",gridTemplateColumns:"1fr 400px",gap:"5rem",alignItems:"center"}} className="two-col">
          <div>
            {/* Available badge */}
            <div className="h-badge" style={{display:"inline-flex",alignItems:"center",gap:".6rem",padding:".45rem 1.2rem",background:"rgba(200,132,92,.1)",border:"1px solid rgba(200,132,92,.28)",borderRadius:50,fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:P.accent,letterSpacing:"0.12em",marginBottom:"1.8rem",opacity:0}}>
              <div className="live-dot" style={{width:6,height:6,background:P.sage,borderRadius:"50%",flexShrink:0}}/>
              Available for Collaboration
            </div>

            {/* Main heading — Cormorant Garamond display */}
            <h1 className="h-title" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3.8rem,6.5vw,6rem)",fontWeight:700,lineHeight:1.02,color:P.dark,marginBottom:"1.2rem",letterSpacing:"-.02em",opacity:0}}>
              Qiageng<br/>
              <em style={{color:P.accent,fontStyle:"italic",fontWeight:600}}>Berke</em><br/>
              Jaisyurrohman
            </h1>

            {/* Body — Outfit for max legibility */}
            <p className="h-para" style={{fontFamily:"'Outfit',sans-serif",fontSize:"1rem",fontWeight:400,color:P.slate,lineHeight:1.85,maxWidth:460,marginBottom:"2.5rem",opacity:0}}>
              A passionate <strong style={{color:P.dark,fontWeight:600}}>Full-Stack Developer & IT Student</strong> from Bekasi. Building web systems, mobile apps, and cybersecurity solutions that create real impact.
            </p>

            <div className="h-btns" style={{display:"flex",gap:"1rem",flexWrap:"wrap",opacity:0}}>
              <a href="#projects" className="bfill">Explore My Work</a>
              <a href="#contact" className="boutl">Let's Talk</a>
            </div>
          </div>

          {/* 3D Hero Card */}
          <div style={{perspective:1000}}>
            <div ref={hcardRef} className="h-card" style={{background:"white",borderRadius:28,boxShadow:"0 32px 90px rgba(46,31,15,.13),0 0 0 1px rgba(214,196,164,.4)",padding:"2.2rem",position:"relative",overflow:"hidden",opacity:0}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,.5),transparent 60%)",borderRadius:28,pointerEvents:"none"}}/>
              <div style={{position:"absolute",top:-60,right:-60,width:180,height:180,background:"radial-gradient(circle,rgba(200,132,92,.14),transparent 70%)",pointerEvents:"none"}}/>
              <div style={{width:64,height:64,background:`linear-gradient(135deg,${P.accent},${P.gold})`,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem",marginBottom:"1.2rem",boxShadow:`0 8px 22px rgba(200,132,92,.3)`}}>👨‍💻</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:600,color:P.dark,marginBottom:".15rem"}}>Berke Jaisyurrohman</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".75rem",fontWeight:400,color:P.muted,marginBottom:"1.5rem"}}>IT Student · SMK TI Bazma · Bogor</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".75rem",marginBottom:"1.5rem"}}>
                {[["c1",6,"Projects"],["c2",2,"Years"],["c3",11,"Tech"],["c4",4,"Languages"]].map(([id,n,l])=>(
                  <div key={id} style={{background:P.cream,borderRadius:12,padding:".9rem",textAlign:"center"}}>
                    <div id={id} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:P.dark,lineHeight:1}}>0</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,color:P.muted,marginTop:4}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:".4rem"}}>
                {[["Web Dev",P.accent],["Mobile",P.sage],["CyberSec",P.lavender],["AI",P.gold]].map(([t,c])=>(
                  <span key={t} style={{padding:".28rem .75rem",borderRadius:50,fontSize:".64rem",fontFamily:"'DM Mono',monospace",fontWeight:500,background:`${c}18`,color:c}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{position:"absolute",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"fadeInUp .8s 2.5s both"}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",fontWeight:500,color:P.muted,letterSpacing:"0.2em",textTransform:"uppercase"}}>Scroll</span>
          <div style={{width:1,height:40,background:`linear-gradient(180deg,${P.accent},transparent)`}}/>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{padding:"1.3rem 0",background:P.dark,overflow:"hidden"}}>
        <div className="mq-track" style={{display:"flex",gap:"3rem",whiteSpace:"nowrap"}}>
          {[...Array(2)].map((_,r)=>["Web Development","Mobile Apps","Cybersecurity","Laravel","React","Flutter","MySQL","TypeScript","AI / ML","SIOT","React Native","Python","Astro","Full-Stack"].map((t,i)=>(
            <div key={`${r}-${i}`} style={{display:"flex",alignItems:"center",gap:"1rem",flexShrink:0}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:".75rem",fontWeight:500,color:"rgba(253,250,245,.38)",letterSpacing:"0.16em",textTransform:"uppercase"}}>{t}</span>
              <div style={{width:4,height:4,background:P.accent,borderRadius:"50%",flexShrink:0}}/>
            </div>
          )))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section id="about" style={sec()}>
        <div style={{...W,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"start"}} className="two-col">
          <div>
            <SHead label="About Me" title={`Building Impact<br/><em style="color:${P.accent};font-style:italic">With Code</em>`}/>
            <p className="reveal" style={{fontFamily:"'Outfit',sans-serif",fontSize:".92rem",fontWeight:400,color:P.slate,lineHeight:1.9,marginBottom:"1rem"}}>
              A highly motivated IT student specializing in <strong style={{color:P.dark,fontWeight:600}}>Web Development, Mobile Applications, and Cybersecurity</strong>. Berke has built real-world systems serving actual users in production.
            </p>
            <p className="reveal" style={{fontFamily:"'Outfit',sans-serif",fontSize:".92rem",color:P.slate,lineHeight:1.9}}>
              Passionate about clean code, data security, and technology that creates <strong style={{color:P.dark,fontWeight:600}}>real impact for communities</strong> across Indonesia and beyond.
            </p>
            <div className="reveal" style={{display:"flex",flexDirection:"column",gap:".65rem",margin:"1.8rem 0"}}>
              {[["📍","Bekasi, Indonesia"],["📧","berkejaisyurrohman95@gmail.com"],["📱","+62 895-0614-7763"],["🌐","www.jaisyporto.com"]].map(([ico,val])=>(
                <div key={val} className="info-item">
                  <div style={{width:30,height:30,background:"rgba(200,132,92,.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{ico}</div>
                  {val}
                </div>
              ))}
            </div>
            <div className="reveal" style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:P.accent,letterSpacing:"0.2em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".7rem",marginBottom:"1rem"}}>
              <span style={{width:24,height:1,background:P.accent,display:"inline-block"}}/>Soft Skills
            </div>
            <div className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".75rem"}}>
              {SOFT_SKILLS.map(([ico,s])=>(
                <div key={s} className="soft-item"><span style={{fontSize:"1rem"}}>{ico}</span>{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="reveal" style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:P.accent,letterSpacing:"0.2em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".7rem",marginBottom:"1.2rem"}}>
              <span style={{width:24,height:1,background:P.accent,display:"inline-block"}}/>Education
            </div>
            <div className="reveal" style={{background:"white",borderRadius:20,padding:"1.8rem",border:"1px solid rgba(214,196,164,.4)",boxShadow:"0 4px 22px rgba(46,31,15,.06)",position:"relative",overflow:"hidden",marginBottom:"1.5rem"}}>
              <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:`linear-gradient(180deg,${P.accent},${P.gold})`,borderRadius:"3px 0 0 3px"}}/>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color:P.accent,letterSpacing:"0.14em",marginBottom:".4rem"}}>JUNE 2023 – PRESENT</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:600,color:P.dark,marginBottom:".25rem"}}>SMK TI Bazma</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".82rem",color:P.muted,marginBottom:".9rem"}}>Network Information Systems & Applications · Bogor</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:".35rem"}}>
                {["Web Dev","Database","Networking","Cybersecurity"].map(t=>(
                  <span key={t} style={{padding:".25rem .75rem",background:P.sand,borderRadius:50,fontSize:".64rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:P.brown}}>{t}</span>
                ))}
              </div>
            </div>
            <div className="reveal" style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:P.accent,letterSpacing:"0.2em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".7rem",marginBottom:"1rem"}}>
              <span style={{width:24,height:1,background:P.accent,display:"inline-block"}}/>Tech Ecosystem
            </div>
            <div className="reveal" style={{display:"flex",flexWrap:"wrap",gap:".45rem",marginBottom:"1.5rem"}}>
              {[[P.accent,"React"],[P.sage,"Flutter"],[P.lavender,"Laravel"],[P.gold,"TypeScript"],[P.accent,"MySQL"],[P.sage,"Python"],[P.lavender,"SIOT"],[P.gold,"React Native"],[P.accent,"Next.js"],[P.sage,"Astro"],[P.lavender,"Blade"]].map(([c,t])=>(
                <span key={t} style={{padding:".32rem .82rem",borderRadius:50,background:`${c}18`,fontSize:".67rem",fontFamily:"'DM Mono',monospace",fontWeight:500,color:c}}>{t}</span>
              ))}
            </div>
            <div className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".8rem"}}>
              {[["6+","Projects"],["2+","Years"],["4","Languages"]].map(([n,l])=>(
                <div key={l} style={{background:"white",borderRadius:14,padding:"1rem",textAlign:"center",border:"1px solid rgba(214,196,164,.35)"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.9rem",fontWeight:700,color:P.dark}}>{n}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:".62rem",fontWeight:500,color:P.muted}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={sec(P.warm)}>
        <div style={W}>
          <SHead label="What I Do" title={`Services &<br/><em style="color:${P.accent};font-style:italic">Specializations</em>`}/>
          <div className="srv-grid">
            {SERVICES.map((s,i)=><ServiceCard key={s.title} s={s} i={i}/>)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={sec()}>
        <div style={W}>
          <SHead label="Selected Work" title={`Projects &<br/><em style="color:${P.accent};font-style:italic">Case Studies</em>`}/>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"2.5rem"}}>
            {PROJ_CATS.map(c=>(
              <button key={c} className={`pf-btn${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="proj-grid">
            {filtered.map((p,i)=><ProjectCard key={p.num} p={p} i={i}/>)}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={sec(P.warm)}>
        <div style={W}>
          <SHead label="Expertise" title={`Tech Stack &<br/><em style="color:${P.accent};font-style:italic">Languages</em>`}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3.5rem",marginBottom:"4rem"}} className="two-col">
            <div>{SKILLS.slice(0,6).map(s=><SkillBar key={s.name} {...s}/>)}</div>
            <div>{SKILLS.slice(6).map(s=><SkillBar key={s.name} {...s}/>)}</div>
          </div>
          <div className="reveal" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:600,color:P.dark,marginBottom:"1.5rem"}}>Human Languages</div>
          <div className="lang-grid">
            {LANGS.map(l=><LangCard key={l.lang} {...l}/>)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={sec()}>
        <div style={W}>
          <SHead label="Career Timeline" title={`My <em style="color:${P.accent};font-style:italic">Journey</em>`} center/>
          <div style={{maxWidth:700,margin:"0 auto",position:"relative"}}>
            <div style={{position:"absolute",left:22,top:8,bottom:0,width:1,background:`linear-gradient(180deg,transparent,${P.tan},transparent)`}}/>
            {TIMELINE.map((t,i)=>(
              <div key={i} className="tl-item">
                <div style={{width:44,height:44,background:t.active?P.accent:"white",border:`1.5px solid ${t.active?P.accent:P.tan}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0,zIndex:1,boxShadow:t.active?`0 0 0 6px rgba(200,132,92,.15)`:undefined}}>
                  {t.icon}
                </div>
                <div className="tl-content">
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color:P.accent,letterSpacing:"0.14em",marginBottom:".35rem"}}>{t.year}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:600,color:P.dark,marginBottom:".2rem"}}>{t.role}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".78rem",fontWeight:400,color:P.muted,marginBottom:"1rem"}}>{t.company}</div>
                  <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".55rem"}}>
                    {t.points.map((pt,j)=>(
                      <li key={j} style={{display:"flex",gap:".65rem",fontFamily:"'Outfit',sans-serif",fontSize:".84rem",fontWeight:400,color:P.slate,lineHeight:1.75}}>
                        <div style={{width:5,height:5,background:P.accent,borderRadius:"50%",flexShrink:0,marginTop:".6rem"}}/>
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
      <section id="quote" style={{...sec(P.dark),textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",width:400,height:400,background:"radial-gradient(circle,rgba(200,132,92,.14),transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <p className="q-text" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,3vw,2.6rem)",fontStyle:"italic",fontWeight:400,color:"rgba(253,250,245,.88)",lineHeight:1.55,maxWidth:700,margin:"0 auto 1.5rem",opacity:0}}>
          "Technology should not just be functional — it should create genuine impact for the people who use it."
        </p>
        <p className="q-author" style={{fontFamily:"'DM Mono',monospace",fontSize:".72rem",fontWeight:500,color:"rgba(253,250,245,.38)",letterSpacing:"0.16em",opacity:0}}>
          — Berke Jaisyurrohman · IT Student & Developer
        </p>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={sec(P.warm)}>
        <div style={W}>
          <SHead label="Recognition" title={`Achievements &<br/><em style="color:${P.accent};font-style:italic">Milestones</em>`}/>
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a,i)=><AchCard key={a.title} a={a} i={i}/>)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{...sec(P.dark),overflow:"hidden"}}>
        <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,rgba(200,132,92,.11),transparent 70%)",top:-100,right:-100,pointerEvents:"none"}}/>
        <div style={{position:"absolute",width:400,height:400,background:"radial-gradient(circle,rgba(123,158,128,.09),transparent 70%)",bottom:-100,left:-100,pointerEvents:"none"}}/>
        <div style={W}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"start"}} className="two-col">
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".7rem",fontWeight:500,color:"rgba(214,196,164,.8)",letterSpacing:"0.2em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:".7rem",marginBottom:".8rem"}}>
                <span style={{width:24,height:1,background:"rgba(214,196,164,.5)",display:"inline-block"}}/>Let's Connect
              </div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,3.8vw,3.2rem)",fontWeight:700,color:"#FDFAF5",lineHeight:1.1,marginBottom:"1.5rem"}}>
                Ready to Build<br/>
                <em style={{color:P.accent,fontStyle:"italic"}}>Something Great?</em>
              </h2>
              <p style={{fontFamily:"'Outfit',sans-serif",fontSize:".92rem",fontWeight:400,color:"rgba(253,250,245,.52)",lineHeight:1.9,marginBottom:"2.2rem"}}>
                Always open to new opportunities and collaborations. Whether it's a web system, mobile app, or cybersecurity challenge — let's create together.
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
                {[["✉️","Email","berkejaisyurrohman95@gmail.com"],["📱","Phone","+62 895-0614-7763"],["📍","Location","Bekasi, Indonesia"],["🌐","Website","www.jaisyporto.com"]].map(([ico,lbl,val])=>(
                  <a key={lbl} href={lbl==="Email"?`mailto:${val}`:"#"} className="ct-link">
                    <div style={{width:34,height:34,background:"rgba(200,132,92,.12)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{ico}</div>
                    <div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".58rem",fontWeight:500,color:"rgba(253,250,245,.32)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:2}}>{lbl}</div>
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:".84rem",fontWeight:400}}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"1.1rem"}}>
              {["Name","Email","Subject"].map(f=>(
                <div key={f}>
                  <label className="cf-label">{f}</label>
                  <input type={f==="Email"?"email":"text"} className="cf-in" placeholder={f==="Name"?"Your name":f==="Email"?"your@email.com":"Project idea, collaboration..."}/>
                </div>
              ))}
              <div>
                <label className="cf-label">Message</label>
                <textarea className="cf-in" rows={4} placeholder="Tell me about your project..."/>
              </div>
              <button onClick={submit} style={{padding:"1rem 2.5rem",background:sendStatus==="sent"?P.sage:P.accent,color:"white",border:"none",borderRadius:50,fontFamily:"'Outfit',sans-serif",fontSize:".88rem",fontWeight:500,cursor:"none",transition:"all .35s",opacity:sendStatus==="sending"?.65:1,letterSpacing:".01em"}}>
                {sendStatus==="idle"?"Send Message ✦":sendStatus==="sending"?"Sending…":"Sent! ✓"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:P.dark,borderTop:"1px solid rgba(255,255,255,.06)",padding:"1.5rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".8rem"}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color:"rgba(253,250,245,.32)"}}>© 2025 <span style={{color:P.accent}}>Berke Jaisyurrohman</span>. Bekasi, Indonesia.</p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color:"rgba(253,250,245,.32)"}}>Built with <span style={{color:P.accent}}>Next.js</span> · <span style={{color:P.gold}}>GSAP</span> · Framer Motion</p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",fontWeight:500,color:"rgba(253,250,245,.32)",display:"flex",alignItems:"center",gap:".5rem"}}><span style={{color:P.sage}}>●</span> Available for collaboration</p>
      </footer>
    </div>
  );
}