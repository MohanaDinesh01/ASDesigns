import heroCharacter from "../../assets/hero-character.png";
import "./HeroCharacter.css";

export default function HeroCharacter() {
  return (
    <div className="hero-character">
      <img
        src={heroCharacter}
        alt="Illustration of a young video editor at his desk"
      />
    </div>
  );
}
