import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  as?: "h1" | "h2";
  headingId?: string;
}

export default function SectionHeader({ eyebrow, title, description, as: Heading = "h2", headingId }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <Heading id={headingId}>{title}</Heading>
      <p>{description}</p>
    </div>
  );
}
