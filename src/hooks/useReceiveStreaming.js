import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { joinStreaming, socket } from "../api/socket";
import { createReceivePC } from "../api/webRTC";

const useReceiveStreaming = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    joinStreaming(socket.id, id);
    socket.on("allUsers", ({ users, roomID }) => {
      const length = users.length;

      for (let i = 0; i < length; i++) {
        createReceivePC(users[i].id, socket, roomID, setStream);
      }
    });

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
