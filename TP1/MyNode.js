/**
 * MyNode
 * @constructor
 */
class MyNode {
  constructor(sceneGraph, id) {
    this.id = id;
    this.sceneGraph = sceneGraph;

    // if (dad != null) {
      // this.tex = dad.getText();
      // this.mat = dad.getMaterial();
    // }

    this.tgMatrix = mat4.create();

    this.descendantsNode = [];
    this.descendantsLeaf = [];
  }

  addTgMatrix(tg) {
    // var result = [0, 0, 0, 0,
    // 0, 0, 0, 0,
    // 0, 0, 0, 0,
    // 0, 0, 0, 0];

    // for (var i = 0; i < 4; i++)
    // for (var j = 0; j < 4; j++)
    // for(var k = 0; k < 4; k++)
    // result[i * 4 + j] += this.tgMatrix[i * 4 + k] * tg[k * 4 + j];

    // this.tgMatrix = result;

    mat4.multiply(this.tgMatrix, this.tgMatrix, tg);
  }

  setTexture(tex, afs, aft) {
    this.tex = tex;
    this.afs = afs;
    this.aft = aft;
  }

  setMaterial(mat) {
    this.mat = mat;
  }

  addDescendantNode(desc) {
    this.descendantsNode.push(desc);
  }

  addDescendantLeaf(desc) {
    this.descendantsLeaf.push(desc);
  }

  displayPrimitives() {
    // calls display on each CFGobject (leafs)
    for (var i = 0; i < this.descendantsLeaf.length; ++i) {
      // this.descendantsLeaf[i].enableNormalViz();
      this.descendantsLeaf[i].display();
    }
  }

  display() {
    // transformations push
    this.sceneGraph.pushTransformation(this.tgMatrix);
    // materials push
    if (this.mat != "null") this.sceneGraph.pushMaterial(this.mat);
    // textures push
    if (this.tex != "null" && this.tex != "clear")
      this.sceneGraph.pushTexture(this.tex);
    else if (this.tex == "clear")
      this.sceneGraph.unbindActiveTex();

    // draw primitives
    this.displayPrimitives();

    // recursively process descendant MyNode objects
    for (var i = 0; i < this.descendantsNode.length; ++i)
      this.descendantsNode[i].display();

    // textures pop
    if (this.tex != "null" && this.tex != "clear")
      this.sceneGraph.popTexture();
    // materials pop
    if (this.mat != "null")
      this.sceneGraph.popMaterial();
    // transformations pop
    this.sceneGraph.popTransformation();
  }
}
