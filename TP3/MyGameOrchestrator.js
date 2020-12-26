const GameState = {
  PRESTART: -1,
  NOTSTARTED: 0,
  RUNNING: 1,
  PAUSED: 2,
  ENDED: 3,
};

class MyGameOrchestrator {
  constructor(scene, graph) {
    this.scene = scene;
    scene.gameOrchestrator = this;
    this.state = GameState.PRESTART;

    this.gameSequence = new MyGameSequence();
    this.animator = new MyAnimator(this, this.gameSequence);
    // this.scoreBoard = new MyScoreBoard(scene, 10);
    // this.gameboard = new MyGameBoard(scene, 10);
    this.theme = graph;
    this.prolog = new MyPrologInterface("localhost", 8081);

    this.player = 0;
    this.selectedPieces = [];

    // game options
    this.difficultyTimes = [30, 20, 10];
    this.difficultyInd = {
      easy: 0,
      medium: 1,
      hard: 2,
    };
    this.selectedDifficulty = 0;
    this.boardSize = 10;
  }

  /* || START */
  start() {
    if (this.state == GameState.PRESTART) {
      this.state = GameState.NOTSTARTED;
    } else if (this.state == GameState.NOTSTARTED) {
      // create board and score board according to game options
      this.scoreBoard = new MyScoreBoard(
        this.scene,
        this.difficultyTimes[this.selectedDifficulty]
      );
      this.gameboard = new MyGameBoard(this.scene, this.boardSize);

      this.state = GameState.RUNNING;
    }
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
  nextPlayer() {
    this.player = (this.player + 1) % 2;
  }

  undo() {
    let move = this.gameSequence.undo();
    if (move == null) {
      console.log("No move to undo.");
    } else {
      console.log("Undo last move.");
      move.undoMove();
      this.nextPlayer();

      // update score
      this.prolog.requestScore(
        this.gameboard,
        this.scoreBoard.parseScore.bind(this.scoreBoard)
      );
    }
  }

  onValidMove(move, data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.nextPlayer();
    move.doMove();
    this.gameSequence.addMove(move);
    this.animator.start();

    // update score
    this.prolog.requestScore(
      this.gameboard,
      this.scoreBoard.parseScore.bind(this.scoreBoard)
    );
    // reset timer
    this.scoreBoard.reset();
  }

  /* || OTHER */
  update(t) {
    if (this.state != GameState.RUNNING) return;

    this.animator.update(t);
    this.scoreBoard.update(t);

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
    } else if (this.scoreBoard.time <= 0) {
      // TODO player lose on time out
      console.log("PLAYER " + this.player + " TIMED OUT!");
    }
  }

  display() {
    this.theme.display();

    if (this.state != GameState.RUNNING) return;

    this.scene.pushMatrix();
    this.scene.translate(...this.theme.boardPos);
    this.gameboard.display();
    this.scoreBoard.display();
    this.scene.popMatrix();
  }
}
