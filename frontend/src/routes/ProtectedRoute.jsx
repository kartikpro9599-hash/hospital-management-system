// ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth.js';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading session...</div>; // Prevents premature redirection

    return user ? <Outlet /> : <Navigate to="/" replace />;
};
