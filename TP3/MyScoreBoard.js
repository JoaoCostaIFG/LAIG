class MyScoreBoard {
  // TODO show current player

  constructor(scene, maxTime) {
    this.scene = scene;
    this.maxTime = maxTime;
    this.txt = new MySpriteText(scene, "");
    this.score = [1, 1];

    this.reset();
  }

  parseScore(data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.score = data.target.response.split("-");
  }

  reset() {
    this.lastTime = Date.now() / 1000;
    this.time = this.maxTime;
    this.running = true;
  }

  update(t) {
    if (this.running) this.time -= t - this.lastTime;
    this.lastTime = t;

    if (this.time < 0) this.time = 0;
  }

  start() {
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  displayBoard(isBack = false) {
    this.scene.pushMatrix();

    this.scene.translate(0, 20, 0);
    this.scene.scale(3, 3, 0);
    if (isBack) this.scene.rotate(Math.PI, 0, 1, 0);

    let timeToShow = this.time.toFixed(1);
    let timerStr = (timeToShow < 10 ? "0" : "") + timeToShow;
    this.txt.setText(this.score[0] + "-" + this.score[1] + " " + timerStr);
    this.txt.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 15, 0);
    this.scene.scale(3, 3, 0);
    if (isBack) this.scene.rotate(Math.PI, 0, 1, 0);

    if (this.score[0] > this.score[1]) this.txt.setText("Black is winning!");
    else if (this.score[0] < this.score[1])
      this.txt.setText("White is winning!");
    else this.txt.setText("The players are tied!");
    this.txt.display();

    this.scene.popMatrix();
  }

  display() {
    this.displayBoard();
    this.displayBoard(true);
  }
}
