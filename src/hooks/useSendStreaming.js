import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endStreaming, sendStreaming } from "../api/webRTC";

const useSendStreaming = (isOn, videoRef, detectionRef) => {
  const { id } = useParams();

  useEffect(() => {
    if (isOn) {
      const stream = videoRef.current.srcObject;

      sendStreaming(stream, id, detectionRef);
    }

    return () => {
      if (isOn === false) {
        endStreaming(id);
      }
    };
  }, [isOn, videoRef, detectionRef, id]);
};

export default useSendStreaming;
