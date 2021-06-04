import React from "react";
import useDrawStreaming from "../../hooks/useDrawStreaming";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";
import useCanvas from "../../hooks/useCanvas";
import StreamingCanvas from "../../utils/StreamingCanvas";

function Viewer() {
  const { canvasRef, videoRef, imageRef } = useReceiveStreaming();
  // const canvasRef = useDrawStreaming(imageRef);
  useCanvas(StreamingCanvas, { canvasRef, imageRef });

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
