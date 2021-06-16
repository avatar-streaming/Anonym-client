import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../components/App/rootReducer";
import { unfollowUser } from "../features/user/userSlice";

const useUnfollow = () => {
  const [targetID, setTargetID] = useState("");
  const { _id: userID } = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetID && userID !== targetID) {
      dispatch(unfollowUser(userID, targetID));
      setTargetID("");
    }
  }, [userID, targetID, dispatch]);

  return setTargetID;
};

export default useUnfollow;
