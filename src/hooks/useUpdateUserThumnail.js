import { useEffect, useRef, useState } from "react";
import { updateUserThumnail } from "../features/user/userSlice";

const useUpdateUserThumnail = () => {
  const [newThumnail, setNewThumnail] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (isUpdate && imageInputRef.current) {
      const reader = new FileReader();

      reader.readAsDataURL(imageInputRef.current.files[0]);
      reader.onload = (e) => {
        updateUserThumnail(e.target.result);
        setIsUpdate(false);
      };
    }
  }, [isUpdate, imageInputRef]);

  return {
    newThumnail,
    updateNewThumnail: setNewThumnail,
    imageInputRef,
    isUpdateUserThumnail: setIsUpdate,
  };
};

export default useUpdateUserThumnail;
