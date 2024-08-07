import React, { useEffect, useState } from 'react';
import './GameComponent.css'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GameComponent = ({ gameName, gameData, links, showSaveButton }) => {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupPlayer, setShowPopupPlayer] = useState(false);
    const [showBetUKPopup, setShowBetUKPopup] = useState(false);
    const [showBetfairPopup, setShowBetfairPopup] = useState(false);
    const [betfairUrl, setBetfairUrl] = useState('')
    const [betUKUrl, setBetUKUrl] = useState('')
    const [showLottoland, setShowLottolandPopup] = useState(false);
    const [lottolandUrl, setLottolandUrl] = useState('')
    const [showLivescore, setShowLivescorePopup] = useState(false);
    const [livescoreUrl, setLivescoreUrl] = useState('')
    const [showBetvictor, setShowBetvictorPopup] = useState(false);
    const [betvictorUrl, setBetvictorUrl] = useState('')
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [editableOdds, setEditableOdds] = useState({ odds1: '', odds2: '' });
    const [totalStake, setTotalStake] = useState('');
    const [stakes, setStakes] = useState({ stake1: '', stake2: '' });
    const [calculationResult, setCalculationResult] = useState({
        profitMargin: '---',
        amountOnBetway: '---',
        amountOnOther: '---'
    });
    const handleNavigate2 = () => {
        navigate('/guides/cards');
    };
    const handleNavigate = () => {
        navigate('/guides/players');
    };
    const handleValueClick = (value) => {
        if (value === "Total Cards") {
            setShowPopup(true);
        }
        else if (String(value).includes("Player")) {
            setShowPopupPlayer(true)
        }
    };
    const toggleBetUKPopup = (visible, url = '') => {
        setShowBetUKPopup(visible);
        setBetUKUrl(url); // Assume `setBetUKUrl` is a useState setter for storing the URL
    };
    const toggleBetvictorPopup = (visible, url = '') => {
        setShowBetvictorPopup(visible);
        setBetvictorUrl(url); // Assume `setBetUKUrl` is a useState setter for storing the URL
    };
    const toggleLottolandPopup = (visible, url = '') => {
        setShowLottolandPopup(visible);
        setLottolandUrl(url); // Assume `setBetUKUrl` is a useState setter for storing the URL
    };
    const toggleBetfairPopup = (visible, url = '') => {
        setShowBetfairPopup(visible); // Assume you have a useState hook for this
        setBetfairUrl(url); // And one for storing the URL
    };
    const toggleLivescorePopup = (visible, url = '') => {
        setShowLivescorePopup(visible); // Assume you have a useState hook for this
        setLivescoreUrl(url); // And one for storing the URL
    };
    const handleBoxClick = () => {
        setShowDetails(!showDetails);
    };
    const handleSaveClick = async (entry) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.post('https://profitarble.onrender.com/api/save-arb', { entry }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert('Arb saved successfully!');
            }
        } catch (error) {
            console.error('Error saving arb:', error);
            alert('Failed to save arb.');
        }
    };
    const handleEditClick = (entry) => {
        setCurrentEntry(entry);

        // Extract and set editable odds
        const oddsKeys = Object.keys(entry).filter(key => key.includes('Odds'));
        setEditableOdds({
            odds1: entry[oddsKeys[0]],
            odds2: entry[oddsKeys[1]],
        });

        setShowOverlay(true);
    };

    const handleOverlaySave = () => {
        const marketValue = currentEntry['Player']
            ? `${currentEntry['Market']} | ${currentEntry['Player'].split("|")[0].trim()}`
            : currentEntry['Market'];

        const updatedEntry = {
            'Market': marketValue,
            'Game': gameName,
            'Bookie 1': currentEntry['Bookie Over'],
            'Bookie 2': currentEntry['Bookie Under'],
            'Odds 1': editableOdds.odds1,
            'Odds 2': editableOdds.odds2,
            'Total Stake': totalStake,
            'Stake 1': stakes.stake1,
            'Stake 2': stakes.stake2,
            'Profit': 0,
            'Bookie 1 Status': 'Void',
            'Bookie 2 Status': 'Void',
        };
        handleSaveClick(updatedEntry);
        setStakes({ stake1: '', stake2: '' });
        setTotalStake('')
        setShowOverlay(false);
    };

    const handleOverlayClose = () => {
        setStakes({ stake1: '', stake2: '' });
        setTotalStake('')
        setShowOverlay(false);
    };

    const handleOddsChange = (e) => {
        const { name, value } = e.target;
        setEditableOdds((prev) => ({ ...prev, [name]: value }));
    };
    const handleTotalStakeChange = (e) => {
        const newTotalStake = e.target.value;
        setTotalStake(newTotalStake);

        // Calculate stakes based on odds
        const parsedOverOdds = parseFloat(editableOdds.odds1);
        const parsedUnderOdds = parseFloat(editableOdds.odds2);

        if (!isNaN(parsedOverOdds) && !isNaN(parsedUnderOdds) && !isNaN(newTotalStake) && newTotalStake !== '') {
            const totalStakeNum = parseFloat(newTotalStake);
            const inverseSum = 1 / parsedOverOdds + 1 / parsedUnderOdds;
            const stake1 = (1 / parsedOverOdds / inverseSum) * totalStakeNum;
            const stake2 = (1 / parsedUnderOdds / inverseSum) * totalStakeNum;

            setStakes({ stake1: stake1.toFixed(2), stake2: stake2.toFixed(2) });
        } else {
            setStakes({ stake1: '', stake2: '' });
        }
    };

    const handleStakeChange = (e) => {
        const { name, value } = e.target;
        setStakes((prev) => ({ ...prev, [name]: value }));

        // Update total stake based on the sum of stakes
        const otherStake = name === 'stake1' ? stakes.stake2 : stakes.stake1;
        const newTotalStake = parseFloat(value) + parseFloat(otherStake);
        if (!isNaN(newTotalStake)) {
            setTotalStake(newTotalStake.toFixed(2));
        } else {
            setTotalStake('');
        }
    };
    const calculateOdds = (totalStake, overOdds, underOdds) => {
        const parsedTotalStake = parseFloat(totalStake);
        const parsedOverOdds = parseFloat(overOdds);
        const parsedUnderOdds = parseFloat(underOdds);

        if (!isNaN(parsedTotalStake) && !isNaN(parsedOverOdds) && !isNaN(parsedUnderOdds)) {
            const sumOfInverses = 1 / parsedOverOdds + 1 / parsedUnderOdds;
            const profitMargin = 1 / sumOfInverses - 1;
            const amountOnBetway = (1 / parsedOverOdds / sumOfInverses) * parsedTotalStake;
            const amountOnOther = (1 / parsedUnderOdds / sumOfInverses) * parsedTotalStake;

            const returnOnBetway = parseFloat(stakes.stake1) * parsedOverOdds;
            const returnOnOther = parseFloat(stakes.stake2) * parsedUnderOdds;

            setCalculationResult({
                profitMargin: (profitMargin * 100).toFixed(2),
                amountOnBetway: amountOnBetway.toFixed(2),
                amountOnOther: amountOnOther.toFixed(2),
                /* @ts-ignore */
                returnOnBetway: returnOnBetway.toFixed(2),
                returnOnOther: returnOnOther.toFixed(2)
            });
        } else {
            setCalculationResult({
                profitMargin: '---',
                amountOnBetway: '---',
                amountOnOther: '---',
                /* @ts-ignore */
                returnOnBetway: '---',
                returnOnOther: '---'
            });
        }
    };

    useEffect(() => {
        calculateOdds(totalStake, editableOdds.odds1, editableOdds.odds2);
    }, [totalStake, editableOdds]);

    useEffect(() => {
        const { stake1, stake2 } = stakes;
        calculateOdds(totalStake, editableOdds.odds1, editableOdds.odds2);

        if (stake1 !== '' && stake2 !== '') {
            const parsedStake1 = parseFloat(stake1);
            const parsedStake2 = parseFloat(stake2);
            const parsedOdds1 = parseFloat(editableOdds.odds1);
            const parsedOdds2 = parseFloat(editableOdds.odds2);

            if (!isNaN(parsedStake1) && !isNaN(parsedStake2) && !isNaN(parsedOdds1) && !isNaN(parsedOdds2)) {
                const returnOnBetway = parsedStake1 * parsedOdds1;
                const returnOnOther = parsedStake2 * parsedOdds2;

                setCalculationResult((prev) => ({
                    ...prev,
                    returnOnBetway: returnOnBetway.toFixed(2),
                    returnOnOther: returnOnOther.toFixed(2)
                }));
            } else {
                setCalculationResult((prev) => ({
                    ...prev,
                    returnOnBetway: '---',
                    returnOnOther: '---'
                }));
            }
        }
    }, [stakes, editableOdds]);
    return (
        <div>
            <div className="game-button" onClick={handleBoxClick}>
                {gameName} - <span className="profit-margin">{gameData[0] ? gameData[0]["Profit"] : 0}%</span>
            </div>
            {showDetails && (
                <>
                    <div className="links-box">
                        {Object.entries(links).map(([key, value], idx) => {
                            if (key === "BetUK") {
                                return (
                                    // @ts-ignore
                                    <button key={idx} className="link-button" onClick={() => toggleBetUKPopup(true, value)}>
                                        {key}
                                    </button>
                                );
                            }
                            else if (key === "Betfair") {
                                return (
                                    // @ts-ignore
                                    <button key={idx} className="link-button" onClick={() => toggleBetfairPopup(true, value)}>
                                        {key}
                                    </button>
                                );
                            }
                            else if (key === "Lottoland") {
                                return (
                                    // @ts-ignore
                                    <button key={idx} className="link-button" onClick={() => toggleLottolandPopup(true, value)}>
                                        {key}
                                    </button>
                                );
                            }
                            else if (key === "Livescore") {
                                return (
                                    // @ts-ignore
                                    <button key={idx} className="link-button" onClick={() => toggleLivescorePopup(true, value)}>
                                        {key}
                                    </button>
                                );
                            }
                            else if (key === "BetVictor") {
                                return (
                                    // @ts-ignore
                                    <button key={idx} className="link-button" onClick={() => toggleBetvictorPopup(true, value)}>
                                        {key}
                                    </button>
                                );
                            }
                            else {
                                return (
                                    // @ts-ignore
                                    <a key={idx} href={value} target="_blank" rel="noopener noreferrer" className="link-button">
                                        {key}
                                    </a>
                                );
                            }
                        })}
                    </div>
                    <div className="game-details">
                        {gameData.map((entry, index) => (
                            <div key={index} className="game-detail">
                                {entry.locked ? (
                                    <div>
                                        <span className="lock-icon">🔒</span>
                                        <span>{`Profit: ${entry["Profit"]}%`}</span>
                                    </div>
                                ) : (
                                    Object.entries(entry).map(([key, value], idx) => (
                                        <div key={idx}>
                                            {/* @ts-ignore */}
                                            <strong>{key}: </strong>
                                            {/* @ts-ignore */}
                                            {value === "Total Cards" || String(value).includes("Player") ? (
                                                <span className="highlighted" onClick={() => handleValueClick(value)}>
                                                    {`${value} ⚠️`}
                                                </span>
                                            ) : (
                                                value
                                            )}
                                        </div>
                                    ))
                                )}
                                {showSaveButton && <button className="edit-button" onClick={() => handleEditClick(entry)}>Save Arb</button>}

                            </div>
                        ))}
                    </div>
                    {showPopup && (
                        <div className="overlay">
                            <div className="popup">
                                <p>WARNING: Make sure you understand card arbs before placing and have read <a className="popup-text" href='/guides/cards'>this guide!</a></p>
                                <button onClick={() => setShowPopup(false)}>OK</button>
                            </div>
                        </div>
                    )}
                    {showPopupPlayer && (
                        <div className="overlay">
                            <div className="popup">
                            <p>WARNING: Player names are checked by surname - this leads to rare mismatches between players with the same surname. Make sure you're betting on the same player! Also, make sure you understand player arbs before placing and have read <a className="popup-text" href='/guides/players'>this guide!</a></p>
                            <button onClick={() => setShowPopupPlayer(false)}>OK</button>
                            </div>
                        </div>
                    )}
                    {showBetUKPopup && (
                        <div className="overlay" onClick={() => setShowBetUKPopup(false)}>
                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <button
                                    className="link-button"
                                    onClick={() => window.open(betUKUrl, '_blank')}
                                >
                                    BetUK
                                </button>
                                <button
                                    className="link-button"
                                    onClick={() => {
                                        const eventId = betUKUrl.match(/event\/(\d+)/)[1];
                                        const unibetUrl = `https://www.unibet.co.uk/betting/sports/event/${eventId}`;
                                        window.open(unibetUrl, '_blank');
                                    }}
                                >
                                    Unibet
                                </button>
                                <button
                                    className="link-button"
                                    onClick={() => {
                                        const eventId = betUKUrl.match(/event\/(\d+)/)[1];
                                        const casumoUrl = `https://www.casumo.com/en-gb/sports/#event/${eventId}`;
                                        window.open(casumoUrl, '_blank');
                                    }}
                                >
                                    Casumo
                                </button>
                                <button
                                    className="link-button"
                                    onClick={() => {
                                        const eventId = betUKUrl.match(/event\/(\d+)/)[1];
                                        const grosvenorUrl = `https://www.grosvenorcasinos.com/sport#event/${eventId}`;
                                        window.open(grosvenorUrl, '_blank');
                                    }}
                                >
                                    Grosvenor
                                </button>
                                <button
                                    className="link-button"
                                    onClick={() => {
                                        const eventId = betUKUrl.match(/event\/(\d+)/)[1];
                                        const red32Url = `https://www.32red.com/sport#home/event/${eventId}`;
                                        window.open(red32Url, '_blank');
                                    }}
                                >
                                    32Red
                                </button>
                                <button
                                    className="link-button"
                                    onClick={() => {
                                        const eventId = betUKUrl.match(/event\/(\d+)/)[1];
                                        const betMGMUrl = `https://www.betmgm.co.uk/sports#event/${eventId}`;
                                        window.open(betMGMUrl, '_blank');
                                    }}
                                >
                                    BetMGM
                                </button>
                                <button
                                    className="link-button"
                                    onClick={() => {
                                        const eventId = betUKUrl.match(/event\/(\d+)/)[1];
                                        const leovegasUrl = `https://www.leovegas.com/en-gb/betting#event/${eventId}`;
                                        window.open(leovegasUrl, '_blank');
                                    }}
                                >
                                    LeoVegas
                                </button>
                            </div>
                        </div>
                    )}
                    {showBetfairPopup && (
                        <div className="overlay" onClick={() => setShowBetfairPopup(false)}>
                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <button className="link-button" onClick={() => {
                                    // Directly use the provided PaddyPower URL for the PaddyPower button
                                    window.open(betfairUrl, '_blank');
                                }}>PaddyPower</button>
                                <button className="link-button" onClick={() => {
                                    // Extract parts from the provided PaddyPower URL for the Betfair button
                                    const parts = betfairUrl.match(/\/football\/(.*?)\/(.*?)-(\d+)/);
                                    if (parts) {
                                        const league = parts[1]; // Use league directly as extracted
                                        const match = parts[2]; // Use match directly as extracted
                                        const eventId = parts[3];
                                        // Construct the new Betfair URL with the format provided
                                        const newBetfairUrl = `https://www.betfair.com/betting/football/${league}/${match}/e-${eventId}`;
                                        window.open(newBetfairUrl, '_blank');
                                    }
                                }}>Betfair</button>
                            </div>
                        </div>
                    )}
                    {showLottoland && (
                        <div className="overlay" onClick={() => setShowLottolandPopup(false)}>
                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <button className="link-button" onClick={() => window.open(lottolandUrl, '_blank')}>Lottoland</button>
                                <button className="link-button" onClick={() => {
                                    // Extract the necessary parts from the lottolandUrl
                                    const urlParts = lottolandUrl.match(/eventId=(\d+)&page=event&sportId=(\d+)/);
                                    const eventId = urlParts[1];
                                    const sportId = urlParts[2];
                                    // Construct the Yako URL with the extracted parts
                                    const yakoUrl = `https://www.yakocasino.com/en/sports-book/sports?page=event&eventId=${eventId}&sportId=${sportId}`;
                                    window.open(yakoUrl, '_blank');
                                }}>Yako</button>
                                <button className="link-button" onClick={() => {
                                    // Extract the necessary parts from the lottolandUrl                                    
                                    const allBritishUrl = `https://www.allbritishcasino.com/en/sports-book/sports#/sport/66`;
                                    window.open(allBritishUrl, '_blank');
                                }}>AllBritishCasino</button>
                            </div>
                        </div>
                    )}
                    {showLivescore && (
                        <div className="overlay" onClick={() => setShowLivescorePopup(false)}>
                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <button className="link-button" onClick={() => window.open(livescoreUrl, '_blank')}>Livescore</button>
                                <button className="link-button" onClick={() => {
                                    const urlParts = livescoreUrl.match(/\/uk\/sports\/football\/(.+\/.+\/SBTE_2_\d+)/);
                                    const path = urlParts[1];
                                    const virginBetUrl = `https://www.virginbet.com/sports/football/${path}?marketGroupId=583`;
                                    window.open(virginBetUrl, '_blank');
                                }}>VirginBet</button>
                            </div>
                        </div>
                    )}
                    {showBetvictor && (
                        <div className="overlay" onClick={() => setShowBetvictorPopup(false)}>
                            <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <button className="link-button" onClick={() => window.open(betvictorUrl, '_blank')}>BetVictor</button>
                                <button className="link-button" onClick={() => {
                                    // Extract the meetings and events IDs
                                    const urlParts = betvictorUrl.match(/\/meetings\/(\d+)\/events\/(\d+)/);
                                    const meetingId = urlParts[1];
                                    const eventId = urlParts[2];
                                    // Construct and open the PariMatch URL
                                    const pariMatchUrl = `https://www.parimatch.co.uk/en-gb/sports/240/meetings/${meetingId}/events/${eventId}?market_group=5658`;
                                    window.open(pariMatchUrl, '_blank');
                                }}>PariMatch</button>
                                <button className="link-button" onClick={() => {
                                    // Assuming the same structure for extraction
                                    const urlParts = betvictorUrl.match(/\/meetings\/(\d+)\/events\/(\d+)/);
                                    const meetingId = urlParts[1];
                                    const eventId = urlParts[2];
                                    // Construct and open the talkSport URL
                                    const talkSportUrl = `https://www.talksportbet.com/en-gb/sports/240/meetings/${meetingId}/events/${eventId}?market_group=11233`;
                                    window.open(talkSportUrl, '_blank');
                                }}>talkSport</button>
                            </div>
                        </div>
                    )}

                </>
            )}
            {showOverlay && (
                <div className="overlay-edit">
                    <div className="overlay-content-edit">
                        <div>
                            <strong>Bookie 1: </strong>{currentEntry['Bookie Over']}
                        </div>
                        <div>
                            <strong>Bookie 2: </strong>{currentEntry['Bookie Under']}
                        </div>
                        <div>
                            <strong>Market: </strong>{currentEntry['Market']}
                        </div>
                        <div>
                            <label>
                                Odds 1:
                                <input
                                    type="number"
                                    step="any"
                                    name="odds1"
                                    value={editableOdds.odds1}
                                    onChange={handleOddsChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Odds 2:
                                <input
                                    type="text"
                                    name="odds2"
                                    value={editableOdds.odds2}
                                    onChange={handleOddsChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Total Stake:
                                <input
                                    type="text"
                                    name="totalStake"
                                    value={totalStake}
                                    onChange={handleTotalStakeChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Stake 1:
                                <input
                                    type="text"
                                    name="stake1"
                                    value={stakes.stake1}
                                    onChange={handleStakeChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Stake 2:
                                <input
                                    type="text"
                                    name="stake2"
                                    value={stakes.stake2}
                                    onChange={handleStakeChange}
                                />
                            </label>
                        </div>

                        <div>
                            <strong>Profit Margin: </strong>{calculationResult.profitMargin}%
                        </div>
                        <div>
                            {/* @ts-ignore */}
                            <strong>Bookie 1 Return: </strong>{calculationResult.returnOnBetway}
                        </div>
                        <div>
                            {/* @ts-ignore */}
                            <strong>Bookie 2 Return: </strong>{calculationResult.returnOnOther}
                        </div>
                        <button onClick={handleOverlaySave}>Save</button>
                        <button onClick={handleOverlayClose}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};




export default GameComponent;
