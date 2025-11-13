/// service/AuthApiService.js

const API_BASE_URL = 'http://localhost:8080/api';

// Register user
export const registerApi = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Important for sessions
    });
    
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    
    return await response.text(); // Expecting string response
};

// Login user
export const loginApi = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Important for sessions
    });
    
    if (!response.ok) {
        throw new Error('Login failed');
    }
    
    return await response.text(); // Expecting string response
};

// Store user in localStorage (optional, for frontend use)
export const saveLoggedUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
};

// Get logged user from localStorage
export const getLoggedUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Remove user from localStorage (logout)
export const removeLoggedUser = () => {
    localStorage.removeItem('user');
};

// Check if user is logged in
export const isUserLoggedIn = () => {
    return localStorage.getItem('user') !== null;
};

// Get logged in user ID (Add this function)
export const getLoggedInUserId = () => {
    const user = getLoggedUser();
    return user ? user.id : null;
};

// Logout function (Add this function)
export const logout = () => {
    removeLoggedUser();
    // You might want to add a backend logout call here later
    // await fetch(`${API_BASE_URL}/users/logout`, { method: 'POST', credentials: 'include' });
};