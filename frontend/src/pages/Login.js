import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import '../login.css';

// Icons
const FaEye = () => <span>👁️</span>;
const FaEyeSlash = () => <span>👁️‍🗨️</span>;
const FaSignInAlt = () => <span>↪️</span>;

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [shake, setShake] = useState(false);

    const navigate = useNavigate();

    // Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Show / Hide Password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Shake Animation
    const triggerShake = () => {
        setShake(true);

        setTimeout(() => {
            setShake(false);
        }, 500);
    };

    // Login Function
    const handleLogin = async (e) => {

        e.preventDefault();

        const { email, password } = loginInfo;

        if (!email || !password) {
            triggerShake();
            return handleError('Email and password are required');
        }

        setIsLoading(true);

        try {

            const url = `${APIUrl}/auth/login`;

            const response = await fetch(url, {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                credentials: 'include',

                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();

            const {
                success,
                message,
                jwtToken,
                name,
                error
            } = result;

            if (success) {

                handleSuccess(message || 'Login successful');

                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);

                // Success Animation
                document
                    .querySelector('.login-container')
                    .classList.add('success-animation');

                setTimeout(() => {
                    navigate('/home');
                }, 1000);

            } else {

                triggerShake();

                const details =
                    error?.details?.[0]?.message ||
                    message ||
                    'Login failed';

                handleError(details);
            }

        } catch (err) {

            console.error("❌ Error during login:", err);

            triggerShake();

            handleError(
                'Something went wrong. Please try again.'
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="login-page">

            <div className="login-background"></div>

            <div
                className={`login-container ${
                    shake ? 'shake-animation' : ''
                }`}
            >

                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Login to access your account</p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="login-form"
                >

                    {/* Email */}
                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            onChange={handleChange}
                            value={loginInfo.email}
                            type="email"
                            name="email"
                            id="email"
                            className="form-input"
                            placeholder="Enter your email"
                            autoComplete="username"
                        />

                    </div>

                    {/* Password */}
                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-input-container">

                            <input
                                onChange={handleChange}
                                value={loginInfo.password}
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }

                            </button>

                        </div>

                    </div>

                    {/* Options */}
                    <div className="form-options">

                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                            />

                            <label htmlFor="remember">
                                Remember me
                            </label>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="forgot-password"
                        >
                            Forgot password?
                        </Link>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >

                        {isLoading ? (

                            <div className="spinner"></div>

                        ) : (

                            <>
                                <FaSignInAlt />
                                <span> Login</span>
                            </>

                        )}

                    </button>

                </form>

                {/* Signup */}
                <div className="signup-link">
                    Don't have an account?
                    <Link to="/signup">
                        {' '}Sign up
                    </Link>
                </div>

            </div>

            <ToastContainer />

        </div>
    );
}

export default Login;