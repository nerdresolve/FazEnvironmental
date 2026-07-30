import { Helmet } from "react-helmet-async";
import desktopMp4 from "../assets/hero-video-desktop.mp4";
import desktopPoster from "../assets/hero-video-desktop-poster.jpg";
import mobileMp4 from "../assets/hero-video-mobile.mp4";
import mobilePoster from "../assets/hero-video-mobile-poster.jpg";

export default function HeroVideo() {
  return (
    <div className="hero-video" aria-hidden="true">
      <Helmet>
        <link rel="preload" as="image" href={mobilePoster} media="(max-width: 640px)" />
        <link rel="preload" as="image" href={desktopPoster} media="(min-width: 641px)" />
      </Helmet>
      <video className="hero-video-desktop" autoPlay muted loop playsInline preload="auto" poster={desktopPoster}>
        <source src={desktopMp4} type="video/mp4" />
      </video>
      <video className="hero-video-mobile" autoPlay muted loop playsInline preload="auto" poster={mobilePoster}>
        <source src={mobileMp4} type="video/mp4" />
      </video>
    </div>
  );
}
