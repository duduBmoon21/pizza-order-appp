import axios from 'axios';

// Register User Action
export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/register', userData);
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
    }
};

// Login user action
export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/login', userData);
        
        // Get the token from the response
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Dispatch success action with token
        dispatch({ type: 'LOGIN_SUCCESS', payload: token });
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Login failed. Please try again.';
        dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
    }
};