class Draw {
  constructor(canvasRef, imageRef) {
    this.canvas = canvasRef.current;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.image = new Image();
    this.imageSrc = imageRef;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    // this.ctx.clearRect(0, 0, this.width, this.height);

    this.image.src = this.imageSrc.current;

    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }
}

export default Draw;
