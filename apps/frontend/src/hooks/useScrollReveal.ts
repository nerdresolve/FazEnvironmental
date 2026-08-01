import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const narrow = window.matchMedia("(max-width: 640px)").matches;
    setIsNarrowViewport(narrow);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      narrow
        ? { threshold: 0, rootMargin: "0px 0px 0px 0px" }
        : { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible, isNarrowViewport };
}
