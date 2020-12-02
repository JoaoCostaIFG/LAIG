class MyGameState {
  constructor() {
    this.moves = [];
  }

  addMove(board, move) {
    this.moves.push(move);

    // animate

    // switch pieces possitions
    tileI.setPiece(pieceF);
    tileF.setPiece(pieceI);
  }

  canUndo() {
    return this.moves.length != 0;
  }

  undo(board) {
    // check if we can undo
    if (!this.canUndo()) return;

    board.
  }
}
