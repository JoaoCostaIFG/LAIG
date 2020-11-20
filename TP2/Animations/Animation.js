class Animation { /* abstract class */
  constructor(keyframeI, keyframeF) {
    if (this.constructor == Animation) {
      throw new Error("Can't instantiate abstract class!");
    }

    this.keyframeI = keyframeI;
    this.keyframeF = keyframeF;
  }

  update(t) {
    throw new Error("Can't instantiate abstract class!");
  }

  apply() {
    throw new Error("Can't instantiate abstract class!");
  }
}
