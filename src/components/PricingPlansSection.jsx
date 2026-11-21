import { useEffect, useRef } from "react";
import "./PricingPlansSection.css";

const PLANS = [
  {
    tier: "BEST FOR STARTUP",
    name: "STARTER",
    price: "₹9,999",
    featured: false,
    features: [
      "5 Pages Static Web Design",
      "Mobile Responsive UI",
      "2 Professional Business Emails",
      "Basic Contact Form Integration",
    ],
  },
  {
    tier: "BEST FOR CORPORATE",
    name: "BRONZE",
    price: "₹19,999",
    featured: false,
    features: [
      "7–10 Dynamic Pages",
      "5 Email Accounts Included",
      "High-Speed SSD Hosting (1 Year)",
      "Free SSL Certificate",
    ],
  },
  {
    tier: "BEST FOR BIG SITES",
    name: "GOLD",
    price: "₹34,999",
    featured: true,
    badge: "★ MOST POPULAR CHOICE",
    features: [
      "10GB Web Space & Unmetered Bandwidth",
      "Full E-Commerce / Product Showcase",
      "Unlimited Sub-Domains & FTP Access",
      "Priority 24/7 Tech Support",
    ],
  },
  {
    tier: "HIGH TRAFFIC PORTAL",
    name: "UNLIMITED",
    price: "₹59,999",
    featured: false,
    features: [
      "Unlimited Web Space & Emails",
      "Custom Portal Architecture",
      "Dedicated Server Setup",
      "Monthly Maintenance Included",
    ],
  },
];

export default function PricingPlansSection({ onSelectPlan }) {
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
    <section ref={secRef} id="price" className="plans-sec">
      <div className="plans-inner">
        <div className="plans-head">
          <div className="plans-eyebrow scroll-rise">TRANSPARENT INVESTMENT</div>
          <h2 className="plans-title scroll-rise">Select For Web Designing Plan</h2>
          <p className="plans-sub scroll-rise">
            Pick the perfect package tailored to your business scale and budget.
          </p>
        </div>

        <div className="plans-grid">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`plan-card ${plan.featured ? "is-featured" : ""}`}
            >
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}

              <div>
                <div className="plan-tier">{plan.tier}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">{plan.price}</div>

                <ul className="plan-features">
                  {plan.features.map((feat) => (
                    <li key={feat}>
                      <span className="plan-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#callback-form"
                className="plan-btn"
                onClick={() => onSelectPlan?.(`Website Design & Development (${plan.name})`)}
              >
                Order Now !
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}