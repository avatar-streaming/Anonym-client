import { useEffect, useRef } from "react";
import PoseAnimator from "../poseAnimator";

const useMotionAnimator = () => {
  const outputRef = useRef(null);
  const avatarRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    new PoseAnimator(avatarRef, outputRef, videoRef);

    return () => {
      window.location.reload();
    };
  }, []);

  return { outputRef, avatarRef, videoRef };
};

export default useMotionAnimator;
