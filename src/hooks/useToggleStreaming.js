import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOnAir, streamTitle) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isOnAir) {
        dispatch(generateStreaming(streamTitle.trim()));
      }

      if (!isOnAir) {
        dispatch(removeStreaming());
      }
    })();

    return () => {
      dispatch(removeStreaming());
    };
  }, [isOnAir, streamTitle, dispatch]);
};

export default useToggleStreaming;
