class MyButton extends CGFobject {
  constructor(scene, text, onClickFunc) {
    super(scene);
    this.scene = scene;
    this.onClickFunc = onClickFunc;

    this.buttonSize = text.length / 4.0 + 1.0; // 1.0 is the padding
    this.txt = new MySpriteText(this.scene, text, 0.5);
    this.body = new MyCube(this.scene, 1.0);
  }

  onClick() {
    this.onClickFunc();
  }

  display() {
    this.scene.pushMatrix();
    this.scene.scale(this.buttonSize, 1, 0.5);
    this.body.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.buttonSize - 0.25, 0, 1.01);
    this.txt.display();
    this.scene.popMatrix();
  }
}
