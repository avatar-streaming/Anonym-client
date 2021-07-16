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

import * as paper from "paper";
import { SVGUtils } from "../utils/svgUtils";
import { MathUtils } from "../utils/mathUtils";
import { ColorUtils } from "../utils/colorUtils";
import { flatMapDeep } from "lodash-es";

const MIN_POSE_SCORE = 0.1;
const MIN_FACE_SCORE = 0.8;

const posePartNames = ["leftAnkle", "leftKnee", "leftHip", "leftWrist", "leftElbow", "leftShoulder",
  "rightAnkle", "rightKnee", "rightHip", "rightWrist", "rightElbow", "rightShoulder",
  "leftEar", "rightEar"];

export const facePartName2Index = {
  "topMid": 10,
  "rightTop0": 67,
  "rightTop1": 54,
  "leftTop0": 297,
  "leftTop1": 284,
  "rightJaw0": 21,
  "rightJaw1": 162,
  "rightJaw2": 127,
  "rightJaw3": 234,
  "rightJaw4": 132,
  "rightJaw5": 172,
  "rightJaw6": 150,
  "rightJaw7": 176,
  "jawMid": 152,
  "leftJaw7": 400,
  "leftJaw6": 379,
  "leftJaw5": 397,
  "leftJaw4": 361,
  "leftJaw3": 454,
  "leftJaw2": 356,
  "leftJaw1": 389,
  "leftJaw0": 251,
  "rightBrow0": 46,
  "rightBrow1": 53,
  "rightBrow2": 52,
  "rightBrow3": 65,
  "rightBrow4": 55,
  "leftBrow4": 285,
  "leftBrow3": 295,
  "leftBrow2": 282,
  "leftBrow1": 283,
  "leftBrow0": 276,
  "nose0": 6,
  "nose1": 197,
  "nose2": 195,
  "nose3": 5,
  "rightNose0": 48,
  "rightNose1": 220,
  "nose4": 4,
  "leftNose1": 440,
  "leftNose0": 278,
  "rightEye0": 33,
  "rightEye1": 160,
  "rightEye2": 158,
  "rightEye3": 133,
  "rightEye4": 153,
  "rightEye5": 144,
  "leftEye3": 362,
  "leftEye2": 385,
  "leftEye1": 387,
  "leftEye0": 263,
  "leftEye5": 373,
  "leftEye4": 380,
  "rightMouthCorner": 61,
  "rightUpperLipTop0": 40,
  "rightUpperLipTop1": 37,
  "upperLipTopMid": 0,
  "leftUpperLipTop1": 267,
  "leftUpperLipTop0": 270,
  "leftMouthCorner": 291,
  "leftLowerLipBottom0": 321,
  "leftLowerLipBottom1": 314,
  "lowerLipBottomMid": 17,
  "rightLowerLipBottom1": 84,
  "rightLowerLipBottom0": 91,
  "rightMiddleLip": 78,
  "rightUpperLipBottom1": 81,
  "upperLipBottomMid": 13,
  "leftUpperLipBottom1": 311,
  "leftMiddleLip": 308,
  "leftLowerLipTop0": 402,
  "lowerLipTopMid": 14,
  "rightLowerLipTop0": 178,
};

const facePartNames = [
  "topMid", "rightTop0", "rightTop1", "leftTop0", "leftTop1",
  "rightJaw0", "rightJaw1", "rightJaw2", "rightJaw3", "rightJaw4", "rightJaw5", "rightJaw6", "rightJaw7", "jawMid",
  "leftJaw7", "leftJaw6", "leftJaw5", "leftJaw4", "leftJaw3", "leftJaw2", "leftJaw1", "leftJaw0",
  "rightBrow0", "rightBrow1", "rightBrow2", "rightBrow3", "rightBrow4",
  "leftBrow4", "leftBrow3", "leftBrow2", "leftBrow1", "leftBrow0",
  "nose0", "nose1", "nose2", "nose3",
  "rightNose0", "rightNose1", "nose4", "leftNose1", "leftNose0",
  "rightEye0", "rightEye1", "rightEye2", "rightEye3", "rightEye4", "rightEye5",
  "leftEye3", "leftEye2", "leftEye1", "leftEye0", "leftEye5", "leftEye4",
  "rightMouthCorner", "rightUpperLipTop0", "rightUpperLipTop1", "upperLipTopMid", "leftUpperLipTop1", "leftUpperLipTop0", "leftMouthCorner",
  "leftLowerLipBottom0", "leftLowerLipBottom1", "lowerLipBottomMid", "rightLowerLipBottom1", "rightLowerLipBottom0",
  "rightMiddleLip", "rightUpperLipBottom1", "upperLipBottomMid", "leftUpperLipBottom1", "leftMiddleLip",
  "leftLowerLipTop0", "lowerLipTopMid", "rightLowerLipTop0",
];

export const allPartNames = posePartNames.concat(facePartNames);

export class Bone {
  set(kp0, kp1, skeleton, type) {
    this.name = `${kp0.name}-${kp1.name}`;
    this.kp0 = kp0;
    this.kp1 = kp1;
    this.skeleton = skeleton;
    this.type = type;
    this.boneColor = ColorUtils.fromStringHash(this.name);
    this.boneColor.saturation += 0.5;

    return this;
  };

  getPointTransform(p) {
    const dir = this.kp1.position.subtract(this.kp0.position).normalize();
    const n = dir.clone();
    n.angle += 90;
    const closestP = MathUtils.getClosestPointOnSegment(this.kp0.position, this.kp1.position, p);
    const v = p.subtract(closestP);
    const dirProjD = v.dot(dir);
    const dirProjN = v.dot(n);
    const d = this.kp0.position.subtract(this.kp1.position).length;
    const anchorPerc = closestP.subtract(this.kp0.position).length / d;

    return {
      transform: new paper.default.Point(dirProjD, dirProjN),
      anchorPerc: anchorPerc,
    };
  }

  transform(trans) {
    if (!this.kp1.currentPosition || !this.kp0.currentPosition) {
      return;
    }

    const scale = this.type === "face" ? this.skeleton.currentFaceScale : this.skeleton.currentBodyScale;
    const dir = this.kp1.currentPosition.subtract(this.kp0.currentPosition).normalize();
    const n = dir.clone();
    n.angle += 90;
    const anchor = this.kp0.currentPosition.multiply(1 - trans.anchorPerc).add(this.kp1.currentPosition.multiply(trans.anchorPerc));
    const p = anchor.add(dir.multiply(trans.transform.x * scale)).add(n.multiply(trans.transform.y * scale));

    return p;
  }
}

function getKeyPointFromSVG(group, partName) {
  const shape = SVGUtils.findFirstItemWithPrefix(group, partName);

  return {
    position: shape.bounds.center,
    name: partName,
  };
}

function getPartFromPose(pose, name) {
  if (!pose || !pose.keypoints) {
    return null;
  }

  const part = pose.keypoints.find(kp => kp.part === name);

  return {
    position: new paper.default.Point(part.position.x, part.position.y),
    score: part.score,
  };
}

function getKeypointFromFaceFrame(face, i) {
  if (!face || !face.scaledMesh || !face.scaledMesh.length) {
    return new paper.default.Point(face.positions[i * 2], face.positions[i * 2 + 1]);
  }
}

export class Skeleton {
  constructor(scope) {
    const skeletonGroup = SVGUtils.findFirstItemWithPrefix(scope.project, "skeleton");

    // Pose
    const leftAnkle = getKeyPointFromSVG(skeletonGroup, "leftAnkle");
    const leftKnee = getKeyPointFromSVG(skeletonGroup, "leftKnee");
    const leftHip = getKeyPointFromSVG(skeletonGroup, "leftHip");
    const leftWrist = getKeyPointFromSVG(skeletonGroup, "leftWrist");
    const leftElbow = getKeyPointFromSVG(skeletonGroup, "leftElbow");
    const leftShoulder = getKeyPointFromSVG(skeletonGroup, "leftShoulder");
    const rightAnkle = getKeyPointFromSVG(skeletonGroup, "rightAnkle");
    const rightKnee = getKeyPointFromSVG(skeletonGroup, "rightKnee");
    const rightHip = getKeyPointFromSVG(skeletonGroup, "rightHip");
    const rightWrist = getKeyPointFromSVG(skeletonGroup, "rightWrist");
    const rightElbow = getKeyPointFromSVG(skeletonGroup, "rightElbow");
    const rightShoulder = getKeyPointFromSVG(skeletonGroup, "rightShoulder");

    // Face
    const topMid = getKeyPointFromSVG(skeletonGroup, "topMid");
    const rightTop0 = getKeyPointFromSVG(skeletonGroup, "rightTop0");
    const rightTop1 = getKeyPointFromSVG(skeletonGroup, "rightTop1");
    const leftTop0 = getKeyPointFromSVG(skeletonGroup, "leftTop0");
    const leftTop1 = getKeyPointFromSVG(skeletonGroup, "leftTop1");
    const leftJaw2 = getKeyPointFromSVG(skeletonGroup, "leftJaw2");
    const leftJaw3 = getKeyPointFromSVG(skeletonGroup, "leftJaw3");
    const leftJaw4 = getKeyPointFromSVG(skeletonGroup, "leftJaw4");
    const leftJaw5 = getKeyPointFromSVG(skeletonGroup, "leftJaw5");
    const leftJaw6 = getKeyPointFromSVG(skeletonGroup, "leftJaw6");
    const leftJaw7 = getKeyPointFromSVG(skeletonGroup, "leftJaw7");
    const jawMid = getKeyPointFromSVG(skeletonGroup, "jawMid");
    const rightJaw2 = getKeyPointFromSVG(skeletonGroup, "rightJaw2");
    const rightJaw3 = getKeyPointFromSVG(skeletonGroup, "rightJaw3");
    const rightJaw4 = getKeyPointFromSVG(skeletonGroup, "rightJaw4");
    const rightJaw5 = getKeyPointFromSVG(skeletonGroup, "rightJaw5");
    const rightJaw6 = getKeyPointFromSVG(skeletonGroup, "rightJaw6");
    const rightJaw7 = getKeyPointFromSVG(skeletonGroup, "rightJaw7");
    const nose0 = getKeyPointFromSVG(skeletonGroup, "nose0");
    const nose1 = getKeyPointFromSVG(skeletonGroup, "nose1");
    const nose2 = getKeyPointFromSVG(skeletonGroup, "nose2");
    const nose3 = getKeyPointFromSVG(skeletonGroup, "nose3");
    const nose4 = getKeyPointFromSVG(skeletonGroup, "nose4");
    const leftNose0 = getKeyPointFromSVG(skeletonGroup, "leftNose0");
    const leftNose1 = getKeyPointFromSVG(skeletonGroup, "leftNose1");
    const rightNose0 = getKeyPointFromSVG(skeletonGroup, "rightNose0");
    const rightNose1 = getKeyPointFromSVG(skeletonGroup, "rightNose1");
    const leftEye0 = getKeyPointFromSVG(skeletonGroup, "leftEye0");
    const leftEye1 = getKeyPointFromSVG(skeletonGroup, "leftEye1");
    const leftEye2 = getKeyPointFromSVG(skeletonGroup, "leftEye2");
    const leftEye3 = getKeyPointFromSVG(skeletonGroup, "leftEye3");
    const leftEye4 = getKeyPointFromSVG(skeletonGroup, "leftEye4");
    const leftEye5 = getKeyPointFromSVG(skeletonGroup, "leftEye5");
    const rightEye0 = getKeyPointFromSVG(skeletonGroup, "rightEye0");
    const rightEye1 = getKeyPointFromSVG(skeletonGroup, "rightEye1");
    const rightEye2 = getKeyPointFromSVG(skeletonGroup, "rightEye2");
    const rightEye3 = getKeyPointFromSVG(skeletonGroup, "rightEye3");
    const rightEye4 = getKeyPointFromSVG(skeletonGroup, "rightEye4");
    const rightEye5 = getKeyPointFromSVG(skeletonGroup, "rightEye5");
    const leftBrow0 = getKeyPointFromSVG(skeletonGroup, "leftBrow0");
    const leftBrow1 = getKeyPointFromSVG(skeletonGroup, "leftBrow1");
    const leftBrow2 = getKeyPointFromSVG(skeletonGroup, "leftBrow2");
    const leftBrow3 = getKeyPointFromSVG(skeletonGroup, "leftBrow3");
    const leftBrow4 = getKeyPointFromSVG(skeletonGroup, "leftBrow4");
    const rightBrow0 = getKeyPointFromSVG(skeletonGroup, "rightBrow0");
    const rightBrow1 = getKeyPointFromSVG(skeletonGroup, "rightBrow1");
    const rightBrow2 = getKeyPointFromSVG(skeletonGroup, "rightBrow2");
    const rightBrow3 = getKeyPointFromSVG(skeletonGroup, "rightBrow3");
    const rightBrow4 = getKeyPointFromSVG(skeletonGroup, "rightBrow4");
    const leftMouthCorner = getKeyPointFromSVG(skeletonGroup, "leftMouthCorner");
    const leftUpperLipTop0 = getKeyPointFromSVG(skeletonGroup, "leftUpperLipTop0");
    const leftUpperLipTop1 = getKeyPointFromSVG(skeletonGroup, "leftUpperLipTop1");
    const upperLipTopMid = getKeyPointFromSVG(skeletonGroup, "upperLipTopMid");
    const rightMouthCorner = getKeyPointFromSVG(skeletonGroup, "rightMouthCorner");
    const rightUpperLipTop0 = getKeyPointFromSVG(skeletonGroup, "rightUpperLipTop0");
    const rightUpperLipTop1 = getKeyPointFromSVG(skeletonGroup, "rightUpperLipTop1");
    const rightMiddleLip = getKeyPointFromSVG(skeletonGroup, "rightMiddleLip");
    const rightUpperLipBottom1 = getKeyPointFromSVG(skeletonGroup, "rightUpperLipBottom1");
    const leftMiddleLip = getKeyPointFromSVG(skeletonGroup, "leftMiddleLip");
    const leftUpperLipBottom1 = getKeyPointFromSVG(skeletonGroup, "leftUpperLipBottom1");
    const upperLipBottomMid = getKeyPointFromSVG(skeletonGroup, "upperLipBottomMid");
    const rightLowerLipTop0 = getKeyPointFromSVG(skeletonGroup, "rightLowerLipTop0");
    const leftLowerLipTop0 = getKeyPointFromSVG(skeletonGroup, "leftLowerLipTop0");
    const lowerLipTopMid = getKeyPointFromSVG(skeletonGroup, "lowerLipTopMid");
    const rightLowerLipBottom0 = getKeyPointFromSVG(skeletonGroup, "rightLowerLipBottom0");
    const rightLowerLipBottom1 = getKeyPointFromSVG(skeletonGroup, "rightLowerLipBottom1");
    const leftLowerLipBottom0 = getKeyPointFromSVG(skeletonGroup, "leftLowerLipBottom0");
    const leftLowerLipBottom1 = getKeyPointFromSVG(skeletonGroup, "leftLowerLipBottom1");
    const lowerLipBottomMid = getKeyPointFromSVG(skeletonGroup, "lowerLipBottomMid");

    this.bLeftShoulderRightShoulder = new Bone().set(leftShoulder, rightShoulder, this, "body");
    this.bRightShoulderRightHip = new Bone().set(rightShoulder, rightHip, this, "body");
    this.bLeftHipRightHip = new Bone().set(leftHip, rightHip, this, "body");
    this.bLeftShoulderLeftHip = new Bone().set(leftShoulder, leftHip, this, "body");
    this.bLeftShoulderLeftElbow = new Bone().set(leftShoulder, leftElbow, this, "body");
    this.bLeftElbowLeftWrist = new Bone().set(leftElbow, leftWrist, this, "body");
    this.bRightShoulderRightElbow = new Bone().set(rightShoulder, rightElbow, this, "body");
    this.bRightElbowRightWrist = new Bone().set(rightElbow, rightWrist, this, "body");
    this.bLeftHipLeftKnee = new Bone().set(leftHip, leftKnee, this, "body");
    this.bLeftKneeLeftAnkle = new Bone().set(leftKnee, leftAnkle, this, "body");
    this.bRightHipRightKnee = new Bone().set(rightHip, rightKnee, this, "body");
    this.bRightKneeRightAnkle = new Bone().set(rightKnee, rightAnkle, this, "body");

    this.bTopMidRightTop0 = new Bone().set(topMid, rightTop0, this, "face");
    this.bTopMidLeftTop0 = new Bone().set(topMid, leftTop0, this, "face");
    this.bLeftTop0LeftTop1 = new Bone().set(leftTop0, leftTop1, this, "face");
    this.bLeftTop1LeftJaw2 = new Bone().set(leftTop1, leftJaw2, this, "face");
    this.bLeftJaw2LeftJaw3 = new Bone().set(leftJaw2, leftJaw3, this, "face");
    this.bLeftJaw3LeftJaw4 = new Bone().set(leftJaw3, leftJaw4, this, "face");
    this.bLeftJaw4LeftJaw5 = new Bone().set(leftJaw4, leftJaw5, this, "face");
    this.bLeftJaw5LeftJaw6 = new Bone().set(leftJaw5, leftJaw6, this, "face");
    this.bLeftJaw6LeftJaw7 = new Bone().set(leftJaw6, leftJaw7, this, "face");
    this.bLeftJaw7JawMid = new Bone().set(leftJaw7, jawMid, this, "face");
    this.bRightTop0RightTop1 = new Bone().set(rightTop0, rightTop1, this, "face");
    this.bRightTop1RightJaw2 = new Bone().set(rightTop1, rightJaw2, this, "face");
    this.bRightJaw2RightJaw3 = new Bone().set(rightJaw2, rightJaw3, this, "face");
    this.bRightJaw3RightJaw4 = new Bone().set(rightJaw3, rightJaw4, this, "face");
    this.bRightJaw4RightJaw5 = new Bone().set(rightJaw4, rightJaw5, this, "face");
    this.bRightJaw5RightJaw6 = new Bone().set(rightJaw5, rightJaw6, this, "face");
    this.bRightJaw6RightJaw7 = new Bone().set(rightJaw6, rightJaw7, this, "face");
    this.bRightJaw7JawMid = new Bone().set(rightJaw7, jawMid, this, "face");
    this.bLeftEye0LeftEye1 = new Bone().set(leftEye0, leftEye1, this, "face");
    this.bLeftEye1LeftEye2 = new Bone().set(leftEye1, leftEye2, this, "face");
    this.bLeftEye2LeftEye3 = new Bone().set(leftEye2, leftEye3, this, "face");
    this.bLeftEye3LeftEye4 = new Bone().set(leftEye3, leftEye4, this, "face");
    this.bLeftEye4LeftEye5 = new Bone().set(leftEye4, leftEye5, this, "face");
    this.bLeftEye5LeftEye0 = new Bone().set(leftEye5, leftEye0, this, "face");
    this.bRightEye0RightEye1 = new Bone().set(rightEye0, rightEye1, this, "face");
    this.bRightEye1RightEye2 = new Bone().set(rightEye1, rightEye2, this, "face");
    this.bRightEye2RightEye3 = new Bone().set(rightEye2, rightEye3, this, "face");
    this.bRightEye3RightEye4 = new Bone().set(rightEye3, rightEye4, this, "face");
    this.bRightEye4RightEye5 = new Bone().set(rightEye4, rightEye5, this, "face");
    this.bRightEye5RightEye0 = new Bone().set(rightEye5, rightEye0, this, "face");
    this.bLeftBrow0LeftBrow1 = new Bone().set(leftBrow0, leftBrow1, this, "face");
    this.bLeftBrow1LeftBrow2 = new Bone().set(leftBrow1, leftBrow2, this, "face");
    this.bLeftBrow2LeftBrow3 = new Bone().set(leftBrow2, leftBrow3, this, "face");
    this.bLeftBrow3LeftBrow4 = new Bone().set(leftBrow3, leftBrow4, this, "face");
    this.bRightBrow0RightBrow1 = new Bone().set(rightBrow0, rightBrow1, this, "face");
    this.bRightBrow1RightBrow2 = new Bone().set(rightBrow1, rightBrow2, this, "face");
    this.bRightBrow2RightBrow3 = new Bone().set(rightBrow2, rightBrow3, this, "face");
    this.bRightBrow3RightBrow4 = new Bone().set(rightBrow3, rightBrow4, this, "face");
    this.bNose0Nose1 = new Bone().set(nose0, nose1, this, "face");
    this.bNose1Nose2 = new Bone().set(nose1, nose2, this, "face");
    this.bNose2Nose3 = new Bone().set(nose2, nose3, this, "face");
    this.bNose3Nose4 = new Bone().set(nose3, nose4, this, "face");
    this.bLeftNose0LeftNose1 = new Bone().set(leftNose0, leftNose1, this, "face");
    this.bLeftNose1Nose4 = new Bone().set(leftNose1, nose4, this, "face");
    this.bRightNose0RightNose1 = new Bone().set(rightNose0, rightNose1, this, "face");
    this.bRightNose1Nose4 = new Bone().set(rightNose1, nose4, this, "face");
    this.bLeftMouthCornerLeftUpperLipTop0 = new Bone().set(leftMouthCorner, leftUpperLipTop0, this, "face");
    this.bLeftUpperLipTop0LeftUpperLipTop1 = new Bone().set(leftUpperLipTop0, leftUpperLipTop1, this, "face");
    this.bLeftUpperLipTop1UpperLipTopMid = new Bone().set(leftUpperLipTop1, upperLipTopMid, this, "face");
    this.bRigthMouthCornerRigthUpperLipTop0 = new Bone().set(rightMouthCorner, rightUpperLipTop0, this, "face");
    this.bRigthUpperLipTop0RigthUpperLipTop1 = new Bone().set(rightUpperLipTop0, rightUpperLipTop1, this, "face");
    this.bRigthUpperLipTop1UpperLipTopMid = new Bone().set(rightUpperLipTop1, upperLipTopMid, this, "face");
    this.bLeftMouthCornerLeftMiddleLip = new Bone().set(leftMouthCorner, leftMiddleLip, this, "face");
    this.bLeftMiddleLipLeftUpperLipBottom1 = new Bone().set(leftMiddleLip, leftUpperLipBottom1, this, "face");
    this.bLeftUpperLipBottom1UpperLipBottomMid = new Bone().set(leftUpperLipBottom1, upperLipBottomMid, this, "face");
    this.bRightMouthCornerRightMiddleLip = new Bone().set(rightMouthCorner, rightMiddleLip, this, "face");
    this.bRightMiddleLipRightUpperLipBottom1 = new Bone().set(rightMiddleLip, rightUpperLipBottom1, this, "face");
    this.bRightUpperLipBottom1UpperLipBototmMid = new Bone().set(rightUpperLipBottom1, upperLipBottomMid, this, "face");
    this.bLeftMiddleLipLeftLowerLipTop0 = new Bone().set(leftMiddleLip, leftLowerLipTop0, this, "face");
    this.bLeftLowerLipTop0LowerLipTopMid = new Bone().set(leftLowerLipTop0, lowerLipTopMid, this, "face");
    this.bRightMiddleLipRightLowerLipTop0 = new Bone().set(rightMiddleLip, rightLowerLipTop0, this, "face");
    this.bRightLowerLipTop0LowerLipTopMid = new Bone().set(rightLowerLipTop0, lowerLipTopMid, this, "face");
    this.bLeftMouthCornerLeftLowerLipBottom0 = new Bone().set(leftMouthCorner, leftLowerLipBottom0, this, "face");
    this.bLeftLowerLipBottom0LeftLowerLipBottom1 = new Bone().set(leftLowerLipBottom0, leftLowerLipBottom1, this, "face");
    this.bLeftLowerLipBottom1LowerLipBottomMid = new Bone().set(leftLowerLipBottom1, lowerLipBottomMid, this, "face");
    this.bRightMouthCornerRightLowerLipBottom0 = new Bone().set(rightMouthCorner, rightLowerLipBottom0, this, "face");
    this.bRightLowerLipBottom0RightLowerLipBottom1 = new Bone().set(rightLowerLipBottom0, rightLowerLipBottom1, this, "face");
    this.bRightLowerLipBottom1LowerLipBottomMid = new Bone().set(rightLowerLipBottom1, lowerLipBottomMid, this, "face");

    this.faceBones = [
      // Face
      this.bTopMidRightTop0,
      this.bRightTop0RightTop1,
      this.bTopMidLeftTop0,
      this.bLeftTop0LeftTop1,
      this.bLeftTop1LeftJaw2,
      this.bLeftJaw2LeftJaw3,
      this.bLeftJaw3LeftJaw4,
      this.bLeftJaw4LeftJaw5,
      this.bLeftJaw5LeftJaw6,
      this.bLeftJaw6LeftJaw7,
      this.bLeftJaw7JawMid,
      this.bRightTop1RightJaw2,
      this.bRightJaw2RightJaw3,
      this.bRightJaw3RightJaw4,
      this.bRightJaw4RightJaw5,
      this.bRightJaw5RightJaw6,
      this.bRightJaw6RightJaw7,
      this.bRightJaw7JawMid,
      this.bLeftEye0LeftEye1,
      this.bLeftEye1LeftEye2,
      this.bLeftEye2LeftEye3,
      this.bLeftEye3LeftEye4,
      this.bLeftEye4LeftEye5,
      this.bLeftEye5LeftEye0,
      this.bRightEye0RightEye1,
      this.bRightEye1RightEye2,
      this.bRightEye2RightEye3,
      this.bRightEye3RightEye4,
      this.bRightEye4RightEye5,
      this.bRightEye5RightEye0,
      this.bLeftBrow0LeftBrow1,
      this.bLeftBrow1LeftBrow2,
      this.bLeftBrow2LeftBrow3,
      this.bLeftBrow3LeftBrow4,
      this.bRightBrow0RightBrow1,
      this.bRightBrow1RightBrow2,
      this.bRightBrow2RightBrow3,
      this.bRightBrow3RightBrow4,
      this.bNose0Nose1,
      this.bNose1Nose2,
      this.bNose2Nose3,
      this.bNose3Nose4,
      this.bLeftNose0LeftNose1,
      this.bLeftNose1Nose4,
      this.bRightNose0RightNose1,
      this.bRightNose1Nose4,
      this.bLeftMouthCornerLeftUpperLipTop0,
      this.bLeftUpperLipTop0LeftUpperLipTop1,
      this.bLeftUpperLipTop1UpperLipTopMid,
      this.bRigthMouthCornerRigthUpperLipTop0,
      this.bRigthUpperLipTop0RigthUpperLipTop1,
      this.bRigthUpperLipTop1UpperLipTopMid,
      this.bLeftMouthCornerLeftMiddleLip,
      this.bLeftMiddleLipLeftUpperLipBottom1,
      this.bLeftUpperLipBottom1UpperLipBottomMid,
      this.bRightMouthCornerRightMiddleLip,
      this.bRightMiddleLipRightUpperLipBottom1,
      this.bRightUpperLipBottom1UpperLipBototmMid,
      this.bLeftMiddleLipLeftLowerLipTop0,
      this.bLeftLowerLipTop0LowerLipTopMid,
      this.bRightMiddleLipRightLowerLipTop0,
      this.bRightLowerLipTop0LowerLipTopMid,
      this.bLeftMouthCornerLeftLowerLipBottom0,
      this.bLeftLowerLipBottom0LeftLowerLipBottom1,
      this.bLeftLowerLipBottom1LowerLipBottomMid,
      this.bRightMouthCornerRightLowerLipBottom0,
      this.bRightLowerLipBottom0RightLowerLipBottom1,
      this.bRightLowerLipBottom1LowerLipBottomMid,
    ];

    this.bodyBones = [
      // Body
      this.bLeftShoulderRightShoulder,
      this.bRightShoulderRightHip,
      this.bLeftHipRightHip,
      this.bLeftShoulderLeftHip,
      this.bLeftShoulderLeftElbow,
      this.bLeftElbowLeftWrist,
      this.bRightShoulderRightElbow,
      this.bRightElbowRightWrist,
      this.bLeftHipLeftKnee,
      this.bLeftKneeLeftAnkle,
      this.bRightHipRightKnee,
      this.bRightKneeRightAnkle
    ];

    this.bones = this.faceBones.concat(this.bodyBones);
    this.secondaryBones = [];
    this.parts = {};
    this.bodyLen0 = this.getTotalBoneLength(this.bodyBones);
    this.faceLen0 = this.getTotalBoneLength(this.faceBones);

    this.boneGroups = {
      "torso": [
        this.bLeftShoulderRightShoulder,
        this.bRightShoulderRightHip,
        this.bLeftHipRightHip,
        this.bLeftShoulderLeftHip,
      ],
      "leftLeg": [
        this.bLeftHipLeftKnee,
        this.bLeftKneeLeftAnkle,
      ],
      "rightLeg": [
        this.bRightHipRightKnee,
        this.bRightKneeRightAnkle
      ],
      "leftArm": [
        this.bLeftShoulderLeftElbow,
        this.bLeftElbowLeftWrist,
      ],
      "rightArm": [
        this.bRightElbowRightWrist,
        this.bRightShoulderRightElbow,
      ],
      "face": this.faceBones,
    };

    this.faceBones.forEach(bone => {
      const parts = [bone.kp0, bone.kp1];

      parts.forEach(part => {
        part.baseTransFunc = MathUtils.getTransformFunc(this.bLeftJaw2LeftJaw3.kp0.position,
          this.bRightJaw2RightJaw3.kp0.position, part.position);
      });
    });
  }

  update(pose, face) {
    if (pose.score < MIN_POSE_SCORE) {
      this.isValid = false;
      return;
    }

    this.isValid = this.updatePoseParts(pose);

    if (!this.isValid) {
      return;
    }

    this.isValid = this.updateFaceParts(face);

    if (!this.isValid) {
      return;
    }

    this.bones.forEach(bone => {
      const part0 = this.parts[bone.kp0.name];
      const part1 = this.parts[bone.kp1.name];

      bone.kp0.currentPosition = part0.position;
      bone.kp1.currentPosition = part1.position;
      bone.score = (part0.score + part1.score) / 2;
      bone.latestCenter = bone.kp1.currentPosition.add(bone.kp0.currentPosition).divide(2);
    });

    const nosePos = this.bNose3Nose4.kp1.currentPosition;

    this.secondaryBones.forEach(bone => {
      bone.kp0.currentPosition = bone.kp0.transformFunc(bone.parent.kp0.currentPosition, nosePos);
      bone.kp1.currentPosition = bone.kp1.transformFunc(bone.parent.kp1.currentPosition, nosePos);
      bone.score = bone.parent.score;
      bone.latestCenter = bone.kp1.currentPosition.add(bone.kp0.currentPosition).divide(2);
    });
    this.currentFaceScale = this.getTotalBoneLength(this.faceBones) / this.faceLen0;
    this.currentBodyScale = this.getTotalBoneLength(this.bodyBones) / this.bodyLen0;
    this.isValid = true;
  }

  updatePoseParts(pose) {
    posePartNames.forEach(partName => {
      const part1 = getPartFromPose(pose, partName);
      const part0 = (this.parts[partName] || part1);
      const weight0 = part0.score / (part1.score + part0.score);
      const weight1 = part1.score / (part1.score + part0.score);
      const pos = part0.position.multiply(weight0).add(part1.position.multiply(weight1));
      this.parts[partName] = {
        position: pos,
        score: part0.score * weight0 + part1.score * weight1,
      };
    });

    if (!this.parts["rightEar"] || !this.parts["leftEar"]) {
      return false;
    }

    return true;
  }

  updateFaceParts(face) {
    const posLeftEar = this.parts["leftEar"].position;
    const posRightEar = this.parts["rightEar"].position;

    if (face && face.positions && face.positions.length && face.faceInViewConfidence > MIN_FACE_SCORE) {
      for (let i = 0; i < facePartNames.length; i++) {
        const partName = facePartNames[i];
        const pos = getKeypointFromFaceFrame(face, i);

        if (!pos) {
          continue;
        }

        this.parts[partName] = {
          position: pos,
          score: face.faceInViewConfidence
        };
      }

      this.leftEarP2FFunc = MathUtils.getTransformFunc(posLeftEar, posRightEar, this.parts["leftJaw2"].position);
      this.rightEarP2FFunc = MathUtils.getTransformFunc(posLeftEar, posRightEar, this.parts["rightJaw2"].position);
    } else {
      const fLeftEar = this.leftEarP2FFunc ? this.leftEarP2FFunc(posLeftEar, posRightEar) : posLeftEar;
      const fRightEar = this.rightEarP2FFunc ? this.rightEarP2FFunc(posLeftEar, posRightEar) : posRightEar;

      this.currentFaceScale = this.currentBodyScale;
      this.faceBones.forEach(bone => {
        const parts = [bone.kp0, bone.kp1];

        parts.forEach(part => {
          this.parts[part.name] = {
            position: part.baseTransFunc(fLeftEar, fRightEar),
            score: 1,
          };
        });
      });
    }

    return true;
  }

  findBoneGroup(point) {
    const minDistances = {};

    Object.keys(this.boneGroups).forEach(boneGroupKey => {
      const boneGroup = this.boneGroups[boneGroupKey];
      let minDistance = Infinity;

      boneGroup.forEach(bone => {
        const d = MathUtils.getClosestPointOnSegment(bone.kp0.position, bone.kp1.position, point)
          .getDistance(point);

        minDistance = Math.min(minDistance, d);
      });

      minDistances[boneGroupKey] = minDistance;
    });

    const minDistance = Math.min(...Object.values(minDistances));
    const selectedGroups = [];

    Object.keys(minDistances).forEach(key => {
      const distance = minDistances[key];

      if (distance <= minDistance) {
        selectedGroups.push(this.boneGroups[key]);
      }
    });

    return flatMapDeep(selectedGroups);
  }

  getTotalBoneLength(bones) {
    let totalLen = 0;

    bones.forEach(bone => {
      const d = (bone.kp0.currentPosition || bone.kp0.position).subtract(bone.kp1.currentPosition || bone.kp1.position);

      totalLen += d.length;
    });

    return totalLen;
  }

  debugDraw(scope) {
    const group = new scope.Group();

    scope.project.activeLayer.addChild(group);
    this.bones.forEach(bone => {
      const path = new scope.Path({
        segments: [bone.kp0.currentPosition, bone.kp1.currentPosition],
        strokeWidth: 2,
        strokeColor: bone.boneColor
      });

      group.addChild(path);
    });
  }

  debugDrawLabels(scope) {
    const group = new scope.Group();

    scope.project.activeLayer.addChild(group);
    this.bones.forEach(bone => {
      const addLabel = (kp, name) => {
        const text = new scope.PointText({
          point: [kp.currentPosition.x, kp.currentPosition.y],
          content: name,
          fillColor: "black",
          fontSize: 7
        });

        group.addChild(text);
      };

      addLabel(bone.kp0, bone.kp0.name);
      addLabel(bone.kp1, bone.kp1.name);
    });
  }

  reset() {
    this.parts = [];
  }

  static getCurrentPosition(segment) {
    let position = new paper.default.Point();

    Object.keys(segment.skinning).forEach(boneName => {
      const bt = segment.skinning[boneName];

      position = position.add(bt.bone.transform(bt.transform).multiply(bt.weight));
    });

    return position;
  }

  static flipPose(pose) {
    pose.keypoints.forEach(kp => {
      if (kp.part && kp.part.startsWith("left")) {
        kp.part = "right" + kp.part.substring("left".length, kp.part.length);
        return;
      }

      if (kp.part && kp.part.startsWith("right")) {
        kp.part = "left" + kp.part.substring("right".length, kp.part.length);
      }
    });
  }

  static flipFace(face) {
    Object.keys(facePartName2Index).forEach(partName => {
      if (partName.startsWith("left")) {
        const rightName = "right" + partName.substr("left".length, partName.length);
        const temp = face.scaledMesh[facePartName2Index[partName]];

        face.scaledMesh[facePartName2Index[partName]] = face.scaledMesh[facePartName2Index[rightName]];
        face.scaledMesh[facePartName2Index[rightName]] = temp;
      }
    });
  }

  static getBoundingBox(pose) {
    let minX = 100000;
    let maxX = -100000;
    let minY = 100000;
    let maxY = -100000;
    const updateMinMax = (x, y) => {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    };

    pose.frames.forEach(frame => {
      frame.pose.keypoints.forEach(kp => {
        updateMinMax(kp.position.x, kp.position.y);
      });

      const faceKeypoints = frame.face.positions;

      for (let i = 0; i < faceKeypoints.length; i += 2) {
        updateMinMax(faceKeypoints[i], faceKeypoints[i + 1]);
      }
    });

    return [minX, maxX, minY, maxY];
  }

  static translatePose(pose, d) {
    pose.frames.forEach(frame => {
      frame.pose.keypoints.forEach(kp => {
        kp.position.x += d.x;
        kp.position.y += d.y;
      });

      const faceKeypoints = frame.face.positions;

      for (let i = 0; i < faceKeypoints.length; i += 2) {
        faceKeypoints[i] += d.x;
        faceKeypoints[i + 1] += d.y;
      }
    });
  }

  static resizePose(pose, origin, scale) {
    pose.frames.forEach(frame => {
      frame.pose.keypoints.forEach(kp => {
        kp.position.x = origin.x + (kp.position.x - origin.x) * scale.x;
        kp.position.y = origin.y + (kp.position.y - origin.y) * scale.y;
      });

      const faceKeypoints = frame.face.positions;

      for (let i = 0; i < faceKeypoints.length; i += 2) {
        faceKeypoints[i] = origin.x + (faceKeypoints[i] - origin.x) * scale.x;
        faceKeypoints[i + 1] = origin.y + (faceKeypoints[i + 1] - origin.y) * scale.y;
      }
    });
  }

  static toFaceFrame(faceDetection) {
    const frame = {
      positions: [],
      faceInViewConfidence: faceDetection.faceInViewConfidence,
    };

    for (let i = 0; i < facePartNames.length; i++) {
      const partName = facePartNames[i];
      const p = faceDetection.scaledMesh[facePartName2Index[partName]];

      frame.positions.push(p[0]);
      frame.positions.push(p[1]);
    }
    return frame;
  }
}
