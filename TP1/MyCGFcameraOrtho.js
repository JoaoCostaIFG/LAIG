class MyCGFcameraOrtho extends CGFcameraOrtho {
  constructor(left, right, bottom, top, near, far, position, target, up) {
    super(left, right, bottom, top, near, far, position, target, up);

    this.initPosition = vec4.fromValues(position[0], position[1], position[2], 0);
    this.initTarget = vec4.fromValues(target[0], target[1], target[2], 0);
    this.initUp = up;
  }

  reset() {
    vec4.copy(this.position, this.initPosition);
    vec4.copy(this.target, this.initTarget);
    this._up = this.initUp;
    this.direction = this.calculateDirection();
  }
}
