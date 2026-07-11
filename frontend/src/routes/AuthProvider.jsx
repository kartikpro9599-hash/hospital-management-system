import { useState, useEffect } from 'react';

import { AuthContext } from "./AuthContext.js"

import api from '../api/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const verifyUser = async () => {
            try {
                const request = await api.get('/api/me');
                setUser(request.data.user);
            } catch (error) {
                console.log("error in auth :", error);
                setUser(null);
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
        <AuthContext.Provider value={{ user, loading, login }}>
            {children}
        </AuthContext.Provider>
    );
};

