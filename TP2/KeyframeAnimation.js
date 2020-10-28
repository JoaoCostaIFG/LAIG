class KeyframeAnimation extends Animation {
  constructor(scene, id, keyframes) {
    super(scene, id);

    this.keyframes = keyframes;
    this.keyframes.sort((a, b) => {
      return a.instant - b.instant;
    });

    console.log(this.keyframes);
  }

  update(t) {}

  apply() {
    // TODO
    let interpollatedTg;
    this.scene.pushTransformation(interpollatedTg);
  }
}
