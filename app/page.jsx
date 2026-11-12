import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import CustomCursor from "@/components/site/CustomCursor";
import MotionDirector from "@/components/site/MotionDirector";
import ProjectExplorer from "@/components/site/ProjectExplorer";
import SkillConstellation from "@/components/site/SkillConstellation";
import ContactForm from "@/components/site/ContactForm";
import { journey, projects, skillGroups, services } from "./portfolio-data";

function WordHeading({ children, className = "" }) {
  return <span className={className} data-word-reveal><span className="sr-only">{children}</span>{String(children).split(" ").map((word,i)=><span className="word-mask" key={`${word}-${i}`} aria-hidden="true"><span className="word">{word}&nbsp;</span></span>)}</span>;
}

export default function Portfolio() {
  const distinctTools = [...new Set(projects.flatMap((project) => project.tools))];
  return (
    <>
      <Header />
      <MotionDirector />
      <CustomCursor />
      <main id="main-content">
        <Hero />
        <section className="interlude" aria-label="Introduction" id="interlude">
          <div className="interlude-orbit" aria-hidden="true">✳</div>
          <p className="eyebrow" data-reveal>NOT JUST LINES OF CODE</p>
          <p className="interlude-statement" data-word-reveal><span className="sr-only">Great experiences happen when engineering meets imagination.</span>
            {"Great experiences happen when engineering meets imagination.".split(" ").map((word,i)=><span className="word-mask" key={i} aria-hidden="true"><span className="word">{word}&nbsp;</span></span>)}
          </p>
          <div className="interlude-rule" aria-hidden="true"><span /></div>
        </section>

        <section className="section about-section shell" id="about" aria-labelledby="about-heading">
          <div className="section-marker" data-reveal><span>01 / ABOUT ME</span><span>THE HUMAN SIDE OF THE CODE</span></div>
          <div className="about-grid">
            <div className="about-visual" data-reveal>
              <div className="about-photo-frame"><img src="/images/creative-portrait.svg" alt="Ilustrasi editorial creative developer dengan blazer gelap dan kacamata" loading="lazy" /><span className="about-photo-corner corner-one"/><span className="about-photo-corner corner-two"/><span className="about-photo-overlay">A MIND ALWAYS<br/><b>IN MOTION.</b></span></div>
              <span className="about-stamp">CREATIVE BY CURIOSITY / BUILT BY CODE</span>
            </div>
            <div className="about-text">
              <p className="eyebrow" data-reveal><span className="red-cross">✳</span> INTRODUCTION / 001</p>
              <h2 id="about-heading" className="display-title"><WordHeading>Beyond The Code.</WordHeading></h2>
              <p className="about-lead" data-reveal>I’m Berke — an IT student and developer from Bekasi, Indonesia, interested in making technology <em>useful, understandable, and human.</em></p>
              <p className="body-copy" data-reveal>Since studying Network Information Systems & Applications at SMK TI Bazma in 2023, I’ve explored projects that grow from real environments: dormitory attendance, school monitoring, community assistance and Qur’an learning.</p>
              <p className="body-copy" data-reveal>My approach combines curiosity across design, full-stack engineering, mobile technology, and security fundamentals. Each project is an opportunity to learn and make something that matters.</p>
              <div className="fact-grid" data-reveal>
                <div><strong>{String(projects.length).padStart(2,"0")}<b>+</b></strong><span>DOCUMENTED PROJECTS</span></div>
                <div><strong>{String(distinctTools.length).padStart(2,"0")}<b>+</b></strong><span>TOOLS USED IN PROJECTS</span></div>
                <div><strong>2023</strong><span>IT STUDIES BEGAN</span></div>
              </div>
              <div className="about-quick-facts" data-reveal><span>BASED IN <b>BEKASI, ID</b></span><span>EDUCATION <b>SMK TI BAZMA</b></span><span>LANGUAGES <b>ID · EN · BASIC DE/JP</b></span></div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
          <div className="shell">
            <div className="section-marker" data-reveal><span>02 / SELECTED WORK</span><span>IDEAS INTO REALITY</span></div>
            <div className="section-heading projects-heading"><div><p className="eyebrow" data-reveal><span className="red-cross">✳</span> A FEW THINGS I’VE BUILT</p><h2 id="projects-heading" className="display-title"><WordHeading>Proof of Curiosity.</WordHeading></h2></div><p data-reveal>Six explorations across web, mobile, and security. Real briefs, real learning, no invented results.</p></div>
          </div>
          <ProjectExplorer projects={projects} />
        </section>

        <section className="section skills-section shell" id="skills-tech" aria-labelledby="skills-heading">
          <div className="section-marker" data-reveal><span>03 / TECHNICAL ARSENAL</span><span>THE TOOLS BEHIND THE WORK</span></div>
          <div className="section-heading"><div><p className="eyebrow" data-reveal><span className="red-cross">✳</span> STACK & SKILLS</p><h2 className="display-title" id="skills-heading"><WordHeading>Built With Purpose.</WordHeading></h2></div><p data-reveal>Tools change. Curiosity stays. Explore the technologies I work with and study.</p></div>
          <SkillConstellation groups={skillGroups} />
        </section>

        <section className="section journey-section" id="journey" aria-labelledby="journey-heading">
          <div className="shell"><div className="section-marker" data-reveal><span>04 / THE JOURNEY</span><span>ALWAYS A WORK IN PROGRESS</span></div><div className="journey-layout"><div className="journey-intro"><p className="eyebrow" data-reveal><span className="red-cross">✳</span> EXPERIENCE & LEARNING</p><h2 id="journey-heading" className="display-title"><WordHeading>Still Becoming.</WordHeading></h2><p className="body-copy" data-reveal>Every milestone is a chapter, not a finish line. My journey is shaped by the problems I choose to explore.</p><div className="journey-deco" aria-hidden="true">↘</div></div><ol className="timeline"><span className="timeline-track" aria-hidden="true"/><span className="timeline-progress" aria-hidden="true"/>{journey.map((step,index)=><li key={step.year} className="timeline-item" data-reveal><span className="timeline-node"/><span className="timeline-year">{step.year}</span><div><span className="timeline-index">CHAPTER / 0{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div></div>
        </section>

        <section className="section services-section shell" id="services" aria-labelledby="services-heading">
          <div className="section-marker" data-reveal><span>05 / WHAT I DO</span><span>HOW I CAN HELP</span></div>
          <div className="section-heading"><div><p className="eyebrow" data-reveal><span className="red-cross">✳</span> CAPABILITIES</p><h2 id="services-heading" className="display-title"><WordHeading>From Thought to Thing.</WordHeading></h2></div><p data-reveal>Interdisciplinary development, grounded in purpose, collaboration, and a willingness to learn.</p></div>
          <div className="service-grid">{services.map((service,i)=><article className="service-card" data-reveal key={service.name}><span className="service-number">0{i+1} / 06 <span>↗</span></span><div><h3>{service.name}</h3><p>{service.description}</p></div></article>)}</div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-glow" aria-hidden="true"/><div className="shell contact-shell"><div className="section-marker" data-reveal><span>06 / SAY HELLO</span><span>THE NEXT CHAPTER STARTS HERE</span></div><p className="eyebrow" data-reveal><span className="red-cross">✳</span> HAVE AN IDEA IN MIND?</p><h2 id="contact-heading" className="contact-giant" data-reveal>LET’S BUILD<br/><em>SOMETHING</em><br/>EXTRAORDINARY<span>.</span></h2><div className="contact-bottom"><div className="contact-left" data-reveal><p>Have an interesting challenge, a collaboration in mind, or just want to talk tech? I’d love to hear about it.</p><a href="mailto:berkejaisyurrohman95@gmail.com" className="contact-email">berkejaisyurrohman95@gmail.com ↗</a><div className="social-links"><a href="https://github.com/syberke" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="tel:+6289506147763">PHONE ↗</a></div></div><div className="contact-right" data-reveal><ContactForm /></div></div></div>
        </section>
      </main>
      <footer className="footer shell"><a className="footer-wordmark" href="#hero" aria-label="Back to top">BERKE<span>.</span>DEV</a><span>© {new Date().getFullYear()} BERKE JAISYURROHMAN</span><span>CRAFTED WITH CURIOSITY <b>✳</b></span><a href="#hero" className="back-to-top">BACK TO TOP ↑</a></footer>
    </>
  );
}