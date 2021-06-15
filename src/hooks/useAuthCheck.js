import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkAuthorization } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
     dispatch(checkAuthorization());

      if (isAuthenticated) {
        history.push("/");
      } else {
        history.push("/auth/login");
      }
  }, [dispatch, history, isAuthenticated]);
};

export default useAuthCheck;
