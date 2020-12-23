class MyScoreBoard {
  constructor(scene, initialText) {
    this.scene = scene;
    this.txt = new MySpriteText(scene, initialText);
  }

  parseScore(data) {
    if (data.target.response == "Bad Request") {
      console.log("Invalid move");
      return;
    }

    this.txt.setText(data.target.response);
  }

  display() {
    this.scene.pushMatrix();;
    this.scene.translate(0, 20, 0);
    this.scene.scale(3, 3, 0);

    this.txt.display();
    this.scene.popMatrix();;
  }
}
