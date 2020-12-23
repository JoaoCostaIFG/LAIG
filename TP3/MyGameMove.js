class MyGameMove {
  constructor(pieceI, pieceF) {
    this.pieceI = pieceI;
    this.tileI = pieceI.tile;
    this.pieceF = pieceF;
    this.tileF = pieceF.tile;
  }

  doMove() {
    this.tileI.setPiece(this.pieceF);
    this.tileF.setPiece(this.pieceI);
  }

  undoMove() {
    this.tileI.setPiece(this.pieceI);
    this.tileF.setPiece(this.pieceF);
  }

  update(time){
    this.pieceI.update(time);
    this.pieceF.update(time);
  }

  toString() {
    return "[" + this.tileI.toString() + "," + this.tileF.toString() + "]";
  }
}
