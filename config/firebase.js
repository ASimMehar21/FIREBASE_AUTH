import { initializeApp } from "firebase/app";
import firebase from 'firebase'

const APP_BASE = 'https://your-unique-url.firebaseapp.com/'

const firebaseConfig = {
  apiKey: "AIzaSyAttYfa7jrn1Dpl20r-aanoOV94jLV8PeM",
  authDomain: "loginsignup-c4b56.firebaseapp.com",
  projectId: "loginsignup-c4b56",
  databaseURL: APP_BASE,
  storageBucket: "loginsignup-c4b56.appspot.com",
  messagingSenderId: "248708571876",
  appId: "1:248708571876:web:bf35c8c30de95a5ddc42f1"
};

let Firebase =firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()

db.settings({
	timestampsInSnapshots: true
})
export default Firebase;