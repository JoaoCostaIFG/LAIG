/**
 * MyNode
 * @constructor
 * @param sceneGraph - Scene's Graph
 * @param id - Node ID
 */
class MyNode {
  constructor(sceneGraph, id) {
    this.id = id;
    this.sceneGraph = sceneGraph;

    this.tgMatrix = mat4.create();

    this.descendantsNode = [];
    this.descendantsLeaf = [];
  }

  /**
   * Multiplies matrix passed in function's arguments
   * @param tg - transformation matrix to multiply 
   */
  addTgMatrix(tg) {
    mat4.multiply(this.tgMatrix, this.tgMatrix, tg);
  }

  /**
   * Defines texture, afs and aft of node
   * @param tex - texture 
   * @param afs - texture amplification in S axis
   * @param aft - texture amplification in T axis
   */
  setTexture(tex, afs, aft) {
    this.tex = tex;
    this.afs = afs;
    this.aft = aft;
  }

  /**
   * Defines material of node
   * @param mat - material to be set
   */
  setMaterial(mat) {
    this.mat = mat;
  }

  /**
   * Adds descendants to node
   * @param desc - descendent(s) to be added to node
   */
  addDescendantNode(desc) {
    this.descendantsNode.push(desc);
  }

  /**
   * Adds descendants leaf to node
   * @param desc - leaf descendent(s) to be added to node
   */
  addDescendantLeaf(desc) {
    this.descendantsLeaf.push(desc);
  }

  /**
   * calls display on each CFGobject (leafs)
   */
  displayPrimitives() {
    this.descendantsLeaf.forEach(leaf => leaf.display());
  }

  /**
   * Displays node
   */
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

  /**
   * Enables normals visualization for each primitive
   */
  enableNormalViz() {
    this.descendantsLeaf.forEach(leaf => leaf.enableNormalViz());
  }

  /**
   * Disables normals visualization for each primitive
   */
  disableNormalViz() {
    this.descendantsLeaf.forEach(leaf => leaf.disableNormalViz());
  }
}
