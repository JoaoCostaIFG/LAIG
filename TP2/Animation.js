class Animation {
  constructor(scene, id) {
    this.scene = scene;
    this.id = id;
  }

  update(t) {
    throw new Error("Can't instantiate abstract class!");
  }

  apply() {
    throw new Error("Can't instantiate abstract class!");
  }
}
