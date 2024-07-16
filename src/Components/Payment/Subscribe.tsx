// Subscribe.tsx
import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Subscribe.css'; // Assuming you will create this CSS file
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51OgqkWIPN9UEEGy82FGLJj93Wwk4si9PjsBRzTJWCRiMJrYI0fPqNQA29AMqyrN3ZEm7gKAd6YwqZZMB8yrBPBy500LNP2mRl9');

const Subscribe = () => {
    const { username, authChecked } = useContext(UserContext);
    const [userTrialStatus, setUserTrialStatus] = useState({ freeTrial: false, freeTrialExpDate: null, proVersion: false, proVersionExpDate: null });
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:3001/api/user-trial-status?username=${username}`)
                .then(response => response.json())
                .then(trialStatus => setUserTrialStatus(trialStatus))
                .catch(error => console.error('Error fetching trial status:', error));
        }
    }, [username]);

    const redirectToLogin = () => {
        navigate('/login');
    };

    const handleSubscribeClick = async () => {
        if (!username) {
            redirectToLogin();
            return;
        }
        try {
            const { data } = await axios.post('http://127.0.0.1:3001/create-checkout-session', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            window.location = data.url;
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleSubscribeClickMonth = async () => {
        if (!username) {
            redirectToLogin();
            return;
        }
        try {
            const { data } = await axios.post('http://127.0.0.1:3001/create-checkout-session-month', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            window.location = data.url;
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleSubscribeClickFree = async () => {
        if (!username) {
            redirectToLogin();
            return;
        }
        try {
            const { data } = await axios.post('http://127.0.0.1:3001/api/start-free-trial', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            window.location = data.url;
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className='payment-box'>
            <div className="subscription-container">
                <div className="subscription-badge">BEST FOR LEARNING</div>
                <h2 className="subscription-title">Free Trial</h2>
                <span className="subscription-price">£0</span>
                <span className="subscription-rate">1 WEEK TRIAL</span>
                <ul className="subscription-features">
                    <li>All arbitrage bets up to 2%</li>
                    <li>Access to all tools</li>
                    <li>Direct links to bookmakers</li>
                    <li>Guaranteeed to find enough</li>
                </ul>
                <button
                    className="subscription-button"
                    onClick={handleSubscribeClickFree}
                    disabled={userTrialStatus.freeTrial && new Date(userTrialStatus.freeTrialExpDate) > new Date()}
                >
                    Get Full Access
                </button>
            </div>

            <div className="subscription-container">
                <div className="subscription-badge">RECOMMENDED FOR BEGINNERS</div>
                <h2 className="subscription-title">Weekly</h2>
                <span className="subscription-price">£9.99</span>
                <span className="subscription-rate">LESS THAN £2/DAY</span>
                <ul className="subscription-features">
                    <li>No limit to arbitrage bets.</li>
                    <li>Direct link to bookmakers.</li>
                    <li>Access to our bet tracker, save and settle all your bets within our app!</li>
                    <br />
                </ul>
                <button
                    className="subscription-button"
                    onClick={handleSubscribeClickMonth}
                    disabled={new Date(userTrialStatus.proVersionExpDate) > new Date()}
                >
                    Get Full Access
                </button>
            </div>

            <div className="subscription-container">
                <div className="subscription-badge">BEST VALUE</div>
                <h2 className="subscription-title">Monthly</h2>
                <div className="price-container">
                    <span className="subscription-price original-price">£39.99</span>
                    <span className="subscription-price discounted-price">£29.99</span>
                </div>
                <span className="discount-message">20% OFF!</span>
                <span className="subscription-rate">LESS THAN 1£/DAY</span>
                <ul className="subscription-features">
                    <li>All features that the weekly subscription has to offer, at a better price!</li>
                    <li>Early access to new features added in the future.</li>
                </ul>
                <button
                    className="subscription-button"
                    onClick={handleSubscribeClick}
                    disabled={new Date(userTrialStatus.proVersionExpDate) > new Date()}
                >
                    Get Full Access
                </button>
            </div>
        </div>
    );
};

export default React.memo(Subscribe);
