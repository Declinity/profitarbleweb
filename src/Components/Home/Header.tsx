import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import logo from '../../Images/BetterBet .png'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

import UserContext from '../Context/UserContext';


const Header = () => {
  // @ts-ignore
  const { username } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="buttons-container left-buttons">
        <button className="home-button left-button" onClick={() => navigate('/guides')}>
          <i className="fa fa-dice fa-beat-fade"></i> Guides
        </button>
        <button className="home-button left-button" onClick={() => navigate('/subscribe')}>
          <i className="fa-solid fa-comments-dollar"></i> Pricing
        </button>
      </div>
      <img src={logo} alt="Logo" className="logo" />
      <div className="buttons-container right-buttons">
        {username ? (
          <>
            <button className="home-button right-button" onClick={() => navigate('/freeTrial')}>
              <i className="fa fa-star"></i> Arbs
            </button>
            <button className="home-button right-button" onClick={() => navigate('/settings')}>
              <i className="fa fa-user"></i> {username}
            </button>
          </>
        ) : (
          <>
            <button className="home-button right-button" onClick={() => navigate('/login')}>
              <i className="fa fa-sign-in"></i> Log In
            </button>
            <button className="home-button right-button" onClick={() => navigate('/signup')}>
              <i className="fa fa-user-plus"></i> Sign Up
            </button>
          </>
        )}
      </div>
      <div className="dropdown-container">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <i className="fa fa-bars"></i>
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/guides')}>
              <i className="fa fa-dice"></i> Guides
            </button>
            <button className="dropdown-item" onClick={() => navigate('/subscribe')}>
              <i className="fa-solid fa-comments-dollar"></i> Pricing
            </button>
            {username ? (
              <>
                <button className="dropdown-item" onClick={() => navigate('/freeTrial')}>
                  <i className="fa fa-star"></i> Arbs
                </button>
                <button className="dropdown-item" onClick={() => navigate('/settings')}>
                  <i className="fa fa-user"></i> {username}
                </button>
              </>
            ) : (
              <>
                <button className="dropdown-item" onClick={() => navigate('/login')}>
                  <i className="fa fa-sign-in"></i> Log In
                </button>
                <button className="dropdown-item" onClick={() => navigate('/signup')}>
                  <i className="fa fa-user-plus"></i> Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};





export default Header;
