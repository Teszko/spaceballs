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
    this.lastacceleration = new NEWTON.v3d();   // in m/s/s
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

NEWTON.Body.prototype.__updateAcceleration = function () {
    /**
     * a = F / m
     * v-verlet 2). Must use new position from v-verlet 1)
     */

    this.lastacceleration.copy(this.acceleration);
    this.acceleration.copy(this.force);
    this.acceleration.multiply(this.__inverseMass);
    if( this.acceleration.x > 30)
    console.log("accel: "+this.acceleration.x+" "+this.acceleration.x+" "+this.acceleration.x+" ")
};


NEWTON.Body.prototype.__updateVelocity = function (dt) {
    /**
     * velocity += 0.5 ( lastacceleration + acceleration ) * dt
     */

    var dV = new NEWTON.v3d();
    dV.copy(this.acceleration);
    dV.add(this.lastacceleration);
    dV.multiply(0.5 * dt);

    this.velocity.add(dV);
    var maxVel=50;
    if(!((Math.abs(this.velocity.x)+Math.abs(this.velocity.y)+Math.abs(this.velocity.z))<maxVel)){
    console.log(this.id,this.velocity);
    }
    this.velocity = this.__limitV(this.velocity);
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


NEWTON.Body.prototype.__limitV = function(V){

    var maxV=10;
    V.x = isNaN(V.x) ? 10 : V.x;
    V.x = isNaN(V.x) ? 10 : V.x;
    V.x = isNaN(V.x) ? 10 : V.x;

    V.x = ( Math.abs(V.x) < maxV ) ? V.x : Math.sign(V.x) * maxV;
    V.y = ( Math.abs(V.y) < maxV ) ? V.y : Math.sign(V.y) * maxV;
    V.z = ( Math.abs(V.z) < maxV ) ? V.z : Math.sign(V.z) * maxV;
    return V;
}

NEWTON.Body.prototype.__updatePosition = function (dt) {
    /**
     * position += velocity * dt + 1/2 * acceleration * dt**2
     * velocity verlet 1)
     */

    var dPv = new NEWTON.v3d();
    dPv.copy(this.velocity);
    dPv.multiply(dt);

    var dPa = new NEWTON.v3d();
    dPa.copy(this.acceleration);
    dPa.multiply(dt); // vel 
    //console.log("Pa="+dPa.x+" "+dPa.y+" "+dPa.z);
    dPa=this.__limitV(dPa);
    //console.log("Pa="+dPa.x+" "+dPa.y+" "+dPa.z);
    dPa.multiply(0.5*dt); // x

    this.position.add(dPv);
    this.position.add(dPa);
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
