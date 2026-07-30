import type { ElementType, ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={["reveal", visible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
