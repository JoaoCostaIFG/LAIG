class MySpritesheet {
  constructor(scene, texture, sizeM, sizeN) {
    this.scene = scene;
    this.tex = texture;
    this.texSize = [sizeM, sizeN];

    this.shader = new CGFshader(
      this.scene.gl,
      "./Spritesheets/MySpriteShader.vert",
      "./Spritesheets/MySpriteShader.frag"
    );
    this.shader.setUniformsValues({
      sheetSize: [sizeM, sizeN],
      charCoords: [0, 0],
    });
  }

  activateCellMN(m, n) {
    this.shader.setUniformsValues({ charCoords: [m, n] });
    this.tex.bind();
    this.scene.setActiveShader(this.shader);
  }

  activateCellP(p) {
    this.activateCellMN(p % this.texSize[0], Math.floor(p / this.texSize[1]));
  }
}
