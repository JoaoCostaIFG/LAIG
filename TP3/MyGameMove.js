class MyGameMove {
  constructor(pieceI, tileI, pieceF, tileF) {
    this.pieceI = pieceI;
    this.tileI = tileI;
    this.pieceF = pieceF;
    this.tileF = tileF;

    this.genKeyframes();
  }

  genKeyframes() {
    this.keyframes = [];
    this.keyframes.push(new Keyframe(0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    this.keyframes.push(new Keyframe(1, 5, 5, 5, 0, 0, 0, 0, 0, 0));
    this.keyframes.push(new Keyframe(2, 0, 0, 0, 0, 0, 0, 0, 0, 0));
  }

  animate() {
    // let KeyframeAnimation(scene, id, this.keyframes);
  }
}
