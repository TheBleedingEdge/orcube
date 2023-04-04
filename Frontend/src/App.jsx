import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRoutes from './routes/userRoutes';
import AdminRoutes from './routes/adminRoutes';

function App() {
  return (
    <Router>
      <UserRoutes />
      <AdminRoutes />
    </Router>
  );
}

export default App;
