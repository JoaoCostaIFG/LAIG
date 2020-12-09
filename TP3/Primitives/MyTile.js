class MyTile {
  constructor(scene, board, piece) {
    this.scene = scene;
    this.board = board;
    this.tileBorder = new MyCube(scene);

    this.isHighlighted = false;
    this.piece = piece ? piece : null;
  }

  setPiece(piece) {
    this.piece = piece;
    this.piece.tile = this;
  }

  unsetPiece() {
    this.piece.tile = null;
    this.piece = null;
  }

  getPiece() {
    return this.piece;
  }

  toggleHightlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  display() {
    if (this.isHighlighted) this.displayBorder();
    if (this.piece != null) this.piece.display();
  }

  displayBorder() {
    let borderWidth = MyPiece.size / 10.0;
    let translationDist = MyPiece.size - borderWidth;

    this.scene.pushMaterial(this.scene.redHighlightMat);
    this.scene.pushMatrix();

    this.scene.translate(0.0, MyPiece.size / 2.0, 0.0);

    this.scene.pushMatrix();
    this.scene.scale(borderWidth, 0.1, MyPiece.size);
    this.tileBorder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(MyPiece.size, 0.1, borderWidth);
    this.tileBorder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(translationDist, 0.0, 0.0);
    this.scene.scale(borderWidth, 0.1, MyPiece.size);
    this.tileBorder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.0, 0.0, translationDist);
    this.scene.scale(MyPiece.size, 0.1, borderWidth);
    this.tileBorder.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
    this.scene.popMaterial();
  }
}
