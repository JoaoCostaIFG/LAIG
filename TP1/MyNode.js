/**
 * MyNode
 * @constructor
 */
class MyNode {
    constructor(id, dad) {
        this.id = id;

        if (dad != null) {
            this.tex = dad.getText();
            this.mat = dad.getMaterial();
        }

        this.tgMatrix = [1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1];

        this.descendantsNode = [];
        this.descendantsLeaf = [];
    }

    addTgMatrix(tg) {
	    var result = [0, 0, 0, 0,
				      0, 0, 0, 0,
                      0, 0, 0, 0,
                      0, 0, 0, 0];

        for (var i = 0; i < 4; i++)
	  	    for (var j = 0; j < 4; j++)
		  		for(var k = 0; k < 4; k++)
			  		result[i * 4 + j] += this.tgMatrix[i * 4 + k] * tg[k * 4 + j];

        this.tgMatrix = result;
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

    getTgMatrix()
    {
        return this.tgMatrix;
    }

    addDescendantNode(desc) {
        this.descendantsNode.push(desc);
    }

    addDescendantLeaf(desc) {
        this.descendantsLeaf.push(desc);
    }

    displayPrimitives() {
        // calls display on each CFGobject (leafs)
        for (var i = 0; i < this.descendantsLeaf.length; ++i)
            this.descendantsLeaf[i].display();
    }
}

