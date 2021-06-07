import { useEffect, useState } from "react";
import { userLogout } from "../features/auth/authSlice";

const useLogout = () => {
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (isLogout) {
      userLogout();
    }
  }, [isLogout]);

  return setIsLogout;
};

export default useLogout;
