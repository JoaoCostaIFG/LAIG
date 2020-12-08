const Color = {
  BLACK: 0,
  WHITE: 1,
};

/**
 * MyPiece
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPiece extends CGFobject {
  static size = 4.0;

  constructor(scene, color, tile) {
    super(scene);
    this.scene = scene;
    this.color = color;
    this.tile = tile ? tile : null;

    this.cube = new MyCube(scene);
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }

  applyColor() {
    if (this.color == Color.BLACK) {
      this.scene.pushMaterial(this.scene.blackMaterial);
    } else this.scene.pushMaterial(this.scene.whiteMaterial);
  }

  display() {
    this.scene.pushMatrix();

    this.applyColor();
    this.scene.translate(0.0, MyPiece.size / 4.0, 0.0);
    this.scene.scale(MyPiece.size, MyPiece.size / 2.0, MyPiece.size);
    this.cube.display();
    this.scene.popMaterial();

    this.scene.popMatrix();
  }
}
