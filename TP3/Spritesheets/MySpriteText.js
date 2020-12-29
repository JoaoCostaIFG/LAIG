class MySpriteText {
  constructor(scene, text) {
    this.scene = scene;
    this.parseText(text);
    this.rect = new MyRectangle(this.scene, 0, 0, 1, 1);

    this.spriteSheet = new MySpritesheet(
      this.scene,
      this.scene.textSheet,
      ...this.scene.textSheetSize
    );
  }

  getCharacterPosition(character) {
    let asciiCode = character.charCodeAt(0);
    // in case of error, use space char index
    if (isNaN(asciiCode) || asciiCode > 255 || asciiCode < 0) return 32;
    else return asciiCode;
  }

  setText(text) {
    this.parseText(text);
  }

  parseText(text) {
    this.text = [];
    for (let i = 0; i < text.length; ++i) {
      this.text.push(this.getCharacterPosition(text[i]));
    }
  }

  display(isVertical = false) {
    this.scene.pushMatrix();
    // center text
    this.scene.translate(-this.text.length / 2.0, -0.5, 0.0);

    // render text
    for (let i = 0; i < this.text.length; ++i) {
      this.spriteSheet.activateCellP(this.text[i]);
      this.rect.display();
      if (isVertical) this.scene.translate(0.0, -1.0, 0.0);
      else this.scene.translate(1.0, 0.0, 0.0);
    }
    this.spriteSheet.deactivate();

    this.scene.popMatrix();
  }

  enableNormalViz() {
    this.rect.enableNormalViz();
  }

  disableNormalViz() {
    this.rect.disableNormalViz();
  }
}
