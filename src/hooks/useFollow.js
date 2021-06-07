import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { followUser } from "../features/user/userSlice";

const useFollow = () => {
  const [targetID, setTargetID] = useState(null);
  const { _id: userID } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (targetID && userID !== targetID) {
      followUser(userID, targetID);
      setTargetID(null);
    }
  }, [userID, targetID]);

  return setTargetID;
};

export default useFollow;
