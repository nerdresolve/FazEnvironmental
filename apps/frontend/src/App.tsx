import type { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import { ContactProvider } from "./components/ContactForm";
import Home from "./pages/Home";
import Solucoes from "./pages/Solucoes";
import MetodoFaz from "./pages/MetodoFaz";
import Sobre from "./pages/Sobre";
import Privacidade from "./pages/Privacidade";

export default function App({ router }: { router: (children: ReactNode) => ReactNode }) {
  return router(
    <ContactProvider>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <Header />
      <ScrollToTop />
      <main id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/metodo-faz" element={<MetodoFaz />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/politica-de-privacidade" element={<Privacidade />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </ContactProvider>
  );
}
