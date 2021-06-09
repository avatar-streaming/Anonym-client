import { useEffect, useState } from "react";
import firebase from "firebase";
import firebaseApp from "../api/firebaseAPI";
import { userLogin, userLoginFailure } from "../features/auth/authSlice";

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      return;
    }

    (async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const loginData = await firebaseApp.auth().signInWithPopup(provider);
        const { uid, email, displayName, photoURL } = loginData.user;

        userLogin({ uid, email, displayName, photoURL });
      } catch (err) {
        userLoginFailure(err.toString());
      }
    })();
  }, [isLogin]);

  return setIsLogin;
};

export default useLogin;
