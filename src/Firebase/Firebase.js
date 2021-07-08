// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app"
import 'firebase/firestore';
require('firebase/auth')
 

const firebaseConfig = {
    apiKey: "AIzaSyDZslvE7HYC1rYzGzyNfkZqhtfvCeopOTg",
    authDomain: "whatsapp-6e72b.firebaseapp.com",
    projectId: "whatsapp-6e72b",
    storageBucket: "whatsapp-6e72b.appspot.com",
    messagingSenderId: "437280136407",
    appId: "1:437280136407:web:99c545fbbeaf48be006492",
    measurementId: "G-H7N8FJR5E3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const google = new firebase.auth.GoogleAuthProvider();

  export { auth, google };
  export default db;