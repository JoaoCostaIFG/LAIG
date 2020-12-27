/**
 * MyInterface class, creating a GUI interface.
 */
class MyInterface extends CGFinterface {
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Initializes the interface.
   * @param {CGFapplication} application
   */
  init(application) {
    super.init(application);
    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by defult)

    this.initKeys();

    return true;
  }

  instGuiButtons() {
    // camera list
    this.gui
      .add(this.scene, "selectedCamera", this.scene.cameraList)
      .name("Selected camera")
      .onChange(this.scene.updateCurrentCamera.bind(this.scene));

    // lights button
    let lightsDir = this.gui.addFolder("Lights");
    let i = 0;
    for (let key in this.scene.graph.lights) {
      if (i >= 8) break; // Only eight lights allowed by WebCGF on default shaders.

      let graphLight = this.scene.graph.lights[key];
      lightsDir.add(this.scene, "xmlLight" + i).name(graphLight[5]);

      ++i;
    }

    // debug buttons
    let debugDir = this.gui.addFolder("Debug");
    // toggle to show object normals
    debugDir
      .add(this.scene.graph, "showNormals", this.scene.graph.showNormals)
      .name("Show normals")
      .onChange(this.scene.graph.toggleObjectNormals.bind(this.scene.graph));
    // toggle to show lights as objects
    debugDir
      .add(this.scene, "areLightsVisible", this.scene.areLightsVisible)
      .name("Show lights");

    // game buttons
    let gameDir = this.gui.addFolder("Game");
    gameDir.open();
    // game options
    gameDir
      .add(
        this.scene.gameOrchestrator,
        "selectedPlayerOps",
        this.scene.gameOrchestrator.playerOpsInd
      )
      .name("Players");
    gameDir
      .add(
        this.scene.gameOrchestrator,
        "selectedDifficulty",
        this.scene.gameOrchestrator.difficultyInd
      )
      .name("Difficulty");
    gameDir
      .add(
        this.scene.gameOrchestrator,
        "boardSize",
        this.scene.gameOrchestrator.boardSize
      )
      .name("Board size");
    // undo
    gameDir
      .add(
        this.scene.gameOrchestrator,
        "undo",
        this.scene.gameOrchestrator.undo()
      )
      .name("Undo");
    // start
    gameDir
      .add(
        this.scene.gameOrchestrator,
        "start",
        this.scene.gameOrchestrator.start()
      )
      .name("Start");
  }

  /**
   * initKeys
   */
  initKeys() {
    this.scene.gui = this;
    this.processKeyboard = function () {};
    this.activeKeys = {};
  }

  processKeyDown(event) {
    this.activeKeys[event.code] = true;
  }

  processKeyUp(event) {
    this.activeKeys[event.code] = false;
  }

  isKeyPressed(keyCode) {
    return this.activeKeys[keyCode] || false;
  }
}
