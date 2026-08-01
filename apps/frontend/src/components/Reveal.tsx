import type { ElementType, ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const { ref, visible, isNarrowViewport } = useScrollReveal<HTMLElement>();
  const effectiveDelay = isNarrowViewport ? 0 : delay;

  return (
    <Tag
      ref={ref}
      className={["reveal", visible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      style={effectiveDelay ? { transitionDelay: `${effectiveDelay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
