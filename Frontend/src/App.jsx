import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRoutes from './routes/userRoutes';
import AdminRoutes from './routes/adminRoutes';
import Home from './screens/User/Home/Home';
import Login from './screens/User/Login/Login';
import Layout from './Layout';
import UserAccount from './screens/User/UserAccount/UserAccount';
import ProductDetails from './screens/User/ProductDetails/ProductDetails';
import BecomeHost from './screens/User/BecomeHost/BecomeHost';
import HostUpload from './screens/User/HostUpload/HostUpload';
import CheckoutPage from './screens/User/CheckoutPage/CheckoutPage';
import Register from './screens/User/Register/Register';
import Dashboard from './screens/Admin/dashboard/dashboard';

function App() {
  return (
    <Router>
      <UserRoutes />
      <AdminRoutes />
    </Router>
  );
}

export default App;
