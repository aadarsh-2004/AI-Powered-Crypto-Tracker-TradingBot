import "./App.css";
import { AuthProvider } from ".././AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import PrivateRoute from ".././PrivateRoute";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    
  );
}

export default App;
