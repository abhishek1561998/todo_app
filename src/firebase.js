  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD8yy5Khsvwzz9UYf5KykcgD_IlvFsUuZ8",
    authDomain: "todo-app-cp-a0f2f.firebaseapp.com",
    databaseURL: "https://todo-app-cp-a0f2f.firebaseio.com",
    projectId: "todo-app-cp-a0f2f",
    storageBucket: "todo-app-cp-a0f2f.appspot.com",
    messagingSenderId: "464455385628",
    appId: "1:464455385628:web:ce6098920c363762ae15d9",
    measurementId: "G-NE9KMD838Z"
  });

  const db = firebaseApp.firestore();

  export default db;