import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkAuthorization } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(checkAuthorization());

    if (isAuthenticated) {
      history.push("/");
    } else {
      history.push("/auth/login");
    }
=======
    (async () => {
      await dispatch(checkAuthorization());

      if (isAuthenticated) {
        history.push("/");
      } else {
        history.push("/auth/login");
      }
    })();
>>>>>>> c05b8641dad7cfa992c68cc1b3c69d422f4bf8ce
  }, [dispatch, history, isAuthenticated]);
};

export default useAuthCheck;
