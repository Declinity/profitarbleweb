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
                    <h2>Never lose!</h2>
                    <p>Imagine placing £5 on two different bookmakers...</p>
                </div>
            </div>
            <div className="segment" onClick={() => redirectToGuide('/guides/players')}>
                <div className="text-section">
                    <h2>Never lose!</h2>
                    <p>Imagine placing £5 on two different bookmakers...</p>
                </div>
            </div>
            <div className="segment" onClick={() => redirectToGuide('/guides/cards')}>
                <div className="text-section">
                    <h2>Never lose!</h2>
                    <p>Imagine placing £5 on two different bookmakers...</p>
                </div>
            </div>
        </div>
    );
};

export default Guides;
