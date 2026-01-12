import React from "react";
import "../styles/Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src="/images/CHEF.jpg" alt="Chef" className="footer-chef" />
        <p>2026 Foody App — Tous droits réservés</p>
      </div>
      <div className="social-icons">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaYoutube /></a>
      </div>
    </footer>
  );
}

export default Footer;
