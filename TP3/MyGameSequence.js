class MyGameSequence {
  constructor() {
    this.moves = [];
  }

  addMove(move) {
    this.moves.push(move);
  }

  canUndo() {
    return this.moves.length != 0;
  }

  getLastMove() {
    return this.moves.pop();
  }

  undo() {
    // check if we can undo
    if (!this.canUndo()) return null;
  
    let lastMove = this.getLastMove();
    return lastMove;
  }
}
