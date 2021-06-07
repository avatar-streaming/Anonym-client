import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { unfollowUser } from "../features/user/userSlice";

const useUnfollow = () => {
  const [targetID, setTargetID] = useState(null);
  const { _id: userID } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (targetID && userID !== targetID) {
      unfollowUser(userID, targetID);
      setTargetID(null);
    }
  }, [userID, targetID]);

  return setTargetID;
};

export default useUnfollow;
