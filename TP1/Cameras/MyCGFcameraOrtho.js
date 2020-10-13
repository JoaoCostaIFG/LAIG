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

    this.initPosition = vec4.fromValues(position[0], position[1], position[2], 0);
    this.initTarget = vec4.fromValues(target[0], target[1], target[2], 0);
    this.initUp = up;
  }

  /**
   * Reset camera to its initial state
   */
  reset() {
    vec4.copy(this.position, this.initPosition);
    vec4.copy(this.target, this.initTarget);
    this._up = this.initUp;
    this.direction = this.calculateDirection();
  }
}
