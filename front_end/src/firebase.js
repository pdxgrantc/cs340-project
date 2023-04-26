import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyAgfQqLSBDNnV6MkGTkgjQvKstAAls4RFg",
    authDomain: "cs-340-53872.firebaseapp.com",
    projectId: "cs-340-53872",
    storageBucket: "cs-340-53872.appspot.com",
    messagingSenderId: "242432014375",
    appId: "1:242432014375:web:910eb78a492290ba88f602"
};


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const { displayName, photoURL } = result.user;
        await axios.post('/api/user', {
            displayName,
            photoURL
        });

    } catch (error) {
        console.log(error);
    }
}

export const signOutUser = () => {
    signOut(auth);
}

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
