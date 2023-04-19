import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../screens/User/Home/Home';
import Login from '../screens/User/Login/Login';
import Layout from '../Layout';
import UserAccount from '../screens/User/UserAccount/UserAccount';
import ProductDetails from '../screens/User/ProductDetails/ProductDetails';
import BecomeHost from '../screens/User/BecomeHost/BecomeHost';
import HostUpload from '../screens/User/HostUpload/HostUpload';
import Register from '../screens/User/Register/Register';
import { dividerClasses } from '@mui/material';
import Checkout from '../screens/User/Checkout/Checkout';
import PaymentSuccess from '../screens/User/PaymentSuccess/PaymentSuccess';
import AuthWrapper from '../auth/AuthWrapper';

function hostRoutes() {


    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    const isAuthenticated = userInfoFromStorage !== null;
    const user = userInfoFromStorage

    const userRole = {
        isAdmin: user?.isAdmin,
        isHost: user?.isHost
    }

    return (
        <Routes>

            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/useraccount' element={<UserAccount />} />
            <Route path='/productdetails/:id' element={<ProductDetails />} />
            <Route path='/becomehost' element={<BecomeHost />} />
            <Route
                path="/host/dashboard"
                element={
                    <AuthWrapper
                        user={userRole}
                        allowedRoles={['isHost']}
                    >
                        <HostUpload />
                    </AuthWrapper>
                }
            />
            <Route path='/register' element={<Register />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout_success' element={<PaymentSuccess />} />
        </Routes>
    )
}

export default hostRoutes