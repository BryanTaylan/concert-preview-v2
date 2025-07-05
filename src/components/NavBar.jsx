import { Link } from "react-router-dom";
import { Search, Music } from "lucide-react";
import "../css/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="music-logo-container">
        <Music className="music-logo" />
      </div>
      <div className="navbar-brand">
        <Link to="/">VenueView</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
