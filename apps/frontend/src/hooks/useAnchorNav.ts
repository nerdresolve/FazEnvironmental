import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function scrollToId(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}

export function useAnchorNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      if (location.pathname === "/") {
        scrollToId(id);
      } else {
        navigate(`/#${id}`);
      }
    },
    [location.pathname, navigate]
  );
}
