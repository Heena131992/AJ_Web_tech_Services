import { useEffect, useRef } from "react";
import "./WorkProcessSection.css";

const WORK_STEPS = [
  {
    code: "GOAL",
    tone: "tone-amber",
    title: "Get Client's Goal",
    stepText: "Step 01",
  },
  {
    code: "R&D",
    tone: "tone-coral",
    title: "Research",
    stepText: "Step 02",
  },
  {
    code: "UI/UX",
    tone: "tone-ochre",
    title: "Design",
    stepText: "Step 03",
  },
  {
    code: "</>",
    tone: "tone-red",
    title: "Build",
    stepText: "Step 04",
  },
  {
    code: "LIVE",
    tone: "tone-sky",
    title: "Launch",
    stepText: "Step 05",
  },
  {
    code: "24/7",
    tone: "tone-slate",
    title: "Support",
    stepText: "Step 06",
  },
];

export default function WorkProcessSection() {
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
    <section ref={secRef} id="work-process" className="wp-sec">
      <div className="wp-inner">
        <div className="wp-head">
          <h2 className="wp-title scroll-rise">Our Work Process</h2>
        </div>

        <div className="wp-grid">
          {WORK_STEPS.map((item) => (
            <div key={item.title} className="wp-step">
              <div className={`wp-circle ${item.tone}`}>
                <span className="wp-circle-code">{item.code}</span>
              </div>
              <div className="wp-step-title">{item.title}</div>
              <div className="wp-step-sub">{item.stepText}</div>
            </div>
          ))}
        </div>

        <div className="wp-statement-box">
          <h3 className="wp-statement-heading scroll-rise">
            WE&apos;LL MAKE WEBSITE DEVELOPMENT! MORE EFFICIENT FOR YOU!
          </h3>
          <p className="wp-statement-para scroll-rise">
            As a software development company our experience says developing quality
            software with latest and innovative technology that reflects business style
            is the primary goal of every business, that&apos;s why our strong plans
            take your business to the next level and ensure that every feature connects
            with your users in a meaningful way. We focus on high-end designs and
            latest technologies, so that your ideas can be turned into advanced
            software solutions.
          </p>
        </div>
      </div>
    </section>
  );
}