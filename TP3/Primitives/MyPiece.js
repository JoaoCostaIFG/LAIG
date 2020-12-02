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
        if(this.color == Color.BLACK){
            this.scene.blackMaterial.apply(); 
        }
        else this.scene.whiteMaterial.apply();
    }

    display(){
        this.scene.pushMatrix();
        this.applyColor();
        this.scene.scale(1,0.5,1);
        this.cube.display();
        this.scene.popMatrix();
    }
}
