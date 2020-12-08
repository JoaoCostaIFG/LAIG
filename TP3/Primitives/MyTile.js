class MyTile {
  constructor(scene, board, piece) {
    this.scene = scene;
    this.board = board;

    this.isHighlighted = false;
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

  toggleHightlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  display() {
    // move to spot
    if (this.isHighlighted) this.scene.pushMaterial(this.scene.redHighlightMat);
    if (this.piece != null) this.piece.display();
    if (this.isHighlighted) this.scene.popMaterial();
    // restore pos
  }
}
