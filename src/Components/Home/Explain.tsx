// @ts-ignore
import React from 'react';
import './Explain.css'; // Ensure this is the correct path to your CSS file
import placeholder from "../../Images/BetterBet .png"; // Ensure this is the correct path to your image


const Explain = () => {
  return (
    <div className="explain-container">
      <div className='fade'></div>
      <div className='checker'>
        <h1 className='explain-title'>What is Arbitrage Betting?</h1>
        <div className="segment">
          <div className="text-section">
            <h2>Risk-free Income!</h2>
            <p className='widthtest'>With our software, you'll be able to lock in weekly profits with minimal time and effort. Want to learn how? Check out our detailed guides!</p>
          </div>
          <img src={placeholder} alt="Placeholder" className="image" />
        </div>
        <div className="segment">
          <img src={placeholder} alt="Placeholder" className="image" />
          <div className="text-section">
            <h2 className='test'>The BEST Arbs Available!</h2>
            <p className='widthtest2'>Our software was designed to offer arbs which no other service is capable of finding, all at a fraction of the price. Check out our video below, where we make back a 30£ monthly subscription in one single bet!</p>
          </div>
        </div>
        <div className="segment">
          <div className="text-section">
            <h2>Specifically tailored to UK customers!</h2>
            <p className='widthtest'>Tired of seeing services offer loads of arbs, just to find out the bookies are overseas and completely inaccessible? With us, you don't have to worry about that. We have over 40 bookies for you to choose from and open accounts with!</p>
          </div>
          <img src={placeholder} alt="Placeholder" className="image" />
        </div>
        <h1 className='explain-title'>Video explanation:</h1>
        <div className="video-container">
          <div className="video-border violet-lighter">
            <div className="video-border violet-light">
              <div className="video-border violet">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/ILFZtdLM-Gk"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explain;
