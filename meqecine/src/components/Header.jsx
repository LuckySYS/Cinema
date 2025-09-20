export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="brand">
          <div className="brand-texts">
            <div className="brand-title">CINEMA+</div>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#">Destaques</a>
          <a href="#">Comidas</a>
          <a href="#">Contato</a>
          <a href="#">Localização</a>
        </nav>

        <div className="header-actions">

          <button className="user-btn" aria-label="Entrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

