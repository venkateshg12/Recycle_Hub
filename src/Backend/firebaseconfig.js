import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "recyclehub-4404f.firebaseapp.com",
  databaseURL: "https://recyclehub-4404f-default-rtdb.firebaseio.com",
  projectId: "recyclehub-4404f",
  storageBucket: "recyclehub-4404f.firebasestorage.app",
  messagingSenderId: "757494925430",
  appId: "1:757494925430:web:0b357ca95ad7cbc424f757",
  measurementId: "G-SH7HMMWE3N"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;