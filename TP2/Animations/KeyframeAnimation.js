class KeyframeAnimation extends Animation {
  constructor(scene, id, keyframes) {
    super(scene, id);

    this.keyframes = keyframes;
    this.keyframes.sort((a, b) => {
      return a.instant - b.instant;
    });

    this.translation = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [0, 0, 0];
    this.genMatrix();

    this.seg = 0;
    this.isDone = false;
    this.currKFDuration = 0.0;
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
    vec3.lerp(
      this.translation,
      actualKF.translation,
      nextKF.translation,
      timePerc
    );
    vec3.lerp(this.rotation, actualKF.rotation, nextKF.rotation, timePerc);
    vec3.lerp(this.scale, actualKF.scale, nextKF.scale, timePerc);
  }

  setFinalPos(finalKF) {
    this.tgMatrix = mat4.create();
    mat4.translate(this.tgMatrix, this.tgMatrix, finalKF.translation);
    mat4.rotateX(this.tgMatrix, this.tgMatrix, finalKF.rotation[0]);
    mat4.rotateY(this.tgMatrix, this.tgMatrix, finalKF.rotation[1]);
    mat4.rotateZ(this.tgMatrix, this.tgMatrix, finalKF.rotation[2]);
    mat4.scale(this.tgMatrix, this.tgMatrix, finalKF.scale);
  }

  update(t) {
    // check if animation ended
    if (this.isDone) return;

    let nKeyframes = this.keyframes.length;
    if (nKeyframes <= 0) {
      return;
    } else if (this.sumT > this.keyframes[nKeyframes - 1].instant) {
      this.isDone = true;
      // set final position (no more key frames)
      this.setFinalPos(this.keyframes[nKeyframes - 1]);
      return;
    }

    // update time values
    let deltaT = t - this.lastTime;
    this.sumT += deltaT;
    this.lastTime = t;
    // go away if animation hasn't started
    if (this.sumT < this.keyframes[0].instant) return;

    // calculate segment
    let actualKF, nextKF;
    let gotNewSeg = false;
    for (let seg = 0; seg < this.keyframes.length - 1; ++seg) {
      actualKF = this.keyframes[seg];
      nextKF = this.keyframes[seg + 1];
      if (this.sumT >= actualKF.instant && this.sumT <= nextKF.instant) break;
      else gotNewSeg = true;
    }
    if (gotNewSeg) this.currKFDuration = nextKF.instant - actualKF.instant;

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
