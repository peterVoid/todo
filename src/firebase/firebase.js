import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVYluBIhs__Q5Tf4Rs8vk3HL6CDrOcr_s",
  authDomain: "todo-app-a4dbf.firebaseapp.com",
  projectId: "todo-app-a4dbf",
  storageBucket: "todo-app-a4dbf.appspot.com",
  messagingSenderId: "1086900072019",
  appId: "1:1086900072019:web:17c460f4c5213a59d6a0a6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
