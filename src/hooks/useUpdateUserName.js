import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName } from "../actions/userActionCreator";

const useUpdateUserName = (userName) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      dispatch(updateUserName(userName));
      setIsUpdate(false);
    }
  }, [isUpdate, dispatch, userName]);

  return setIsUpdate;
};

export default useUpdateUserName;
