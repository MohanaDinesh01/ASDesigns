import illustration from "../../assets/editor-illustration.svg";
import "./HeroSideArt.css";

export default function HeroSideArt() {
  return (
    <div className="hero-side-art">
      <img src={illustration} alt="" aria-hidden="true" />
    </div>
  );
}
