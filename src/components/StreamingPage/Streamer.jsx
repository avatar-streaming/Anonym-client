import React, { useState } from "react";
import useMotionAnimator from "../../hooks/useMotionAnimator";
import useToggleOnOff from "../../hooks/useToggleOnOff";
import useToggleStreaming from "../../hooks/useToggleStreaming";
import useSendStreaming from "../../hooks/useSendStreaming";

function Streamer() {
  const [streamingTitle, setStreamingTitle] = useState("");
  const { isOn, toggleOnOff } = useToggleOnOff();
  const { outputRef, avatarRef, videoRef } = useMotionAnimator();

  useToggleStreaming(isOn, streamingTitle, avatarRef);
  useSendStreaming(isOn, videoRef, avatarRef);

  return (
    <>
      <div className="canvas-container streamer-page">
        <div id='main'>
          <video ref={videoRef} playsInline />
          <canvas ref={outputRef} className="camera-canvas" />
        </div>
        <canvas ref={avatarRef} className="illustration-canvas" />
      </div>
      <div className="streaming-state">
        <input
          type="text"
          className="input-text"
          value={streamingTitle}
          onChange={(e) => {
            setStreamingTitle(e.target.value);
          }}
        />
        <button onClick={() => {
          toggleOnOff();
        }}>
          {isOn ? "STOP STREAM" : "START STREAM"}
        </button>
      </div>
    </>
  );
}

export default Streamer;
