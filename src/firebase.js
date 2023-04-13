import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgfQqLSBDNnV6MkGTkgjQvKstAAls4RFg",
    authDomain: "cs-340-53872.firebaseapp.com",
    projectId: "cs-340-53872",
    storageBucket: "cs-340-53872.appspot.com",
    messagingSenderId: "242432014375",
    appId: "1:242432014375:web:910eb78a492290ba88f602"
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    // TODO add .then too write to user table
    signInWithPopup(auth, provider).catch((error) => {
        console.log(error);
    });
}

export const signOutUser = () => {
    signOut(auth);
}

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
