import { useEffect, useRef } from "react";
import PoseDetector from "../poseAnimator/poseDetector";

const usePoseDetector = () => {
  const avatarRef = useRef(null);
  const outputRef = useRef(null);
  const videoRef = useRef(null);
  const detectionRef = useRef({});

  useEffect(() => {
    new PoseDetector(avatarRef, outputRef, videoRef, detectionRef);

    return () => {
      window.location.reload();
    };
  }, []);

  return { avatarRef, outputRef, videoRef, detectionRef };
};

export default usePoseDetector;
