import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  FormEvent,
  ReactNode,
} from "react";

interface ContactContextValue {
  openContactForm: (source: string) => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContactForm(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within ContactProvider");
  }
  return ctx;
}

type Status = "idle" | "submitting" | "success" | "error";

const WHATSAPP_NUMBER = "5521972228908";

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("site");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const openContactForm = useCallback((nextSource: string) => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    setSource(nextSource);
    setStatus("idle");
    setErrorMessage("");
    setIsOpen(true);
  }, []);

  const contextValue = useMemo(() => ({ openContactForm }), [openContactForm]);

  const close = useCallback(() => {
    setIsOpen(false);
    previouslyFocusedRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      source,
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Não foi possível enviar sua mensagem.");
      }
      setStatus("success");
      form.reset();

      const whatsappMessage = `Olá! Meu nome é ${payload.name} e acabei de enviar uma mensagem pelo site da FAZ.`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Não foi possível enviar sua mensagem.");
    }
  }

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <div className="modal-overlay" onClick={close}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeButtonRef} className="modal-close" onClick={close} aria-label="Fechar">
              ×
            </button>
            <h2 id="contact-modal-title">Fale com um consultor</h2>
            <p>Conte um pouco sobre sua operação e retornaremos o mais breve possível.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Nome</label>
                <input id="name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Telefone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className="form-field">
                <label htmlFor="company">Empresa</label>
                <input id="company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className="form-field">
                <label htmlFor="message">Mensagem</label>
                <textarea id="message" name="message" rows={4} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={status === "submitting"}>
                {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
              </button>
              {status === "success" && (
                <p className="form-status success" role="status">
                  Mensagem enviada com sucesso! Abrimos o WhatsApp para você falar com a gente agora mesmo.
                </p>
              )}
              {status === "error" && (
                <p className="form-status error" role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}
