import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOnAir, streamTitle) => {
  const { userStreaming } = useSelector((state) => state.streaming);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isOnAir === true) {
        dispatch(generateStreaming(streamTitle.trim()));
      }

      if (isOnAir === false) {
        dispatch(removeStreaming());
      }
    })();

    return () => {
      if (userStreaming) {
        dispatch(removeStreaming());
      }
    };
  }, [isOnAir, streamTitle, dispatch]);
};

export default useToggleStreaming;
