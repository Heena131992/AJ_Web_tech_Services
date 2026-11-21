import { useEffect, useRef } from "react";
import "./ProjectsSection.css";

const PROJECTS = [
  {
    tag: "WEB & ADMIN",
    title: "Multi-Store Commerce & Admin Suite",
    desc: "Responsive storefront with dynamic cart state, role-based admin controls, and fast API workflows.",
    stack: ["React", "CSS", "REST API"],
  },
  {
    tag: "BILLING & ERP",
    title: "GST Billing & Inventory Portal",
    desc: "Structured invoicing, stock ledger tracking, and export-ready reports for growing retail teams.",
    stack: ["JavaScript", "SQL", "Cloud"],
  },
  {
    tag: "SEO & LANDING",
    title: "High-Conversion Agency & Service Sites",
    desc: "Clean modular layouts, structured headings, and fast page transitions built for lead generation.",
    stack: ["HTML5", "CSS3", "React"],
  },
];

export default function ProjectsSection() {
  const secRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const riseEls = sec.querySelectorAll(".scroll-rise");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-shown");
          } else {
            entry.target.classList.remove("is-shown");
          }
        });
      },
      { threshold: 0.15 }
    );

    riseEls.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 90}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={secRef} id="projects" className="proj-sec">
      <div className="proj-inner">
        <div className="proj-head">
          <div className="proj-kicker scroll-rise">FEATURED WORK</div>
          <h2 className="proj-title scroll-rise">Recent Projects</h2>
          <p className="proj-sub scroll-rise">
            Practical web applications, billing systems, and responsive business
            platforms built for reliability.
          </p>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((proj) => (
            <article key={proj.title} className="proj-card">
              <div>
                <span className="proj-tag">{proj.tag}</span>
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
              </div>

              <div className="proj-stack">
                {proj.stack.map((tech) => (
                  <span key={tech} className="proj-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}