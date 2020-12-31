class MyButton extends CGFobject {
  constructor(scene, text, onClickFunc) {
    super(scene);
    this.scene = scene;
    this.onClickFunc = onClickFunc;

    this.buttonSize = text.length / 4.0 + 1.0; // 1.0 is the padding
    this.txt = new MySpriteText(this.scene, text, 0.5);
    this.body = new MyCube(this.scene, 1.0);
  }

  startAnim() {
    if (!this.clickAnimation) {
      let kfs = [
        new Keyframe(0, 0, 0, 0, 0, 0, 0, 1, 1, 1),
        new Keyframe(0.2, 0, 0, 0, 0, 0, 0, 1, 1, 0.5),
        new Keyframe(0.4, 0, 0, 0, 0, 0, 0, 1, 1, 1),
      ];
      for (let i = 0; i < kfs.length - 1; ++i) kfs[i].nextKF = kfs[i + 1];
      this.clickAnimation = new KeyframeAnimation(
        this.scene,
        this.txt.text + "UIButton",
        kfs
      );
    }
    else {
      this.clickAnimation.reset();
    }
  }

  onClick() {
    this.startAnim();
    this.onClickFunc();
  }

  update(t) {
    if (this.clickAnimation) this.clickAnimation.update(t);
  }

  display() {
    if (this.clickAnimation) this.clickAnimation.apply();

    this.scene.pushMatrix();
    this.scene.scale(this.buttonSize, 1, 0.5);
    this.body.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.buttonSize - 0.25, 0, 1.01);
    this.txt.display();
    this.scene.popMatrix();

    if (this.clickAnimation) this.scene.popTransformation();
  }
}
