import { useEffect } from "react";
import { removeEventHelper } from "../utils/eventListHelper";

/**
 *
 * @param {function} CanvasConstructor Canvas constructor function
 * @param {object} options Options of canvas
 * @returns Ref of canvas
 */
const useCanvas = (CanvasConstructor, options) => {
  useEffect(() => {
    const myCanvas = new CanvasConstructor(options);

    return () => {
      if (myCanvas.animatorID) {
        window.cancelAnimationFrame(myCanvas.animatorID);
      }

      if (myCanvas.eventList) {
        removeEventHelper(myCanvas.eventList);
      }
    };
  }, [CanvasConstructor, options]);
};

export default useCanvas;
