// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app"
import 'firebase/firestore';
require('firebase/auth')
 

const firebaseConfig = {
    
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const google = new firebase.auth.GoogleAuthProvider();

  export { auth, google };
  export default db;
