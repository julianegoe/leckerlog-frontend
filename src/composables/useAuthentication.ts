import { setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/firebase";

export const useAuthentication = () => {

  const router = useRouter();
  
    const error = ref({
        errorCode: null,
        errorMessage: '',
    });

    const userData = ref();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userData.value = user;
      } else {
        router.replace({ name: 'Login' })
      }
    })

    const signIn = (email: string, password: string) => {
      setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('logged in');
        router.replace({ name: 'Home' });
      }).catch((err) => {
        error.value.errorCode = err.errorCode;
        error.value.errorMessage = err.errorMessage;
      })
      })
    }

    const signOut = () => {
      auth.signOut().then(() => {
        router.replace({ name: 'Login' });
      }).catch((err) => {
        error.value.errorCode = err.errorCode;
        error.value.errorMessage = err.errorMessage;
      })
      }

    return {
        error,
        userData,
        signIn,
        signOut,
    }
}