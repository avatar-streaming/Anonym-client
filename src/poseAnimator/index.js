/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as posenet_module from "@tensorflow-models/posenet";
import * as facemesh_module from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import * as paper from "paper";
import "babel-polyfill";

import { SVGUtils } from "./utils/svgUtils";
import { PoseIllustration } from "./illustrationGen/illustration";
import { Skeleton } from "./illustrationGen/skeleton";

import girlSVG from "./resources/illustration/girl.svg";
import boySVG from "./resources/illustration/boy.svg";
import abstractSVG from "./resources/illustration/abstract.svg";
import blathersSVG from "./resources/illustration/blathers.svg";
import tomNookSVG from "./resources/illustration/tom-nook.svg";

class PoseAnimator {
  constructor(avatarCanvasRef, outputCanvasRef, videoRef) {
    this.avatarCanvas = avatarCanvasRef.current;
    this.outputCanvas = outputCanvasRef.current;
    this.ctx = this.outputCanvas.getContext("2d");

    this.video = videoRef.current;
    this.videoWidth = 300;
    this.videoHeight = 300;

    this.faceDetection = null;
    this.illustration = null;
    this.canvasScope = null;
    this.canvasWidth = this.avatarCanvas.width;
    this.canvasHeight = this.avatarCanvas.height;

    this.facemesh = null;
    this.posenet = null;
    this.minPartConfidence = 0.1;
    this.nmsRadius = 30.0;

    this.avatarSvgs = {
      "girl": girlSVG,
      "boy": boySVG,
      "abstract": abstractSVG,
      "blathers": blathersSVG,
      "tom-nook": tomNookSVG,
    };

    this.defaultPoseNetArchitecture = "MobileNetV1";
    this.defaultQuantBytes = 2;
    this.defaultMultiplier = 1.0;
    this.defaultStride = 16;
    this.defaultInputResolution = 200;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.animate(this.avatarCanvas);
    this.resize();
  }

  resize() {
    this.canvasWidth = this.avatarCanvas.width / 2;
    this.canvasHeight = this.avatarCanvas.height / 2;

    this.avatarCanvas.style.width = null;
    this.avatarCanvas.style.height = null;
  }

  async animate(avatarCanvas) {
    this.setupCanvas(avatarCanvas);

    this.posenet = await posenet_module.load({
      architecture: this.defaultPoseNetArchitecture,
      outputStride: this.defaultStride,
      inputResolution: this.defaultInputResolution,
      multiplier: this.defaultMultiplier,
      quantBytes: this.defaultQuantBytes
    });
    this.facemesh = await facemesh_module.load();

    await this.parseSVG(Object.values(this.avatarSvgs)[0]);

    try {
      await this.loadVideo();
    } catch (e) {
      console.log(e);
    }

    this.detectPoseInRealTime();
  }

  setupCanvas() {
    this.canvasScope = paper.default;
    // this.avatarCanvas.width = this.canvasWidth;
    // this.avatarCanvas.height = this.canvasHeight;
    this.canvasScope.setup(this.avatarCanvas);
  }

  async parseSVG(target) {
    const svgScope = await SVGUtils.importSVG(target);
    const skeleton = new Skeleton(svgScope);
    this.illustration = new PoseIllustration(this.canvasScope);
    this.illustration.bindSkeleton(skeleton, svgScope);
  }

  async loadVideo() {
    this.video = await this.setupCamera(this.video);
    this.video.play();
  }

  async setupCamera(video) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
    }

    video.width = this.videoWidth;
    video.height = this.videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
      "audio": true,
      "video": {
        facingMode: "user",
        width: this.videoWidth,
        height: this.videoHeight,
      },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }

  detectPoseInRealTime() {
    this.outputCanvas.width = this.videoWidth;
    this.outputCanvas.height = this.videoHeight;

    this.poseDetectionFrame(this.outputCanvas);
  }

  async poseDetectionFrame() {
    let poses = [];

    this.ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.translate(-this.videoWidth, 0);
    this.ctx.drawImage(this.video, 0, 0, this.videoWidth, this.videoHeight);
    this.ctx.restore();

    const input = tf.browser.fromPixels(this.outputCanvas);
    this.faceDetection = await this.facemesh.estimateFaces(input, false, false);
    let all_poses = await this.posenet.estimatePoses(this.video, {
      flipHorizontal: true,
      decodingMethod: "multi-person",
      maxDetections: 1,
      scoreThreshold: this.minPartConfidence,
      nmsRadius: this.nmsRadius,
    });

    poses = poses.concat(all_poses);
    input.dispose();

    this.canvasScope.project.clear();

    if (poses.length >= 1 && this.illustration) {
      Skeleton.flipPose(poses[0]);

      if (this.faceDetection && this.faceDetection.length > 0) {
        let face = Skeleton.toFaceFrame(this.faceDetection[0]);
        this.illustration.updateSkeleton(poses[0], face);
      } else {
        this.illustration.updateSkeleton(poses[0], null);
      }
      this.illustration.draw(this.canvasScope, this.videoWidth, this.videoHeight);
    }

    this.canvasScope.project.activeLayer.scale(
      this.canvasWidth / this.videoWidth,
      this.canvasHeight / this.videoHeight,
      new this.canvasScope.Point(0, 0));

    requestAnimationFrame(this.poseDetectionFrame.bind(this));
  }
}

export default PoseAnimator;
