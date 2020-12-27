class MyGameMove {
  constructor(orch, pieceI, pieceF) {
    this.orch = orch;
    this.pieceI = pieceI;
    this.tileI = pieceI.tile;
    this.pieceF = pieceF;
    this.tileF = pieceF.tile;

    this.isDone = false;
  }

  doMove() {
    // Create animations
    let animationI = new MovePieceAnimation(this.pieceI.scene);
    this.pieceI.setAnimation(animationI);

    let animationF = new MovePieceAnimation(this.pieceI.scene);
    this.pieceF.setAnimation(animationF);
  }

  undoMove() {
    this.tileI.setPiece(this.pieceI);
    this.tileF.setPiece(this.pieceF);
  }

  update(t) {
    if (this.isDone) return;

    this.pieceI.update(t);
    this.pieceF.update(t);

    // animations ended
    if (this.pieceI.animation == null && this.pieceF.animation == null) {
      // at the end, switch the initial tiles
      this.tileI.setPiece(this.pieceF);
      this.tileF.setPiece(this.pieceI);

      // notify orchestrator
      this.orch.onAnimationDone();

      this.isDone = true;
    }
  }

  toString() {
    return "[" + this.tileI.toString() + "," + this.tileF.toString() + "]";
  }
}
