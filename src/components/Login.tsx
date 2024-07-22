import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

interface Props {
    isLightOn: boolean;
    handleUserLogin: () => void;
}

const Login: React.FC<Props> = ({ handleUserLogin, isLightOn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get('http://localhost:5050/users', {
                params: {
                    username,
                    password
                }
            });

            const user = response.data.find((user: { username: string; password: string }) => 
                user.username === username && user.password === password
            );

            if (user) {
                handleUserLogin();
                navigate('/management');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className={`login-container ${isLightOn ? 'light' : 'dark'}`}>
            <h2 className='login-title'>Login</h2>
            <form className='loginForm' onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
