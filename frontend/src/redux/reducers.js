import { LOGIN_USER, REGISTER_USER } from './actionTypes';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
   
    token: null, // Optional: store token if needed
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                error: null,
                token: action.payload.token, // Store token if needed
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
            };
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                error: null, // Clear error on successful registration
            };
        case 'REGISTER_ERROR':
            return {
                ...state,
                error: action.payload, // Set error message from action
            };
        default:
            return state;
    }
};

export default authReducer;
