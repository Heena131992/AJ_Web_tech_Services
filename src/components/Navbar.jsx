import "./Navbar.css";

export default function Navbar({ onOpenSearch, onOpenQuote }) {
  return (
    <div className="nav-outer">
      <header className="pill-header">
        <a href="#top" className="brand-mark">
          <span className="brand-badge">AJ</span>
          <span>WebTech Services</span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav-menu">
            <li><a href="#top">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#price">Price Quatation</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button type="button" className="btn-quote" onClick={onOpenQuote}>
            Get A Quote
          </button>

          <button
            type="button"
            className="btn-search-circle"
            aria-label="Search AJ WebTech Services"
            onClick={onOpenSearch}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}