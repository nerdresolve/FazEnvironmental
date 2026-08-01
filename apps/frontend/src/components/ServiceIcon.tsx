import type { ReactNode } from "react";
import type { ServiceIconKey } from "../data/services";

const paths: Record<ServiceIconKey, ReactNode> = {
  training: (
    <>
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
      <path d="M7 10.8v4.4c0 1.2 2.2 2.8 5 2.8s5-1.6 5-2.8v-4.4" />
      <path d="M20 8.5v6" />
    </>
  ),
  command: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11" rx="1.4" />
      <path d="M8 19.5h8" />
      <path d="M12 15.5v4" />
      <path d="M7.5 8.5h5M7.5 11.5h9" />
    </>
  ),
  offshore: (
    <>
      <path d="M3 17.5c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0" />
      <path d="M6 14.5 7.5 6h9L18 14.5" />
      <path d="M12 6V3" />
      <path d="M9.5 9.5h5" />
    </>
  ),
  drill: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 2" />
      <path d="M12 3v1.6M12 19.4V21M3 12h1.6M19.4 12H21" />
    </>
  ),
  coral: (
    <>
      <path d="M12 21v-6" />
      <path d="M12 15c0-3 2.4-3.6 2.4-6.6 0-1.7-1.2-3-1.2-3" />
      <path d="M12 15c0-3-2.4-3.6-2.4-6.6 0-1.7 1.2-3 1.2-3" />
      <path d="M12 12c1.8-.6 2.6-2.2 2.2-4.4" />
      <path d="M12 12c-1.8-.6-2.6-2.2-2.2-4.4" />
      <path d="M8 21h8" />
    </>
  ),
  "oil-spill": (
    <>
      <path d="M12 3.5c2.4 3 4 5.3 4 7.8a4 4 0 0 1-8 0c0-2.5 1.6-4.8 4-7.8Z" />
      <path d="M3 19c1.3 1 2.6 1 3.9 0 1.3-1 2.6-1 3.9 0 1.3 1 2.6 1 3.9 0 1.3-1 2.6-1 3.9 0" />
      <path d="M3 15.5c1.3 1 2.6 1 3.9 0 1.3-1 2.6-1 3.9 0 1.3 1 2.6 1 3.9 0 1.3-1 2.6-1 3.9 0" />
    </>
  ),
  audit: (
    <>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M15 3.5v3h3" />
      <path d="m9 13 2 2 4-4.5" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14.7 3.6a4.2 4.2 0 0 0-5.4 5.4L4 14.3v3.7h3.7L13 12.7a4.2 4.2 0 0 0 5.4-5.4l-3 3-2.4-2.4Z" />
    </>
  ),
  plan: (
    <>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M15 3.5v3h3" />
      <path d="M9 12.5h6M9 15.8h6M9 9.2h3" />
    </>
  ),
};

export default function ServiceIcon({ icon }: { icon: ServiceIconKey }) {
  return (
    <svg
      className="service-icon"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
