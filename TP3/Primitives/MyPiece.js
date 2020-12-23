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
  static white = "./scenes/images/whiteMarble.jpeg";
  static black = "./scenes/images/blackMarble.jpeg";

  constructor(scene, color, tile) {
    super(scene);
    this.scene = scene;
    this.color = color;
    this.tile = tile ? tile : null;
    this.animation = new MovePieceAnimation();

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
      this.scene.pushMaterial(this.scene.whiteMaterial);
      this.scene.pushTexture(this.scene.blackTex);
    } else {
      this.scene.pushMaterial(this.scene.whiteMaterial);
      this.scene.pushTexture(this.scene.whiteTex);
    }
  }

  display() {
    this.display();

    this.scene.pushMatrix();
    this.applyColor();

    this.scene.translate(0.0, MyPiece.size / 4.0, 0.0);
    this.scene.scale(MyPiece.size, MyPiece.size / 2.0, MyPiece.size);
    this.cube.display();

    this.scene.popMaterial();
    this.scene.popTexture();
    this.scene.popMatrix();
  }
}
