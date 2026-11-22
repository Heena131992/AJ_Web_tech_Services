import { useEffect, useRef } from "react";
import "./FooterSection.css";

const SERVICE_LINKS = [
  { label: "Custom Web Development", href: "#tech-services" },
  { label: "Mobile App Development", href: "#tech-services" },
  { label: "GST & Retail Billing Software", href: "#tech-services" },
  { label: "Search Engine Optimization", href: "#services" },
  { label: "UI/UX & Graphic Design", href: "#services" },
];

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Development Process", href: "#work-process" },
  { label: "Technologies", href: "#technologies" },
  { label: "Web Pricing Plans", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function FooterSection() {
  const footRef = useRef(null);

  useEffect(() => {
    const foot = footRef.current;
    if (!foot) return;

    const riseEls = foot.querySelectorAll(".scroll-rise");
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
      { threshold: 0.12 }
    );

    riseEls.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 80}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footRef} id="contact" className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <a href="#top" className="footer-brand-row">
              <span className="footer-logo-mark" aria-hidden="true">AJ</span>
              <span className="footer-brand-name">
                WebTech Services<span className="footer-brand-dot">.</span>
              </span>
            </a>

            <p className="footer-about scroll-rise">
              Looking for a professional website designing and software development
              company in Delhi NCR? We build responsive websites, scalable apps,
              and growth-focused digital solutions.
            </p>

            <div className="footer-branch scroll-rise">
              <span className="footer-branch-pin" aria-hidden="true">📍</span>
              <span>Branch 1: NSP Towers, Pitampura, Delhi</span>
            </div>
          </div>

          <div>
            <h3 className="footer-col-title col-services scroll-rise">SERVICES</h3>
            <ul className="footer-links">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title col-links scroll-rise">QUICK LINKS</h3>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title col-contact scroll-rise">CONTACT US</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-c-icon icon-phone" aria-hidden="true">📞</span>
                <a href="tel:+919876543210">+91 87001 23076</a>
              </li>
              <li className="footer-contact-item">
                <span className="footer-c-icon icon-mail" aria-hidden="true">✉️</span>
                <a href="mailto:info@webtechservices.in">
                  ajinfo@webtechservices.in
                </a>
              </li>
              <li className="footer-contact-item">
                <span className="footer-c-icon icon-clock" aria-hidden="true">🕒</span>
                <span>Mon - Sat: 9:30 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            Copyright © 2026 AJ WebTech Services. All Rights Reserved.
          </div>

          <div className="footer-bottom-links">
            <a href="#callback-form">Cookie Settings</a>
            <span>|</span>
            <a href="#faq">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}