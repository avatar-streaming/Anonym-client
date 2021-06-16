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

import { Bone, allPartNames, Skeleton } from "./skeleton";
import { MathUtils } from "../utils/mathUtils";
import { SVGUtils } from "../utils/svgUtils";
import { ColorUtils } from "../utils/colorUtils";

const allPartNamesMap = {};
allPartNames.forEach(name => allPartNamesMap[name] = 1);

const MIN_CONFIDENCE_PATH_SCORE = 0.3;

export class PoseIllustration {
  constructor(scope) {
    this.scope = scope;
    this.frames = [];
  }

  updateSkeleton(pose, face) {
    this.pose = pose;
    this.face = face;
    this.skeleton.update(pose, face);

    if (!this.skeleton.isValid) {
      return;
    }

    const getConfidenceScore = (p) => {
      return Object.keys(p.skinning).reduce((totalScore, boneName) => {
        const bt = p.skinning[boneName];

        return totalScore + bt.bone.score * bt.weight;
      }, 0);
    };

    this.skinnedPaths.forEach(skinnedPath => {
      let confidenceScore = 0;

      skinnedPath.segments.forEach(seg => {
        confidenceScore += getConfidenceScore(seg.point);
        seg.point.currentPosition = Skeleton.getCurrentPosition(seg.point);

        if (seg.handleIn) {
          seg.handleIn.currentPosition = Skeleton.getCurrentPosition(seg.handleIn);
        }

        if (seg.handleOut) {
          seg.handleOut.currentPosition = Skeleton.getCurrentPosition(seg.handleOut);
        }
      });

      skinnedPath.confidenceScore = confidenceScore / (skinnedPath.segments.length || 1);
    });
  }

  draw() {
    if (!this.skeleton.isValid) {
      return;
    }

    const scope = this.scope;

    this.skinnedPaths.forEach(skinnedPath => {
      if (!skinnedPath.confidenceScore || skinnedPath.confidenceScore < MIN_CONFIDENCE_PATH_SCORE) {
        return;
      }

      const path = new scope.Path({
        fillColor: skinnedPath.fillColor,
        strokeColor: skinnedPath.strokeColor,
        strokeWidth: skinnedPath.strokeWidth,
        closed: skinnedPath.closed,
      });

      skinnedPath.segments.forEach(seg => {
        path.addSegment(seg.point.currentPosition,
          seg.handleIn ? seg.handleIn.currentPosition.subtract(seg.point.currentPosition) : null,
          seg.handleOut ? seg.handleOut.currentPosition.subtract(seg.point.currentPosition) : null);
      });

      if (skinnedPath.closed) {
        path.closePath();
      }

      scope.project.activeLayer.addChild(path);
    });
  }

  debugDraw() {
    const scope = this.scope;
    const group = new scope.Group();
    scope.project.activeLayer.addChild(group);

    const drawCircle = (p, opt = {}) => {
      group.addChild(new scope.Path.Circle({
        center: [p.x, p.y],
        radius: opt.radius || 2,
        fillColor: opt.fillColor || "red",
      }));
    };
    const drawLine = (p0, p1, opt = {}) => {
      group.addChild(new scope.Path({
        segments: [p0, p1],
        strokeColor: opt.strokeColor || "red",
        strokeWidth: opt.strokeWidth || 1
      }));
    };

    this.skeleton.debugDraw(scope);
    this.skinnedPaths.forEach(skinnedPath => {
      skinnedPath.segments.forEach(seg => {
        const color = new scope.Color(0);

        Object.keys(seg.point.skinning).forEach((boneName) => {
          const bt = seg.point.skinning[boneName];

          ColorUtils.addRGB(color,
            bt.weight * bt.bone.boneColor.red,
            bt.weight * bt.bone.boneColor.green,
            bt.weight * bt.bone.boneColor.blue
          );

          const anchor = bt.bone.kp0.currentPosition.multiply(1 - bt.transform.anchorPerc).add(bt.bone.kp1.currentPosition.multiply(bt.transform.anchorPerc));

          drawLine(anchor, seg.point.currentPosition, { strokeColor: "blue", strokeWidth: bt.weight });
        });

        drawCircle(seg.point.currentPosition, { fillColor: color });
        drawCircle(seg.handleIn.currentPosition, { fillColor: color });
        drawLine(seg.point.currentPosition, seg.handleIn.currentPosition, { strokeColor: color });
        drawCircle(seg.handleOut.currentPosition, { fillColor: color }, { strokeColor: color });
        drawLine(seg.point.currentPosition, seg.handleOut.currentPosition);
      });
    });
  }

  debugDrawLabel(scope) {
    this.skeleton.debugDrawLabels(scope);
  }

  bindSkeleton(skeleton, skeletonScope) {
    let items = skeletonScope.project.getItems({ recursive: true });

    items = items.filter(item => item.parent && item.parent.name && item.parent.name.startsWith("illustration"));
    this.skeleton = skeleton;
    this.skinnedPaths = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (SVGUtils.isGroup(item)) {
        this.bindGroup(item, skeleton);
        continue;
      }

      if (SVGUtils.isPath(item)) {
        this.bindPathToBones(item);
        continue;
      }

      if (SVGUtils.isShape(item)) {
        this.bindPathToBones(item.toPath());
      }
    }
  }

  bindGroup(group, skeleton) {
    const paths = [];
    const keypoints = {};
    const items = group.getItems({ recursive: true });

    items.forEach(item => {
      const partName = item.name ? allPartNames.find(partName => item.name.startsWith(partName)) : null;

      if (partName) {
        keypoints[partName] = {
          position: item.bounds.center,
          name: partName,
        };
        return;
      }

      if (SVGUtils.isPath(item)) {
        paths.push(item);
        return;
      }

      if (SVGUtils.isShape(item)) {
        paths.push(item.toPath());
      }
    });

    const secondaryBones = [];
    const parentBones = skeleton.bones.filter(bone => keypoints[bone.kp0.name] && keypoints[bone.kp1.name]);
    const nosePos = skeleton.bNose3Nose4.kp1.position;

    if (!parentBones.length) {
      return;
    }

    parentBones.forEach(parentBone => {
      const kp0 = keypoints[parentBone.kp0.name];
      const kp1 = keypoints[parentBone.kp1.name];
      const secondaryBone = new Bone().set(kp0, kp1, parentBone.skeleton, parentBone.type);

      kp0.transformFunc = MathUtils.getTransformFunc(parentBone.kp0.position, nosePos, kp0.position);
      kp1.transformFunc = MathUtils.getTransformFunc(parentBone.kp1.position, nosePos, kp1.position);
      secondaryBone.parent = parentBone;
      secondaryBones.push(secondaryBone);
    });

    skeleton.secondaryBones = skeleton.secondaryBones.concat(secondaryBones);
    paths.forEach(path => {
      this.bindPathToBones(path, secondaryBones);
    });
  }

  getWeights(point, bones) {
    let totalW = 0;
    let weights = {};

    bones.forEach(bone => {
      const d = MathUtils.getClosestPointOnSegment(bone.kp0.position, bone.kp1.position, point).getDistance(point);
      const w = 1 / (d * d);
      weights[bone.name] = {
        value: w,
        bone: bone,
      };
    });

    const values = Object.values(weights).sort((v0, v1) => {
      return v1.value - v0.value;
    });

    weights = {};
    totalW = 0;

    values.forEach(v => {
      weights[v.bone.name] = v;
      totalW += v.value;
    });

    if (totalW === 0) {
      return {};
    }

    Object.values(weights).forEach(weight => {
      weight.value /= totalW;
    });

    return weights;
  }

  bindPathToBones(path, selectedBones) {
    const segs = path.segments.map(s => {
      const collinear = MathUtils.isCollinear(s.handleIn, s.handleOut);
      const bones = selectedBones || this.skeleton.findBoneGroup(s.point);
      const weightsP = this.getWeights(s.point, bones);
      const segment = {
        point: this.getSkinning(s.point, weightsP),
      };

      if (s.handleIn) {
        const pHandleIn = s.handleIn.add(s.point);

        segment.handleIn = this.getSkinning(pHandleIn, collinear ? weightsP : this.getWeights(pHandleIn, bones));
      }

      if (s.handleOut) {
        const pHandleOut = s.handleOut.add(s.point);

        segment.handleOut = this.getSkinning(pHandleOut, collinear ? weightsP : this.getWeights(pHandleOut, bones));
      }

      return segment;
    });

    this.skinnedPaths.push({
      segments: segs,
      fillColor: path.fillColor,
      strokeColor: path.strokeColor,
      strokeWidth: path.strokeWidth,
      closed: path.closed
    });
  }

  getSkinning(point, weights) {
    const skinning = {};

    Object.keys(weights).forEach(boneName => {
      skinning[boneName] = {
        bone: weights[boneName].bone,
        weight: weights[boneName].value,
        transform: weights[boneName].bone.getPointTransform(point),
      };
    });

    return {
      skinning: skinning,
      position: point,
      currentPosition: new this.scope.Point(0, 0),
    };
  };
}
