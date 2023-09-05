import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzl-u4V3ayxtlXM3Ks1P5S563Wt4YZWr8",
  authDomain: "netflix-df4c0.firebaseapp.com",
  projectId: "netflix-df4c0",
  storageBucket: "netflix-df4c0.appspot.com",
  messagingSenderId: "483145500300",
  appId: "1:483145500300:web:5cd864419276828dcd1da9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
