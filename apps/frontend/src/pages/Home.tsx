import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ContactCtaButton from "../components/ContactCtaButton";
import HeroVideo from "../components/HeroVideo";
import Reveal from "../components/Reveal";
import ServicesSection from "../components/ServicesSection";
import MetodoFazSection from "../components/MetodoFazSection";
import SobreSection from "../components/SobreSection";
import CtaBanner from "../components/CtaBanner";
import NextStepCta from "../components/NextStepCta";
import { CONTACT_SOURCES } from "../data/contactSources";
import { organizationJsonLd } from "../data/organizationJsonLd";

const heroStats = [
  { value: "+15", label: "anos de experiência em emergência" },
  { value: "NI 360°", label: "visão e atuação 360° na operação" },
];

export default function Home() {
  return (
    <>
      <Seo
        title="FAZ Environmental & Emergency Consulting"
        description="Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem improvisar diante de uma emergência."
        path="/"
        jsonLd={organizationJsonLd}
      />
      <section className="hero hero--video">
        <HeroVideo />
        <div className="container">
          <div className="hero-copy hero-copy--full">
            <span className="eyebrow eyebrow--light hero-enter hero-enter-1">Environmental · Emergency · Offshore</span>
            <h1 className="hero-enter hero-enter-2">
              Antecipamos riscos. Preparamos pessoas. <span className="accent">Protegemos operações.</span>
            </h1>
            <p className="hero-enter hero-enter-3">
              Consultoria ambiental, capacitação técnica e prontidão operacional para organizações que não podem
              improvisar diante de uma emergência.
            </p>
            <div className="hero-actions hero-enter hero-enter-4">
              <ContactCtaButton source={CONTACT_SOURCES.hero} className="btn btn-primary">
                Solicitar uma proposta
              </ContactCtaButton>
              <Link className="btn btn-secondary" to="/#solucoes">
                Explorar soluções
              </Link>
            </div>
            <ul className="hero-stats hero-enter hero-enter-5">
              {heroStats.map((stat) => (
                <li className="hero-stat" key={stat.label}>
                  <div className="value">{stat.value}</div>
                  <div className="label">{stat.label}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-strip">
            <span>Resposta ambiental começa antes do incidente</span>
            <ContactCtaButton source={CONTACT_SOURCES.heroStrip} className="btn-reset link-cta">
              Avalie a prontidão da sua operação →
            </ContactCtaButton>
          </div>
        </div>
      </section>

      <section className="section section-light" id="solucoes" aria-labelledby="solucoes-heading">
        <Reveal>
          <ServicesSection headingId="solucoes-heading" />
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <CtaBanner />
          </Reveal>
        </div>
      </section>

      <section className="section method-section" id="metodo-faz" aria-labelledby="metodo-faz-heading">
        <Reveal>
          <MetodoFazSection headingId="metodo-faz-heading" />
        </Reveal>
      </section>

      <section className="section" id="sobre" aria-labelledby="sobre-heading">
        <Reveal>
          <SobreSection headingId="sobre-heading" />
        </Reveal>
      </section>

      <Reveal>
        <NextStepCta />
      </Reveal>
    </>
  );
}
