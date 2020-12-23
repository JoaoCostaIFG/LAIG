class MyGameMove {
  constructor(pieceI, pieceF) {
    this.pieceI = pieceI;
    this.tileI = pieceI.tile;
    this.pieceF = pieceF;
    this.tileF = pieceF.tile;
  }

  doMove() {
    this.tileI.unsetPiece();
    this.tileF.unsetPiece();

    // TODO create animations
    // and send them to the MyAnimator class
  }

  undoMove() {
    this.tileI.setPiece(this.pieceI);
    this.tileF.setPiece(this.pieceF);
  }

  update(t){
    this.pieceI.update(t);
    this.pieceF.update(t);

    // animations ended
    if (this.pieceI.animation == null && this.pieceF.animation == null) {
      // at the end, switch the initial tiles
      this.tileI.setPiece(this.pieceF);
      this.tileF.setPiece(this.pieceI);
    }
  }

  toString() {
    return "[" + this.tileI.toString() + "," + this.tileF.toString() + "]";
  }
}
