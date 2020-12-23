class MyAnimator {
  constructor(gameOrchestrator, gameSequence) {
    this.gameOrchestrator = gameOrchestrator;
    this.gameSequence = gameSequence;
    this.animObjs = [];
  }

  addObjToAnim(obj){
    this.animObjs.push(obj);
  }

  reset() {

  }

  start() {

  }

  update(time) {
    for(let i = 0; i < this.animObjs.size; i++){
      this.animObjs[i].update(time);
    }
  }

  display() {
  }
}
