import { getStorage } from "@firebase/storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey:  process.env.VITE_API_KEY,
  authDomain:  process.env.VITE_AUTH_DOMAIN,
  projectId:  process.env.VITE_PROJECT_ID,
  storageBucket:  process.env.VITE_STORAGE_BUCKET,
  messagingSenderId:  process.env.VITE_MESSAGING_SENDER_ID,
  appId:  process.env.VITE_APP_ID,
};

getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const storage = getStorage();


setPersistence(auth, browserLocalPersistence).then(() => {
}).catch((e) => console.log(e));


export {
    auth, storage
}

