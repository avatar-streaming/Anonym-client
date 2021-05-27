import React from "react";
import useDrawStreaming from "../../hooks/useDrawStreaming";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";

function Viewer() {
  const { videoRef, detectionRef } = useReceiveStreaming();
  const canvasRef = useDrawStreaming(detectionRef);

  return (
    <>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
      <video className="viewer-video" ref={videoRef} autoPlay />
    </>
  );
}

export default Viewer;
