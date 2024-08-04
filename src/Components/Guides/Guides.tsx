import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Guides.css';

const Guides = () => {
    const navigate = useNavigate();

    const redirectToGuide = (guidePath) => {
        navigate(guidePath);
    };
    return (
        <div className="guides-container">
            <h1>Guides</h1>
            <div className="segment" onClick={() => redirectToGuide('/guides/introduction')}>
                <div className="text-section">
                    <h2>Introduction guide</h2>
                    <p>Learn the basics of arbitrage betting, and most importantly, how YOU can profit from it!</p>
                </div>
            </div>
            <div className="segment" onClick={() => redirectToGuide('/guides/players')}>
                <div className="text-section">
                    <h2>Player guide</h2>
                    <p>Learn how to easily manage player bets and arb like a professional!</p>
                </div>
            </div>
            <div className="segment" onClick={() => redirectToGuide('/guides/cards')}>
                <div className="text-section">
                    <h2>Card guide</h2>
                    <p>Learn how you should manage card bets!</p>
                </div>
            </div>
        </div>
    );
};

export default Guides;
