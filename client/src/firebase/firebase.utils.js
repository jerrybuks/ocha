import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions'
import { eventChannel } from "redux-saga";

const config = {
    apiKey: "AIzaSyBOQ2B9yDR3NjvwkPOndCYvsOeRCAt3HG4",
    authDomain: "ocha-8dca5.firebaseapp.com",
    databaseURL: "https://ocha-8dca5.firebaseio.com",
    projectId: "ocha-8dca5",
    storageBucket: "ocha-8dca5.appspot.com",
    messagingSenderId: "49975646717",
    appId: "1:49975646717:web:c58409417016ad80576194",
    measurementId: "G-EQG1GJCWR7"
  }; 

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get()
    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        });
        } catch (error) {
        console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  export const createBagChannel = (ref) => {
    const listener = eventChannel((emit) => {
      const unsubscribe = ref.onSnapshot(function (querySnapshot) {
        let bag = {};
        querySnapshot.forEach(function (doc) {
          // console.log(doc,444)
          // doc.ref.update = {
          //     assStatus: "assigned",
          //     userId: store.getState().user.id
          // }
          bag = doc;
          console.log(doc,bag,555)
        });
        emit(bag);
      });
  
      return () => unsubscribe;
    });
  
    return listener;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const functions = firebase.functions();
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
  