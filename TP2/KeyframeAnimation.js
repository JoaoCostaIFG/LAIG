class KeyframeAnimation extends Animation {
  constructor(scene, id, keyframes) {
    super(scene, id);

    this.keyframes = keyframes;
    this.keyframes.sort((a, b) => {
      return a.instant - b.instant;
    });

    this.translation = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [1, 1, 1];
    this.genMatrix();
  }

  genMatrix() {
    this.tgMatrix = mat4.create();
    mat4.translate(this.tgMatrix, this.tgMatrix, this.translation);
    mat4.rotateX(this.tgMatrix, this.tgMatrix, this.rotation[0]);
    mat4.rotateY(this.tgMatrix, this.tgMatrix, this.rotation[1]);
    mat4.rotateZ(this.tgMatrix, this.tgMatrix, this.rotation[2]);
    mat4.scale(this.tgMatrix, this.tgMatrix, this.scale);
  }

  interpollateTgs(actualKF, nextKF, timePerc) {
    this.translation[0] =
      actualKF.translation[0] +
      timePerc * (nextKF.translation[0] - actualKF.translation[0]);
    this.translation[1] =
      actualKF.translation[1] +
      timePerc * (nextKF.translation[1] - actualKF.translation[1]);
    this.translation[2] =
      actualKF.translation[2] +
      timePerc * (nextKF.translation[2] - actualKF.translation[2]);

    this.rotation[0] =
      actualKF.rotation[0] +
      timePerc * (nextKF.rotation[0] - actualKF.rotation[0]);
    this.rotation[1] =
      actualKF.rotation[1] +
      timePerc * (nextKF.rotation[1] - actualKF.rotation[1]);
    this.rotation[2] =
      actualKF.rotation[2] +
      timePerc * (nextKF.rotation[2] - actualKF.rotation[2]);

    this.scale[0] =
      actualKF.scale[0] + timePerc * (nextKF.scale[0] - actualKF.scale[0]);
    this.scale[1] =
      actualKF.scale[1] + timePerc * (nextKF.scale[1] - actualKF.scale[1]);
    this.scale[2] =
      actualKF.scale[2] + timePerc * (nextKF.scale[2] - actualKF.scale[2]);
  }

  update(t) {
    // check if animation ended
    let nKeyframes = this.keyframes.length;
    if (nKeyframes <= 0 || this.sumT > this.keyframes[nKeyframes - 1].instant)
      return;

    // update time values
    let deltaT = t - this.lastTime;
    this.sumT += deltaT;
    this.lastTime = t;

    // calculate segment
    let actualKF, nextKF;
    let gotSeg = false;
    for (let seg = 0; seg < this.keyframes.length - 1; ++seg) {
      actualKF = this.keyframes[seg];
      nextKF = this.keyframes[seg + 1];
      if (this.sumT >= actualKF.instant && this.sumT <= nextKF.instant) {
        gotSeg = true;
        break;
      }
    }
    if (!gotSeg) return;

    // time percentage
    let timePerc =
      (this.sumT - actualKF.instant) / (nextKF.instant - actualKF.instant);

    // update transformation matrix
    this.interpollateTgs(actualKF, nextKF, timePerc);
    this.genMatrix();
  }

  apply() {
    this.scene.pushTransformation(this.tgMatrix);
  }
}
