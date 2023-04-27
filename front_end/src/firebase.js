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
    const result = await signInWithPopup(auth, provider);

    try {
        await axios.post(`/api/signin`, {
            uid: result.user.uid,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
        });
    }
    catch (error) {
        console.error(error);
    }
};

export const signOutUser = () => {
    signOut(auth);
}

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
