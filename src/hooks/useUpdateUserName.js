import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserName } from "../features/user/userSlice";

const useUpdateUserName = (userName) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [newName, setNewName] = useState(userName);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      dispatch(updateUserName(newName));
      setIsUpdate(false);
    }
  }, [isUpdate, newName]);

  return {
    newName,
    updateNewName: setNewName,
    isUpdateUserName: setIsUpdate,
  };
};

export default useUpdateUserName;
