import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { clearSender, endStreaming, sendStreaming } from "../api/webRTC";
import { generateStreaming, removeStreaming } from "../features/streaming/streamingSlice";

const useToggleStreaming = (isOn, streamTitle, avatarCanvasRef, videoRef, avatarSvgRef) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!streaming && isOn) {
      setStreaming(true);

      const streamingThumnail = avatarCanvasRef.current.toDataURL("image/png");
      const stream = videoRef.current.srcObject;

      dispatch(generateStreaming(streamTitle.trim(), streamingThumnail));
      sendStreaming(stream, id, avatarSvgRef);
    }

    if (isOn === false) {
      endStreaming(id);
      history.push("/");
    }

    return () => {
      console.log(3)
      dispatch(removeStreaming());
      clearSender();
    };
  }, [isOn, avatarCanvasRef, dispatch, videoRef, avatarSvgRef, id]);
};

export default useToggleStreaming;
