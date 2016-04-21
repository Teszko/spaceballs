function isNodeInArray (arr, node) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i].id == node.id) {
            return true;
        }
    }
    return false;
}

function findPath (world, s1, s2) {
    var start_sphere = world.sphereList[s1];
    var end_sphere = world.sphereList[s2];
    if (!start_sphere || !end_sphere) {
        console.warn("invalid input for findPath");
        return null;
    }
    var queue = [start_sphere];
    var blacklist = [];
    var current = null;
    var path = [];
    start_sphere.__dist = 0;
    while (queue.length) {
        current = queue.pop();
        if (current.id == end_sphere.id) {
            console.log(end_sphere);
            console.log("path found");
            break;
        }
        for (var i=0; i<current.connections.length; i++) {
            if (!isNodeInArray(blacklist, current.connections[i])) {
                queue.push(current.connections[i]);
                current.connections[i].__dist = current.__dist + 1;
                current.connections[i].__parent = current;
            }
        }
        blacklist.push(current);
    }
    if (current.id != end_sphere.id) {
        console.warn("path not found");
        return null;
    }
    while (current && current.id != start_sphere.id) {
        path.push(current);
        current = current.__parent;
    }
    return path;
}