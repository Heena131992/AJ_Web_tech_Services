import { useEffect, useRef } from "react";
import "./WhoWeAreSection.css";

const PILLARS = [
  {
    code: "01",
    waveClass: "wave-violet",
    title: "Designing",
    desc: "We Design a Structure in a User-Friendly way to satisfy clients.",
  },
  {
    code: "02",
    waveClass: "wave-sky",
    title: "Development",
    desc: "Our development team delivers you Quality Work on time.",
  },
  {
    code: "03",
    waveClass: "wave-blue",
    title: "Implementation",
    desc: "Our Successful Implementing Strategies are structured for clarity.",
  },
  {
    code: "04",
    waveClass: "wave-orchid",
    title: "Result",
    desc: "We make sure you deliver the project that meets your Business Goal.",
  },
];

export default function WhoWeAreSection() {
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
    <section ref={secRef} id="about" className="who-sec">
      <div className="who-inner">
        <div className="who-head">
          <div className="who-eyebrow scroll-rise">⚡ WHO WE ARE ⚡</div>
          <h2 className="who-title scroll-rise">
            Best IT Solution and Services Company for Growing Teams
          </h2>
          <p className="who-sub scroll-rise">
            Structured modular engineering designed for client satisfaction and tangible results.
          </p>
        </div>

        <div className="who-grid">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="who-card">
              <div className={`who-wave ${pillar.waveClass}`} />
              <div className="who-icon-ring">{pillar.code}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}