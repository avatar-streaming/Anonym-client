import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { sendStreaming } from "../api/webRTC";

const useSendStreaming = (isOnStream, videoRef, avatarRef) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOnStream) {
      const stream = videoRef.current.srcObject;

      sendStreaming(stream, id, avatarRef);
    }
  }, [isOnStream, videoRef, avatarRef]);
};

export default useSendStreaming;
