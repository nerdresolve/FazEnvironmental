import ContactCtaButton from "./ContactCtaButton";
import { CONTACT_SOURCES } from "../data/contactSources";
import { useAnchorNav } from "../hooks/useAnchorNav";
import logo from "../assets/logo-white-full.png";
import logoWebp from "../assets/logo-white-full.webp";

import NerdResolveBadge from './NerdResolveBadge';
const navLinks = [
  { id: "solucoes", label: "Soluções" },
  { id: "metodo-faz", label: "Método FAZ" },
  { id: "sobre", label: "Sobre" },
];

export default function Footer() {
  const goToAnchor = useAnchorNav();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <picture>
              <source srcSet={logoWebp} type="image/webp" />
              <img src={logo} alt="FAZ Environmental & Emergency Consulting" width={360} height={149} loading="lazy" />
            </picture>
            <p>Prevenção, prontidão e resposta para proteger operações e ecossistemas.</p>
          </div>
          <nav className="footer-col" aria-label="Navegação">
            <h2>Navegação</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goToAnchor(link.id);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-col">
            <h2>Contato</h2>
            <address>
              <ul>
                <li>
                  <a href="tel:+5521972228908">+55 21 97222-8908</a>
                </li>
                <li>Rio de Janeiro, RJ</li>
                <li>
                  <ContactCtaButton source={CONTACT_SOURCES.footer} className="btn-reset link-cta link-cta--accent">
                    Solicitar proposta
                  </ContactCtaButton>
                </li>
              </ul>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FAZ Environmental & Emergency Consultoria.</span>
          <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
            Privacidade · Termos
          </a>
        </div>
      </div>
      <NerdResolveBadge />
    </footer>
  );
}
