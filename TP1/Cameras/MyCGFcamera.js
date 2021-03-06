/**
 * MyCGFcamera
 * @constructor
 * @param fov - fild of view 
 * @param near - near component
 * @param far - far component
 * @param position - camera's position
 * @param target - camera's target
 */
class MyCGFcamera extends CGFcamera {
  constructor(fov, near, far, position, target) {
    super(fov, near, far, position, target);

    this.initPosition = vec4.fromValues(position[0], position[1], position[2], 0);
    this.initTarget = vec4.fromValues(target[0], target[1], target[2], 0);
  }

  /**
   * Reset camera to its initial state
   */
  reset() {
    vec4.copy(this.position, this.initPosition);
    vec4.copy(this.target, this.initTarget);
    this._up = vec3.fromValues(0, 1, 0);
    this.direction = this.calculateDirection();
  }
}
