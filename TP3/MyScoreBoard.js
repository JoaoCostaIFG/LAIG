class MyScoreBoard {
  constructor(scene, maxTime, boardSize = 0) {
    this.scene = scene;
    this.txt = new MySpriteText(scene, "", 0.5, 1.0);

    this.buttons = [];
    this.history = [];
    this.reset(maxTime, boardSize);
  }

  addButton(newButton) {
    this.buttons.push(newButton);
  }

  parseScore(data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.score = data.target.response.split("-");
    this.scoreStr =
      "B:" +
      this.score[0].toLocaleString("en-GB", {
        minimumIntegerDigits: 2,
      }) +
      " - W:" +
      this.score[1].toLocaleString("en-GB", {
        minimumIntegerDigits: 2,
      });
  }

  resetTimer() {
    this.lastTime = Date.now() / 1000;
    this.time = this.maxTime;
    this.running = true;
  }

  reset(maxTime, boardSize) {
    let numPlayerPieces = (boardSize * boardSize) / 2;
    this.score = [numPlayerPieces, numPlayerPieces];
    this.scoreStr =
      "B:" +
      numPlayerPieces.toLocaleString("en-GB", {
        minimumIntegerDigits: 2,
      }) +
      " - W:" +
      numPlayerPieces.toLocaleString("en-GB", {
        minimumIntegerDigits: 2,
      });

    this.maxTime = maxTime;
    this.resetTimer();
    this.gameEnded = 0;
  }

  start() {
    if (this.gameEnded) return;
    this.running = true;
  }

  pause() {
    if (this.gameEnded) return;
    this.running = false;
  }

  end(lastPlayer, isTimeout = false) {
    // only end once && don't time out when game already ended
    if (this.gameEnded) return;

    this.running = false;
    this.gameEnded = isTimeout ? 2 : 1;
    this.lastPlayer = lastPlayer;

    this.saveToHistory(isTimeout);
  }

  saveToHistory(isTimeout) {
    let histEntry;
    if (isTimeout && this.lastPlayer == 0)
      histEntry = "B:" + this.score[0] + "-W:" + this.score[1] + " White";
    else if (isTimeout && this.lastPlayer == 1)
      histEntry = "B:" + this.score[0] + "-W:" + this.score[1] + " Black";
    else if (this.score[0] > this.score[1])
      histEntry = "B:" + this.score[0] + "-W:" + this.score[1] + " Black";
    else if (this.score[0] < this.score[1])
      histEntry = "B:" + this.score[0] + "-W:" + this.score[1] + " White";
    else if (this.lastPlayer == 0)
      histEntry = "B:" + this.score[0] + "-W:" + this.score[1] + " White";
    else histEntry = "B:" + this.score[0] + "-W:" + this.score[1] + " Black";

    this.history.push(histEntry);
  }

  update(t) {
    if (this.running) this.time -= t - this.lastTime;
    this.lastTime = t;

    if (this.time < 0) this.time = 0;
  }

  getTimeStr() {
    return this.time.toLocaleString("en-GB", {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    });
  }

  getWinnerStr() {
    if (this.gameEnded == 2) {
      // timed out player loses
      return (this.lastPlayer == 0 ? "White" : "Black") + " wins timeout!";
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

  getHistory(maxEntries) {
    let histStr = "History\n";
    let numEntries = 0;
    for (
      let i = this.history.length - 1;
      i >= 0 && this.history.length - 1 - i < maxEntries;
      --i, ++numEntries
    ) {
      histStr += this.history[i] + "\n";
    }

    if (numEntries == 0) histStr += "- - - - -";
    for (; numEntries < maxEntries; ++numEntries) histStr += "\n";

    return histStr;
  }

  displayButtonLine(freeSpace, buttonLine) {
    this.scene.pushMatrix();

    let padding = freeSpace / (buttonLine.length + 1);
    this.scene.translate(padding, 0, 0);

    for (let i = 0; i < buttonLine.length; ++i) {
      this.scene.registerForPick(i + 1, buttonLine[i]);
      buttonLine[i].display();

      this.scene.translate(this.buttons[i].buttonSize * 2 + padding, 0, 0);
    }

    this.scene.popMatrix();
  }

  displayButtons() {
    this.scene.pushMatrix();
    this.scene.translate(-50, -28, 0);
    this.scene.scale(3, 3, 3);

    let lineLen = 50 / 3; // we have to divide by the scale factor

    let currSpace = lineLen;
    let buttonLine = [];
    for (let i = 0; i < this.buttons.length; ++i) {
      let buttonSize = this.buttons[i].buttonSize * 2;
      if (buttonSize > currSpace) {
        this.displayButtonLine(currSpace, buttonLine);
        this.scene.translate(0, 4, 0);

        buttonLine = [this.buttons[i]];
        currSpace = lineLen - buttonSize;
      } else {
        currSpace -= buttonSize;
        buttonLine.push(this.buttons[i]);
      }
    }

    this.displayButtonLine(currSpace, buttonLine); // last line
    this.scene.clearPickRegistration();
    this.scene.popMatrix();
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(25, 0, 0);
    this.scene.scale(5, 5, 5);
    this.txt.setText(
      this.getHistory(3) +
        "\n" +
        this.scoreStr +
        " " +
        this.getTimeStr() +
        "\n" +
        this.getWinnerStr()
    );
    this.txt.display();
    this.scene.popMatrix();

    this.displayButtons();
  }
}
