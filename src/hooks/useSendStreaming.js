import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { init } from "../api/webRTC";

const useSendStreaming = (isOnStream, videoRef) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOnStream) {
      const stream = videoRef.current.srcObject;

      init(stream, id);
    }
  }, [isOnStream, videoRef]);
};

export default useSendStreaming;
