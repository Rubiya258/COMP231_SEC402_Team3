import React from 'react';
import logo from '../assets/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from '../service/AuthApiService';

const HeaderComponent = () => {
    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    function handleProfileClick() {
        navigate('/profile'); 
    }

    return (
        <div>
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: 'white',
                padding: '1rem 0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 1000
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <NavLink to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        <img src={logo} alt="logo" width={30} height={30} />
                    </NavLink>

                    <ul style={{
                        display: 'flex',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        gap: '2rem',
                        alignItems: 'center'
                    }}>
                        {!isAuth && (
                            <li>
                                <NavLink to="/create-account" style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem'
                                }}>
                                    Create account
                                </NavLink>
                            </li>
                        )}

                        {!isAuth && (
                            <li>
                                <NavLink to="/login" style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem'
                                }}>
                                    Login
                                </NavLink>
                            </li>
                        )}

                        {isAuth && (
                            <li>
                                <button
                                    onClick={handleProfileClick}
                                    style={{
                                        border: '2px solid #6c757d',
                                        backgroundColor: 'transparent',
                                        color: '#6c757d',
                                        borderRadius: '20px',
                                        padding: '5px 12px',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    👤 Profile
                                </button>
                            </li>
                        )}

                        {isAuth && (
                            <li>
                                <NavLink to="/login" onClick={handleLogout} style={{
                                    border: '2px solid #6c757d',
                                    backgroundColor: 'transparent',
                                    borderRadius: '20px',
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: '500',
                                    padding: '5px 12px',
                                    
                                }}>
                                    Logout
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default HeaderComponent;