import { useEffect, useState } from "react";
import { updateUserName } from "../features/user/userSlice";

const useUpdateUserName = (userName) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [newName, setNewName] = useState(userName);

  useEffect(() => {
    if (isUpdate) {
      updateUserName(newName);
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
