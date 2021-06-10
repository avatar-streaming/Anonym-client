import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../features/auth/authSlice";

const useLogout = () => {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsLogout(true);
  };

  useEffect(() => {
    if (isLogout) {
      dispatch(userLogout());
    }
  }, [isLogout, dispatch]);

  return handleClick;
};

export default useLogout;
