import React, { useEffect } from "react";
import useCanvas from "../../hooks/useCanvas";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";
import StreamingCanvas from "../../utils/StreamingCanvas";

function Viewer() {
  const { videoRef, canvasRef, imageRef } = useReceiveStreaming();
  useCanvas(StreamingCanvas, { canvasRef, imageRef });

  return (
    <>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
      <video className="viewer-video" ref={videoRef} autoPlay />
      <div>title</div>
    </>
  );
}

export default Viewer;
