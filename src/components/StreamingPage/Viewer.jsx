import React from "react";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";

function Viewer() {
  const videoRef = useReceiveStreaming();

  return (
    <>
      <div className="canvas-container">
        <canvas />
      </div>
      <video className="viewer-video" ref={videoRef} autoPlay />
      <div>title</div>
    </>
  );
}

export default Viewer;
