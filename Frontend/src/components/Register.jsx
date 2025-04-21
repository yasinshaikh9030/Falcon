import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

// Firebase Auth
import { auth, provider } from '../firebase/firebase-config';
import { signInWithPopup } from 'firebase/auth';

const Register = () => {
    const [activeRole, setActiveRole] = useState('Investor');
    const [isSignIn, setIsSignIn] = useState(false);
    const navigate = useNavigate();

    const handleSwitchToSignIn = () => setIsSignIn(true);
    const handleSwitchToRegister = () => setIsSignIn(false);

    const handleCreateAccount = (e) => {
        e.preventDefault();
        alert("Account created successfully!");
        navigate('/home');
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('User:', result.user);
                alert(`Welcome ${result.user.displayName}`);
                navigate('/home');
            })
            .catch((error) => {
                console.error('Google sign-in error:', error);
            });
    };

    return (
        <div className="register-container">
            <h2 className="form-heading">• {isSignIn ? 'Sign In' : 'Register'} •</h2>

            {!isSignIn && (
                <div className="toggle-role">
                    <button
                        className={activeRole === 'Investor' ? 'active' : ''}
                        onClick={() => setActiveRole('Investor')}
                    >
                        Investor
                    </button>
                    <button
                        className={activeRole === 'User' ? 'active' : ''}
                        onClick={() => setActiveRole('User')}
                    >
                        User
                    </button>
                </div>
            )}
            <form className="register-form">
                {!isSignIn ? (
                    <>
                        <label>
                            Name<span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Name" required />

                        <label>
                            Email address<span className="required">*</span>
                        </label>
                        <input type="email" placeholder="Email address" required />

                        <label>
                            Username<span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Username" required />
                        <input type="text" placeholder="Country" required />


                        <input type="text" placeholder="Phone" />

                        <label>
                            Password<span className="required">*</span>
                        </label>
                        <input type="password" placeholder="Password" required />


                        <input type="password" placeholder="Confirm Password" />

                        {activeRole === 'Investor' && (
                            <div className="checkbox-container">
                                <input type="checkbox" id="agree" />
                                <label htmlFor="agree">
                                    I agree that all the provided information is true.
                                </label>
                            </div>
                        )}

                        <button className="submit-button" onClick={handleCreateAccount}>
                            Create Account
                        </button>

                        {activeRole === 'Investor' && (
                            <p className="signin-link">
                                Already have an account?{' '}
                                <span className="link-text" onClick={handleSwitchToSignIn}>
                                    Sign in
                                </span>
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <label>
                            Username / Email<span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Username / Email" required />

                        <label>
                            Password<span className="required">*</span>
                        </label>
                        <input type="password" placeholder="Password" required />

                        <div className="forgot-container">
                            <a href="#" className="forgot-link">
                                Forgot password?
                            </a>
                        </div>
                        <button type="submit" className="submit-button">
                            Sign In
                        </button>
                        <p className="signin-link">
                            Don't have an account?{' '}
                            <span className="link-text" onClick={handleSwitchToRegister}>
                                Register
                            </span>
                        </p>

                        <button onClick={handleGoogleSignIn} className="google-signin-button">
                            <img
                                src="https://img.icons8.com/color/48/google-logo.png"
                                alt="Google"
                            />
                            Continue with Google
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Register;
