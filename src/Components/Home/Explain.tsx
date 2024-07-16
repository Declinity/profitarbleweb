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
            <h2>Never lose!</h2>
            <p className='widthtest'>Imagine placing 5£ on two different bookmakers, one for a match to end with under 3 goals, and the other to end with 3 or more. If both of these bets are at odds 2.5, a return of 7.5£ in profit no matter the outcome!</p>
          </div>
          <img src={placeholder} alt="Placeholder" className="image" />
        </div>
        <div className="segment">
          <img src={placeholder} alt="Placeholder" className="image" />
          <div className="text-section">
            <h2 className='test'>Quality > Quantity</h2>
            <p className='widthtest2'>BookieBreaker focuses on bookies from all over the UK to bring you the best arbitrage opportunities. We provide significantly more markets than other arbitrage services, at a significantly better price, with our sole aim </p>
          </div>
        </div>
        <div className="segment">
          <div className="text-section">
            <h2>Over 500 arbitrage bets per day</h2>
            <p className='widthtest'>Easily make back a monthly subscription plan in one single day, or a weekly subscription in a single bet. Don't believe us? Check out the video below, or get access to all arbitrage opportunities up to 2% for free by signing up!</p>
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
