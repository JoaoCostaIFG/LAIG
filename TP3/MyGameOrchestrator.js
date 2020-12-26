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
    // AI options
    this.savedPlayerOps = [0, 0];
    this.playerOps = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    this.playerOpsInd = {
      PvP: 0,
      PvAI: 1,
      AIvP: 2,
      AIvAI: 3,
    };
    this.selectedPlayerOps = 0;
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

      // initial valid moves
      this.prolog.requestValidMoves(
        this.gameboard,
        this.player,
        this.parseValidMoves.bind(this)
      );

      // if AI is first player
      this.savedPlayerOps = this.playerOps[this.selectedPlayerOps];
      this.aiMove(); // if is AI

      // start game
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
      // TODO togglePossibleMoveIndicators and check if is valid
      let p = obj.piece;
      if (this.selectedPieces.length > 0 && this.selectedPieces[0] == p)
        this.selectedPieces = [];
      else this.selectedPieces.push(p);
      obj.toggleHightlight();
    } else if (obj instanceof MyPiece) {
      // piece
    } else {
      // error
    }
  }

  /* || INDICATORS */
  togglePossibleMoveIndForPiece(moveFrom) {
    for (let i = 0; i < this.validMoves.length; ++i) {
      let possibleMoveFrom = this.validMoves[i][0];
      if (
        moveFrom[1] == possibleMoveFrom[1] &&
        moveFrom[0] == possibleMoveFrom[0]
      ) {
        let possibleMoveTo = this.validMoves[i][1];
        this.gameboard
          .getTileByCoord(possibleMoveTo[0], possibleMoveTo[1])
          .toggleIsPossible();
      }
    }
  }

  togglePossibleMoveIndicators() {
    let previousFrom = [-1, -1]; // impossible coors
    for (let i = 0; i < this.validMoves.length; ++i) {
      let possibleMoveFrom = this.validMoves[i][0];
      if (
        previousFrom[1] != possibleMoveFrom[1] ||
        previousFrom[0] != possibleMoveFrom[0]
      ) {
        this.gameboard
          .getTileByCoord(possibleMoveFrom[0], possibleMoveFrom[1])
          .toggleIsPossible();
        previousFrom = possibleMoveFrom;
      }
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

  aiMove() {
    // starts an AI move if it's the AI's turn
    if (this.savedPlayerOps[this.player]) {
      this.prolog.requestAIMove(
        this.gameboard,
        this.player,
        1,
        this.onAIMove.bind(this)
      );
      this.gameboard.togglePicking(false);
    }
  }

  startMove(move) {
    this.togglePossibleMoveIndicators(); // clear valid moves

    move.doMove();
    this.gameSequence.addMove(move);
    this.animator.start();

    // pause timer until animation is done
    this.scoreBoard.pause();
    this.gameboard.togglePicking(false);

    this.state = GameState.PAUSED; // pause until animation is done
  }

  /* || PROLOG REQUEST HANDLERS */
  parseValidMoves(data) {
    if (data.target.response == "Bad Request") {
      console.log("No more valid moves.");
      this.validMoves = [];
    }

    this.validMoves = JSON.parse(data.target.response);
    this.togglePossibleMoveIndicators(); // active
  }

  onAIMove(data) {
    if (data.target.response == "Bad Request") {
      console.log("Couldn't get AI move");
      return;
    }

    let moveCoords = JSON.parse(data.target.response);
    let pieceI = this.gameboard.getPieceByCoord(
      moveCoords[0][0],
      moveCoords[0][1]
    );
    let pieceF = this.gameboard.getPieceByCoord(
      moveCoords[1][0],
      moveCoords[1][1]
    );

    let move = this.gameboard.move(pieceI, pieceF);
    this.startMove(move);
  }

  onValidMove(move, data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.startMove(move);
  }

  /* called after every move */
  onAnimationDone() {
    // next player
    this.nextPlayer();

    // new valid moves
    this.prolog.requestValidMoves(
      this.gameboard,
      this.player,
      this.parseValidMoves.bind(this)
    );

    // update score
    this.prolog.requestScore(
      this.gameboard,
      this.scoreBoard.parseScore.bind(this.scoreBoard)
    );
    this.scoreBoard.reset(); // reset timer

    this.gameboard.togglePicking(true);
    this.state = GameState.RUNNING;

    this.aiMove(); // if is AI
  }

  /* || OTHER */
  update(t) {
    if (this.state != GameState.RUNNING && this.state != GameState.PAUSED)
      return;

    this.animator.update(t);
    this.scoreBoard.update(t);

    // if (this.validMoves.length == 0) { // game ended
    // // TODO game ended method
    // }
    // else
    if (this.selectedPieces.length == 2) {
      // 2 pieces selected
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
      // current player timed out
      // TODO player lose on time out
      console.log("PLAYER " + this.player + " TIMED OUT!");
    }
  }

  display() {
    this.theme.display();

    if (this.state != GameState.RUNNING && this.state != GameState.PAUSED)
      return;

    this.scene.pushMatrix();
    this.scene.translate(...this.theme.boardPos);
    this.gameboard.display();
    this.scoreBoard.display();
    this.scene.popMatrix();
  }
}
