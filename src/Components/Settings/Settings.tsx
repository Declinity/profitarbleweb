import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext';
import './Settings.css';

const Settings = () => {
    // @ts-ignore
    /* const { username, authChecked, setUsername } = useContext(UserContext);
    const [trialStatus, setTrialStatus] = useState(null);
    const [proVersionActive, setProVersionActive] = useState(false);
    const [freeTrialActive, setFreeTrialActive] = useState(false);
    const [proVersionAccess, setProVersionAccess] = useState(false);

    useEffect(() => {
        fetchTrialStatus();
    }, [username]);

    const fetchTrialStatus = () => {
        if (username && authChecked) {
            fetch(`http://localhost:3001/api/user-trial-status?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    setTrialStatus(data);
                    updateStatesBasedOnTrialStatus(data);
                })
                .catch(error => console.error('Error fetching trial status:', error));
        }
    };

    const updateStatesBasedOnTrialStatus = (data) => {
        const currentDate = new Date();
        setProVersionActive(data.proVersion && new Date(data.proVersionExpDate) > currentDate);
        setFreeTrialActive(data.freeTrial && new Date(data.freeTrialExpDate) > currentDate);
        setProVersionAccess(!data.proVersion && new Date(data.proVersionExpDate) > currentDate);
    };

    const handleCancelProVersion = () => {
        fetch('http://localhost:3001/api/cancel-subscription', {
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

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUsername(null);
        window.location.href = '/login';
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // @ts-ignore
        return new Date(dateString).toLocaleDateString(undefined, options);
    }; */

    return (
        <div className="settings-page">
            {/* <div className="settings-container">
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
                        {proVersionActive && (
                            <button className="settings-button cancel-button" onClick={handleCancelProVersion}>Unsubscribe</button>
                        )}
                    </div>
                ) : (
                    <p>Loading trial status...</p>
                )}
                <button className="settings-button logout-button" onClick={handleLogout}>Logout</button>
            </div> */}
            HI
        </div>
    );
};

export default Settings;
