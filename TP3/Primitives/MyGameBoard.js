class MyGameBoard {
  constructor(scene, size) {
    this.scene = scene;

    this.gameState = new MyGameState();

    this.size = size;
    this.genTiles();
  }

  genTiles() {
    this.tiles = [];

    for (let i = 0; i < this.size; ++i) {
      let currTile = new MyTile(scene, this, null);
      // even => white, odd => black
      currTile.setPiece(
        new MyPiece(scene, i % 2 == 0 ? Color.white : Color.black, currTile)
      );
      this.tiles.push(currTile);
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

    let newMove = new MyGameMove(pieceI, tileI, pieceF, tileF);
    this.gameState.addMove(this, newMove);
  }

  display() {
    // displays all tile (they display all pieces)
    this.tiles.forEach((tile) => {
      tile.update();
    });
  }
}
