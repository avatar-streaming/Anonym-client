import { useEffect } from "react";
import { generateStreaming, removeStreaming } from "../features/streaming/streamingSlice";

const useToggleStreaming = (isOn, streamTitle, avatarRef) => {
  useEffect(() => {
    (async () => {
      if (isOn) {
        const streamingThumnail = avatarRef.current.toDataURL("image/png");

        generateStreaming(streamTitle.trim(), streamingThumnail);
      }

      if (isOn === false) {
        removeStreaming();
      }
    })();

    return () => {
      removeStreaming();
    };
  }, [isOn, avatarRef]);
};

export default useToggleStreaming;
