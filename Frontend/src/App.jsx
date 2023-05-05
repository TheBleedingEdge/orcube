import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
//userroute
import Home from './screens/User/Home/Home';
import Login from './screens/User/Login/Login';
import UserAccount from './screens/User/UserAccount/UserAccount';
import ProductDetails from './screens/User/ProductDetails/ProductDetails';
import BecomeHost from './screens/User/BecomeHost/BecomeHost';
import Register from './screens/User/Register/Register';
import Checkout from './screens/User/Checkout/Checkout';
import PaymentSuccess from './screens/User/PaymentSuccess/PaymentSuccess';
import Page404 from './components/common/page404';

//adminroute
import Dashboard from './screens/Admin/account/Account';
import AuthWrapper from './auth/AuthWrapper';

//Hotsroote
import HostUpload from './screens/User/HostUpload/HostUpload';

function App() {

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
    <Router>
      <Routes>
        {/* //public route */}
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/productdetails/:id' element={<ProductDetails />} />

        {/* //userroute */}
        <Route path='/account' element={userInfoFromStorage ? <UserAccount /> : <Navigate to="/login" replace/> } />
        <Route path='/user/becomehost' element={userInfoFromStorage ? <BecomeHost />: <Navigate to="/login" replace/> } />
        <Route path='/user/checkout' element={userInfoFromStorage ? <Checkout />: <Navigate to="/login" replace/> } />
        <Route path='/user/checkout_success' element={userInfoFromStorage? <PaymentSuccess />: <Navigate to="/login" replace/>} />

        {/* //adminroutes */}
        <Route path="/admin/account" element={<AuthWrapper isAuthenticated={isAuthenticated} user={userRole} allowedRoles={['isAdmin']} > <Dashboard /> </AuthWrapper>} />
        <Route path="/admin" element={<AuthWrapper isAuthenticated={isAuthenticated} user={userRole} allowedRoles={['isAdmin']} > <Dashboard /> </AuthWrapper>} />

        {/* //hostroutes */}
        <Route path="/host/upload" element={<AuthWrapper user={userRole} allowedRoles={['isHost']} > <HostUpload /> </AuthWrapper>} />

        {/* //page404 */}
        <Route path="*" element={<Page404/>} />
      </Routes>
    </Router>
  );
}

export default App;
