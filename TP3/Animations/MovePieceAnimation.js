class MovePieceAnimation {
  constructor(scene, targetPos) {
    this.scene = scene;
    this.targetPos = targetPos;
    this.targetPos[0] *= MyPiece.size;
    this.targetPos[1] *= MyPiece.size;

    this.sumT = 0;
    this.lastTime = Date.now() / 1000.0;
    this.stepTimes = [10];
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

    let totalTime = this.stepTimes[this.currStep];
    if (this.sumT >= totalTime) {
      this.sumT = totalTime;
      ++this.currStep;
    }

    let timePerc = this.sumT / totalTime;
    let tgArray = [0, 0, 0];
    switch (this.currStep) {
      case 0:
        tgArray = [
          this.targetPos[0] * timePerc,
          0,
          // Math.sin((timePerc * Math.PI) / 2) * 20,
          this.targetPos[1] * timePerc,
        ];
        break;
      default:
        // finished last animation step
        // TODO set final pos
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
