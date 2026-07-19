import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const tools = [
  {
    name: "Print Prep Tool",
    path: "/tools/print-prep",
    desc: "Resize, remove background, split for A3 printing",
  },
  {
    name: "A3 Collage Maker",
    path: "/tools/collage-a3",
    desc: "Combine multiple photos into a print-ready A3 grid",
  },
];

export default function Navbar() {
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="AS Designs" className="navbar__logo" />
      </Link>
      <div className="navbar__links">
        <div
          className="navbar__dropdown"
          onMouseEnter={() => setFeaturesOpen(true)}
          onMouseLeave={() => setFeaturesOpen(false)}
        >
          <button
            className="navbar__dropdown-trigger"
            onClick={() => setFeaturesOpen((v) => !v)}
          >
            Features
          </button>
          {featuresOpen && (
            <div className="navbar__dropdown-menu">
              <div>
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="navbar__dropdown-item"
                  >
                    <span className="navbar__dropdown-item-name">
                      {tool.name}
                    </span>
                    <span className="navbar__dropdown-item-desc">
                      {tool.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link to="/work">Work</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
