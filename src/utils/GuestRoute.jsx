import React from 'react'
import { useAuth } from '../store/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function GuestRoute() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        // If the user is logged in, redirect to the dashboard
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default GuestRoute;