import React from 'react'
import Dashboard from '../screens/Admin/dashboard/dashboard';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from '../Layout';
import Login from '../screens/User/Login/Login';
import AuthWrapper from '../auth/AuthWrapper';

function adminRoutes() {

    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    const isAuthenticated = userInfoFromStorage !== null;
    const user = userInfoFromStorage

    const userRole = {
      isAdmin : user?.isAdmin,
      isHost : user?.isHost
    }


    return (
        <Routes>
            <Route path='/' />
            <Route
                path="/admin/dashboard"
                element={
                    <AuthWrapper
                        isAuthenticated={isAuthenticated}
                        user={userRole}
                        allowedRoles={['isAdmin']}
                    >
                        <Dashboard />
                    </AuthWrapper>
                }
            />

        </Routes>
    )
}

export default adminRoutes