import { useEffect, useRef } from "react";
import PoseDetector from "../poseAnimator/poseDetector";

const useMotionAnimator = () => {
  const avatarCanvasRef = useRef(null);
  const avatarSvgRef = useRef(null);
  const outputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    new PoseDetector(avatarCanvasRef, avatarSvgRef, outputRef, videoRef);

    return () => {
      console.log(2)
      // window.location.reload();
    };
  }, []);

  return { avatarCanvasRef, avatarSvgRef, outputRef, videoRef };
};

export default useMotionAnimator;
