import { useEffect, useState } from "react";
import "./FloatingWidgets.css";

const QUICK_PROMPTS = [
  "Website Cost",
  "GST Software",
  "SEO & Growth",
  "Get Call Back",
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Hi! Welcome to AJ WebTech Services. How can we help with your website, software, or digital growth today?",
  },
];

function getBotReply(inputText) {
  const q = inputText.toLowerCase();
  if (q.includes("cost") || q.includes("price") || q.includes("plan")) {
    return "Our web designing plans start at ₹9,999 (Starter), ₹19,999 (Bronze), ₹34,999 (Gold), and ₹59,999 (Unlimited). Check the Price Quotation section for full details.";
  }
  if (q.includes("gst") || q.includes("erp") || q.includes("billing")) {
    return "We build custom GST Billing & ERP solutions with invoicing, stock tracking, and multi-branch reporting.";
  }
  if (q.includes("seo") || q.includes("marketing")) {
    return "Our SEO & Digital Marketing team handles technical audits, search rankings, and lead-focused campaigns.";
  }
  if (q.includes("call") || q.includes("quote") || q.includes("contact")) {
    return "You can fill out the Sales Call Back form at the top or message us directly on WhatsApp (+91 98765 43210).";
  }
  return "Thanks for your message! Our team will assist you shortly—or click WhatsApp on the bottom-left for instant chat.";
}

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToHome = () => {
    const topEl = document.getElementById("top");
    if (topEl) {
      topEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const sendMessageText = (text) => {
    const clean = text.trim();
    if (!clean) return;

    const userMsg = { id: Date.now(), sender: "user", text: clean };
    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotReply(clean),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessageText(draft);
    setDraft("");
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20WebTech%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.78 14.07c-.24.68-1.4 1.3-1.92 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.18-4.94-4.37-.15-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.01-2.42.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.77 1.27 1.65 2.05 1.13 1.01 2.09 1.32 2.38 1.47.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.71.81 2.01.95.29.15.49.22.56.34.07.12.07.7-.17 1.38z" />
        </svg>
      </a>

      {/* Chat Bot Popover Window */}
      {chatOpen && (
        <div
          className="chatbot-panel"
          role="dialog"
          aria-label="AJ WebTech Services Chat Assistant"
        >
          <div className="chatbot-head">
            <div>
              <div className="chatbot-title">AJ WebTech Assistant</div>
              <div className="chatbot-sub">Online • Ask about plans or services</div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              aria-label="Close chat"
              onClick={() => setChatOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-quick-chips">
            {QUICK_PROMPTS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="chat-chip-btn"
                onClick={() => sendMessageText(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendSubmit} className="chatbot-form">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your question..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn">
              Send
            </button>
          </form>
        </div>
      )}

      {/* Bottom-Right Chat Bot Button + Scroll-to-Top Arrow (Home) */}
      <div className="right-float-stack">
        <button
          type="button"
          className="chatbot-toggle-btn"
          aria-expanded={chatOpen}
          onClick={() => setChatOpen((prev) => !prev)}
        >
          <span className="chatbot-status-dot" aria-hidden="true" />
          <span className="chatbot-toggle-label">
            {chatOpen ? "Close Chat" : "Chat Bot"}
          </span>
        </button>

        <button
          type="button"
          className={`scroll-top-arrow-btn ${showScrollTop ? "is-visible" : ""}`}
          aria-label="Scroll to top Home"
          title="Back to Home"
          onClick={handleScrollToHome}
        >
          ↑
        </button>
      </div>
    </>
  );
}