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

/* Creating a new instance of the firebase auth object. */
export const auth=firebase.auth();
export const firestore=firebase.firestore();

/**
 * The function takes in a collection name and an array of objects to add to the collection. 
 * It creates a new document for each object in the array and adds the object to the batch. 
 * Finally, it commits the batch to the database
 * @param collectionKey - The name of the collection you want to add the documents to.
 * @param objectsToAdd - an array of objects to add to the collection.
 * @returns The batch.commit() method returns a Promise.
 */
export const addCollectionAndDocuments= async (collectionKey,objectsToAdd)=>{
  const collectionRef=firestore.collection(collectionKey);
  console.log("🚀 ~ file: firebase.utils.js ~ line 47 ~ addCollectionAndItems ~ collectionRef", collectionRef);
  
  const batch=firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef=collectionRef.doc();
    console.log("🚀 ~ file: firebase.utils.js ~ line 52 ~ addCollectionAndDocuments ~ newDocRef", newDocRef);
    batch.set(newDocRef,obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap=(collections)=>{
  const transformedCollection=collections.docs.map(doc=>{
    const {title, items}=doc.data();
    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items

    }
  });
  return transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()]=collection;
    return accumulator;
  },{});
}

const provider=new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle=()=> auth.signInWithPopup(provider);

export default firebase;