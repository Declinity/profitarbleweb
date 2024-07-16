import React from 'react';
import "./Guides.css"
const Guide1 = () => {
    return (
        <div className='guides-container'>
            <h2>Card Arbitrage</h2>
            <p>Card arbitrages require a little more caution to bet compared to other markets. While all other markets are settled by Opta, different bookmakers use their own settling rules in the event of a red card.</p>
            <p>Keep in mind that "booking points" is an alternative way of measuring cards. With our software, the "Total Cards" market compares both the Cards and Booking Points markets to find arbs.</p>
            <p>This image shows a few examples of how the card rules apply differently across bookmakers:</p>
            <p>As such, it is always essential to ensure that two bookmakers are applying the same rules when arbing the card market, as a red card and the exact combination of yellow cards could make both sides of the bet lose.</p>
            <p>However, it is also possible that both sides of the bet may both win. Let's look a few examples:</p>
            <p>Betfair Over 4.5 & BetUK Under 4.5</p>
            <p>Here, we can see that in the event of a red card and three yellows, as Betfair's card count will be 4 and BetUK's card count will be 5. As such both bets will win.</p>
            <p>Sky 60+ booking points & Betfair Under 5.5</p>
            <p>Here, with a combination of one red card and four yellow cards, both bets will win. Sky's side will have 65 booking points, while Betfair's side will have 5 cards.</p>
            <p>Of course, if there's no red card, one side will always win and the other always lose, like all other arbitrage bets. Although it is very rare for the exact combination of reds and yellows to make both sides lose, it is important to be aware of this risk when arbing between two bookmakers with different rules.</p>
        </div>
    );
};

export default Guide1;
