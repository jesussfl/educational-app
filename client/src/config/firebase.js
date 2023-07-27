// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDzq61WNFghhvwnLYvtMwDLYetmlc3d1UQ",
   authDomain: "crefinex-c3a9d.firebaseapp.com",
   projectId: "crefinex-c3a9d",
   storageBucket: "crefinex-c3a9d.appspot.com",
   messagingSenderId: "639466477825",
   appId: "1:639466477825:web:48041fca6e020fd1f5a300",
};
//52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
