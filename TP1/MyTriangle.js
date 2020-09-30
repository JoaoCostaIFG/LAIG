/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - x coordinate corner 1
 * @param y1 - y coordinate corner 1
 * @param x2 - x coordinate corner 2
 * @param y2 - y coordinate corner 2
 */
class MyTriangle extends CGFobject {
	constructor(scene, x1, y1, x2, y2, x3, y3) {
		super(scene);
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            this.x1, this.y1, 0,	// 0
            this.x2, this.y2, 0,	// 1
            this.x3, this.y3, 0,	// 2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

        var out = vec3.create();
        vec3.cross(out, [this.x2 - this.x1, this.y2 - this.y1, 0], [this.x3 - this.x1, this.y3 - this.y1, 0]);
        var normalZ = out[2] > 0 ? 1 : -1;
		this.normals = [
			0, 0, normalZ,
			0, 0, normalZ,
			0, 0, normalZ,
			0, 0, normalZ
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

        var a = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
        var b = Math.sqrt(Math.pow(this.x3 - this.x2, 2) + Math.pow(this.y3 - this.y2, 2));
        var c = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2));

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

