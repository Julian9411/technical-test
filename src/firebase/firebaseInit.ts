import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const authentication = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

