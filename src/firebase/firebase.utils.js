import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  const firebaseConfig = {
    apiKey: "AIzaSyCNbhDd2dKOE3H2Sd0OaCiO_ogLmpd4MKk",
    authDomain: "e-clothing-4d6c3.firebaseapp.com",
    projectId: "e-clothing-4d6c3",
    storageBucket: "e-clothing-4d6c3.appspot.com",
    messagingSenderId: "211529294721",
    appId: "1:211529294721:web:4bea3a2c6ec2dfebe07e80",
    measurementId: "G-3J134RF44T"
  };

  export const createUserProfileDocument=async (userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if(!snapShot.exists){
      const {displayName, email}=userAuth;
      const createdAt= new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle=()=> auth.signInWithPopup(provider);

export default firebase;