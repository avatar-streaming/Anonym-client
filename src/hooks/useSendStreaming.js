import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endStreaming, sendStreaming } from "../api/webRTC";

const useSendStreaming = (isOn, videoRef, avatarRef) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOn) {
      const stream = videoRef.current.srcObject;

      sendStreaming(stream, id, avatarRef);
    }

    return () => {
      if (isOn === false) {
        endStreaming(id);
      }
    };
  }, [isOn, videoRef, avatarRef, id]);
};

export default useSendStreaming;
