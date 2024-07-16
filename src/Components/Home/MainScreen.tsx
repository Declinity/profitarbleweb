// @ts-ignore
import React, { useEffect } from 'react';
import './MainScreen.css';
import Explain from './Explain.js';
import screens from "../../Images/MainScreen.png"
const MainScreen = () => {
  return (
    <div>
      <div className="main-screen-container">
        <div className="text-container">
          <p>Never lose a bet again!</p>
          <p>Get Ahead of the Game!</p>
          <button className="start-now-button">Start Now!</button>
        </div>
        <img src={screens} alt="Description of Image" className="main-screen-image" width="560px" />
      </div>
      <Explain></Explain>
    </div>
  );
};

export default MainScreen;