import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateStreaming, removeStreaming } from "../actions/streamingActionCreators";

const useToggleStreaming = (isOn, streamTitle, avatarRef) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isOn) {
        const imgUrl = avatarRef.current.toDataURL("image/jpeg");

        dispatch(generateStreaming(streamTitle.trim(), imgUrl));
      }

      if (isOn === false) {
        dispatch(removeStreaming());
      }
    })();

    return () => {
      dispatch(removeStreaming());
    };
  }, [isOn, avatarRef, streamTitle, dispatch]);
};

export default useToggleStreaming;
