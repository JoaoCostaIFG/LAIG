class MyGameMove {
  constructor(pieceI, pieceF) {
    this.pieceI = pieceI;
    this.tileI = pieceI.tile;
    this.pieceF = pieceF;
    this.tileF = pieceF.tile;

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

    this.tileI.toggleHightlight();
    this.tileF.toggleHightlight();

    this.tileI.setPiece(this.pieceF);
    this.tileF.setPiece(this.pieceI);

  }
}
