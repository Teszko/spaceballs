function Sphere (world, material, type, id, name, vx, vy, vz) {
    if (id != world.sphereList.length)
        console.warn("Node ID ", id, "does not match node index ", world.sphereList.length);
    this.mesh = null;
    this.body = null;
    this.name = name;
    this.id = id;

    var geometry = new THREE.SphereGeometry(0.2, 8, 8);
    this.mesh = new THREE.Mesh(geometry, material);
    world.scene.add(this.mesh);
    this.body = new CANNON.Body({
        mass: 0.1, // kg
        position: new CANNON.Vec3(vx, vy, vz), // m
        shape: new CANNON.Sphere(0.9), // radius in m
        type: type,
        linearDamping: 0.5,
        angularDamping: 0.5
    });
    world.phyWorld.addBody(this.body);
    world.sphereList.push(this);
}

Sphere.prototype.update = function () {
    copy(this.mesh.position, this.body.position);
};

function get_sphere_by_id (world, id) {
    for (var i=0; i<world.sphereList.length; i++) {
        if (world.sphereList[i].id == id) {
            return world.sphereList[i];
        }
    }
    console.warn("Could not find node with ID ", id);
    return null;
}

function Connection (world, si1, si2, l) {
    this.s1 = get_sphere_by_id(world, si1);
    this.s2 = get_sphere_by_id(world, si2);
    if (!this.s1 || !this.s2) {
        console.warn("Connection ignored.");
        return;
    }

    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(this.s1.body.position);
    lineGeometry.vertices.push(this.s2.body.position);
    this.line = new THREE.Line(lineGeometry, lineMaterial);
    world.scene.add(this.line);
    world.connectionList.push(this);
    world.phyWorld.addConstraint(new CANNON.DistanceConstraint(this.s1.body, this.s2.body, l, 0.1));
}

Connection.prototype.update = function () {
    copy(this.line.geometry.vertices[0], this.s1.body.position);
    copy(this.line.geometry.vertices[1], this.s2.body.position);
    this.line.geometry.verticesNeedUpdate = true;
};
