import React from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './Header.css';
import Logo from '../assets/logo.svg';


function Header() {
 
  
  return (
    <div className="background-gradient">

      <nav className="navbar">
      <div className="logo-container">
      <Link to="/"><img src={Logo} alt="Logo" className="logo" /></Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Game</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/">Download</Link>
          </li>
          <li>
            <Link to="/"></Link>
          </li>
        </ul>
       
      </nav>
    
    
    </div>
  );
}

export default Header;
