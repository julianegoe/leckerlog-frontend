import { getStorage } from "@firebase/storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

console.log('api key: ', import.meta.env.VITE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const storage = getStorage();


setPersistence(auth, browserLocalPersistence).then(() => {
}).catch((e) => console.log(e));


export {
    auth, storage
}

