import { useEffect, useState } from "react";
import "./HeroSection.css";

const SERVICE_OPTIONS = [
  "Website Design & Development",
  "Custom Software & ERP",
  "GST Billing Software",
  "SEO & Digital Marketing",
];

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api-backend.infoheena13.workers.dev";

export default function HeroSection({ selectedService }) {
  const [formData, setFormData] = useState({
    company: "",
    phone: "",
    email: "",
    service: selectedService || SERVICE_OPTIONS[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatusMsg("");
    setIsError(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE}/api/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Request submit nahi ho payi.");
      }

      setIsError(false);
      setStatusMsg(
        result.message || "Request received. Our team will reach out shortly."
      );
      setFormData((prev) => ({
        ...prev,
        company: "",
        phone: "",
        email: "",
      }));
    } catch (err) {
      setIsError(true);
      setStatusMsg(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="top" className="hero-wrap">
      <div className="hero-inner">
        <div>
          <div className="hero-kicker">
            <span className="hero-dot" />
            <span>Best Software &amp; Digital Marketing Company in Delhi NCR</span>
          </div>

          <h1 className="hero-title">
            Customized Software{" "}
            <span className="hero-title-accent">Developed for Business</span>
          </h1>

          <p className="hero-desc">
            Empowering modern enterprises with responsive web apps, custom GST billing
            software, high-converting SEO strategies, and interactive digital product
            engineering.
          </p>

          <div className="hero-btns">
            <a href="#services" className="btn-lets-start">
              <span>Lets Start</span>
              <span>→</span>
            </a>
            <a href="#callback-form" className="btn-contact-outline">
              Contact Now
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-value">12+</div>
              <div className="stat-caption">Years Industry Exp.</div>
            </div>
            <div>
              <div className="stat-value">750+</div>
              <div className="stat-caption">Happy Clients</div>
            </div>
            <div>
              <div className="stat-value">99.4%</div>
              <div className="stat-caption">On-Time Delivery</div>
            </div>
          </div>
        </div>

        <aside id="callback-form" className="callback-shell" aria-label="Sales Call Back Form">
          <div className="callback-top-bar" />

          <div className="callback-header">
            <div>
              <div className="callback-tag">Enquiry Call</div>
              <h2 className="callback-title">Leave Your Message</h2>
            </div>
            <div className="callback-phone-box" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="company" className="field-label">Name / Company Name *</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                className="field-control"
                placeholder="e.g., WebTech Global Solutions"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone" className="field-label">Contact Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="field-control"
                placeholder="+91 87001 23076"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="email" className="field-label">Business Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="field-control"
                placeholder="contact@webtechservices.in"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="service" className="field-label">Select Service Needed</label>
              <select
                id="service"
                name="service"
                className="field-control"
                value={formData.service}
                onChange={handleChange}
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-submit-req" disabled={submitting}>
              <span>{submitting ? "SENDING..." : "SUBMIT REQUEST"}</span>
              <span>➤</span>
            </button>

            {statusMsg && (
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "0.84rem",
                  color: isError ? "#dc2626" : "#15803d",
                  fontWeight: 600,
                }}
              >
                {statusMsg}
              </p>
            )}
          </form>
        </aside>
      </div>
    </section>
  );
}