import logoIcon from "../../assets/logo.png";
import "./HeroLogoMark.css";

export default function HeroLogoMark() {
  return (
    <div className="hero-logo-mark">
      <img src={logoIcon} alt="" aria-hidden="true" />
    </div>
  );
}
