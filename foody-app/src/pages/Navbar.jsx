import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
        <img src="/logo.png" alt="Foody App Logo" className="logo-img" />
        </Link>
      </div>

      <div className="nav-wrapper">
        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>

          {/* Pas connecté */}
          {!email && <li><Link to="/login">Login</Link></li>}

          {/* Admin seulement */}
          {role === "admin" && (
            <li><Link to="/admin">Dashboard</Link></li>
          )}

          {/* Connecté */}
          {email && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
