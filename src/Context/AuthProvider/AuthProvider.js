import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const providerLogIn = (provider) => {
        return signInWithPopup(auth, provider);
    }
    const githubProviderLogIn = (provider) => {
        return signInWithPopup(auth, provider);
    }
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUserPrifile = (profil) => {
        return updateProfile(auth.currentUser, profil);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('User Change', currentUser);
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    },[])
    const authInfo = { user, providerLogIn, githubProviderLogIn, logOut, createUser, signIn ,loading,updateUserPrifile};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;