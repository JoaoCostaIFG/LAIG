class Animation {
  constructor(scene, id) {
    this.scene = scene;
    this.id = id;

    this.lastTime = Date.now() / 1000; // current time in seconds
    this.sumT = 0;
  }

  update(t) {
    throw new Error("Can't instantiate abstract class!");
  }

  apply() {
    throw new Error("Can't instantiate abstract class!");
  }
}
