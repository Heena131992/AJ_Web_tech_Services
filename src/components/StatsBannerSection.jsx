import { useEffect, useRef, useState } from "react";
import "./StatsBannerSection.css";

const STATS_CONFIG = [
  { target: 25, suffix: "+", label: "YEARS IN THE INDUSTRY" },
  { target: 1000, suffix: "+", label: "CLIENTS SUCCESSFULLY SERVED" },
  { target: 750, suffix: "+", label: "HAPPY CLIENTS" },
  { target: 700, suffix: "+", label: "PROJECTS DELIVERED" },
];

export default function StatsBannerSection() {
  const secRef = useRef(null);
  const [counts, setCounts] = useState(STATS_CONFIG.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;

    const runCountUp = () => {
      const duration = 1200;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCounts(
          STATS_CONFIG.map((item) => Math.round(eased * item.target))
        );

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            runCountUp();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={secRef}
      id="stats"
      className="stats-banner-sec"
      aria-label="Company Milestones"
    >
      <div className="stats-banner-inner">
        {STATS_CONFIG.map((item, index) => (
          <div key={item.label} className="stats-banner-item">
            <div className="stats-banner-num">
              {counts[index]}
              {item.suffix}
            </div>
            <div className="stats-banner-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}