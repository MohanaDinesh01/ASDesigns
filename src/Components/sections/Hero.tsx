import "./Hero.css";
import HeroScene from "../../three/scenes/HeroScene";
import HeroSideArt from "../ui/HeroSideArt";
import HeroCharacter from "../ui/HeroCharacter";

export default function Hero() {
  return (
    <>
      <HeroSideArt />
      <section className="hero">
        <HeroScene />
        <HeroCharacter />
        <div className="hero__content">
          <h1 className="hero__brand">AS DESIGNS</h1>
          <p className="hero__tagline">Where vision meets creation</p>
          <p className="hero__subtext">
            Graphic design and video editing for brands who want to be seen, not
            scrolled past.
          </p>
          <div className="hero__cta">
            <a href="/work" className="btn btn--primary">
              View work
            </a>
            <a href="/contact" className="btn btn--ghost">
              Start a project
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
