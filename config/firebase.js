import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBxjHqvGoSbAOjjnjN-zyvSvOgKMPKTq5U",
  authDomain: "otpauthenticationusingrn.firebaseapp.com",
  projectId: "otpauthenticationusingrn",
  storageBucket: "otpauthenticationusingrn.appspot.com",
  messagingSenderId: "353016131727",
  appId: "1:353016131727:web:c79bac1d278d03bf0940fa",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
