import { setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/firebase";
import { useUserStore } from "../store/user";

export const useAuthentication = () => {

  const router = useRouter();
  const store = useUserStore();
  
    const error = ref({
        errorCode: null,
        errorMessage: '',
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.setIsAuthenticated(true);
        store.updateUserId(user.uid)
        store.refreshIdToken(user)
      } else {
        store.updateUserId('');
        router.replace({ name: 'Login' });
        store.setIsAuthenticated(false);
      }
    })

    const signIn = (email: string, password: string) => {
      setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace({ name: 'Home' });
      }).catch((err) => {
        error.value.errorCode = err.errorCode;
        error.value.errorMessage = err.errorMessage;
      })
      })
    }

    const signOut = () => {
      auth.signOut().then(() => {
        store.setIsAuthenticated(false);
        router.replace({ name: 'Login' });
      }).catch((err) => {
        error.value.errorCode = err.errorCode;
        error.value.errorMessage = err.errorMessage;
      })
      }

    return {
        error,
        signIn,
        signOut,
    }
}