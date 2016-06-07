
NEWTON.Gravity = function (b1) {
    this.type = 'Gravity';

    this.body = b1;
    this.exclude = [this.body];
};

NEWTON.Gravity.prototype = {
    constructor: NEWTON.Rubberband
};

NEWTON.Gravity.prototype.__applyForce = function (world) {
    for (var i=0; i<world.__bodies.length; i++) {
        var body = world.__bodies[i];
        var dV = new NEWTON.v3d();
        dV.copy(this.body.position);
        dV.multiply(this.force(dV.lengthsquare())/dV.lengthsquare());
        this.body.applyForceVector(dV.multiply(-1));
    }
};

NEWTON.Gravity.prototype.force = function (d) {
    return 0.01 ;
};
