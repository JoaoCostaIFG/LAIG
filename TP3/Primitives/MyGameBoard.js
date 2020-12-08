class MyGameBoard {
  constructor(scene, size) {
    this.scene = scene;
    this.size = size;

    this.primitive = new MyCube(scene);
    this.boarder = new MyBoarder(scene, size);

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

  addPiece2Tile(coord, piece) {
    this.getTileByCoord(coord).setPiece(piece);
  }

  removePiece2Tile(coord) {
    this.getTileByCoord(coord).unsetPiece();
  }

  getTileByPiece(piece) {
    for (let i = 0; i < this.size; ++i) {
      if (this.tiles[i].getPiece() == piece) return this.tiles[i];
    }

    return null;
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
    this.displayBoardBottom();
    this.displayTiles();
    this.displayBoarder();
  }

  displayBoarder(){
    let haflPiece = (MyPiece.size/2.0);
    let aux = this.size * haflPiece;

    // Up
    this.scene.pushMatrix();
    this.scene.translate(-aux - (MyPiece.size/4.0), haflPiece, -aux - (MyPiece.size/4.0));
    this.boarder.display();
    this.scene.popMatrix();

    // Right
    this.scene.pushMatrix();
    this.scene.translate(-aux, haflPiece, -aux);
    this.scene.rotate(Math.PI/2.0, 0, 1, 0);
    this.boarder.display();
    this.scene.popMatrix(); 

    // Down
    this.scene.pushMatrix();
    this.scene.translate(aux , haflPiece, -aux);
    this.boarder.display();
    this.scene.popMatrix();

    // Left
    this.scene.pushMatrix();
    this.scene.translate(-aux - (MyPiece.size/4.0) , haflPiece, aux + (MyPiece.size/4.0));
    this.scene.rotate(Math.PI/2.0, 0, 1, 0);
    this.boarder.display();
    this.scene.popMatrix(); 

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
        this.tiles[i * this.size + j].display();
        this.scene.translate(MyPiece.size, 0.0, 0.0);
      }
      // go to next line start
      this.scene.translate(-MyPiece.size * this.size, 0.0, MyPiece.size);
    }

    this.scene.popMatrix();
  }
}
