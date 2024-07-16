import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import "./Trial.css";
import GameComponent from './GameComponent';

const FreeTrial = () => {
    const [data, setData] = useState([]);
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

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:3001/api/matches', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    const parsedData = data.map(row => ({
                        match: row.match,
                        arbs: row.arbs,
                        links: row.links
                    }));

                    const sortedData = parsedData.sort((a, b) => {
                        const profitMarginA = a.arbs.length > 0 && a.arbs[0]["Profit"] !== undefined ? a.arbs[0]["Profit"] : 0;
                        const profitMarginB = b.arbs.length > 0 && b.arbs[0]["Profit"] !== undefined ? b.arbs[0]["Profit"] : 0;
                        return profitMarginB - profitMarginA;
                    });
                    console.log(sortedData)
                    setData(sortedData);
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        if (
            (userTrialStatus.freeTrial && new Date(userTrialStatus.freeTrialExpDate) > new Date()) ||
            (new Date(userTrialStatus.proVersionExpDate) > new Date())
        ) {
            fetchData();
            const intervalId = setInterval(fetchData, 15000);

            return () => clearInterval(intervalId);
        }
    }, [userTrialStatus]);

    useEffect(() => {
        if (authChecked && !username) {
            navigate('/login');
        }
    }, [authChecked, username, navigate]);

    const showData = (username && authChecked) && (
        (userTrialStatus.freeTrial && new Date(userTrialStatus.freeTrialExpDate) > new Date()) ||
        (new Date(userTrialStatus.proVersionExpDate) > new Date())
    );

    return (
        <div className="free-trial-container">
            {showData && data.map((game, index) => (
                <div key={game.match} className="game-component-wrapper">
                    <GameComponent
                        gameName={game.match}
                        gameData={game.arbs}
                        links={game.links}
                        showSaveButton={new Date(userTrialStatus.proVersionExpDate) > new Date()}
                    />
                </div>
            ))}
        </div>
    );
};

export default FreeTrial;