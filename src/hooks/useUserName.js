import { useState } from "react";
import { useSelector } from "react-redux";

const useUserName = () => {
  const { userName } = useSelector((state) => state.auth.userInfo);
  const [currentUserName, setCurrentUserName] = useState(userName);

  return [currentUserName, setCurrentUserName];
};

export default useUserName;
