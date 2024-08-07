import React, { useState } from 'react';
import './Footer.css';
import logo from '../../Images/BetterBet .png'; // Adjust the path as necessary
import { FaYoutube, FaDiscord } from 'react-icons/fa'; // Using react-icons for social media logos
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-left">
                        <a href="#!" className="footer-link" onClick={() => setShowContactPopup(true)}>Contact Us</a>
                        <a href="/termsandconditions" className="footer-link">Terms & Conditions</a>
                    </div>
                    <div className="footer-right">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social"><FaXTwitter /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social"><FaYoutube /></a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="footer-social"><FaDiscord /></a>
                    </div>
                </div>
            </div>

            {showContactPopup && (
                <div className="overlay">
                    <div className="popup">
                        <p>Email: support@profitarble.com</p>
                        <button onClick={() => setShowContactPopup(false)}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
};
export default Footer;
