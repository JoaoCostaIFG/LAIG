class MyGameBoard {
  constructor(scene, size) {
    this.scene = scene;
    this.size = size;

    this.primitive = new MyCube(scene);

    this.genTiles();
  }

  genTiles() {
    this.tiles = [];

    for (let i = 0; i < this.size; ++i) {
      // even => white, odd => black
      let c = i % 2 == 0 ? Color.WHITE : Color.BLACK;
      for (let j = 0; j < this.size; ++j) {
        let currTile = new MyTile(this.scene, this, null);
        currTile.setPiece(new MyPiece(this.scene, c, currTile));
        this.tiles.push(currTile);
        c = c == Color.WHITE ? Color.BLACK : Color.WHITE;
      }
    }
  }

  getTileByCoord(coord) {
    // get the 2 components of a coordinate, e.g.: 1;2
    parsedCoord = coord.split(";");

    return this.tiles[this.size * parsedCoord[0] + parsedCoord[1]];
  }

  getPieceByCoord(coord) {
    return this.getTileByCoord(coord).getPiece();
  }

  addPieceToTile(coord, piece) {
    this.getTileByCoord(coord).setPiece(piece);
  }

  removePieceFromTile(coord) {
    this.getTileByCoord(coord).unsetPiece();
  }

  getTileByPiece(piece) {
    return piece.tile;
  }

  move(pieceI, pieceF) {
    // get tiles
    let tileI = this.getTileByPiece(pieceI);
    let tileF = this.getTileByPiece(pieceF);
    tileI = pieceF;
    tileF = pieceI;

    return new MyGameMove(pieceI, tileI, pieceF, tileF);
  }

  display() {
    this.displayTiles();
    this.displayBoardBottom();
  }

  displayBoardBottom() {
    this.scene.pushMatrix();

    let sideLen = MyPiece.size * this.size + MyPiece.size / 2.0;

    this.scene.translate(-sideLen / 2.0, -MyPiece.size / 8.0, -sideLen / 2.0);
    this.scene.scale(sideLen, MyPiece.size / 4.0, sideLen);
    this.primitive.display();

    this.scene.popMatrix();
  }

  displayTiles() {
    /* draw tiles (+ pieces) */
    this.scene.pushMatrix();

    // go to first column
    this.scene.translate(
      (-MyPiece.size * this.size) / 2,
      0.0,
      (-MyPiece.size * this.size) / 2
    );

    // displays all tile (they display all pieces)
    for (let i = 0; i < this.size; ++i) {
      for (let j = 0; j < this.size; ++j) {
        let tileIndex = i * this.size + j;
        this.scene.registerForPick(tileIndex + 1, this.tiles[tileIndex]);
        this.tiles[tileIndex].display();
        this.scene.translate(MyPiece.size, 0.0, 0.0);
      }
      // go to next line start
      this.scene.translate(-MyPiece.size * this.size, 0.0, MyPiece.size);
    }

    this.scene.registerForPick(undefined, undefined); // stop picking
    this.scene.popMatrix();
  }
}
