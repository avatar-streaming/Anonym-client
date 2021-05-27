import { useEffect, useRef } from "react";
import PoseDetector from "../poseAnimator/poseDetector";

const useMotionAnimator = () => {
  const outputRef = useRef(null);
  const avatarRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    new PoseDetector(avatarRef, outputRef, videoRef);

    return () => {
      window.location.reload();
    };
  }, []);

  return { outputRef, avatarRef, videoRef };
};

export default useMotionAnimator;
