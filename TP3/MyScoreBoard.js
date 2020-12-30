class MyScoreBoard {
  // TODO show current player

  constructor(scene, maxTime, boardSize) {
    this.scene = scene;
    this.txt = new MySpriteText(scene, "");

    let numPlayerPieces = (boardSize * boardSize) / 2;
    this.score = [numPlayerPieces, numPlayerPieces];
    this.scoreStr = "B:" + numPlayerPieces + " - W:" + numPlayerPieces;

    this.history = [];
    this.reset(maxTime);
  }

  parseScore(data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.score = data.target.response.split("-");
    this.scoreStr = "B:" + this.score[0] + " - W:" + this.score[1];
  }

  resetTimer() {
    this.lastTime = Date.now() / 1000;
    this.time = this.maxTime;
    this.running = true;
  }

  reset(maxTime) {
    this.maxTime = maxTime;
    this.resetTimer();
    this.gameEnded = 0;
  }

  start() {
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  end(lastPlayer) {
    // only end once
    if (this.gameEnded) return;

    this.history.push(this.scoreStr);

    this.gameEnded = 1;
    this.lastPlayer = lastPlayer;
  }

  timedOut(timedOutPlayer) {
    // don't time out when game already ended
    if (this.gameEnded) return;

    this.history.push(this.scoreStr);

    this.gameEnded = 2;
    this.timedOutPlayer = timedOutPlayer;
  }

  update(t) {
    if (this.running) this.time -= t - this.lastTime;
    this.lastTime = t;

    if (this.time < 0) this.time = 0;
  }

  getTimeStr() {
    return (this.time < 10 ? "0" : "") + this.time.toFixed(1);
  }

  getWinnerStr() {
    if (this.gameEnded == 2) {
      // timed out player loses
      return (this.timedOutPlayer == 0 ? "White" : "Black") + " wins timeout!";
    } else if (this.score[0] > this.score[1]) {
      if (this.gameEnded == 1) return "Black wins!";
      else return "Black is winning!";
    } else if (this.score[0] < this.score[1]) {
      if (this.gameEnded) return "White wins!";
      else return "White is winning!";
    } else {
      if (this.gameEnded)
        return (this.lastPlayer == 0 ? "White" : "Black") + " wins!";
      else return "Players are tied!";
    }
  }

  display() {
    this.scene.pushMatrix();
    this.scene.scale(5, 5, 1);

    let histStr = "";
    for (let i = 0; i < this.history.length; ++i)
      histStr += this.history[i] + "\n";
    this.txt.setText(
      histStr +
        this.getTimeStr() +
        "\n" +
        this.scoreStr +
        "\n" +
        this.getWinnerStr()
    );
    this.txt.display();

    this.scene.popMatrix();
  }
}
