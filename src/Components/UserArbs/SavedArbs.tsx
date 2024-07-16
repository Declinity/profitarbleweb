import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext.tsx';
import "./SavedArbs.css"

const statusOptions = ["Void", "Lost", "Won"];

const SavedArbs = () => {
    const { username, authChecked } = useContext(UserContext);
    const [arbs, setArbs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authChecked && username) {
            setIsLoading(true);
            fetch('https://profitarble.onrender.com/api/user-arbs', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setArbs(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching arbs:', error);
                    setIsLoading(false);
                });
        }
    }, [username, authChecked]);

    const handleSaveChanges = async () => {
        const response = await fetch('https://profitarble.onrender.com/api/update-user-arbs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arbs)
        });
        if (response.ok) {
            alert('Arbs updated successfully!');
        } else {
            alert('Failed to update arbs');
        }
    };

    const calculateProfit = (arb) => {
        const { 'Odds 1': odds1, 'Odds 2': odds2, 'Stake 1': stake1, 'Stake 2': stake2, 'Total Stake': totalStake, 'Bookie 1 Status': status1, 'Bookie 2 Status': status2 } = arb;
        const total = parseFloat(totalStake);
        const s1 = parseFloat(stake1);
        const s2 = parseFloat(stake2);
        const o1 = parseFloat(odds1);
        const o2 = parseFloat(odds2);

        let profit = 0;
        if (status1 === "Won") {
            if (status2 === "Lost") {
                profit = o1 * s1 - total;
            } else if (status2 === "Won") {
                profit = o1 * s1 + o2 * s2 - total;
            } else if (status2 === "Void") {
                profit = o1 * s1 - (total - s2);
            }
        } else if (status1 === "Lost") {
            if (status2 === "Lost") {
                profit = -total;
            } else if (status2 === "Won") {
                profit = o2 * s2 - total;
            } else if (status2 === "Void") {
                profit = -total + s2;
            }
        } else if (status1 === "Void") {
            if (status2 === "Lost") {
                profit = -total + s1;
            } else if (status2 === "Won") {
                profit = o2 * s2 - (total - s1);
            } else if (status2 === "Void") {
                profit = 0;
            }
        }
        return profit.toFixed(2);
    };

    const calculateTotalStake = (stake1, stake2) => {
        return (parseFloat(stake1) + parseFloat(stake2)).toFixed(2);
    };

    const handleStatusChange = (index, bookie, value) => {
        const newArbs = [...arbs];
        newArbs[index][bookie] = value;
        newArbs[index].Profit = calculateProfit(newArbs[index]);
        setArbs(newArbs);
    };

    const handleInputChange = (index, field, value) => {
        const newArbs = [...arbs];
        newArbs[index][field] = value;

        // Update the total stake when Stake 1 or Stake 2 is changed
        if (field === 'Stake 1' || field === 'Stake 2') {
            newArbs[index]['Total Stake'] = calculateTotalStake(newArbs[index]['Stake 1'], newArbs[index]['Stake 2']);
        }

        newArbs[index].Profit = calculateProfit(newArbs[index]);
        setArbs(newArbs);
    };

    const handleDelete = (index) => {
        const newArbs = arbs.filter((_, arbIndex) => arbIndex !== index);
        setArbs(newArbs);
    };

    const totalStake = arbs.reduce((sum, arb) => sum + parseFloat(arb['Total Stake']), 0);
    const totalProfit = arbs.reduce((sum, arb) => sum + parseFloat(arb.Profit), 0);

    if (!authChecked) return <div>Checking authentication...</div>;
    if (!username) return <div>No Auth</div>;

    return (
        <div className="container">
            {isLoading ? <div>Loading...</div> : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th>Market</th>
                                <th>Total Stake</th>
                                <th>Bookie 1</th>
                                <th>Bookie 1 Odds</th>
                                <th>Stake 1</th>
                                <th>Bookie 2</th>
                                <th>Bookie 2 Odds</th>
                                <th>Stake 2</th>
                                <th>Bookie 1 Status</th>
                                <th>Bookie 2 Status</th>
                                <th>Profit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arbs.map((arb, index) => (
                                <tr key={index}>
                                    <td>{arb.Game}</td>
                                    <td>{arb.Market}</td>
                                    <td>{arb['Total Stake']}</td>
                                    <td>{arb['Bookie 1']}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={arb['Odds 1']}
                                            onChange={e => handleInputChange(index, 'Odds 1', e.target.value)}
                                            className="compact-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={arb['Stake 1']}
                                            onChange={e => handleInputChange(index, 'Stake 1', e.target.value)}
                                            className="compact-input"
                                        />
                                    </td>
                                    <td>{arb['Bookie 2']}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={arb['Odds 2']}
                                            onChange={e => handleInputChange(index, 'Odds 2', e.target.value)}
                                            className="compact-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={arb['Stake 2']}
                                            onChange={e => handleInputChange(index, 'Stake 2', e.target.value)}
                                            className="compact-input"
                                        />
                                    </td>
                                    <td>
                                        <select value={arb['Bookie 1 Status']} onChange={e => handleStatusChange(index, 'Bookie 1 Status', e.target.value)}>
                                            {statusOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select value={arb['Bookie 2 Status']} onChange={e => handleStatusChange(index, 'Bookie 2 Status', e.target.value)}>
                                            {statusOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{arb.Profit}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="total-row">
                                <td>Total</td>
                                <td>---</td>
                                <td>{totalStake.toFixed(2)}</td>
                                <td>---</td>
                                <td>---</td>
                                <td>---</td>
                                <td>---</td>
                                <td>---</td>
                                <td>---</td>
                                <td>---</td>
                                <td>---</td>
                                <td>{totalProfit.toFixed(2)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="save-changes" onClick={handleSaveChanges}>Save Changes</button>
                </>
            )}
        </div>
    );
};

export default SavedArbs;
