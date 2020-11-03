class MySpritesheet {
  constructor(scene, texture, sizeM, sizeN) {
    this.scene = scene;
    this.tex = texture;
    this.texSize = [sizeM, sizeN];

    this.shader = new CGFshader(
      this.scene.gl,
      "./Shaders/MySpriteShader.vert",
      "./Shaders/MySpriteShader.frag"
    );

    this.scene.setActiveShader(this.shader);
    this.shader.setUniformsValues({
      uSampler2: 1,
      sheetSize: [sizeM, sizeN],
      charCoords: [0, 0],
    });
    this.scene.setActiveShader(this.scene.defaultShader);
  }

  activateCellMN(m, n) {
    this.scene.setActiveShader(this.shader);
    this.shader.setUniformsValues({ charCoords: [m, n] });
    // this.scene.pushTexture(this.tex);
    this.tex.bind(1);
    // this.scene.popTexture();
  }

  activateCellP(p) {
    this.activateCellMN(p % this.texSize[0], Math.floor(p / this.texSize[0]));
  }
}
