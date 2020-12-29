/**
 * MyCGFcameraOrtho
 * @constructor
 * @param left - left component
 * @param right - right component
 * @param bottom - bottom component
 * @param top - top component
 * @param near - near component
 * @param far - far component
 * @param position - camera's position
 * @param target - camera's target
 * @param up - up component
 */
class MyCGFcameraOrtho extends CGFcameraOrtho {
  constructor(left, right, bottom, top, near, far, position, target, up) {
    super(left, right, bottom, top, near, far, position, target, up);

    this.initPosition = vec4.fromValues(...position, 0);
    this.initTarget = vec4.fromValues(...target, 0);
    this.initUp = vec3.fromValues(...up);
    this.initNear = near;
    this.initFar = far;

    // animation end
    this.endPos = vec4.create();
    this.endTarget = vec4.create();
    this.endUp = vec3.create();
    this.endNear = 0;
    this.endFar = 0;
    // animation current
    this.currPos = vec4.create();
    this.currTarget = vec4.create();
    this.currUp = vec3.create();
    this.currNear = 0;
    this.currFar = 0;
    this.isAnimating = false;
  }

  /**
   * Reset camera to its initial state
   */
  reset() {
    vec4.copy(this.position, this.initPosition);
    vec4.copy(this.target, this.initTarget);
    vec3.copy(this._up, this.initUp);
    this.direction = this.calculateDirection();

    this.near = this.initNear;
    this.far = this.initFar;

    this.isAnimating = false;
  }

  startAnim(endCam) {
    // start
    vec4.copy(this.currPos, this.position);
    vec4.copy(this.currTarget, this.target);
    vec3.copy(this.currUp, this._up);
    this.currNear = this.near;
    this.currFar = this.far;

    // end
    vec4.copy(this.endPos, endCam.initPosition);
    vec4.copy(this.endTarget, endCam.initTarget);
    vec3.copy(this.endUp, endCam.initUp);
    this.endNear = endCam.initNear;
    this.endFar = endCam.initFar;

    this.isAnimating = true;
    this.lastTime = Date.now() / 1000.0;
    this.sumT = 0;
  }

  update(t) {
    if (!this.isAnimating) return;

    this.sumT += t - this.lastTime;
    this.lastTime = t;

    let timePerc = this.sumT; // divide by number of secs;
    if (timePerc >= 1) {
      // animation is done
      timePerc = 1;
      this.isAnimating = false;
    }

    vec4.lerp(this.position, this.currPos, this.endPos, timePerc);
    vec4.lerp(this.target, this.currTarget, this.endTarget, timePerc);
    vec3.lerp(this._up, this.currUp, this.endUp, timePerc);
    this.direction = this.calculateDirection();

    this.near = this.currNear + (this.endNear - this.currNear) * timePerc;
    this.far = this.currFar + (this.endFar - this.currFar) * timePerc;
  }
}
