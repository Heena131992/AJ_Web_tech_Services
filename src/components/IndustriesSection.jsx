import { useEffect, useRef } from "react";
import "./IndustriesSection.css";

const INDUSTRIES = [
  { name: "Interior Design", icon: "🛋️", tone: "ind-tone-orange" },
  { name: "Corporate & Enterprises", icon: "🏢", tone: "ind-tone-violet" },
  { name: "Startups & Small Businesses", icon: "🚀", tone: "ind-tone-pink" },
  { name: "Ecommerce & Retail", icon: "🛍️", tone: "ind-tone-emerald" },
  { name: "Healthcare & Medical", icon: "➕", tone: "ind-tone-amber" },
  { name: "Education & eLearning", icon: "🎓", tone: "ind-tone-purple" },
  { name: "Hospitality & Travel", icon: "🌐", tone: "ind-tone-gold" },
  { name: "Real Estate & Property", icon: "🏠", tone: "ind-tone-sky" },
  { name: "Finance & Investment", icon: "💵", tone: "ind-tone-rose" },
  { name: "Banking & Insurance", icon: "🏛️", tone: "ind-tone-teal" },
  { name: "Photography & Media", icon: "📷", tone: "ind-tone-indigo" },
  { name: "Law & Advisory", icon: "⚖️", tone: "ind-tone-blue" },
];

export default function IndustriesSection() {
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
    <section ref={secRef} id="industries" className="ind-sec">
      <div className="ind-inner">
        <div className="ind-head">
          <h2 className="ind-title scroll-rise">Industries We Serve</h2>
          <p className="ind-sub scroll-rise">
            Tailored web platforms, business workflows, and digital presence across
            diverse sectors.
          </p>
        </div>

        <div className="ind-grid">
          {INDUSTRIES.map((item) => (
            <div key={item.name} className="ind-card">
              <span className={`ind-icon ${item.tone}`} aria-hidden="true">
                {item.icon}
              </span>
              <span className="ind-label">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}