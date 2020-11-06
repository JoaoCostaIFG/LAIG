class Plane extends CGFobject {
  static orderU = 1.0;
  static orderV = 1.0;
  static weight = 1.0;

  constructor(scene, npartsU = 1.0, npartsV = 1.0) {
    super(scene);

    let nurbsSurf = new CGFnurbsSurface(
      Plane.orderU,
      Plane.orderV,
      this.genControlPoints()
    );

    this.nurbsObj = new CGFnurbsObject(scene, npartsU, npartsV, nurbsSurf);
  }

  initBuffers() {
    this.primitiveType = this.scene.gl.TRIANGLES;
  }

  genControlPoints() {
    // var controlPoints = [];

    // let dU = 1.0 / npartsU;
    // let dV = 1.0 / npartsV;

    // let currU = 0.5;
    // let currV = -0.5;
    // for (let u = 0; u < npartsU + 1; ++u) {
    // controlPoints[u] = [];
    // currV = -0.5;
    // for (let v = 0; v < npartsV + 1; ++v) {
    // controlPoints[u][v] = [currU, 0, currV, Plane.weight];
    // currV += dV;
    // }
    // currU -= dU;
    // }

    return [
      [
        [0.5, 0.0, -0.5, Plane.weight],
        [0.5, 0.0, 0.5, Plane.weight],
      ],
      [
        [-0.5, 0.0, -0.5, Plane.weight],
        [-0.5, 0.0, 0.5, Plane.weight],
      ],
    ];
  }

  display() {
    this.nurbsObj.display();
  }
}
