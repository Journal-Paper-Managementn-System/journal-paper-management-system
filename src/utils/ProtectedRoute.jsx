import React from 'react'
import { useAuth } from '../store/AuthContext';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isLoggedIn, user } = useAuth();
    const { pathname } = useLocation();
    const { articleId } = useParams();

    if (!isLoggedIn) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/login" replace state={{ redirectTo: pathname }} />;
    }

    if (user.isEditor) {
        // Editors can only access these pages
        if (!['/dashboard/profile', '/dashboard/assign-reviewer', '/dashboard', '/dashboard/view-articles', '/dashboard/add-reviewer', '/dashboard/accepted-articles', `/dashboard/assign-reviewer/${articleId}`].includes(pathname)) {
            return <Navigate to="/" replace />;
        }
    } else if (user.isSuperAdmin) {
        // Super admins can only access these pages
        if (!['/add-editor'].includes(pathname)) {
            return <Navigate to="/" replace />;
        }
    } else {
        // Simple users can't access these pages
        if (['/dashboard/assign-reviewer', '/dashboard/view-articles', '/dashboard/add-reviewer', '/dashboard/accepted-articles', '/add-editor', `/dashboard/assign-reviewer/${articleId}`].includes(pathname)) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
}

export default ProtectedRoute;