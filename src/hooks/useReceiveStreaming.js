import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { joinStreaming, socket } from "../api/socket";
import { receiveStreaming } from "../api/webRTC";

const useReceiveStreaming = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    receiveStreaming(setStream);
    joinStreaming(socket.id, id);

    // return () => {
    //   socket.emit("leave")
    // }
  }, [id]);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return videoRef;
};

export default useReceiveStreaming;
