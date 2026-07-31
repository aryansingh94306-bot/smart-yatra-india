import { Link } from "react-router-dom";
import logo from "../assets/SmartYatraLogo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      {/* Tricolour Strip */}
      <div className="tricolor-bar"></div>

      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <img
            src={logo}
            alt="SmartYatra Logo"
            className="logo-image"
          />

          <div className="logo-text">
            <h2>SmartYatra</h2>
            <p>One Platform. Every Journey.</p>
          </div>
        </div>

        {/* Navigation */}
        <ul className="nav-links">
          <li>
            <Link to="/">🏠 Home</Link>
          </li>

          <li>
            <Link to="/journey-planner">🗺 Journey Planner</Link>
          </li>

          <li>
            <Link to="/book-ticket">🎫 Book Ticket</Link>
          </li>

          <li>
            <Link to="/live-tracking">📍 Live Tracking</Link>
          </li>

          <li>
            <Link to="/ticket">🎟 My Ticket</Link>
          </li>

          <li>
            <Link to="/ai-assistant">🤖 AI Assistant</Link>
          </li>

          <li>
            <Link to="/dashboard">📊 Dashboard</Link>
          </li>
        </ul>

        {/* Government Badge */}
        <div className="gov-badge">
          🇮🇳 Smart India Hackathon Prototype
        </div>
      </nav>
    </>
  );
}

export default Navbar;