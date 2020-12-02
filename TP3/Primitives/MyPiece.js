const Color = {
    BLACK: 0,
    WHITE: 1,
};

/**
 * MyPiece
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPiece extends CGFobject {
	constructor(scene, color, tile) {
        super(scene);
        this.scene = scene;
        this.color = color;
        this.tile = tile ? tile : null;

        this.cube = new MyCube(scene);
	}
	
	getColor(){
        return this.color;
    }

    setColor(color){
        this.color = color;
    }

    applyColor(){
        this.scene
    }

    display(){

        this.cube.display();
    }
}
