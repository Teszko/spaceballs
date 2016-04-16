function copy (a, b) {
    a.x = b.x;
    a.y = b.y;
    a.z = b.z;
}

function updatePhysics (world) {
    var maxSubSteps = 3;
    var fixedTimeStep = 1.0 / 60.0;

    world.phyWorld.step(fixedTimeStep, world.clock.getDelta(), maxSubSteps);

    for (var j=0; j<world.sphereList.length; j++)
        world.sphereList[j].update();

    for (var h=0; h<world.connectionList.length; h++)
        world.connectionList[h].update();
}

function getNodeIdByName (world, name) {
    if (world.nodeIDs[name]) {
        return world.nodeIDs[name];
    }
    console.warn("getNodeIdByName: Node with name ", name, " does not exist.");
    return null;
}
