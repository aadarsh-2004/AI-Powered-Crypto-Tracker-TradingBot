// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
    const { user,loading} = useAuth();

    // Wait for the auth state to resolve
    if (loading) {
        return <div>Loading...</div>; // Display a loader or placeholder
    }

    if (!user) {
        // Redirect to login if user is not logged in
        return <Navigate to="/" />;
    }

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
