// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD1Q27b_NOUbeDAL0IHbsJdOrj8Cs-8VHg",
  authDomain: "newreddit-3b8c5.firebaseapp.com",
  projectId: "newreddit-3b8c5",
  storageBucket: "newreddit-3b8c5.appspot.com",
  messagingSenderId: "767093645989",
  appId: "1:767093645989:web:fa5874c3c7566218d4a34c",
  measurementId: "G-E8L38GN457"
};

const AppInt = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
