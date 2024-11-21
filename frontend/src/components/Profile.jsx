import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Ensure `auth` is correctly imported
import { signOut } from "firebase/auth";

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Sign out the user
            await signOut(auth);

            // Clear any user-specific data from storage (optional but recommended)
            localStorage.removeItem("user");
            localStorage.removeItem("firebase:authUser:[DEFAULT]");
            sessionStorage.clear();

            // Redirect to login page after successful logout
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            {/* Ensure the auth object is always checked before accessing currentUser */}
            <p>Email: {auth.currentUser?.email || "No user logged in"}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
