// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASRoj9NiOOzeqMyWT0eyQ8ZQz3lKxnW1Y",
  authDomain: "react-course-39ad4.firebaseapp.com",
  projectId: "react-course-39ad4",
  storageBucket: "react-course-39ad4.appspot.com",
  messagingSenderId: "147131052130",
  appId: "1:147131052130:web:f4b1acdd2eaeda4828e13b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)