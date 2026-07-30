import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ContactCtaButton from "./ContactCtaButton";
import { CONTACT_SOURCES } from "../data/contactSources";
import { useAnchorNav } from "../hooks/useAnchorNav";
import logo from "../assets/logo-full.png";
import logoWebp from "../assets/logo-full.webp";

const navLinks = [
  { id: "solucoes", label: "Soluções" },
  { id: "metodo-faz", label: "Método FAZ" },
  { id: "sobre", label: "Sobre" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const goToAnchor = useAnchorNav();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/" className="brand" aria-label="FAZ Environmental & Emergency Consulting — página inicial">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img src={logo} alt="FAZ Environmental & Emergency Consulting" width={360} height={149} />
          </picture>
        </NavLink>

        <nav id="site-nav" className={`site-nav ${isMenuOpen ? "site-nav--open" : ""}`} aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(event) => {
                event.preventDefault();
                goToAnchor(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          <ContactCtaButton source={CONTACT_SOURCES.header} className="btn btn-dark site-nav-cta">
            Fale com um consultor
          </ContactCtaButton>
        </nav>

        <div className="header-actions">
          <ContactCtaButton source={CONTACT_SOURCES.header} className="btn btn-dark">
            Fale com um consultor
          </ContactCtaButton>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
      </div>
    </header>
  );
}
