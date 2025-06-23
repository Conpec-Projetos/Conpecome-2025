import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Now import this 
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp2kAhLZs26ER_3YdYcDtuq5VkJp4FhAY",
  authDomain: "conpecome-fbs.firebaseapp.com",
  projectId: "conpecome-fbs",
  storageBucket: "conpecome-fbs.appspot.com",
  messagingSenderId: "1079759939514",
  appId: "1:1079759939514:web:822ec2fce4ae21f400df83",
  measurementId: "G-YC2RGYN9NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);