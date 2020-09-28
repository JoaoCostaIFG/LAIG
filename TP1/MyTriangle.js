/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param v1 - vertice 1 coordinates
 * @param v2 - vertice 2 coordinates
 * @param v3 - vertice 3 coordinates
 */
class MyTriangle extends CGFobject {
	constructor(scene, v1, v2, v3) {
		super(scene);
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			this.v1[0], this.v1[1], this.v1[2],	// 0
			this.v2[0], this.v2[1], this.v2[2],	// 1
			this.v3[0], this.v3[1], this.v3[2],	// 2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

    // TODO
		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
    |
    |
		|
		v
    t
    */

    var a = Math.sqrt(Math.pow(this.v2[0] - this.v1[0], 2) + Math.pow(this.v2[1] - this.v1[1], 2) + Math.pow(this.v2[2] - this.v1[2], 2));
    var b = Math.sqrt(Math.pow(this.v3[0] - this.v2[0], 2) + Math.pow(this.v3[1] - this.v2[1], 2) + Math.pow(this.v3[2] - this.v2[2], 2));
    var c = Math.sqrt(Math.pow(this.v1[0] - this.v3[0], 2) + Math.pow(this.v1[1] - this.v3[1], 2) + Math.pow(this.v1[2] - this.v3[2], 2));

    var cos = (a *a - b * b + c * c) / (2 * a * c);
    var sin = Math.sqrt(1 - cos * cos);

		this.texCoords = [
			0, 1,
			a/1, 1,
			c * cos / 1, 1 - c * sin / 1
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

