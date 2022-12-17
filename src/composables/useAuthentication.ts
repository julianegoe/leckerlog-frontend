import { onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, ErrorFn, AuthError } from "firebase/auth";
import { onBeforeUnmount, ref } from "vue";
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
  const loginStatus = ref('IDLE');
  const isEmailVerified = ref(false);


  const signIn = (email: string, password: string) => {
    loginStatus.value = 'LOADING';
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        if (response.user.emailVerified) {
          loginStatus.value = 'SUCCESS';
          router.push({ name: 'Home' });
        } else {
          sendEmailVerification(response.user, {
            url:  import.meta.env.VITE_BASE_URL,
            handleCodeInApp: true
          })
            .then(() => {
              window.alert('Dein Account ist nicht verifiziert. Verifizierungs-Mail wurde versendet',)
            });
        }

      }).catch((err: AuthError) => {
        console.log(err);
        if (err.code === 'auth/wrong-password') {
          window.alert('Du hast ein falsches Passwort eingegeben');
        }
        if (err.code === 'auth/user-not-found') {
          window.alert('Nutzer existiert nicht')
        }
        if (err.code === 'auth/too-many-requests') {
          window.alert('Zu viele Versuche')
        }
      })
  };

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
    loginStatus,
    signIn,
    signOut,
  }
}