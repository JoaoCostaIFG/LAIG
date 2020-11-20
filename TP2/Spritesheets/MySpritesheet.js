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

    this.activatedTex = false;
  }

  activateCellMN(m, n) {
    this.scene.setActiveShaderSimple(this.shader);
    this.shader.setUniformsValues({ charCoords: [m, n] });

    if (this.scene.activeTexture == null) { // we need 2 textures
      this.activatedTex = true;
      this.scene.defaultTex.bind();
    }
    this.tex.bind(1);
  }

  activateCellP(p) {
    this.activateCellMN(p % this.texSize[0], Math.floor(p / this.texSize[0]));
  }

  deactivate() {
    if (this.activatedTex) {
      this.activatedTex = false;
      this.scene.defaultTex.unbind();
    }
    this.tex.unbind(1);
    this.scene.setActiveShader(this.scene.defaultShader);
  }
}
