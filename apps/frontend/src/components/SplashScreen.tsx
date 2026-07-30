import { useEffect, useState } from "react";
import fazLogo from "../assets/faz.svg";
import sonarSound from "../assets/sonar.mp3";

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

    const audio = new Audio(sonarSound);
    audio.volume = 0.5;
    let blocked = false;

    const playSonar = () => {
      audio.play().catch(() => {
        blocked = true;
      });
    };

    const unlockAudio = () => {
      if (blocked) {
        blocked = false;
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("pointerdown", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });

    const pingTimer = setTimeout(playSonar, 300);

    const fadeOutAudio = (durationMs: number) => {
      const steps = 12;
      const stepMs = durationMs / steps;
      const startVolume = audio.volume;
      let step = 0;
      const fadeInterval = setInterval(() => {
        step += 1;
        audio.volume = Math.max(0, startVolume * (1 - step / steps));
        if (step >= steps) {
          clearInterval(fadeInterval);
          audio.pause();
        }
      }, stepMs);
      return fadeInterval;
    };

    let fadeInterval: ReturnType<typeof setInterval> | undefined;
    const dismissTimer = setTimeout(() => {
      setDismissing(true);
      fadeInterval = fadeOutAudio(600);
    }, 1900);
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.classList.remove("splash-active");
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    }, 2500);
    return () => {
      clearTimeout(pingTimer);
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
      clearInterval(fadeInterval);
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
      document.body.classList.remove("splash-active");
      audio.pause();
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
