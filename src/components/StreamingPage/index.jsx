import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useMotionAnimator from "../../hooks/useMotionAnimator";
import ChatBox from "./ChatBox";
import Streamer from "./Streamer";
import Viewer from "./Viewer";

function StreamingPage() {
  const { _id: userId } = useSelector((state) => state.authReducer.userInfo);
  const { id } = useParams();
  const { outputRef, avatarRef, videoRef } = useMotionAnimator();

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
