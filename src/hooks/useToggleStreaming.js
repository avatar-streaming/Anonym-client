import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOnAir, streamTitle) => {
  const { userStreaming } = useSelector((state) => state.streamingReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (isOnAir === true) {
        dispatch(generateStreaming(streamTitle.trim()));
      }

      if (isOnAir === false) {
        dispatch(removeStreaming());
        history.push("/");
      }
    })();

    return () => {
      if (userStreaming) {
        dispatch(removeStreaming());
      }
    };
  }, [isOnAir, streamTitle, dispatch, history]);
};

export default useToggleStreaming;
