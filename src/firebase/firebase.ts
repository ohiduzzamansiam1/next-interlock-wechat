// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARlNzB6NvTunxjrogCTNeVe-133roDJUg",
  authDomain: "wechatflutter-c02ff.firebaseapp.com",
  projectId: "wechatflutter-c02ff",
  storageBucket: "wechatflutter-c02ff.appspot.com",
  messagingSenderId: "334841378909",
  appId: "1:334841378909:web:9b4bdd77fe95c5f2d135b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
