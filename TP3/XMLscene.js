/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
  /**
   * @constructor
   * @param {MyInterface} myinterface
   */
  constructor(myinterface) {
    super();

    this.interface = myinterface;

    this.activeMaterials = [];
    this.activeTextures = [];
    this.updatables = []; // the objects that need to be updated each frame
  }

  /**
   * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
   * @param {CGFApplication} application
   */
  init(application) {
    super.init(application);

    this.sceneInited = false;

    // this.initCameras();
    // default camera
    this.camera = new MyCGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);
    this.setUpdatePeriod(100);

    this.loadingProgressObject = new MyRectangle(this, -1, -0.1, 1, 0.1);
    this.loadingProgress = 0;

    // enable picking
    this.setPickEnabled(true);

    this.defaultAppearance = new CGFappearance(this);

    // lights
    this.areLightsVisible = false;

    this.xmlLight0 = false;
    this.xmlLight1 = false;
    this.xmlLight2 = false;
    this.xmlLight3 = false;
    this.xmlLight4 = false;
    this.xmlLight5 = false;
    this.xmlLight6 = false;
    this.xmlLight7 = false;

    // cameras
    this.cameras = [];
    this.selectedCamera = -1;
    this.lastCamera = -1;
    this.cameraList = {};

    this.defaultTex = new CGFtexture(this, "./scenes/images/test.jpg"); // missing texture
    this.defaultTex.bind();
    this.textSheet = new CGFtexture(this, "./scenes/images/text.png"); // spritesheet for text
    this.textSheetSize = [16, 16];

    // Pieces Colors
    this.blackMaterial = new CGFappearance(this);
    this.blackMaterial.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.blackMaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
    this.blackMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.blackMaterial.setShininess(10.0);

    this.whiteMaterial = new CGFappearance(this);
    this.whiteMaterial.setAmbient(0.9, 0.87, 0.77, 1.0);
    this.whiteMaterial.setDiffuse(0.9, 0.87, 0.77, 1.0);
    this.whiteMaterial.setSpecular(0.9, 0.87, 0.77, 1.0);
    this.whiteMaterial.setShininess(10.0);

    this.whiteTex = new CGFtexture(this, MyPiece.white);
    this.blackTex = new CGFtexture(this, MyPiece.black);

    // Highlights
    this.redHighlightMat = new CGFappearance(this);
    // this.redHighlightMat.setAmbient(1.0, 0.0, 0.0, 1.0);
    // this.redHighlightMat.setDiffuse(1.0, 0.0, 0.0, 1.0);
    // this.redHighlightMat.setSpecular(1.0, 0.0, 0.0, 1.0);
    this.redHighlightMat.setEmission(1.0, 0.0, 0.0, 1.0);
    this.redHighlightMat.setShininess(100.0);

    this.greenHighlightMat = new CGFappearance(this);
    this.greenHighlightMat.setAmbient(0.19, 0.51, 0.14, 1.0);
    this.greenHighlightMat.setDiffuse(0.19, 0.51, 0.14, 1.0);
    this.greenHighlightMat.setEmission(0.0, 0.2, 0.0, 1.0);
    this.greenHighlightMat.setShininess(100.0);
  }

  /**
   * Initializes the scene cameras.
   */
  initCameras() {
    var i = 0;

    for (var key in this.graph.cameras) {
      var camInfo = this.graph.cameras[key];
      var cam;
      if (camInfo[0] == "perspective") {
        cam = new MyCGFcamera(...camInfo.slice(2));
      } else {
        cam = new MyCGFcameraOrtho(...camInfo.slice(2));
      }

      this.cameras.push(cam);
      this.cameraList[camInfo[1]] = i;
      if (camInfo[1] == this.graph.defaultCameraId) this.selectedCamera = i;

      ++i;
    }
  }

  /**
   * Updates which camera is selected
   */
  updateCurrentCamera() {
    if (this.lastCamera == this.selectedCamera) return;

    this.lastCamera = this.selectedCamera;
    this.camera = this.cameras[this.selectedCamera];
    this.camera.reset();
    this.interface.setActiveCamera(this.camera);
  }

  /**
   * Initializes the scene lights with the values read from the XML file.
   */
  initLights() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
      if (i >= 8) break; // Only eight lights allowed by WebCGF on default shaders.

      let graphLight = this.graph.lights[key];

      this.lights[i].setPosition(...graphLight[1]);
      this.lights[i].setAmbient(...graphLight[2]);
      this.lights[i].setDiffuse(...graphLight[3]);
      this.lights[i].setSpecular(...graphLight[4]);

      this.lights[i].setVisible(this.areLightsVisible);
      if (graphLight[0]) {
        this["xmlLight" + i] = true;
        this.lights[i].enable();
      } else {
        this["xmlLight" + i] = false;
        this.lights[i].disable();
      }

      this.lights[i].update();

      i++;
    }
  }

  /**
   * Updates lights state
   */
  updateLightState() {
    let i = 0;
    for (let key in this.graph.lights) {
      if (i >= 8) break; // Only eight lights allowed by WebCGF on default shaders.

      this.lights[i].setVisible(this.areLightsVisible);

      if (this["xmlLight" + i]) this.lights[i].enable();
      else this.lights[i].disable();

      this.lights[i].update();

      ++i;
    }
  }

  /** Handler called when the graph is finally loaded.
   * As loading is asynchronous, this may be called already after the application has started the run loop
   */
  onGraphLoaded() {
    this.axis = new CGFaxis(this, this.graph.referenceLength);

    this.gl.clearColor(...this.graph.background);

    this.setGlobalAmbientLight(...this.graph.ambient);

    this.initCameras();
    this.updateCurrentCamera();
    this.initLights();

    this.interface.instGuiButtons();

    this.sceneInited = true;
    // this.setUpdatePeriod(100);
    this.setUpdatePeriod(30);
  }

  /**
   * Displays the scene.
   */
  display() {
    this.gameOrchestrator.handlePicking();
    this.clearPickRegistration();

    // this.gameOrchestrator.orchestrate(); // TODO ?

    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST); // TODO ?

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();

    this.updateLightState();

    for (var i = 0; i < this.lights.length; i++) {
      this.lights[i].setVisible(true);
      this.lights[i].enable();
    }

    if (this.sceneInited) {
      // Draw axis
      this.axis.display();

      this.defaultAppearance.apply();

      // Displays the scene (MySceneGraph function).
      this.gameOrchestrator.display();
    } else {
      // Show some "loading" visuals
      this.defaultAppearance.apply();

      this.rotate(-this.loadingProgress / 10.0, 0, 0, 1);

      this.loadingProgressObject.display();
      this.loadingProgress++;
    }

    this.popMatrix();
    // ---- END Background, camera and axis setup
  }

  update(time) {
    if (!this.sceneInited) return;

    let t = time / 1000;

    this.updatables.forEach((updatable) => {
      updatable.update(t);
    });
    this.gameOrchestrator.update(t);
  }

  /**
   * Pushes a transformation into scene's transformations stack
   * @param {Transformation Matrix to be pushed into scene's tranformations stack} tg
   */
  pushTransformation(tg) {
    this.pushMatrix();
    this.multMatrix(tg);
  }

  /**
   * Pops a transformation from scene's transformations' stack
   */
  popTransformation() {
    this.popMatrix();
  }

  /**
   * Applies last material from active materials' stack
   */
  applyLastMat() {
    var lastMatInd = this.activeMaterials.length - 1;
    if (lastMatInd >= 0) this.activeMaterials[lastMatInd].apply();
    this.applyLastTex();
  }

  /**
   * Pushes a material into materials' stack and applies it
   * @param {Material to push into materials' stack} mat
   */
  pushMaterial(mat) {
    this.activeMaterials.push(mat);
    mat.apply();

    // only reapply last tex if material doesn't come with one
    if (mat.texture == null) this.applyLastTex();
  }

  /**
   * Pops a material from scene's materials' stack & applies last material & texture
   */
  popMaterial() {
    this.activeMaterials.pop();
    var lastMatInd = this.activeMaterials.length - 1;
    if (lastMatInd >= 0) this.activeMaterials[lastMatInd].apply();
    else this.defaultAppearance.apply();

    this.applyLastTex();
  }

  /**
   * Binds last texture from active textures' stack
   */
  applyLastTex() {
    var lastTexInd = this.activeTextures.length - 1;
    if (lastTexInd >= 0) this.activeTextures[lastTexInd].bind();
    else this.unbindActiveTex(); // get rid of our tex if there isn't any more
  }

  /**
   * Pushes a texture into textures' stack & binds it
   * @param {Texture to push into textures' stack} tex
   */
  pushTexture(tex) {
    this.activeTextures.push(tex);
    tex.bind();
  }

  /**
   * Pops a texture from scene's testures' stack & applies last texture
   */
  popTexture() {
    this.activeTextures.pop();
    this.applyLastTex();
  }

  /**
   * Unbinds active texture
   */
  unbindActiveTex() {
    if (this.activeTexture != null) this.activeTexture.unbind();
  }
}
