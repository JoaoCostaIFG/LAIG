class MyBoarder{
    constructor(scene, boardSize){
        this.scene = scene;
        this.cube = new MyCube(scene);
        this.len = boardSize * MyPiece.size + MyPiece.size/4;
        this.height = MyPiece.size;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1,this.height, this.len);
        this.cube.display();
        this.scene.popMatrix();
    }

}