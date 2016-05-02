/**
 * @author Henryk Iwaniuk / b.iwaniuk@campus.tu-berlin.de
 */

NEWTON.Body = function () {
    NEWTON.Object3D.call(this);

    this.type = 'Body';

    this.mass = 1;                          // in kg
    this.damping = 0.5;
    this.__inverseMass = 1/this.mass;
    this.velocity = new NEWTON.v3d();       // in m/s
    this.acceleration = new NEWTON.v3d();   // in m/s/s
    this.force = new NEWTON.v3d();          // in N
};

NEWTON.Body.prototype = Object.create(NEWTON.Object3D.prototype);
NEWTON.Body.prototype.constructor = NEWTON.Body;

NEWTON.Body.prototype.applyForceVector = function (F) {
    if (NEWTON.isVector(F)) {
        this.force.add(F);
    }

    return this;
};

NEWTON.Body.prototype.__forceToAcceleration = function () {
    /**
     * a = F / m
     */

    this.acceleration.copy(this.force);
    this.acceleration.multiply(this.__inverseMass);
};

NEWTON.Body.prototype.__accelerationToVelocity = function (dt) {
    /**
     * velocity += acceleration * dt
     */

    var dV = new NEWTON.v3d();
    dV.copy(this.acceleration);
    dV.multiply(dt);

    this.velocity.add(dV);
};

NEWTON.Body.prototype.__velocityToPosition = function (dt) {
    /**
     * position += velocity * dt
     */

    var dP = new NEWTON.v3d();
    dP.copy(this.velocity);
    dP.multiply(dt);

    this.position.add(dP);
};

NEWTON.Body.prototype.__resetForce = function () {
    this.force.x = 0;
    this.force.y = 0;
    this.force.z = 0;
};

NEWTON.Body.prototype.__damping = function () {
    /**
     * Fw = const * v^2
     */

    var v = this.velocity.length();
    var Fw = new NEWTON.v3d();
    Fw.copy(this.velocity).multiply(v).multiply(this.damping).multiply(-1);

    this.applyForceVector(Fw);
};
