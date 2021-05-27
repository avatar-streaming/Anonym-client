import { useEffect, useRef } from "react";
import PoseAnimator from "../poseAnimator/poseAnimator";

const useDrawStreaming = (detectionRef) => {
  const canvasRef = useRef(null);
  let myCanvas;

  useEffect(() => {
    myCanvas = new PoseAnimator(canvasRef, 300, 300);
  }, [canvasRef]);

  useEffect(() => {
    let animationFrameID;
    const animate = () => {
      if (detectionRef.current) {
        myCanvas.draw(detectionRef.current.face, detectionRef.current.pose);
      }

      animationFrameID = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameID);
    };
  }, [detectionRef]);

  return canvasRef;
};

export default useDrawStreaming;
