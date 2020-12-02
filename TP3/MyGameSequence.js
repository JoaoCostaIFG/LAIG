class MyGameSequence {
  constructor() {
    this.moves = [];
  }

  addMove(move) {
    this.moves.push(move);

    // animate

    // switch pieces possitions
    tileI.setPiece(pieceF);
    tileF.setPiece(pieceI);
  }

  canUndo() {
    return this.moves.length != 0;
  }

  getLastMove() {
    return this.moves.pop();
  }

  undo() {
    // check if we can undo
    if (!this.canUndo()) return;
  
    let lastMove = this.getLastMove();
    lastMove.tileI = lastMove.pieceI;
    lastMove.tileF = lastMove.pieceF;
  }
}
