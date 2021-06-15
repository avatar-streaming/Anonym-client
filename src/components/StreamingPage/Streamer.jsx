import React, { useState } from "react";
import useMotionAnimator from "../../hooks/useMotionAnimator";
import useToggleOnOff from "../../hooks/useToggleOnOff";
import useToggleStreaming from "../../hooks/useToggleStreaming";

function Streamer() {
  const [streamingTitle, setStreamingTitle] = useState("");
  const { isOn, toggleOnOff } = useToggleOnOff();
  const { avatarCanvasRef, avatarSvgRef, outputRef, videoRef } = useMotionAnimator();

  useToggleStreaming(isOn, streamingTitle, avatarCanvasRef, videoRef, avatarSvgRef);

  return (
    <div className="streamer-page">
      <div className="canvas-container">
        <div className="output">
          <video ref={videoRef} className="output__video" playsInline />
          <canvas ref={outputRef} className="output__canvas" />
        </div>
        <canvas ref={avatarCanvasRef} className="illustration-canvas" />
      </div>
      <div className="streamer-page__streaming-state">
        <input
          type="text"
          className="input-text"
          value={streamingTitle}
          placeholder="title"
          onChange={(e) => {
            setStreamingTitle(e.target.value);
          }}
        />
        <button
          onClick={() => {
            toggleOnOff();
          }}
          disabled={
            streamingTitle.length ? false : true
          }
        >
          {isOn ? "STOP STREAM" : "START STREAM"}
        </button>
      </div>
    </div>
  );
}

export default Streamer;
