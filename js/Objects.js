function Sphere (world, material, vx, vy, vz) {
    this.mesh = null;
    this.body = null;

    var geometry = new THREE.SphereGeometry(0.2, 8, 8);
    this.mesh = new THREE.Mesh(geometry, material);
    world.scene.add(this.mesh);
    this.body = new CANNON.Body({
        mass: 0.1, // kg
        position: new CANNON.Vec3(vx, vy, vz), // m
        shape: new CANNON.Sphere(0.9) // radius in m
    });
    world.phyWorld.addBody(this.body);
    world.sphereList.push(this);
}

Sphere.prototype.update = function () {
    copy(this.mesh.position, this.body.position);
};

function Connection (world, s1, s2, l) {
    this.s1 = s1;
    this.s2 = s2;

    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(s1.body.position);
    lineGeometry.vertices.push(s2.body.position);
    this.line = new THREE.Line(lineGeometry, lineMaterial);
    world.scene.add(this.line);
    world.connectionList.push(this);
    world.phyWorld.addConstraint(new CANNON.DistanceConstraint(s1.body, s2.body, l, 0.001));
}

Connection.prototype.update = function () {
    copy(this.line.geometry.vertices[0], this.s1.body.position);
    copy(this.line.geometry.vertices[1], this.s2.body.position);
    this.line.geometry.verticesNeedUpdate = true;
};
