import type { ReactNode } from "react";
import { useContactForm } from "./ContactForm";

interface ContactCtaButtonProps {
  source: string;
  className: string;
  children: ReactNode;
}

export default function ContactCtaButton({ source, className, children }: ContactCtaButtonProps) {
  const { openContactForm } = useContactForm();

  return (
    <button type="button" className={className} onClick={() => openContactForm(source)}>
      {children}
    </button>
  );
}
