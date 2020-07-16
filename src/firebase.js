import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBknOh2kqsOUrTFkkdhvkNwlWixzdi2h_k",
  authDomain: "play-vue-bcfd0.firebaseapp.com",
  databaseURL: "https://play-vue-bcfd0.firebaseio.com",
  projectId: "play-vue-bcfd0",
  storageBucket: "play-vue-bcfd0.appspot.com",
  messagingSenderId: "678148662771",
  appId: "1:678148662771:web:727b529bf3698787d89e86"
  };


  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  export {db, auth}