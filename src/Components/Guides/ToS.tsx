import React from 'react';
import "./Guides.css"
import image from "../../Images/Voids.png"
const TermsAndConditions = () => {
    return (
        <div className='guides-container'>
            <h1>Introduction to Arbing.</h1>
            <p>Arbitrage bets (also known as surebets or arbs) are a way of generating profit from bookmakers no matter the outcome of an event with very little to no risk involved. Take a look at this example:</p>
            <img src={image} />
            <p>If you aren’t familiar with sports betting, you might be asking yourself how there can be a decimal number of goals, however this simply means that if there are three goals or more, the “Over” wins, and if there’s less than three then the “Under” wins. In other words, over 2.5 means “More than 2” and under 2.5 means “Less or equal to 2”.</p>
            <p>Now look at the odds – they are both 2.20. Placing a 50£ bet will give you back 20£ in profit no matter the outcome, as one side will always win and the other side will always lose.</p>
            <p>On the side that wins: 50£ * 2.20 = 120£, 120£ – 50 = 70£ profit</p>
            <p>On the side that loses: -50£ loss</p>
            <p>Total profit: 70£ - 50£ = 20£.</p>
            <h2>Is it legal?</h2>
            <p>Yes, arbitrage betting is completely legal as you are simply placing bets on two different websites.</p>
            <h2>Can I only do this on the goals market?</h2>
            <p>No, in fact finding an arb on the goals market is quite rare. However, there are tons of other markets that our program can find for you which no other service in the UK can, and most of them are on high tier events – we will explain later on why this is important. There are some markets, like players and cards, which require special amounts of attention, but don’t worry, we’ve indicated those in our program with a “⚠️” sign and have dedicated guides on what you should look out for.</p>
            <h2>What else should I look out for?</h2>
            <p>There are a small number of general risks involved when arbitrage betting, albeit very different from normal sports betting. Since you are placing two separate bets on two websites, you want to ensure that both of them are locked in before the event starts. Here’s a list of helpful tips which will make your arbing journey a lot easier:</p>
            <h3>-Learn the layouts of each website, as well as their mannerisms.</h3>
            <p>This is probably the most important step. You should be aware if a website lets you cash out, where the markets are located, and so on.</p>
            <h3>-Be aware of the maximum staking amount a bookmaker allows:</h3>
            <p>Some bookies will tell you how much you’re allowed to place on a bet before you click the button, while others won’t tell you until you do. This can lead to an issue where you’ve locked in a bet on one side, while the other side gets rejected. You can simply place the bet at lower odds on another website, however this may generate a small loss. If a website offers you the opportunity to cash out, you should always place it on that side first, so in the rare event that if something goes wrong on the other side you’ll be able to easily get your money back.</p>
            <h2>How much should I stake on each arb?</h2>
            <p>If you’re starting out, we recommend placing around £75-£80 (in total) on an arb. This way you should be able to earn steady profits without risking too much. If you’re experienced, you should place anywhere between £100 and £150 for each arb – however this requires a larger bankroll. We also recommend placing more arbs on lower stakes, than high stakes on less arbs. This is because if you bet large amounts, the bookmakers will restrict you faster as they’ll be aware of you being a smart bettor.</p>
            <h2>How do I avoid restrictions?</h2>
            <p>If you arbitrage a lot, you will be restricted. Usually this means you’ll only be able to place 1 or two pounds on a bet at most, which can be frustrating. It’s not possible to avoid restrictions completely, however keep in mind that we have over 50 bookmakers available which should last you well over a year if you arb consistently.</p>
            <p>Some website offer the same odds, for these we advise you to only open one account and, when you get restricted, move on to the next website. By doing so you should be able to consistently arb for at least a year, week in week out. Also keep in mind some websites are more lenient than others so they’ll last a lot longer.</p>
            <p>Other options include asking family/friends to open accounts for you, however you will also need to be able to use a debit card that’s in their name. If you’d like to know more about opening multiple accounts, or have any other questions, join our Discord and we’ll be more than happy to help you!</p>
        </div>
    );
};

export default TermsAndConditions;
