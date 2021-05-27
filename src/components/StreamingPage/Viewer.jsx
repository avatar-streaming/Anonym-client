import React from "react";
import useCanvas from "../../hooks/useCanvas";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";
import StreamingCanvas from "../../utils/StreamingCanvas";

function Viewer() {
  const { videoRef, canvasRef, detectionRef } = useReceiveStreaming();
  // useCanvas(StreamingCanvas, { canvasRef, detectionRef });

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
