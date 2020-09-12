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

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = Myfirebase.firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { first_name, last_name, email, phone, password, address_line_1, address_line_2,
    city, state, zip} = user;
    try {
      await userRef.set({
        first_name,
        last_name,
        email,
        phone,
        password,
        address_line_1,
        address_line_2,
        city,
        state,
        zip,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await Myfirebase.firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};