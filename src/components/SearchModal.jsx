import { useEffect, useMemo, useRef, useState } from "react";
import "./SearchModal.css";

const SEARCH_ITEMS = [
  {
    label: "Website Design & Development",
    category: "Web & UI",
    targetId: "tech-services",
    serviceOption: "Website Design & Development",
    keywords: ["website", "web", "design", "frontend", "react", "ui"],
  },
  {
    label: "GST Billing & ERP Software",
    category: "Software",
    targetId: "tech-services",
    serviceOption: "GST Billing Software",
    keywords: ["gst", "billing", "erp", "invoice", "software", "accounting"],
  },
  {
    label: "Custom Software & Work Process",
    category: "Workflow",
    targetId: "work-process",
    serviceOption: "Custom Software & ERP",
    keywords: ["workflow", "process", "steps", "goal", "research", "launch", "support"],
  },
  {
    label: "SEO & Digital Marketing",
    category: "Growth",
    targetId: "services",
    serviceOption: "SEO & Digital Marketing",
    keywords: ["seo", "marketing", "social media", "leads", "ranking"],
  },
  {
    label: "Web Designing Pricing Plans",
    category: "Pricing",
    targetId: "price",
    serviceOption: "Website Design & Development",
    keywords: ["price", "pricing", "quotation", "starter", "bronze", "gold", "plan"],
  },
  {
    label: "Recent Projects & Case Studies",
    category: "Portfolio",
    targetId: "projects",
    serviceOption: "Website Design & Development",
    keywords: ["projects", "work", "portfolio", "commerce", "portal"],
  },
  {
    label: "Technologies & Platforms",
    category: "Tech Stack",
    targetId: "technologies",
    serviceOption: "Custom Software & ERP",
    keywords: ["express", "firebase", "cloudflare", "java", "php", "vercel", "render", "node"],
  },
];

const QUICK_LINKS = [
  { label: "Website Design", queryText: "Website" },
  { label: "GST Software", queryText: "GST" },
  { label: "Workflow", queryText: "Workflow" },
];

export default function SearchModal({ isOpen, onClose, onSelectTopic }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS.slice(0, 4);

    return SEARCH_ITEMS.filter((item) => {
      const hay = `${item.label} ${item.category} ${item.keywords.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  if (!isOpen) return null;

  const handleChooseItem = (item) => {
    if (item.serviceOption) {
      onSelectTopic?.(item.serviceOption);
    }
    onClose?.();
    if (item.targetId) {
      setTimeout(() => {
        document.getElementById(item.targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (filteredItems.length > 0) {
      handleChooseItem(filteredItems[0]);
    }
  };

  return (
    <div
      className="search-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="search-modal">
        <div className="search-modal-top">
          <h2 id="search-modal-heading" className="search-modal-title">
            Search AJ WebTech Services
          </h2>
          <button
            type="button"
            className="search-close-btn"
            aria-label="Close search"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="search-input-wrap">
            <span className="search-input-icon" aria-hidden="true">🔍</span>
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search services, workflow, pricing, or tech..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery("")}
              >
                Clear
              </button>
            )}
          </div>
        </form>

        <div className="quick-links-row">
          <span className="quick-links-label">Quick links:</span>
          {QUICK_LINKS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              className="quick-chip"
              onClick={() => setQuery(chip.queryText)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="search-results-box">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="search-result-item"
                onClick={() => handleChooseItem(item)}
              >
                <div>
                  <div className="search-res-title">{item.label}</div>
                  <div className="search-res-meta">{item.category}</div>
                </div>
                <span className="search-res-go">Go →</span>
              </button>
            ))
          ) : (
            <div className="search-empty">
              No matching service found for &ldquo;{query}&rdquo;. Try searching
              &ldquo;Website&rdquo;, &ldquo;GST&rdquo;, &ldquo;Workflow&rdquo;, or
              &ldquo;Pricing&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}