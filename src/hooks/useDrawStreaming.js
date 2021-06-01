import { useEffect, useRef } from "react";
import PoseAnimator from "../poseAnimator/poseAnimator";

const useDrawStreaming = (detectionRef) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameID;
    const poseAnimator = new PoseAnimator(canvasRef, 300, 300);
    const animate = () => {
      if (detectionRef.current) {
        poseAnimator.draw(detectionRef.current.face, detectionRef.current.pose);
      }

      animationFrameID = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameID);
    };
  }, [canvasRef, detectionRef]);

  return canvasRef;
};

export default useDrawStreaming;
