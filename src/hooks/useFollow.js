import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../features/user/userSlice";

const useFollow = () => {
  const [targetID, setTargetID] = useState(null);
  const { _id: userID } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetID && userID !== targetID) {
      dispatch(followUser(userID, targetID));
      setTargetID(null);
    }
  }, [userID, targetID]);

  return setTargetID;
};

export default useFollow;
