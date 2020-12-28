class MovePieceAnimation {
  constructor(scene) {
    this.scene = scene;

    this.sumT = 0;
    this.lastTime = Date.now() / 1000.0;
    this.stepTimes = [1];
    this.currStep = 0;

    this.isFinished = false;
    this.genMatrix([0, 0, 0]);
  }

  genMatrix(tgArray) {
    this.tgMatrix = mat4.create();
    mat4.translate(this.tgMatrix, this.tgMatrix, tgArray);
  }

  update(time) {
    if (this.isFinished) return;

    this.sumT += time - this.lastTime;
    this.lastTime = time;

    if (this.sumT >= this.stepTimes[this.currStep]) {
      this.sumT = this.stepTimes[this.currStep];
      ++this.currStep;
    }

    let timePerc = this.sumT / this.totalTime;

    let tgArray = [0, 0, 0];
    switch (this.currStep) {
      case 0:
        tgArray = [0, Math.sin((timePerc * Math.PI) / 2) * 20, 0];
        break;
      default:
        // finished last animation step
        // if (this.currStep >= this.stepTimes.length)
        this.isFinished = true;
        console.log("Finished Animation");
        break;
    }

    this.genMatrix(tgArray);
  }

  display() {
    this.scene.pushTransformation(this.tgMatrix);
  }
}
