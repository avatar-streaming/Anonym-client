import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../features/user/userSlice";
import { RootState } from "../components/App/rootReducer";

const useFollow = () => {
  const [targetID, setTargetID] = useState("");
  const { _id: userID } = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetID && userID !== targetID) {
      dispatch(followUser(userID, targetID));
      setTargetID("");
    }
  }, [userID, targetID, dispatch]);

  return setTargetID;
};

export default useFollow;
