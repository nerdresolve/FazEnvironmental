import { useEffect, useState } from "react";
import fazLogo from "../assets/faz.svg";

const STORAGE_KEY = "faz-splash-seen";

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      return;
    }
    setShow(true);
    document.body.classList.add("splash-active");

    const dismissTimer = setTimeout(() => setDismissing(true), 1900);
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.classList.remove("splash-active");
    }, 2500);
    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
      document.body.classList.remove("splash-active");
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`splash-screen ${dismissing ? "splash-screen--out" : ""}`} aria-hidden="true">
      <div className="splash-logo-wrap">
        <span className="splash-ripple splash-ripple-1" />
        <span className="splash-ripple splash-ripple-2" />
        <span className="splash-ripple splash-ripple-3" />
        <img src={fazLogo} alt="" className="splash-logo" />
      </div>
    </div>
  );
}
