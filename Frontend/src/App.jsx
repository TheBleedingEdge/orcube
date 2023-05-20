import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
// User routes
import Home from './screens/User/Home/Home';
import Login from './screens/User/Login/Login';
import UserAccount from './screens/User/UserAccount/UserAccount';
import ProductDetails from './screens/User/ProductDetails/ProductDetails';
import Register from './screens/User/Register/Register';
import Checkout from './screens/User/Checkout/Checkout';
import PaymentSuccess from './screens/User/PaymentSuccess/PaymentSuccess';
// Admin routes
import Dashboard from './screens/Admin/Account/Account';
// Host route
import HostUpload from './screens/User/HostUpload/HostUpload';
// Common routes
import Page404 from './components/common/page404';
// Auth Wrapper
import AuthWrapper from './auth/AuthWrapper';
import ResetPassword from './screens/User/PasswordReset/ResetPassword';
import Changepassword from './screens/User/PasswordReset/changepassword';

function App() {
  const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));
  const isAuthenticated = userInfoFromStorage !== null;
  const user = userInfoFromStorage;
  const userRole = {
    isAdmin: user?.isAdmin,
    isHost: user?.isHost
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />

        {/* User routes */}
        <Route path="/user/account" element={<UserAccount />} />
        <Route path="/user/resetpassword" element={<ResetPassword />} />
        <Route path="/user/changepassword" element={ <Changepassword/> } />
        <Route path="/user/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" replace />} />
        <Route path="/user/checkout_success" element={isAuthenticated ? <PaymentSuccess /> : <Navigate to="/login" replace />} />

        {/* Admin routes */}
        <Route path="/admin/account" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={isAuthenticated && userRole.isAdmin ? <Dashboard /> : <Navigate to="/login" replace />} />

        {/* Host routes */}
        <Route path="/host/upload" element={isAuthenticated && userRole.isHost ? <HostUpload /> : <Navigate to="/login" replace />} />

        {/* Page not found */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
