import { useEffect } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import { checkAuthorization } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const history = useHistory();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    checkAuthorization();

    if (token) {
      history.push("/");
    } else {
      history.push("/auth/login");
    }
  }, [history]);
};

export default useAuthCheck;
