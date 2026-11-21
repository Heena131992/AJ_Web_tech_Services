import { useEffect, useRef } from "react";
import "./TechnologiesSection.css";

const PLATFORM_GROUPS = [
  {
    heading: "Web Back End",
    items: [
      { mark: "EX", name: "Express.js", tone: "mark-express" },
      { mark: "JAVA", name: "Java", tone: "mark-java" },
      { mark: "php", name: "PHP", tone: "mark-php" },
      { mark: "NODE", name: "Node.js", tone: "mark-node" },
    ],
  },
  {
    heading: "Web Front End",
    items: [
      { mark: "⚛", name: "React", tone: "mark-react" },
      { mark: "5", name: "HTML5", tone: "mark-html" },
      { mark: "3", name: "CSS3", tone: "mark-css" },
      { mark: "JS", name: "JavaScript", tone: "mark-js" },
    ],
  },
  {
    heading: "Cloud, Hosting & Data",
    items: [
      { mark: "🔥", name: "Firebase", tone: "mark-firebase" },
      { mark: "CF", name: "Cloudflare", tone: "mark-cloudflare" },
      { mark: "▲", name: "Vercel", tone: "mark-vercel" },
      { mark: "RN", name: "Render", tone: "mark-render" },
      { mark: "MDB", name: "MongoDB", tone: "mark-mongo" },
      { mark: "SQL", name: "SQL", tone: "mark-sql" },
    ],
  },
];

export default function TechnologiesSection() {
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
    <section ref={secRef} id="technologies" className="tech-plat-sec">
      <div className="tech-plat-inner">
        <div className="tech-plat-head">
          <h2 className="tech-plat-title scroll-rise">
            Technologies and Platforms We Work With
          </h2>
          <p className="tech-plat-sub scroll-rise">
            Modern backend frameworks, frontend libraries, cloud edge networks,
            databases, and deployment platforms for dependable software.
          </p>
        </div>

        <div className="plat-columns">
          {PLATFORM_GROUPS.map((group) => (
            <div key={group.heading} className="plat-group">
              <h3 className="plat-group-title">{group.heading}</h3>
              <div className="plat-tiles">
                {group.items.map((item) => (
                  <div key={item.name} className="plat-tile">
                    <span className={`plat-mark ${item.tone}`}>{item.mark}</span>
                    <span className="plat-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}