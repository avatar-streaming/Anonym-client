import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { checkAuthorization } from "../actions/authActionCreators";

const useAuthCheck = (isAuthenticated) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(checkAuthorization());

    if (isAuthenticated) {
      history.push("/");
    } else {
      history.push("/auth/login");
    }
  }, [isAuthenticated, history, dispatch]);
};

export default useAuthCheck;
