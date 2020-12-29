class MyGameMove {
  constructor(orch, pieceI, pieceF) {
    this.orch = orch;
    this.validMoves = this.orch.validMoves;

    this.pieceI = pieceI;
    this.tileI = pieceI.tile;
    this.pieceF = pieceF;
    this.tileF = pieceF.tile;

    this.isDone = false; // move finished animating or hasn't started
    this.isRunning = false; // move is not currently animation
  }

  doMove() {
    // move needs to be "undone" before is "done" again
    if (this.isDone) return;

    let diffX = this.tileI.getCoords()[0] - this.tileF.getCoords()[0];
    let diffY = this.tileI.getCoords()[1] - this.tileF.getCoords()[1];

    // Create animations
    let animationI = new MovePieceAnimation(
      this.pieceI.scene,
      [-diffX, -diffY],
      true
    );
    this.pieceI.setAnimation(animationI);

    let animationF = new MovePieceAnimation(
      this.pieceI.scene,
      [diffX, diffY],
      false
    );
    this.pieceF.setAnimation(animationF);

    this.isRunning = true;
  }

  undoMove() {
    this.tileI.setPiece(this.pieceI);
    this.tileF.setPiece(this.pieceF);
    this.isDone = false;
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
      this.isRunning = false;
    }
  }

  toString() {
    return "[" + this.tileI.toString() + "," + this.tileF.toString() + "]";
  }
}
