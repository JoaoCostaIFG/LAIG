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
    return this.moves[this.moves.length - 1];
  }

  undo() {
    // check if we can undo
    if (!this.canUndo()) return null;

    return this.moves.pop();
  }

  getMoveByInd(i) {
    return this.moves[i];
  }
}
