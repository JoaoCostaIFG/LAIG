class MyGameSequence {
  constructor() {
    this.moves = [];
    this.length = 0;
  }

  addMove(move) {
    this.moves.push(move);
    this.length++;
  }

  canUndo() {
    return this.moves.length != 0;
  }

  getLastMove() {
    this.length--;
    return this.moves.pop();
  }

  undo() {
    // check if we can undo
    if (!this.canUndo()) return null;
  
    let lastMove = this.getLastMove();
    return lastMove;
  }

  getMoveByInd(i) {
    return this.moves[i];
  }
}
