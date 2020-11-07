class Defbarrel extends CGFobject {
  static weight = 1.0;

  constructor(scene, base, middle, height, slices, stacks) {
    super(scene);
    this.halfHeight = height / 2.0;

    let nurbsSurf = new CGFnurbsSurface(
      3.0, // order
      2.0, // order
      this.genControlPoints(base, middle, height)
    );

    this.nurbsObj = new CGFnurbsObject(scene, slices, stacks, nurbsSurf);
  }

  genControlPoints(base, middle, height) {
    let yBase = base * 1.3;
    let yMiddle = middle * 1.3;
    return [
      [
        [-base, 0.0, height, 1],
        [-middle, 0.0, this.halfHeight, 1],
        [-base, 0.0, 0.0, 1],
      ],
      [
        [-base, yBase, height, 1],
        [-middle, yMiddle, this.halfHeight, 1],
        [-base, yBase, 0.0, 1],
      ],
      [
        [base, yBase, height, 1],
        [middle, yMiddle, this.halfHeight, 1],
        [base, yBase, 0.0, 1],
      ],
      [
        [base, 0.0, height, 1],
        [middle, 0.0, this.halfHeight, 1],
        [base, 0.0, 0.0, 1],
      ],
    ];

    // return [
    // [
    // [0.0, base, 0.0, 0.5],
    // [base, base, 0.0, Defbarrel.weight],
    // [base, 0.0, 0.0, Defbarrel.weight],
    // [base, -base, 0.0, Defbarrel.weight],
    // [0.0, -base, 0.0, Defbarrel.weight],
    // [-base, -base, 0.0, Defbarrel.weight],
    // [-base, 0.0, 0.0, Defbarrel.weight],
    // [-base, base, 0.0, Defbarrel.weight],
    // [0.0, base, 0.0, 0.5],
    // ],
    // [
    // [0.0, middle, this.halfHeight, 0.5],
    // [middle, middle, this.halfHeight, Defbarrel.weight],
    // [middle, 0.0, this.halfHeight, Defbarrel.weight],
    // [middle, -middle, this.halfHeight, Defbarrel.weight],
    // [0.0, -middle, this.halfHeight, Defbarrel.weight],
    // [-middle, -middle, this.halfHeight, Defbarrel.weight],
    // [-middle, 0.0, this.halfHeight, Defbarrel.weight],
    // [-middle, middle, this.halfHeight, Defbarrel.weight],
    // [0.0, middle, this.halfHeight, 0.5],
    // ],
    // [
    // [0.0, base,   height, 0.5],
    // [base, base,  height, Defbarrel.weight],
    // [base, 0.0,   height, Defbarrel.weight],
    // [base, -base, height, Defbarrel.weight],
    // [0.0, -base,  height, Defbarrel.weight],
    // [-base, -base,height, Defbarrel.weight],
    // [-base, 0.0,  height, Defbarrel.weight],
    // [-base, base, height, Defbarrel.weight],
    // [0.0, base,   height, 0.5],
    // ],
    // ];
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.nurbsObj.display();
    this.scene.popMatrix();

    this.nurbsObj.display();
  }

  enableNormalViz() {
    this.nurbsObj.enableNormalViz();
  }

  disableNormalViz() {
    this.nurbsObj.disableNormalViz();
  }
}
