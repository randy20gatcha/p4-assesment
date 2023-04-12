import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDzdzlhKSjzQHbXepkT9yZVQKuob3gQnYI",
    authDomain: "chat-app-b0d8d.firebaseapp.com",
    databaseURL: "https://chat-app-b0d8d-default-rtdb.firebaseio.com",
    projectId: "chat-app-b0d8d",
    storageBucket: "chat-app-b0d8d.appspot.com",
    messagingSenderId: "887253131968",
    appId: "1:887253131968:web:f66c10bec97ff2f8110325"
  };

  const app = initializeApp(firebaseConfig);

  export default app;