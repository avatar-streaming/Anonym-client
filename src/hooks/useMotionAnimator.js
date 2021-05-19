import { useEffect, useRef, useState } from "react";
import PoseAnimator from "../poseAnimator";

const useMotionAnimator = () => {
  const outputRef = useRef(null);
  const avatarRef = useRef(null);
  const videoRef = useRef(null);
  const [canvasImage, setCanvasImage] = useState();

  useEffect(() => {
    new PoseAnimator(avatarRef, outputRef, videoRef, setCanvasImage);

    return () => {
      // window.location.reload();
    };
  }, []);

  useEffect(() => {
    console.log(canvasImage);
  }, [canvasImage]);

  return { outputRef, avatarRef, videoRef, canvasImage };
};

export default useMotionAnimator;
