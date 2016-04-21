function Sphere (world, material, type, id, name, vx, vy, vz,physSize,visSize,deps,rdeps) {
    if (id != world.sphereList.length)
        console.warn("Node ID ", id, "does not match node index ", world.sphereList.length);
    this.mesh = null;
    this.body = null;
    this.name = name;
    this.connections = [];
    this.r_connections = [];
    this.__dist = 0;
    this.__parent = null;
    this.id = id;
    this.deps = deps;
    this.rdeps = rdeps;
    this.startphyssize = physSize;
    this.startvissize = visSize;

    world.nodeIDs[this.name] = this.id;
    var geometry = new THREE.SphereGeometry(visSize, 8, 8);
    this.mesh = new THREE.Mesh(geometry, material);
    world.scene.add(this.mesh);

    var sprite = makeTextSprite(this.name, { fontsize: 18, borderColor: {r:30, g:30, b:120, a:1.0}, backgroundColor: {r:150, g:150, b:200, a:0.9} } );
    sprite.position.set(0,0.1,0);
    this.mesh.add(sprite);

    this.body = new CANNON.Body({
        mass: 0.2, // kg
        position: new CANNON.Vec3(vx, vy, vz), // m
        shape: new CANNON.Sphere(physSize), // radius in m
        type: type,
        linearDamping: 0.8,
        angularDamping: 0.8
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

    this.s1.connections.push(this.s2);
    this.s2.r_connections.push(this.s1);

    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(this.s1.body.position);
    lineGeometry.vertices.push(this.s2.body.position);
    this.line = new THREE.Line(lineGeometry, lineMaterial);
    this.line.frustumCulled = false;
    world.scene.add(this.line);
    world.connectionList.push(this);
    world.phyWorld.addConstraint(new CANNON.DistanceConstraint(this.s1.body, this.s2.body, l, 0.1));
}

Connection.prototype.update = function () {
    copy(this.line.geometry.vertices[0], this.s1.body.position);
    copy(this.line.geometry.vertices[1], this.s2.body.position);
    this.line.geometry.verticesNeedUpdate = true;
};
