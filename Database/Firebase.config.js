import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTgDhnOS-jT_g3MbOiEn3lYCv9G9tXsGQ",
  authDomain: "chart-application-b742f.firebaseapp.com",
  projectId: "chart-application-b742f",
  storageBucket: "chart-application-b742f.firebasestorage.app",
  messagingSenderId: "734438473757",
  appId: "1:734438473757:web:07da82b0cea74f0c6186f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("database");


export default app