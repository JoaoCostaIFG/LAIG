/**
 * MyNode
 * @constructor
 */
class MyNode{
	constructor(id, dad) {
		this.id = id;
		this.tex = dad.getText();
		this.mat = dad.getMaterial();

		tgMatrix = [1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1]; 
		
		
	}

	constructor(id, tex, mat, aft, afs) {
		this.id = id;
		this.tex = tex;
		this.mat = mat;
		this.aft = aft;
		this.afs = afs;

		tgMatrix = [1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1]; 
	}

	addTgMatrix(tg){
		result = [0, 0, 0, 0,
				  0, 0, 0, 0,
				  0, 0, 0, 0,
				  0, 0, 0, 0]

		for (var i = 0; i < 4; i++)
			for (var j = 0; j < 4; j++)
				for(var k = 0; k < 4; k++)
					res[i * 4 + j] += A[i * 4 + k] * B[k * 4 + j];
	}

	setTexture(tex, afs, aft)
	{
		this.tex = tex;
		this.afs = afs;
		this.aft = aft;
	}

	setMaterial(mat)
	{
		this.mat = mat;
	}

	getText()
	{
		return this.tex;
	}

	getMaterial()
	{
		return this.mat;
	}

}

