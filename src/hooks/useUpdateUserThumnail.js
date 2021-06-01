import { useState } from "react";

const useUpdateUserThumnail = () => {
  const [newThunmail, setNewThunmail] = useState(null);

  return { newThunmail, updateNewThumnail: setNewThunmail };
};

export default useUpdateUserThumnail;
