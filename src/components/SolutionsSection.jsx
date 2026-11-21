import { useEffect, useRef } from "react";
import "./SolutionsSection.css";

const SOLUTIONS = [
  {
    code: "</>",
    tone: "sol-icon-blue",
    title: "Website Development",
    desc: "We build modern, responsive websites engineered to rank, convert, and grow with clean architecture from the ground up.",
    href: "#tech-services",
  },
  {
    code: "UI",
    tone: "sol-icon-purple",
    title: "Graphic Design",
    desc: "Your brand visual identity crafted with clarity—from logos and brand kits to sharp digital collateral.",
    href: "#tech-services",
  },
  {
    code: "SEO",
    tone: "sol-icon-teal",
    title: "SEO Services",
    desc: "Structured technical audits, on-page clarity, and search visibility strategies focused on sustainable growth.",
    href: "#tech-services",
  },
  {
    code: "SM",
    tone: "sol-icon-indigo",
    title: "Social Media Marketing",
    desc: "Consistent, campaign-driven presence across Instagram, LinkedIn, and Facebook aligned with business goals.",
    href: "#contact",
  },
];

export default function SolutionsSection() {
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
    <section ref={secRef} id="services" className="solutions-sec">
      <div className="solutions-inner">
        <div className="solutions-head">
          <div className="solutions-kicker scroll-rise">STRENGTH</div>
          <h2 className="solutions-title scroll-rise">Our Core Digital Solutions</h2>
          <p className="solutions-para scroll-rise">
            Practical web engineering, brand visuals, and search-focused growth
            tailored for modern businesses.
          </p>
        </div>

        <div className="solutions-grid">
          {SOLUTIONS.map((item) => (
            <article key={item.title} className="sol-card">
              <div>
                <div className={`sol-icon-box ${item.tone}`}>{item.code}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <a href={item.href} className="sol-link">
                <span>Learn More</span>
                <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}