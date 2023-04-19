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

function userRoutes() {

    return (
        <Routes>

            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/useraccount' element={<UserAccount />} />
            <Route path='/productdetails/:id' element={<ProductDetails />} />
            <Route path='/becomehost' element={<BecomeHost />} />
            <Route path='/hostupload' element={<HostUpload />} />
            <Route path='/register' element={<Register />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout_success' element={<PaymentSuccess />} />
        </Routes>
    )
}

export default userRoutes