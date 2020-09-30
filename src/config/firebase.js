import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUsi0_jT6xGsJcufGS40DBDuFrMfitKZs",
  authDomain: "abacus-dental-auth.firebaseapp.com",
  databaseURL: "https://abacus-dental-auth.firebaseio.com",
  projectId: "abacus-dental-auth",
  storageBucket: "abacus-dental-auth.appspot.com",
  messagingSenderId: "822038172612",
  appId: "1:822038172612:web:ef1aff2a32943513e34a91",
  measurementId: "G-0TBXQ4SV19"
};

export const Myfirebase = firebase.initializeApp(firebaseConfig);
const baseDb = Myfirebase.firestore();
export const db = baseDb;
