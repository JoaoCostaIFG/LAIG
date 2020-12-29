class MyAnimator {
  constructor(gameOrchestrator, gameSequence) {
    this.gameOrchestrator = gameOrchestrator;
    this.gameSequence = gameSequence;

    this.reset();
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

    let move = this.gameSequence.getLastMove();
    if (move) move.update(time);
  }

  // display() {
  // if (!this.running) return;

  // let move = this.gameSequence.getLastMove();
  // // if (move)
  // }
}
