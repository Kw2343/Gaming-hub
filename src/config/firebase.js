import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbQiBLEx6mcRnNKVrm4jW-HAs68Y87vRw",
    authDomain: "cs203-83f49.firebaseapp.com",
    projectId: "cs203-83f49",
    storageBucket: "cs203-83f49.appspot.com",
    messagingSenderId: "649753330694",
    appId: "1:649753330694:web:6c8ee63f5c71cbdbf6af87",
    measurementId: "G-B7NY0METLD"
  };
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage =getStorage(app);