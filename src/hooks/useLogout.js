import { userLogout } from "../actions/authActionCreators";

const { useEffect, useState } = require("react");
const { useDispatch } = require("react-redux");

const useLogout = () => {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogout) {
      dispatch(userLogout());
    }
  });

  return setIsLogout;
};

export default useLogout;
