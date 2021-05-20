import React, { useEffect } from "react";
import useReceiveStreaming from "../../hooks/useReceiveStreaming";
import Draw from "../../utils/drawImage";

function Viewer() {
  const { videoRef, canvasRef, imageRef } = useReceiveStreaming();

  useEffect(() => {
    new Draw(canvasRef, imageRef);
  }, [canvasRef, imageRef]);

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
