class MovePieceAnimation{
    constructor(scene){
        this.scene = scene;

        this.totalTime = 2;
        this.isFinished = false;
        this.sumT = 0;
        this.lastTime = 0;

        this.genMatrix(0);
    }

    genMatrix(timePerc) {

        let newZ = 10 * timePerc;

        this.tgMatrix = mat4.create();
        mat4.identity(this.tgMatrix);
        mat4.translate(this.tgMatrix, this.tgMatrix, [0, 0, newZ]);
    }

    update(time){

        if(this.isFinished) return;
        if(this.sumT == 0)
            this.initialTime = time;
        
        this.sumT += time - this.lastTime;
        this.lastTime = time;

        console.log(this.sumT);
        if(this.sumT >= this.totalTime){
            this.isFinished = true;
            console.log("Finished Animation");
        }

        let timePerc = (this.sumT - this.initialTime)/this.totalTime;
        this.genMatrix(timePerc);
    }

    display(){
        this.scene.pushTransformation(this.tgMatrix);
    }
}