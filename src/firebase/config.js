import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBawDEziRjvG2w8jMtHI0m7_PZDRXOD3qM",
    authDomain: "fir-8066f.firebaseapp.com",
    projectId: "fir-8066f",
    storageBucket: "fir-8066f.appspot.com",
    messagingSenderId: "169494573750",
    appId: "1:169494573750:web:233a847d329b5a65ccac17",
    measurementId: "G-6TV81QM5ZW"
  };

export default firebase.initializeApp(firebaseConfig)