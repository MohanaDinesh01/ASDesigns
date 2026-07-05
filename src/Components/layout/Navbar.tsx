import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="AS Designs" className="navbar__logo" />
      </Link>
      <div className="navbar__links">
        <Link to="/work">Work</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
