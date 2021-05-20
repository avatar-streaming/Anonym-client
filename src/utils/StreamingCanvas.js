import { addEventHelper } from "./eventListHelper";

class StreamingCanvas {
  constructor({ canvasRef, imageRef }) {
    this.canvas = canvasRef.current;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.image = new Image();
    this.imageSrc = imageRef;

    this.eventList = [];

    // addEventHelper(
    //   this.eventList,
    //   window,
    //   "resize",
    //   this.resize.bind(this)
    // );
    // this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate() {
    this.image.src = this.imageSrc.current;

    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height
    );

    this.animatorID = window.requestAnimationFrame(this.animate.bind(this));
  }
}

export default StreamingCanvas;
