import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOn, streamTitle, avatarRef) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isOn) {
        const imgUrl = avatarRef.current.toDataURL("image/jpeg", 1.0);

        dispatch(generateStreaming(streamTitle.trim(), imgUrl));
      }

      if (isOn === false) {
        dispatch(removeStreaming());
      }
    })();

    return () => {
      dispatch(removeStreaming());
    };
  }, [isOn, streamTitle, dispatch]);
};

export default useToggleStreaming;
