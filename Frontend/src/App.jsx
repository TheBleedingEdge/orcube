import './App.css';
import { Route, Routes, BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import UserRoutes from './routes/userRoutes';
import AdminRoutes from './routes/adminRoutes';
import Page404route from './routes/page404route';
import HostRoutes from './routes/hostRoutes';

function App() {
  return (
    <Router>
      <UserRoutes />
      <HostRoutes/>
      <AdminRoutes />
      <Page404route />
    </Router>
  );
}

export default App;
