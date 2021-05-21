import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { joinStreaming, socket } from "../api/socket";
import { leaveStreaming, receiveStreaming } from "../api/webRTC";

const useReceiveStreaming = () => {
  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    receiveStreaming(setStream, imageRef);
    joinStreaming(socket.id, id);

    return () => {
      leaveStreaming(socket.id);
      window.location.reload();
    };
  }, [id]);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return { videoRef, canvasRef, imageRef };
};

export default useReceiveStreaming;