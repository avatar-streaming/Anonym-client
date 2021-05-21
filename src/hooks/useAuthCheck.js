import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { checkAuthorization } from "../actions/authActionCreators";
import Cookies from "universal-cookie";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("jwt");

    dispatch(checkAuthorization());

    if (token) {
      history.push("/");
    } else {
      history.push("/auth/login");
    }
  }, [history, dispatch]);
};

export default useAuthCheck;
