import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOnAir, streamTitle) => {
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
      dispatch(removeStreaming());
    };
  }, [isOnAir, streamTitle, dispatch, history]);
};

export default useToggleStreaming;
