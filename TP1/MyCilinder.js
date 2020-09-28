/**
 * MyCilinder
 * @constructor
 */
class MyCilinder extends CGFobject {
  constructor(scene, bottomRadius, topRadius, height, slices, stacks) {
    super(scene);
    this.bottomRadius = bottomRadius;
    this.topRadius = topRadius;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var ang = 0;
    var alphaAng = (2 * Math.PI) / this.slices;

    this.texCoords = [];
    var texCurr = 0;
    var texStep = 1.0 / this.slices;

    /* think about a prism made of rectangles. Each rectangle like so:
     * 1----3
     * |\   |
     * | \  |
     * |  \ |
     * |   \|
     * 0----2
     *
     * We add the first 2 vertices outside the loop because they are
     * a special case (they don't 'link back' to anyone).
     */

    var heightStep = this.height / this.stacks;
    var currHeight = 0;
    var i = 2;

    for (var stackN = 1; stackN <= this.stacks; ++stackN) {
      ang = 0;
      texCurr = 0;

      // linear interpolation
      /*
        ---- y2 (x2 = 1)
        |  |
        |  |
        ---- y1 (x1 = 0)

        y3 = ((x2 - x3) * y1 + (x3 - x1) * y2) / (x2 - x1)
      */
      var x3 = (stackN - 1) / this.stacks;
      var r1 = (1 - x3) * this.bottomRadius + x3 * this.topRadius;
      var x4 = stackN / this.stacks;
      var r2 = (1 - x4) * this.bottomRadius + x4 * this.topRadius;

      // this is vertice 0
      this.vertices.push(r1 * Math.cos(ang), r1 * Math.sin(ang), currHeight);
      this.normals.push(r1 * Math.cos(ang), r1 * Math.sin(ang), 0);
      this.texCoords.push(texCurr, 1);
      // this is vertice 1
      this.vertices.push(r2 * Math.cos(ang), r2 * Math.sin(ang), currHeight + heightStep);
      this.normals.push(r2 * Math.cos(ang), r2 * Math.sin(ang), 0);
      this.texCoords.push(texCurr, 0);
      ang += alphaAng;
      texCurr += texStep;

      // do until we reach the number of vertices in current slice
      for (; i < (this.slices * 2 + 2) * stackN; i += 2) {
        // this is vertice 2
        this.vertices.push(r1 * Math.cos(ang), r1 * Math.sin(ang), currHeight);
        this.normals.push(r1 * Math.cos(ang), r1 * Math.sin(ang), 0);
        this.texCoords.push(texCurr, 1);

        // this is vertice 3
        this.vertices.push(r2 * Math.cos(ang), r2 * Math.sin(ang), currHeight + heightStep);
        this.normals.push(r2 * Math.cos(ang), r2 * Math.sin(ang), 0);
        this.texCoords.push(texCurr, 0);

        // these are the triangles: 0-1-2 and 1-3-2
        this.indices.push(i - 2, i, i - 1);
        this.indices.push(i, i + 1, i - 1);
        ang += alphaAng;
        texCurr += texStep;
      }

      currHeight += heightStep;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateBuffers(complexity) {
    this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
