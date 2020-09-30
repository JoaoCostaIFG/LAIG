class MyTorus extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices 
     * @param  {integer} loops 
     * @param   {float} innerRadius 
     * @param   {float} outerRadius 
     */
    constructor(scene, slices, loops, innerRadius, outerRadius) {
      super(scene);
      this.loops = loops;
      this.slices = slices;
      this.innerRadius = innerRadius;
      this.outerRadius = outerRadius;
  
      this.initBuffers();
    }
  
    /**
     * @method initBuffers
     * Initializes the torus buffers
     */
    initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];
  
      var phiInc = (2 * Math.PI) / this.loops;
      var thetaInc = (2 * Math.PI) / this.slices;
  
      for (var sliceN = 0; sliceN <= this.loops; sliceN++) {
        
        var theta = 0;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        // in each loop, build all the slices around
        for (var loopN = 0; loopN <= this.slices; loopN++) {
            
          var phi = 0;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.sin(phi);

          //--- Vertices coordinates
          var x = (this.outerRadius + this.innerRadius * cosTheta) * cosPhi;
          var y = (this.outerRadius + this.innerRadius * cosTheta) * sinPhi;
          var z = this.innerRadius * sinTheta;
          
          this.vertices.push(x, y, z);

          //Normals
          var nx = cosPhi * cosTheta;
          var ny = cosTheta * sinPhi;
          var nz = sinTheta;

          this.normals.push(nx, ny, nz);
  
          //--- Texture Coordinates
          this.texCoords.push(sliceN/this.slices);
          this.texCoords.push(loopN/this.loops);

          //--- Indices 
          
          /* think about a prism made of rectangles. Each rectangle like so:
          * 1----3
          * |\   |
          * | \  |
          * |  \ |
          * |   \|
          * 0----2
          *
          */
         if (sliceN < this.slices && loopN < this.loops) {
          var current = loopN * (this.loops +1) + sliceN;
          var next = current + (this.loops +1);
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)

          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next +1);
        }
  
          theta += thetaInc;          
        }
        phi += phiInc;
      }
  
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }
  }