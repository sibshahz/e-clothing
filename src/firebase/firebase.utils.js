import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyBc1JSY-RZTsKPXqd8txHF2zSGnu-0G3oc",
    authDomain: "e-clothing-5.firebaseapp.com",
    projectId: "e-clothing-5",
    storageBucket: "e-clothing-5.appspot.com",
    messagingSenderId: "1030927422726",
    appId: "1:1030927422726:web:3f5e434b9d9b7cc1347a87",
    measurementId: "G-BXDM5BVCHD"
  };

  firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle=()=> auth.signInWithPopup(provider);

export default firebase;