const TexBehaviour = {
  CHANGE: 0,
  KEEP: 1,
  CLEAR: 2,
};

const MatBehaviour = {
  CHANGE: 0,
  KEEP: 1,
};

/**
 * MyNode
 * @constructor
 */
class MyNode {
  constructor(sceneGraph, id) {
    this.id = id;
    this.sceneGraph = sceneGraph;

    this.tgMatrix = mat4.create();

    this.texId = "null";
    this.tex = null;
    this.texBehaviour = TexBehaviour.KEEP;
    this.afs = 1.0;
    this.aft = 1.0;

    this.matId = "null";
    this.mat = null;
    this.matBehaviour = MatBehaviour.KEEP;

    this.descendantsNode = [];
    this.descendantsLeaf = [];
  }

  addTgMatrix(tg) {
    mat4.multiply(this.tgMatrix, this.tgMatrix, tg);
  }

  setTexture(texId, afs, aft) {
    this.texId = texId;
    this.afs = afs;
    this.aft = aft;

    if (this.texId == "null")
      this.texBehaviour = TexBehaviour.KEEP;
    else if (this.texId == "clear")
      this.texBehaviour = TexBehaviour.CLEAR;
    else
      this.texBehaviour = TexBehaviour.CHANGE;
  }

  setMaterial(matId) {
    this.matId = matId;

    if (this.matId == "null")
      this.matBehaviour = MatBehaviour.KEEP;
    else
      this.matBehaviour = MatBehaviour.CHANGE;
  }

  addDescendantNode(desc) {
    this.descendantsNode.push(desc);
  }

  addDescendantLeaf(desc) {
    this.descendantsLeaf.push(desc);
  }

  displayPrimitives() {
    // draw primitives
    // calls display on each CFGobject (leafs)
    this.descendantsLeaf.forEach((leaf) => leaf.display());
  }

  scenePushes() {
    // transformations
    this.sceneGraph.pushTransformation(this.tgMatrix);
    // materials
    if (this.matBehaviour == MatBehaviour.CHANGE) this.sceneGraph.pushMaterial(this.mat);
    // textures
    if (this.texBehaviour == TexBehaviour.CHANGE)
      this.sceneGraph.pushTexture(this.tex);
    else if (this.texBehaviour == TexBehaviour.CLEAR) this.sceneGraph.unbindActiveTex();
  }

  scenePops() {
    // textures
    if (this.texBehaviour == TexBehaviour.CHANGE) this.sceneGraph.popTexture();
    // materials
    if (this.matBehaviour == MatBehaviour.CHANGE) this.sceneGraph.popMaterial();
    // transformations
    this.sceneGraph.popTransformation();
  }

  display() {
    this.scenePushes();
    this.displayPrimitives();
    // recursively process descendant MyNode objects
    for (var i = 0; i < this.descendantsNode.length; ++i)
      this.descendantsNode[i].display();
    this.scenePops();
  }

  enableNormalViz() {
    this.descendantsLeaf.forEach((leaf) => leaf.enableNormalViz());
  }

  disableNormalViz() {
    this.descendantsLeaf.forEach((leaf) => leaf.disableNormalViz());
  }
}
