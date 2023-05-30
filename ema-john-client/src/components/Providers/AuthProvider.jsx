import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

// Create a Context
export const AuthContext = createContext(null);

// Create Auth
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    // Declare a state for the user
    const [user, setUser] = useState(null);

    // Declare a state for loading status. it is used in private route
    const [loading, setLoading] = useState(true);

    // Functions for user registration and authentication
    // Function: For creating user with email & password
    const userSignup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Function: For Logging in user
    const userSignin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Function: For logging out user
    const logOut = () => {
        return signOut(auth);
    }

    // Observe User auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        } );

        // stop observing while unmounting
        return () => {
            return unsubscribe();
        }
    }, [])

    // Values of the Context
    const authInfo = {
        userSignup,
        userSignin,
        user,
        loading,
        setUser,
        logOut,
    };
    return (
        // Context Provider
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;