class MyGameOrchestrator {
  constructor(scene, graph) {
    this.scene = scene;
    scene.gameOrchestrator = this;

    this.gameSequence = new MyGameSequence();
    this.animator = new MyAnimator(this);
    this.gameboard = new MyGameBoard(scene, 10);
    this.theme = graph;
    this.prolog = new MyPrologInterface("localhost", 8081);

    this.player = 0;
    this.selectedPieces = [];
  }

  /* || PICKING */
  handlePicking() {
    if (this.scene.pickMode == true) return;

    if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
      for (let i = 0; i < this.scene.pickResults.length; i++) {
        let obj = this.scene.pickResults[i][0];
        if (obj) {
          let id = this.scene.pickResults[i][1];
          this.onObjectSelected(obj, id);
        }
      }
      // clear results
      this.scene.pickResults.splice(0, this.scene.pickResults.length);
    }
  }

  onObjectSelected(obj, id) {
    console.log("Picked object: " + obj + ", with pick id " + id);

    if (obj instanceof MyTile) {
      let p = obj.piece;
      if (this.selectedPieces.length > 0 && this.selectedPieces[0] == p)
        this.selectedPieces = [];
      else this.selectedPieces.push(p);
      obj.toggleHightlight();
    } else if (obj instanceof MyPiece) {
      if (this.selectedPieces.length > 0 && this.selectedPieces[0] == p)
        this.selectedPieces = [];
      else this.selectedPieces.push(p);
      obj.toggleHightlight();
    } else {
      // error
    }
  }

  /* || MOVE */
  undo() {
    let move = this.gameSequence.undo();
    if (move == null) {
      console.log("No move to undo.");
    } else {
      console.log("Undo last move.");
      move.undoMove();
    }
  }

  onValidMove(move, data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.player = (this.player + 1) % 2;
    move.doMove();
    this.gameSequence.addMove(move);
  }

  /* || OTHER */
  update(t) {
    // this.animator.update(t);

    // 2 pieces selected
    if (this.selectedPieces.length == 2) {
      let move = this.gameboard.move(...this.selectedPieces);
      this.prolog.requestValidMove(
        this.gameboard,
        this.player,
        move,
        this.onValidMove.bind(this, move)
      );

      // clear piece selection
      move.tileI.toggleHightlight();
      move.tileF.toggleHightlight();
      this.selectedPieces.splice(0, this.selectedPieces.length);
    }
  }

  display() {
    this.theme.display();
    this.gameboard.display();
    // this.animator.display();
  }
}
