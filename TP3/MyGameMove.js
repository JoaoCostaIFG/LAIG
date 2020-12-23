class MyGameMove {
  constructor(pieceI, pieceF) {
    this.pieceI = pieceI;
    this.tileI = pieceI.tile;
    this.pieceF = pieceF;
    this.tileF = pieceF.tile;
  }

  doMove() {
    /* this.tileI.unsetPiece();
    this.tileF.unsetPiece(); */

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

  update(t){
    console.log("UWU");
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
