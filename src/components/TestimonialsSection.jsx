import { useEffect, useRef } from "react";
import "./TestimonialsSection.css";

const TESTIMONIALS = [
  {
    initials: "RM",
    avatarTone: "avatar-blue",
    rating: 5,
    quote:
      "“Being a small business we were not sure that we could afford AJ WebTech Services. But after talking to them we realised how fair their pricing is and how high their quality of work is. We are nothing but satisfied with the team.”",
    author: "Raghav Mishra",
  },
  {
    initials: "MS",
    avatarTone: "avatar-indigo",
    rating: 4,
    quote:
      "“AJ WebTech Services seemed professional to me since the beginning. Our organization was extremely happy with the way they treated us. Their customer care is responsive and their engineering work is even better.”",
    author: "Mudit Shokeen",
  },
];

export default function TestimonialsSection() {
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
    <section ref={secRef} id="testimonials" className="testi-sec">
      <div className="testi-accent-left" aria-hidden="true" />
      <div className="testi-accent-right" aria-hidden="true">☆</div>
      <div className="testi-accent-ring" aria-hidden="true" />

      <div className="testi-inner">
        <div className="testi-head">
          <div className="testi-eyebrow scroll-rise">
            <span className="testi-bolt" aria-hidden="true">⚡⚡</span>
            <span>TESTIMONIALS</span>
            <span className="testi-bolt" aria-hidden="true">⚡⚡</span>
          </div>

          <h2 className="testi-title scroll-rise">
            What They Say About Our
            <br />
            Company?
          </h2>

          <p className="testi-sub scroll-rise">
            Teams that partner with us share how clean engineering and practical
            delivery support their growth.
          </p>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((item) => (
            <div key={item.author} className="testi-card-wrap">
              <div className="testi-dots" aria-hidden="true" />
              <div className={`testi-avatar ${item.avatarTone}`} aria-hidden="true">
                {item.initials}
              </div>

              <article className="testi-card">
                <div>
                  <div className="testi-stars" aria-label={`${item.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={n <= item.rating ? "star-on" : "star-off"}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="testi-quote">{item.quote}</p>
                </div>

                <div className="testi-footer-bar">
                  <span className="testi-quote-mark" aria-hidden="true">“</span>
                  <div className="testi-author">{item.author}</div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}