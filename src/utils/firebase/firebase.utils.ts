import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey || "",
  authDomain: import.meta.env.VITE_authDomain || "",
  projectId: import.meta.env.VITE_projectId || "",
  storageBucket: import.meta.env.VITE_storageBucket || "",
  messagingSenderId: import.meta.env.VITE_messagingSenderId || "",
  appId: import.meta.env.VITE_appId || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth: {
  uid?: string;
  displayName?: string;
  email?: string;
}) => {
  if (!userAuth || !userAuth.uid) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating the user", error);
    }
  }

  return userDocRef;
};
