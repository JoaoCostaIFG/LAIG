class KeyframeAnimation extends Animation {
  constructor(scene, id, keyframes) {
    super(keyframes[0], keyframes[1]);
    this.keyframes = keyframes;
    this.lastKF = keyframes[keyframes.length - 1];

    this.scene = scene;
    this.id = id;
    this.lastTime = Date.now() / 1000; // current time in seconds
    this.sumT = 0;

    this.translation = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [0, 0, 0];
    this.genMatrix();

    this.seg = 0;
    this.isDone = this.keyframes.length <= 0; // don't do anything if we don't have KF
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

  setFinalPos() {
    // set final position (no more key frames)
    this.tgMatrix = mat4.create();
    mat4.translate(this.tgMatrix, this.tgMatrix, this.lastKF.translation);
    mat4.rotateX(this.tgMatrix, this.tgMatrix, this.lastKF.rotation[0]);
    mat4.rotateY(this.tgMatrix, this.tgMatrix, this.lastKF.rotation[1]);
    mat4.rotateZ(this.tgMatrix, this.tgMatrix, this.lastKF.rotation[2]);
    mat4.scale(this.tgMatrix, this.tgMatrix, this.lastKF.scale);
  }

  update(t) {
    // check if animation ended
    if (this.isDone) return;

    if (this.sumT > this.lastKF.instant) {
      this.isDone = true;
      this.setFinalPos();
      return;
    }

    // update time values
    this.sumT += t - this.lastTime; // += deltaTime
    this.lastTime = t;
    // go away if animation hasn't started
    if (this.sumT < this.keyframeI.instant) return;

    // calculate segment
    let gotNewSeg = false;
    if (this.sumT > this.keyframeF.instant) {
      gotNewSeg = true;
      this.keyframeI = this.keyframeF;
      if (this.keyframeF.nextKF == null) return;
      else this.keyframeF = this.keyframeF.nextKF;
    }
    if (gotNewSeg)
      this.currKFDuration = this.keyframeF.instant - this.keyframeI.instant;

    // time percentage
    let timePerc = (this.sumT - this.keyframeI.instant) / this.currKFDuration;

    // update transformation matrix
    this.interpollateTgs(this.keyframeI, this.keyframeF, timePerc);
    this.genMatrix();
  }

  apply() {
    this.scene.pushTransformation(this.tgMatrix);
  }
}
