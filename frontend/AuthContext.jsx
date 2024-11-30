import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);

                const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                    if (firebaseUser) {
                        setUser(firebaseUser);
                        localStorage.setItem("user", JSON.stringify(firebaseUser)); // Save user explicitly
                    } else {
                        setUser(null);
                        localStorage.removeItem("user"); // Clear user on logout
                    }
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error initializing auth:", error);
                setLoading(false);
            }
        };

        initializeAuth();
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};
