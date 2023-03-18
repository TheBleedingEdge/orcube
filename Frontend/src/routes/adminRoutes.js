import React from 'react'
import Dashboard from '../screens/Admin/dashboard/dashboard';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from '../Layout';
import Login from '../screens/User/Login/Login';

function adminRoutes() {
    return (
        <Routes>
            <Route path='/' />
            <Route path='/admin' element={<Login />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />

        </Routes>
    )
}

export default adminRoutes