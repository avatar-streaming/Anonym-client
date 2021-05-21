import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endStreaming, sendStreaming } from "../api/webRTC";

const useSendStreaming = (isOnStream, videoRef, avatarRef) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOnStream) {
      const stream = videoRef.current.srcObject;

      sendStreaming(stream, id, avatarRef);
    }

    return () => {
      endStreaming(id);
    };
  }, [isOnStream, videoRef, avatarRef]);
};

export default useSendStreaming;
