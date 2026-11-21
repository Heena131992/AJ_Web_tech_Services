import { useEffect, useRef } from "react";
import "./ProcessStepsSection.css";

const STEPS = [
  {
    num: "01",
    themeClass: "step-blue",
    label: "DESIGNING &\nDEVELOPMENT",
  },
  {
    num: "02",
    themeClass: "step-pink",
    label: "BUSINESS\nPROMOTION",
  },
  {
    num: "03",
    themeClass: "step-amber",
    label: "IMPLEMENTING\nSTRATEGIES",
  },
  {
    num: "04",
    themeClass: "step-purple",
    label: "GET RESULTS /\nLEADS",
  },
];

export default function ProcessStepsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
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
    <section ref={sectionRef} id="process" className="steps-sec">
      <div className="steps-inner">
        <div className="steps-head">
          <div className="steps-eyebrow scroll-rise">
            <span className="bolt-red" aria-hidden="true">⚡⚡</span>
            <span>HOW WE DO IT</span>
            <span className="bolt-red" aria-hidden="true">⚡⚡</span>
          </div>

          <h2 className="steps-title scroll-rise">
            Steps to Build a Successful
            <br />
            Digital Product
          </h2>

          <p className="steps-para scroll-rise">
            A clear four-stage workflow from initial design and build to growth and
            measurable business leads.
          </p>
        </div>

        <div className="steps-row">
          {STEPS.map((step, index) => (
            <div key={step.num} style={{ display: "contents" }}>
              <div className={`step-item ${step.themeClass}`}>
                <div className="step-stage">
                  <div className="step-orbit">
                    <span className="step-orbit-dot" />
                  </div>
                  <div className="step-blob">
                    <span className="step-num">{step.num}</span>
                  </div>
                </div>
                <div className="step-label">
                  {step.label.split("\n").map((line, i) => (
                    <span key={line} style={{ display: i > 0 ? "block" : "inline" }}>
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              {index < STEPS.length - 1 && (
                <div className={`step-arrow ${step.themeClass}`} aria-hidden="true">
                  ›
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}