class MyGameOrchestrator {
  constructor(scene, graph) {
    this.scene = scene;
    scene.gameOrchestrator = this;

    this.gameSequence = new MyGameSequence();
    // this.animator = new MyAnimator(); // TODO
    this.gameboard = new MyGameBoard(scene, 10);
    this.theme = graph;
    // this.prolog = new MyPrologInterface();

    this.selectedPieces = [];
  }

  handlePicking() {
    if (this.scene.pickMode == true) return;

    if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
      for (let i = 0; i < this.scene.pickResults.length; i++) {
        if (!this.scene.pickResults[i][0]) continue;

        console.log(this.scene.pickResults[i]);
        let p = this.scene.pickResults[i][0].piece;
        if (p) {
          let customId = this.scene.pickResults[i][1];
          console.log("Picked object: " + p + ", with pick id " + customId);

          let tile = p.tile;
          if (tile) {
            if (this.selectedPieces.length > 0 && this.selectedPieces[0] == p)
              this.selectedPieces = [];
            else this.selectedPieces.push(p);
            tile.toggleHightlight();
          }
        }
      }
      this.scene.pickResults.splice(0, this.scene.pickResults.length);
    }
  }

  update(t) {
    // this.animator.update(t);

    // 2 pieces selected
    if (this.selectedPieces.length == 2) {
      let move = this.gameboard.move(...this.selectedPieces);
      this.scene.registerForPick(0, move.pieceI);
      this.scene.registerForPick(0, move.pieceF);
      move.animate();
      this.selectedPieces = [];
    }
  }

  display() {
    this.theme.display();
    this.gameboard.display();
    // this.animator.display();
  }
}
