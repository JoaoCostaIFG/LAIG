class MyScoreBoard {
  constructor(scene) {
    this.scene = scene;
    this.txt = new MySpriteText(scene, "");
    this.score = [1, 1];
  }

  parseScore(data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.score = data.target.response.split("-");
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 20, 0);
    this.scene.scale(3, 3, 0);

    this.txt.setText(this.score[0] + "-" + this.score[1]);
    this.txt.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 15, 0);
    this.scene.scale(3, 3, 0);

    if (this.score[0] > this.score[1]) this.txt.setText("Black is winning!");
    else if (this.score[0] < this.score[1])
      this.txt.setText("White is winning!");
    else this.txt.setText("The players are tied!");
    this.txt.display();

    this.scene.popMatrix();
  }
}
