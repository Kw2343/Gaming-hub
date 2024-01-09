import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../assets/profile.svg';
import Question from '../assets/question.svg';
import Signin from '../assets/sign in.svg';
import Signup from '../assets/sign up.svg';
import './Topbar.css';

function Topbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className={`top-bar-container ${showDropdown ? 'active' : ''}`}>
      <div className="top-bar-icons">
        <img src={Profile} alt="Profile" onClick={toggleDropdown} />
        
        </div>
        

      {showDropdown && (
        <div className="dropdown">
          <Link to="/login" onClick={closeDropdown}>
            <img src={Signin} alt="Sign In" />
            <p>Login</p>
          </Link>
          <Link to="/Signup" onClick={closeDropdown}>
            <img src={Signup} alt="Sign Up" />
            <p>Sign Up</p>
          </Link>
        
        </div>
      )}
    </div>
  );
}

export default Topbar;
