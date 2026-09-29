import Header from "@/components/site/Header";
import ProjectExplorer from "@/components/site/ProjectExplorer";
import ContactForm from "@/components/site/ContactForm";
import { projects, skillGroups, services } from "./portfolio-data";

export default function Portfolio() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section
          className="hero shell"
          id="hero"
          aria-labelledby="hero-heading"
        >
          <div className="hero-meta">
            <span>Qiageng Berke Jaisyurrohman</span>
            <span>Bekasi, Indonesia</span>
          </div>
          <div className="hero-layout">
            <h1 id="hero-heading">
              Thoughtful code.
              <br />
              <span>Useful software.</span>
            </h1>
            <div className="hero-intro">
              <p className="role">
                Full-stack developer
                <br />& IT student.
              </p>
              <p>
                I build web systems and mobile applications, with an interest in
                how they work, how they connect, and how to keep them secure.
              </p>
              <a className="button button-primary" href="#projects">
                View my projects <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-foot">
            <p>Web development / Mobile / Cybersecurity</p>
            <a
              className="text-link"
              href="https://github.com/syberke"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </section>

        <section className="featured shell" aria-labelledby="featured-heading">
          <div className="featured-copy">
            <div className="section-kicker">
              <span>Featured project</span>
              <span>2024 / Web</span>
            </div>
            <h2 id="featured-heading">
              A clearer picture
              <br />
              of school life.
            </h2>
            <p>
              IQRA brings school monitoring and Qur’an memorization tracking
              into one system for teachers, students, and parents.
            </p>
            <a className="text-link" href="#project-iqra">
              Read the project brief <span aria-hidden="true">↗</span>
            </a>
            <div className="featured-stack">
              React <span>/</span> Laravel <span>/</span> MySQL
            </div>
          </div>
          <figure className="system-overview">
            <figcaption>
              <span>IQRA</span>
              <span>System overview</span>
            </figcaption>
            <div className="system-roles">
              <span>Teachers</span>
              <span>Students</span>
              <span>Parents</span>
            </div>
            <div className="system-connector" aria-hidden="true">
              <span>↓</span>
              <span>↓</span>
              <span>↓</span>
            </div>
            <div className="system-core">
              <span className="system-index">01 / APPLICATION</span>
              <strong>School monitoring</strong>
              <p>
                A shared system.
                <br />A view for every role.
              </p>
            </div>
            <div className="system-output">
              <span>Role-based dashboards</span>
              <span>Qur’an progress</span>
            </div>
            <p className="diagram-note">
              Project structure, not an application screenshot.
            </p>
          </figure>
        </section>

        <section
          className="section shell"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 / Selected work</p>
              <h2 id="projects-heading">
                Built to solve
                <br />
                something real.
              </h2>
            </div>
            <p>
              School systems, community tools, and experiments in security. A
              closer look at what I build.
            </p>
          </div>
          <ProjectExplorer projects={projects} />
        </section>

        <section
          className="expertise-band"
          id="skills-tech"
          aria-labelledby="skills-heading"
        >
          <div className="shell expertise-layout">
            <div className="expertise-intro">
              <p className="section-kicker">02 / Technical toolkit</p>
              <h2 id="skills-heading">
                Behind
                <br />
                the build.
              </h2>
              <p>
                From the interface to the database, these are the tools I work
                with and study.
              </p>
              <a
                className="text-link"
                href="https://github.com/syberke"
                target="_blank"
                rel="noopener noreferrer"
              >
                See my code on GitHub <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <details className="skill-group" key={group.name}>
                  <summary>
                    <span>
                      <span className="skill-label">{group.label}</span>
                      <strong>{group.name}</strong>
                      <span className="skill-tools">
                        {group.tools.join(" · ")}
                      </span>
                    </span>
                    <span className="expand-symbol" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{group.description}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section shell about-layout"
          id="about"
          aria-labelledby="about-heading"
        >
          <div>
            <p className="section-kicker">03 / The person behind the code</p>
            <h2 id="about-heading">
              Curious by nature.
              <br />
              Developer by practice.
            </h2>
            <div className="about-copy">
              <p>
                I’m Berke, an IT student from Bekasi. I started studying Network
                Information Systems & Applications at SMK TI Bazma in 2023.
              </p>
              <p>
                My projects grew out of the world around me: attendance in a
                dormitory, school monitoring, and social assistance. I’m
                interested in writing understandable code and making technology
                useful to a community.
              </p>
            </div>
            <dl className="profile-facts">
              <div>
                <dt>Based in</dt>
                <dd>Bekasi, Indonesia</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>SMK TI Bazma, Bogor</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>
                  Indonesian · English
                  <br />
                  <span>Basic German & Japanese</span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="journey">
            <h3>Learning through building.</h3>
            <ol>
              <li>
                <span className="journey-year">2025</span>
                <div>
                  <h4>KajianQu research</h4>
                  <p>
                    Exploring Qur’an learning tools, Arabic text recognition,
                    and mobile development through a personal project.
                  </p>
                </div>
              </li>
              <li>
                <span className="journey-year">2024</span>
                <div>
                  <h4>Projects at SMK TI Bazma</h4>
                  <p>
                    School monitoring, social assistance management, e-commerce,
                    and an encryption prototype.
                  </p>
                </div>
              </li>
              <li>
                <span className="journey-year">2023</span>
                <div>
                  <h4>Foundations in IT</h4>
                  <p>
                    Web development, databases, networking, and cybersecurity.
                    An attendance application became an early hands-on project.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="shell services-section"
          id="services"
          aria-labelledby="services-heading"
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">04 / Areas of work</p>
              <h2 id="services-heading">Where I can contribute.</h2>
            </div>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article key={service.name}>
                <span className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="shell contact-layout">
            <div>
              <p className="section-kicker">05 / Contact</p>
              <h2 id="contact-heading">
                Have a problem
                <br />
                worth solving?
              </h2>
              <p className="contact-intro">
                Tell me what you’re working on. I’m interested in development
                projects, learning opportunities, and collaborations.
              </p>
              <a
                className="contact-email"
                href="mailto:berkejaisyurrohman95@gmail.com"
              >
                berkejaisyurrohman95@gmail.com
              </a>
              <div className="contact-links">
                <a
                  href="https://github.com/syberke"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href="tel:+6289506147763">+62 895-0614-7763</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <a
          className="wordmark"
          href="#hero"
          aria-label="Berke.dev, back to top"
        >
          Berke<span>.dev</span>
        </a>
        <p>Berke Jaisyurrohman · Software & systems</p>
        <a className="text-link" href="#hero">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
