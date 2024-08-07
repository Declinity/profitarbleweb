import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate()
    // @ts-ignore
    const { username, authChecked, setUsername } = useContext(UserContext);
    // @ts-ignore
    const [trialStatus, setTrialStatus] = useState(null);
    // @ts-ignore
    const [proVersionActive, setProVersionActive] = useState(false);
    // @ts-ignore
    const [freeTrialActive, setFreeTrialActive] = useState(false);
    // @ts-ignore
    const [proVersionAccess, setProVersionAccess] = useState(false);
    // @ts-ignore

    useEffect(() => {
        // @ts-ignore
        fetchTrialStatus();
        // @ts-ignore
    }, [username]);

    // @ts-ignore
    const fetchTrialStatus = () => {
        // @ts-ignore
        if (username && authChecked) {
            // @ts-ignore
            fetch(`https://profitarble.onrender.com/api/user-trial-status?username=${username}`)
                // @ts-ignore
                .then(response => response.json())
                // @ts-ignore
                .then(data => {
                    // @ts-ignore
                    setTrialStatus(data);
                    // @ts-ignore
                    updateStatesBasedOnTrialStatus(data);
                })
                // @ts-ignore
                .catch(error => console.error('Error fetching trial status:', error));
        }
    };
    // @ts-ignore
    const updateStatesBasedOnTrialStatus = (data) => {
        // @ts-ignore
        const currentDate = new Date();
        // @ts-ignore
        setProVersionActive(data.proVersion && new Date(data.proVersionExpDate) > currentDate);
        // @ts-ignore
        setFreeTrialActive(data.freeTrial && new Date(data.freeTrialExpDate) > currentDate);
        // @ts-ignore
        setProVersionAccess(!data.proVersion && new Date(data.proVersionExpDate) > currentDate);
    };
    // @ts-ignore
    const handleCancelProVersion = () => {
        // @ts-ignore
        fetch('https://profitarble.onrender.com/api/cancel-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
            .then(response => response.json())
            .then(() => {
                console.log('Pro version cancelled successfully');
                setProVersionActive(false);
                fetchTrialStatus();
            })
            .catch(error => console.error('Error cancelling pro version:', error));
    };
    // @ts-ignore
    const handleLogout = () => {
        // @ts-ignore
        localStorage.removeItem('accessToken');
        // @ts-ignore
        setUsername(null);
        // @ts-ignore
        window.location.href = '/login';
    };
    // @ts-ignore
    const formatDate = (dateString) => {
        // @ts-ignore
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // @ts-ignore
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1 className="settings-title">Settings</h1>
                {trialStatus ? (
                    <div className="settings-content">
                        {proVersionActive ? (
                            <p>You are subscribed to the pro version! Your next invoice will be: {formatDate(trialStatus.proVersionExpDate)}</p>
                        ) : proVersionAccess ? (
                            <p>You are no longer subscribed, but have access to the service until {formatDate(trialStatus.proVersionExpDate)}</p>
                        ) : null}
                        {freeTrialActive && (
                            <p>Your free trial will expire on: {formatDate(trialStatus.freeTrialExpDate)}</p>
                        )}
                        {(proVersionAccess || proVersionActive) && (
                            <button className="settings-button cancel-button" onClick={() => navigate("/savedArbs")}>View your arbs</button>
                        )}
                        <button className="settings-button logout-button" onClick={handleLogout}>Logout</button>
                        {proVersionActive && (
                            <button className="settings-button cancel-button" onClick={handleCancelProVersion}>Unsubscribe</button>
                        )}
                    </div>
                ) : (<>
                    <p>Loading trial status...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Settings;
