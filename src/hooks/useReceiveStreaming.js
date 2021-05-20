import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { joinStreaming, socket } from "../api/socket";
import { receiveStreaming } from "../api/webRTC";

const useReceiveStreaming = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    receiveStreaming(setStream, imageRef);
    joinStreaming(socket.id, id);
  }, [id]);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return { videoRef, canvasRef, imageRef };
};

export default useReceiveStreaming;
