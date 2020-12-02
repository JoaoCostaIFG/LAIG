class MyGameOrchestrator {
  constructor(scene, graph) {
    this.scene = scene;

    this.gameSequence = new MyGameSequence();
    // this.animator = new MyAnimator(); // TODO
    this.gameboard = new MyGameBoard(scene, 10);
    this.theme = graph;
    // this.prolog = new MyPrologInterface();
  }
}
