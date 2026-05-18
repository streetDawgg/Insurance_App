import React, { useState } from "react";
import "../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Ins Pro</div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Nav */}
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <ul className="navList">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Need Help?</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;