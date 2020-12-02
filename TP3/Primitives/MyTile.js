class MyTile {
  constructor(scene, board, piece) {
    this.scene = scene;
    this.board = board;
    this.piece = piece ? piece : null;
  }
  
  setPiece(piece) {
    this.piece = piece;
  }
  
  unsetPiece() {
    this.piece = null;
  }
  
  getPiece() {
    return this.piece;
  }

  display() {
    // move to spot
    this.piece.display();
    // restore pos
  }
}
