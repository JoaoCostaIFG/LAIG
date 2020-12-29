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
  static size = 4.0;
  static white = "./scenes/images/whiteMarble.jpeg";
  static black = "./scenes/images/blackMarble.jpeg";

  constructor(scene, color, tile) {
    super(scene);
    this.scene = scene;
    this.color = color;
    this.tile = tile ? tile : null;
    this.animation = null;

    this.cube = new MyCube(scene, 0.5);
    this.cylinder = new MyCylinder(scene, 1.2, 1.2, 0.2, 25, 2);
    this.torus = new MyTorus(scene, 25, 25, 0.1, 1.3);
    this.triangle = new MyCylinder(scene, 0.5, 0.5, 0.1, 3, 4);
  }

  setAnimation(animation) {
    this.animation = animation;
  }

  getTile() {
    return this.tile;
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }

  applyColor() {
    this.scene.pushMaterial(this.scene.whiteMaterial);
    if (this.color == Color.BLACK) {
      this.scene.pushTexture(this.scene.blackTex);
    } else {
      this.scene.pushTexture(this.scene.whiteTex);
    }
  }

  update(t) {
    if (this.animation) {
      this.animation.update(t);
      if (this.animation.isFinished) this.animation = null;
    }
  }

  displayWhiteInsignia() {
    // Right
    this.scene.pushMatrix();
  
    this.scene.translate(MyPiece.size/1.5, MyPiece.size/1.6, MyPiece.size/2.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
  
    this.triangle.display();
  
    this.scene.popMatrix();
  
    // Down
    this.scene.pushMatrix();
  
    this.scene.translate(MyPiece.size/2.0, MyPiece.size/1.6, MyPiece.size/1.5);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.scene.rotate(Math.PI / 2.0, 0, 0, 1);
  
    this.triangle.display();
  
    this.scene.popMatrix();
  
    // Left
    this.scene.pushMatrix();
  
    this.scene.translate(MyPiece.size/3.0, MyPiece.size/1.6, MyPiece.size/2.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
  
    this.triangle.display();
  
    this.scene.popMatrix();
  
    // Up
    this.scene.pushMatrix();
  
    this.scene.translate(MyPiece.size/2.0, MyPiece.size/1.6, MyPiece.size/3.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.scene.rotate(-Math.PI / 2.0, 0, 0, 1);
  
    this.triangle.display();
  
    this.scene.popMatrix();
  }

  displayBlackInsignia() {
    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/2.50, MyPiece.size/1.65, MyPiece.size/3.3);
    this.scene.scale(MyPiece.size/11.0, MyPiece.size / 50.0, MyPiece.size/2.5);
    this.cube.display();
    
    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/2.0, MyPiece.size/1.65, MyPiece.size/3.3);
    this.scene.scale(MyPiece.size/11.0, MyPiece.size / 50.0, MyPiece.size/2.5);
    this.cube.display();
    
    this.scene.popMatrix();

    // Circle
    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/3.25, MyPiece.size/1.60, MyPiece.size/2.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.scene.scale(MyPiece.size/20.0, MyPiece.size /20.0, MyPiece.size/20.0);
    this.cylinder.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/1.47, MyPiece.size/1.60, MyPiece.size/2.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.scene.scale(MyPiece.size/20.0, MyPiece.size /20.0, MyPiece.size/20.0);
    this.cylinder.display();

    this.scene.popMatrix();
  }

  display() {
    if (this.animation) this.animation.display();

    // Base
    this.scene.pushMatrix();
    this.applyColor();

    this.scene.translate(0.0, MyPiece.size / 4.0, 0.0);
    this.scene.scale(MyPiece.size, MyPiece.size / 2.0, MyPiece.size);
    this.cube.display();

    this.scene.popMatrix();

    // Top
    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/10.0, MyPiece.size/2.0, MyPiece.size/10.0);
    this.scene.scale(MyPiece.size/1.25, MyPiece.size / 6.0, MyPiece.size/1.25);
    this.cube.display();
    
    this.scene.popMatrix();

    // Circle
    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/2.0, MyPiece.size/1.65, MyPiece.size/2.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.cylinder.display();

    this.scene.popMatrix();

    // Torus
    this.scene.pushMatrix();

    this.scene.translate(MyPiece.size/2.0, MyPiece.size/1.75, MyPiece.size/2.0);
    this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
    this.torus.display();

    this.scene.popMatrix();

    if(this.color == Color.WHITE)
      this.displayWhiteInsignia();
    else  // Black
      this.displayBlackInsignia();

    this.scene.popTexture();
    this.scene.popMaterial();
    if (this.animation) this.scene.popTransformation();
  }
}
