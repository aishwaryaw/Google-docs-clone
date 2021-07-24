import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDWvk6M8dWeebl6y2TijhQ-WIv0UYuLIX0",
  authDomain: "docs-clone-670a8.firebaseapp.com",
  projectId: "docs-clone-670a8",
  storageBucket: "docs-clone-670a8.appspot.com",
  messagingSenderId: "330459158858",
  appId: "1:330459158858:web:972622248aebdd590cc9b3"
};



const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export {db};