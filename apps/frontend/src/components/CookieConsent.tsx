import { useEffect, useState } from "react";

const STORAGE_KEY = "faz-cookie-consent";

type Choice = "accepted" | "declined";

function getCampaignParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    gclid: params.get("gclid") ?? undefined,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function registerChoice(choice: Choice) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);

    const payload =
      choice === "accepted"
        ? { choice, path: window.location.pathname, ...getCampaignParams() }
        : { choice, path: window.location.pathname };

    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  return (
    <div
      className={`cookie-consent ${visible ? "cookie-consent--visible" : ""}`}
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
    >
      <p>
        Usamos cookies para melhorar a sua experiência de navegação. Ao continuar, você concorda com o uso de
        cookies conforme nossa{" "}
        <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
          Política de Privacidade
        </a>
        .
      </p>
      <div className="cookie-consent-actions">
        <button type="button" className="btn btn-outline-dark" onClick={() => registerChoice("declined")}>
          Recusar
        </button>
        <button type="button" className="btn btn-primary" onClick={() => registerChoice("accepted")}>
          Aceitar
        </button>
      </div>
    </div>
  );
}
