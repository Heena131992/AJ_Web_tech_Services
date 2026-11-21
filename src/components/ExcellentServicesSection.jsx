import { useEffect, useRef } from "react";
import "./ExcellentServicesSection.css";

const EXCELLENT_SERVICES = [
  {
    motionClass: "slide-left",
    iconText: "</>",
    iconClass: "exc-icon-amber",
    title: "Customized Website Solutions",
    desc: "Intuitive front-end engineering with rapid response speed, tailored UI components, and SEO readiness.",
    href: "#callback-form",
  },
  {
    motionClass: "slide-center",
    iconText: "APP",
    iconClass: "exc-icon-blue",
    title: "Responsive Software & Apps",
    desc: "Native and cross-platform mobile apps for Android and iOS with fluid touch interactions and API sync.",
    href: "#callback-form",
  },
  {
    motionClass: "slide-right",
    iconText: "SEO",
    iconClass: "exc-icon-purple",
    title: "SEO & Digital Marketing",
    desc: "Data-backed search optimization, targeted keyword architecture, and organic lead engine growth.",
    href: "#callback-form",
  },
];

export default function ExcellentServicesSection() {
  const secRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const riseEls = sec.querySelectorAll(".scroll-rise");
    const cardEls = sec.querySelectorAll(".exc-card");

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

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-arrived");
          } else {
            entry.target.classList.remove("is-arrived");
          }
        });
      },
      { threshold: 0.14 }
    );

    riseEls.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 90}ms`;
      riseObserver.observe(el);
    });

    cardEls.forEach((card, idx) => {
      card.style.transitionDelay = `${idx * 100}ms`;
      cardObserver.observe(card);
    });

    return () => {
      riseObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section ref={secRef} id="excellent-services" className="exc-sec">
      <div className="exc-inner">
        <div className="exc-top">
          <div>
            <div className="exc-kicker scroll-rise">HIGH IMPACT CAPABILITIES</div>
            <h2 className="exc-title scroll-rise">Our Excellent Services</h2>
            <p className="exc-note scroll-rise">
            Hover over cards to see the smooth orange state fill and color
            inversion transition.
          </p>
          </div>

          
        </div>

        <div className="exc-grid">
          {EXCELLENT_SERVICES.map((item) => (
            <article key={item.title} className={`exc-card ${item.motionClass}`}>
              <div>
                <div className={`exc-icon ${item.iconClass}`}>{item.iconText}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <a href={item.href} className="exc-more">
                <span>Read More</span>
                <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}