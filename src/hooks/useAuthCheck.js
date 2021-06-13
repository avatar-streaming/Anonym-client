import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import { checkAuthorization } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = new Cookies();
  const token = cookies.get("jwt");

  useEffect(() => {
    (async () => {
      dispatch(checkAuthorization());

      if (token) {
        history.push("/");
      } else {
        history.push("/auth/login");
      }
    })();
  }, [dispatch, history, token]);
};

export default useAuthCheck;
