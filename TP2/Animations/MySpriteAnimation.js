class MySpriteAnimation extends Animation {
  // TODO EXTAENDE CFGOBJ (also spriteText) ?

  constructor(scene, spriteSheet, id, duration, startCell, endCell) {
    super(scene, id);
    this.spriteSheet = spriteSheet;
    this.rect = new MyRectangle(this.scene, 0, 0, 1, 1);

    this.duration = duration;
    this.startCell = startCell;
    this.endCell = endCell;

    this.currCell = this.startCell;
    this.animDirec = this.startCell < this.endCell ? 1 : -1;
    this.stepDuration = this.duration / Math.abs(this.endCell - this.startCell);
  }

  update(t) {
    // update time values
    let deltaT = t - this.lastTime;
    this.sumT += deltaT;
    this.lastTime = t;

    // check if it's time for a step
    if (this.sumT < this.stepDuration) return;
    this.sumT -= this.stepDuration; // TODO maybe 0 ?

    // step in animation
    this.currCell += this.animDirec;

    // reset animation
    if (this.animDirec > 0) {
      if (this.currCell > this.endCell) this.currCell = this.startCell;
    } else if (this.currCell < this.endCell) this.currCell = this.startCell;
  }

  apply() {
    this.spriteSheet.activateCellP(this.currCell);
  }

  display() {
    this.apply();
    this.rect.display();
    this.scene.setActiveShader(this.scene.defaultShader);
  }

  enableNormalViz() {
    this.rect.enableNormalViz();
  }

  disableNormalViz() {
    this.rect.disableNormalViz();
  }
}
