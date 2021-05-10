import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import firebaseApp from "../api/firebaseAPI";
import { userLogin } from "../actions/authActionCreators";

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      return;
    }

    (async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const loginData = await firebaseApp.auth().signInWithPopup(provider);
        const { uid, email, displayName } = loginData.user;

        dispatch(userLogin({ uid, email, displayName }));
      } catch (err) {
        console.log(err);
        // need to modify err handling
      }
    })();
  });

  return setIsLogin;
};

export default useLogin;
