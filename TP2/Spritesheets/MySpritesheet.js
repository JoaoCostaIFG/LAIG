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
    this.shader.setUniformsValues({
      uSampler2: 1,
      sheetSize: [sizeM, sizeN],
      charCoords: [0, 0],
    });
  }

  activateCellMN(m, n) {
    this.shader.setUniformsValues({ charCoords: [m, n] });
    // this.scene.pushTexture(this.tex);
    this.tex.bind(1);
    this.scene.setActiveShader(this.shader);
    // this.scene.popTexture();
  }

  activateCellP(p) {
    this.activateCellMN(p % this.texSize[0], Math.floor(p / this.texSize[0]));
  }
}
