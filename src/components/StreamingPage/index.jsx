import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import Streamer from "./Streamer";
import Viewer from "./Viewer";
import useMotionAnimator from "../../hooks/useMotionAnimator";
import { checkRoom } from "../../api/socket";

function StreamingPage() {
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const { id } = useParams();
  const { outputRef, avatarRef, videoRef } = useMotionAnimator();

  useEffect(() => {
    return checkRoom(id);
  }, [id]);

  return (
    <div className="content-wrapper">
      <div className="streaming-container">
        <div className="main-container">
          <div className="canvas-container">
            <div id='main'>
              <video ref={videoRef} playsInline />
              <canvas ref={outputRef} className="camera-canvas" />
            </div>
            <canvas ref={avatarRef} className="illustration-canvas" />
          </div>
          <div>
            {userId === id ? <Streamer /> : <Viewer />}
          </div>
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default StreamingPage;
