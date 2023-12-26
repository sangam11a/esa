import React, { useState } from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <a href="/">
            {/* <img id='logo' style={{height:80,width:10}}  src="src\assets\images\logo.png" alt="Logo loading failed" /> */}
            esa
          </a>
        </div>
        <div className={isOpen ? 'menu-btn open' : 'menu-btn'} onClick={toggleNavbar}>
          <div className="menu-btn_burger"></div>
        </div>
        <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
          {/* <li><a href="#about">About</a></li> */}
          <li><a href="#products">Products</a></li>
          <li><a href="#contact">Contact</a></li>
          {/* Add more navbar links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
