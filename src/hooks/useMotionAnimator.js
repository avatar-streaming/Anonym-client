import { useEffect, useRef } from "react";
import { bindPage } from "../poseAnimator/camera";

const useMotionAnimator = () => {
  const outputRef = useRef(null);
  const avatarRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    bindPage(avatarRef.current, outputRef.current, videoRef.current);
  }, []);

  return { outputRef, avatarRef, videoRef };
};

export default useMotionAnimator;
