class MyGameOrchestrator {
  constructor(scene, graph) {
    this.scene = scene;
    scene.gameOrchestrator = this;

    this.gameSequence = new MyGameSequence();
    // this.animator = new MyAnimator(); // TODO
    this.gameboard = new MyGameBoard(scene, 10);
    this.theme = graph;
    // this.prolog = new MyPrologInterface();
  }

  update(t) {
    // this.animator.update(t);
  }

  display() {
    this.theme.display();
    this.gameboard.display();
    // this.animator.display();
  }
}
