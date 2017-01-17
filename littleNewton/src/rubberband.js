/**
 * @author Henryk Iwaniuk / b.iwaniuk@campus.tu-berlin.de
 */

NEWTON.Rubberband = function (b1, b2) {
    this.type = 'Rubberband';

    this.body1 = b1;
    this.body2 = b2;
};

NEWTON.Rubberband.prototype = {
    constructor: NEWTON.Rubberband
};

NEWTON.Rubberband.prototype.__applyForce = function () {
    var dV = new NEWTON.v3d();
    dV.subtract(this.body2.position, this.body1.position);
    dV.multiply(this.force(dV.length())/dV.lengthsquare());
    this.body1.applyForceVector(dV);
    this.body2.applyForceVector(dV.multiply(-1));
};

NEWTON.Rubberband.prototype.force = function (d) {
    return 2 * d ;
};
