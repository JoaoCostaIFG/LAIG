class MovePieceAnimation {
  constructor(scene) {
    this.scene = scene;

    this.totalTime = 2;
    this.isFinished = false;
    this.sumT = 0;
    this.lastTime = Date.now() / 1000.0;

    this.genMatrix(0);
  }

  genMatrix(timePerc) {
    let newY = 10 * timePerc;

    this.tgMatrix = mat4.create();
    mat4.translate(this.tgMatrix, this.tgMatrix, [0, newY, 0]);
  }

  update(time) {
    if (this.isFinished) return;

    this.sumT += time - this.lastTime;
    this.lastTime = time;

    if (this.sumT >= this.totalTime) {
      this.sumT = this.totalTime;
      this.isFinished = true;
      console.log("Finished Animation");
    }

    let timePerc = this.sumT / this.totalTime;
    this.genMatrix(timePerc);
  }

  display() {
    this.scene.pushTransformation(this.tgMatrix);
  }
}
