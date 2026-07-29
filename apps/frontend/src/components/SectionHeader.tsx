import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  as?: "h1" | "h2";
}

export default function SectionHeader({ eyebrow, title, description, as: Heading = "h2" }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <Heading>{title}</Heading>
      <p>{description}</p>
    </div>
  );
}
