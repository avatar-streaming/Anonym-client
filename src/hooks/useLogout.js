import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../features/auth/authSlice";

const useLogout = () => {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogout) {
      dispatch(userLogout());
    }
  }, [isLogout]);

  return setIsLogout;
};

export default useLogout;
