import { useState, useEffect } from 'react';

import { AuthContext } from "./AuthContext.js"

import api from '../api/api';

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const request = await api.get('/api/me');
                setUser(request.data?.user);
                setToken(request.data.token);
            } catch (error) {
                console.log("error in auth :", error);
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    }
    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, loading, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider