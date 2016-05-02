/**
 * @author Henryk Iwaniuk / b.iwaniuk@campus.tu-berlin.de
 */

NEWTON.Repellant = function (b1) {
    this.type = 'Repellant';

    this.body = b1;
    this.exclude = [this.body];
};

NEWTON.Repellant.prototype = {
    constructor: NEWTON.Rubberband
};

NEWTON.Repellant.prototype.__applyForce = function (world) {
    for (var i=0; i<world.__bodies.length; i++) {
        var body = world.__bodies[i];
        if (this.exclude.indexOf(body) < 0) {
            this.__applyForce_to_bodies(body);
        }
    }
};

NEWTON.Repellant.prototype.__applyForce_to_bodies = function (body2) {
    var dV = new NEWTON.v3d();
    dV.subtract(body2.position, this.body.position);
    dV.multiply(this.force(dV.length())/dV.length());
    body2.applyForceVector(dV);
    this.body.applyForceVector(dV.multiply(-1));
};

NEWTON.Repellant.prototype.force = function (d) {
    return 5/d;
};
