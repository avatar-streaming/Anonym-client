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

let videoWidth = 300;
let videoHeight = 300;

// Canvas
let faceDetection = null;
let illustration = null;
let canvasScope;
let canvasWidth = 800;
let canvasHeight = 600;

// ML models
let facemesh;
let posenet;
let minPartConfidence = 0.1;
let nmsRadius = 30.0;

// Misc
const avatarSvgs = {
  "girl": girlSVG,
  "boy": boySVG,
  "abstract": abstractSVG,
  "blathers": blathersSVG,
  "tom-nook": tomNookSVG,
};

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera(video) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    "audio": false,
    "video": {
      facingMode: "user",
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo(video) {
  video = await setupCamera(video);
  video.play();

  return video;
}

const defaultPoseNetArchitecture = "MobileNetV1";
const defaultQuantBytes = 2;
const defaultMultiplier = 1.0;
const defaultStride = 16;
const defaultInputResolution = 200;

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
function detectPoseInRealTime(video, outputCanvas) {
  const ctx = outputCanvas.getContext("2d");

  outputCanvas.width = videoWidth;
  outputCanvas.height = videoHeight;

  async function poseDetectionFrame() {
    // Begin monitoring code for frames per second

    let poses = [];

    ctx.clearRect(0, 0, videoWidth, videoHeight);
    // Draw video
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    // Creates a tensor from an image
    const input = tf.browser.fromPixels(outputCanvas);
    faceDetection = await facemesh.estimateFaces(input, false, false);
    let all_poses = await posenet.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: "multi-person",
      maxDetections: 1,
      scoreThreshold: minPartConfidence,
      nmsRadius: nmsRadius
    });

    poses = poses.concat(all_poses);
    input.dispose();

    canvasScope.project.clear();

    if (poses.length >= 1 && illustration) {
      Skeleton.flipPose(poses[0]);

      if (faceDetection && faceDetection.length > 0) {
        let face = Skeleton.toFaceFrame(faceDetection[0]);
        illustration.updateSkeleton(poses[0], face);
      } else {
        illustration.updateSkeleton(poses[0], null);
      }
      illustration.draw(canvasScope, videoWidth, videoHeight);
    }

    canvasScope.project.activeLayer.scale(
      canvasWidth / videoWidth,
      canvasHeight / videoHeight,
      new canvasScope.Point(0, 0));

    // End monitoring code for frames per second

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}

function setupCanvas(avatarCanvas) {
  canvasScope = paper.default;
  avatarCanvas.width = canvasWidth;
  avatarCanvas.height = canvasHeight;
  canvasScope.setup(avatarCanvas);
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
export async function bindPage(avatarCanvas, outputCanvas, video) {
  setupCanvas(avatarCanvas);

  // toggleLoadingUI(true);
  // setStatusText("Loading PoseNet model...");
  posenet = await posenet_module.load({
    architecture: defaultPoseNetArchitecture,
    outputStride: defaultStride,
    inputResolution: defaultInputResolution,
    multiplier: defaultMultiplier,
    quantBytes: defaultQuantBytes
  });
  // setStatusText("Loading FaceMesh model...");
  facemesh = await facemesh_module.load();

  // setStatusText("Loading Avatar file...");
  await parseSVG(Object.values(avatarSvgs)[0]);

  // setStatusText("Setting up camera...");
  try {
    video = await loadVideo(video);
  } catch (e) {
    // let info = document.getElementById("info");
    // info.textContent = "this device type is not supported yet, " +
    //   "or this browser does not support video capture: " + e.toString();
    // info.style.display = "block";
    throw e;
  }

  // toggleLoadingUI(false);
  detectPoseInRealTime(video, outputCanvas);
}

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
// FileUtils.setDragDropHandler((result) => {parseSVG(result)});

async function parseSVG(target) {
  let svgScope = await SVGUtils.importSVG(target /* SVG string or file path */);
  let skeleton = new Skeleton(svgScope);
  illustration = new PoseIllustration(canvasScope);
  illustration.bindSkeleton(skeleton, svgScope);
}
