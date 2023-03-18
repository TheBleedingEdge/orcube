import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../screens/User/Home/Home';
import Login from '../screens/User/Login/Login';
import Layout from '../Layout';
import UserAccount from '../screens/User/UserAccount/UserAccount';
import ProductDetails from '../screens/User/ProductDetails/ProductDetails';
import BecomeHost from '../screens/User/BecomeHost/BecomeHost';
import HostUpload from '../screens/User/HostUpload/HostUpload';
import CheckoutPage from '../screens/User/CheckoutPage/CheckoutPage';
import Register from '../screens/User/Register/Register';
import { dividerClasses } from '@mui/material';

function userRoutes() {

    return (
        <Routes>

            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/useraccount' element={<UserAccount />} />
            <Route path='/productdetails' element={<ProductDetails />} />
            <Route path='/becomehost' element={<BecomeHost />} />
            <Route path='/hostupload' element={<HostUpload />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/register' element={<Register />} />

        </Routes>
    )
}

export default userRoutes