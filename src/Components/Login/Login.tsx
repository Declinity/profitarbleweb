import React, { useState, useEffect } from 'react';
import './Signup.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [email, setEmail] = useState('');
    const [showResendButton, setShowResendButton] = useState(false);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://profitarble.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                if (errorResponse === 'Email not verified') {
                    // Fetch the email based on the username
                    const emailResponse = await fetch(`https://profitarble.onrender.com/api/get-email?username=${formData.username}`);
                    if (emailResponse.ok) {
                        const { email } = await emailResponse.json();
                        setEmail(email);
                        setShowResendButton(true); // Show the resend button
                    } else {
                        throw new Error('Failed to fetch email');
                    }
                    setMessage('Your email is not verified. Please check your email for verification link.');
                }
                throw new Error(errorResponse || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            localStorage.setItem('accessToken', result.token);
        } catch (error) {
            console.error('There was an error!', error);
            if (error.message === 'Email not verified') {
                setMessage('Your email is not verified. Please check your email for verification link.');
            } else {
                alert(error.message);
            }
        }
    };

    const handleResendEmail = async () => {
        if (resendCooldown > 0) return;

        try {
            const response = await fetch('https://profitarble.onrender.com/api/resend-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(errorResponse || `HTTP error! status: ${response.status}`);
            }

            setMessage('A verification email has been resent. Please check your inbox.');
            setResendCooldown(120);

        } catch (error) {
            console.error('There was an error!', error);
            alert(error.message);
        }
    };

    return (
        <div className="sign-up">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" disabled={!formData.username || !formData.password}>
                    Login
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            {showResendButton && (
                <button
                    className="resend-button"
                    onClick={handleResendEmail}
                    disabled={resendCooldown > 0}
                >
                    {resendCooldown > 0 ? `Resend Email (${resendCooldown}s)` : "Haven't received email? Send again"}
                </button>
            )}
        </div>
    );
};

export default Login;
