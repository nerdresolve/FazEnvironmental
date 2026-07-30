import type { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";
import { ContactProvider } from "./components/ContactForm";
import Home from "./pages/Home";
import ServicoDetalhe from "./pages/ServicoDetalhe";
import Privacidade from "./pages/Privacidade";

export default function App({ router }: { router: (children: ReactNode) => ReactNode }) {
  return router(
    <ContactProvider>
      <SplashScreen />
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <Header />
      <ScrollToTop />
      <main id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solucoes" element={<Navigate to="/#solucoes" replace />} />
          <Route path="/metodo-faz" element={<Navigate to="/#metodo-faz" replace />} />
          <Route path="/sobre" element={<Navigate to="/#sobre" replace />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          <Route path="/politica-de-privacidade" element={<Privacidade />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </ContactProvider>
  );
}
