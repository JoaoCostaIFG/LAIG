class MySpriteText {
  constructor(scene, text) {
    this.scene = scene;
    this.text = text;
    this.parseText();
    this.rect = new MyRectangle(this.scene, 0, 0, 1, 1);

    let textSheet = new CGFtexture(this.scene, "./scenes/images/text.png");
    let textSheetSize = [16, 16];
    this.spriteSheet = new MySpritesheet(
      this.scene,
      textSheet,
      ...textSheetSize
    );
  }

  getCharacterPosition(character) {
    let asciiCode = character.charCodeAt(0);
    // in case of error, use space char index
    if (isNaN(asciiCode) || asciiCode > 255 || asciiCode < 0) return 32;
    else return asciiCode;
  }

  parseText() {
    this.parsedText = [];
    for (let i = 0; i < this.text.length; ++i) {
      this.parsedText.push(this.getCharacterPosition(this.text[i]));
    }
  }

  display() {
    this.scene.pushMatrix();
    // center text
    this.scene.translate(-this.parsedText.length / 2.0, -0.5, 0.0);
    
    // render text
    for (let i = 0; i < this.parsedText.length; ++i) {
      this.spriteSheet.activateCellP(this.parsedText[i]);
      this.rect.display();
      this.scene.translate(1.0, 0.0, 0.0);
    }

    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);
  }

  enableNormalViz() {
    this.rect.enableNormalViz();
  }

  disableNormalViz() {
    this.rect.disableNormalViz();
  }
}
