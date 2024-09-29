import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { registerUser } from '../redux/actions'; // Adjust the path as necessary

function Register() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    // Safely access the auth state
    const authState = useSelector((state) => state.auth) || {}; // Default to an empty object
    const authError = authState.error; // Safely access error

    // Registration handler with client-side validation
    const handleRegistration = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!username || !password || !email || !fullName) {
            console.error('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            console.error('Passwords do not match.');
            return;
        }

        // Dispatch registration action
        await dispatch(registerUser({ fullName, username, email, password }));

        // Check for errors and navigate to login if successful
        if (!authError) {
            // Clear the form
            clearForm();
            // Navigate to the login page
            navigate('/'); // Use navigate for routing
        }
    };

    // Function to clear the form
    const clearForm = () => {
        setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email" // Change type to email
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>

            {/* Optional: Show error message */}
            {authError && <p style={{ color: 'red' }}>{authError}</p>}
        </>
    );
}

export default Register;
