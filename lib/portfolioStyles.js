/* Portfolio CSS Styles */

export const CSS = `
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
