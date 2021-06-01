import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserThumnail } from "../actions/userActionCreator";

const useUpdateUserThumnail = () => {
  const [newThunmail, setNewThunmail] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      dispatch(updateUserThumnail(newThunmail));
      setIsUpdate(false);
    }
  }, [newThunmail]);

  return {
    newThunmail,
    updateNewThumnail: setNewThunmail,
    isUpdateUserThumnail: setIsUpdate,
  };
};

export default useUpdateUserThumnail;
