import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD-_-7A3OUqx0gwl3vOIpQrIPmopWw4nio",
  authDomain: "expenses-16.firebaseapp.com",
  projectId: "expenses-16",
  storageBucket: "expenses-16.appspot.com",
  messagingSenderId: "53087766956",
  appId: "1:53087766956:web:c8c343c2dd4fe220409209"
});


export default firebaseConfig;