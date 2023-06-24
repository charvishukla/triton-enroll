import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC38kVroGTsS9ooY05viLfy2pNX631kvkQ",
    authDomain: "tritonenroll.firebaseapp.com",
    projectId: "tritonenroll",
    storageBucket: "tritonenroll.appspot.com",
    messagingSenderId: "203776994984",
    appId: "1:203776994984:web:0ad920187481203df1dc9d",
    measurementId: "G-QCZ2XCVJ1R"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  
  export { db };


