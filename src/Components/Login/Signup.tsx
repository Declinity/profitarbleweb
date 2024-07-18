import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        /* if (Object.keys(errors).length > 0 || !validateForm()) {
            alert("Please correct the errors in the form.");
            return;
        } */

        try {
            const response = await fetch('https://profitarble.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    surname: formData.surname,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(errorResponse || `HTTP error! status: ${response.status}`);
            }

            setMessage('A verification email has been sent. Please check your inbox.');

        } catch (error) {
            console.error('There was an error!', error);
            alert(error.message);
        }
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'name':
            case 'surname':
                if (value.length < 2) {
                    errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters long.`;
                } else if (/[^a-zA-Z]/.test(value)) {
                    errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} must contain only letters.`;
                }
                break;
            case 'username':
                if (value.length < 3) {
                    errorMsg = 'Username must be at least 3 characters long.';
                }
                break;
            case 'email':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    errorMsg = 'Invalid email address.';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    errorMsg = 'Password must be at least 6 characters long.';
                } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
                    errorMsg = 'Password must contain at least one uppercase letter and one number.';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    errorMsg = "Passwords don't match.";
                }
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMsg
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        for (const [name, value] of Object.entries(formData)) {
            validateField(name, value);
            if (errors[name]) {
                newErrors[name] = errors[name];
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResendEmail = async () => {
        if (resendCooldown > 0) return;

        try {
            const response = await fetch('https://profitarble.onrender.com/api/resend-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
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
        <div className='signup-container'>
        <div className="sign-up">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {/* @ts-ignore */}
                    {errors.name && <p className="error">{errors.name}</p>}
                </label>
                <label>
                    Surname:
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                    {/* @ts-ignore */}
                    {errors.surname && <p className="error">{errors.surname}</p>}
                </label>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {/* @ts-ignore */}
                    {errors.username && <p className="error">{errors.username}</p>}
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {/* @ts-ignore */}
                    {errors.email && <p className="error">{errors.email}</p>}
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {/* @ts-ignore */}
                    {errors.password && <p className="error">{errors.password}</p>}
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {/* @ts-ignore */}
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </label>
                <button
                    type="submit"
                    disabled={
                        !formData.name ||
                        !formData.surname ||
                        !formData.username ||
                        !formData.email ||
                        !formData.password ||
                        !formData.confirmPassword
                    }
                >
                    Sign Up
                </button>
            </form>
            {message && <p className="message">{message}</p>}
            {message && (
                <button
                    className="resend-button"
                    onClick={handleResendEmail}
                    disabled={resendCooldown > 0}
                >
                    {resendCooldown > 0 ? `Resend Email (${resendCooldown}s)` : "Haven't received email? Send again"}
                </button>
            )}
        </div>
        </div>
    );
};

export default Signup;
