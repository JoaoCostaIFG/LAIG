class MyAnimator {
  constructor(gameOrchestrator, gameSequence) {
    this.gameOrchestrator = gameOrchestrator;
    this.gameSequence = gameSequence;
    this.sequenceIndex = 0;
    this.animObjs = [];

    this.running = false;
  }

  addObjToAnim(obj) {
    this.animObjs.push(obj);
  }

  reset() {
    this.running = false;
    this.sequenceIndex = 0;
  }

  start() {
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  update(time) {
    if (!this.running || this.sequenceIndex >= this.gameSequence.length) return;

    let move = this.gameSequence.getMoveByInd(this.sequenceIndex);
    move.update(time);
  }

  display() {
    if (!this.running || this.sequenceIndex >= this.gameSequence.length) return;

    let move = this.gameSequence.getMoveByInd(this.sequenceIndex);
  }
}
