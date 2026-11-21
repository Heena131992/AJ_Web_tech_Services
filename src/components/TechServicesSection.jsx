import { useEffect, useRef, useState } from "react";
import "./TechServicesSection.css";

const CATEGORIES = [
  "All Services",
  "Web Development",
  "SaaS & Software",
  "Mobile Apps",
  "SEO & Growth",
];

const TECH_ITEMS = [
  {
    category: "Web Development",
    dirClass: "from-left",
    badge: "</>",
    badgeClass: "badge-web",
    ctaClass: "cta-blue",
    title: "Custom Website Development",
    desc: "Fast, responsive websites built with clean React and CSS transitions that turn visitors into inquiries.",
    cta: "GET STARTED",
  },
  {
    category: "SaaS & Software",
    dirClass: "from-up",
    badge: "GST",
    badgeClass: "badge-erp",
    ctaClass: "cta-orange",
    title: "GST Billing & ERP Software",
    desc: "Inventory tracking, invoicing, multi-branch workflows, and clear business reports tailored for SMEs.",
    cta: "EXPLORE ERP",
  },
  {
    category: "Mobile Apps",
    dirClass: "from-right",
    badge: "APP",
    badgeClass: "badge-app",
    ctaClass: "cta-green",
    title: "Android & iOS App Development",
    desc: "Smooth mobile experiences with intuitive navigation, real-time updates, and dependable performance.",
    cta: "BUILD AN APP",
  },
  {
    category: "SEO & Growth",
    dirClass: "from-left",
    badge: "SEO",
    badgeClass: "badge-seo",
    ctaClass: "cta-pink",
    title: "SEO & Digital Growth Marketing",
    desc: "Search optimization, paid campaigns, and structured content workflows designed for measurable reach.",
    cta: "BOOST TRAFFIC",
  },
  {
    category: "Web Development",
    dirClass: "from-down",
    badge: "UI",
    badgeClass: "badge-ui",
    ctaClass: "cta-amber",
    title: "UI/UX & Creative Brand Design",
    desc: "Wireframes, layout systems, and clean visual components crafted for effortless user journeys.",
    cta: "VIEW DESIGNS",
  },
  {
    category: "SaaS & Software",
    dirClass: "from-right",
    badge: "CLD",
    badgeClass: "badge-cld",
    ctaClass: "cta-sky",
    title: "Automation & Cloud Maintenance",
    desc: "API integrations, dependable deployments, security hygiene, and ongoing technical support.",
    cta: "AUTOMATE NOW",
  },
];

export default function TechServicesSection() {
  const [activeCat, setActiveCat] = useState("All Services");
  const secRef = useRef(null);
  const gridRef = useRef(null);

  const visibleItems =
    activeCat === "All Services"
      ? TECH_ITEMS
      : TECH_ITEMS.filter((item) => item.category === activeCat);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const riseEls = sec.querySelectorAll(".scroll-rise");
    const riseObserver = new IntersectionObserver(
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
      riseObserver.observe(el);
    });

    return () => riseObserver.disconnect();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".tech-card"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.14 }
    );

    cards.forEach((card, idx) => {
      card.style.transitionDelay = `${idx * 60}ms`;
      card.classList.remove("in-view");
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeCat]);

  return (
    <section ref={secRef} id="tech-services" className="tech-sec">
      <div className="tech-inner">
        <div className="tech-header">
          <div className="tech-pill-tag scroll-rise">OUR DIGITAL SOLUTIONS</div>
          <h2 className="tech-title scroll-rise">Core Technology Services</h2>
          <p className="tech-sub scroll-rise">
            Customized software, responsive websites, and practical digital solutions
            crafted with clean engineering.
          </p>
        </div>

        <div className="filter-bar" role="tablist" aria-label="Service Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCat === cat}
              className={`filter-btn ${activeCat === cat ? "is-active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="tech-grid">
          {visibleItems.map((item) => (
            <article key={item.title} className={`tech-card ${item.dirClass}`}>
              <div>
                <div className={`tech-badge ${item.badgeClass}`}>{item.badge}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <a href="#callback-form" className={`tech-cta ${item.ctaClass}`}>
                <span>{item.cta}</span>
                <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}