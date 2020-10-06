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

    this.gui
      .add(this.scene, "areLightsVisible", this.scene.areLightsVisible)
      .name("Show lights as objects");

    // lights button
    var lightsDir = this.gui.addFolder("Lights");
    var i = 0;
    for (let key in this.scene.graph.lights) {
      if (i >= 8) break; // Only eight lights allowed by WebCGF on default shaders.

      let graphLight = this.scene.graph.lights[key];
      lightsDir.add(this.scene, "xmlLight" + i).name(graphLight[5]);

      ++i;
    }

    lightsDir.open();
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
