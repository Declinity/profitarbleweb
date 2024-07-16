import React from 'react';
import './Footer.css';
import logo from '../../Images/BetterBet .png'; // Adjust the path as necessary
import { FaYoutube, FaDiscord } from 'react-icons/fa'; // Using react-icons for social media logos
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <a href="/contact-us" className="footer-link">Contact Us</a>
                    <a href="/terms-conditions" className="footer-link">Terms & Conditions</a>
                </div>
                <img src={logo} alt="BetterBet Logo" className="footer-logo" />
                <div className="footer-right">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social"><FaXTwitter /></a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social"><FaYoutube /></a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-social"><FaDiscord /></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
