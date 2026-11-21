import { useEffect, useRef, useState } from "react";
import "./FaqSection.css";

const FAQ_ITEMS = [
  {
    q: "Which is the best website development company in Delhi for custom business websites?",
    a: "AJ WebTech Services builds custom, responsive business websites and web applications in Delhi NCR with clean React architecture, fast load performance, SEO readiness, and transparent project milestones.",
  },
  {
    q: "Where are AJ WebTech Services branches located, and can I schedule an in-person meeting?",
    a: "We operate across Delhi NCR with convenient online discovery calls and scheduled in-person consultations. You can request a call back through our proposal form or reach out directly to book a slot.",
  },
  {
    q: "How much time does AJ WebTech Services take to deliver a fully functional website?",
    a: "Standard business websites typically take 1 to 2 weeks depending on page count and content readiness, while custom web portals, ERP modules, and e-commerce builds generally take 3 to 6 weeks.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
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

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section ref={secRef} id="faq" className="faq-sec">
      <div className="faq-inner">
        <div className="faq-head">
          <div className="faq-pill scroll-rise">FAQ</div>
          <h2 className="faq-title scroll-rise">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`faq-item ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => handleToggle(idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>

                <div className="faq-panel">
                  <div className="faq-panel-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}