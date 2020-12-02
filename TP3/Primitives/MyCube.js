/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCube extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.rect = new MyRectangle(this.scene, 0.5, -0.5, -0.5, 0.5);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);

    // Back
    this.rect.display();

    // Front
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.rect.display();
    this.scene.popMatrix();

    // Top
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.rect.display();
    this.scene.popMatrix();

    // Base
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0.5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.rect.display();
    this.scene.popMatrix();

    // Left
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0.5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.rect.display();
    this.scene.popMatrix();

    // Right
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.rect.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
