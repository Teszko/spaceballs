function copy (a, b) {
    a.x = b.x;
    a.y = b.y;
    a.z = b.z;
}

function updatePhysics (world) {
    var maxSubSteps = 3;
    var fixedTimeStep = 1.0 / 60.0;
    var damping=slidervars.damping;
    if(damping <= 0.05)
        return; // stop physics for damping ~=0
    world.phyWorld.step(fixedTimeStep, world.clock.getDelta(), maxSubSteps);


    for (var j=0; j<world.sphereList.length; j++){
        if (slidervars.rdepmass)
            world.sphereList[j].body.mass = Math.sqrt(world.sphereList[j].rdeps/20);
        else
            world.sphereList[j].body.mass = 0.02;
        // world.sphereList[j].body.shapes[0].radius = slidervars.physicsRadius*world.sphereList[j].startphyssize;

        //world.sphereList[j].body.velocity.x *= damping;
        //world.sphereList[j].body.velocity.y *= damping;
        //world.sphereList[j].body.velocity.z *= damping;
          world.sphereList[j].update();
    }
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

function makeTextSprite (message, parameters) {
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 18;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    var spriteAlignment = {x: 0, y: 1};

    var canvas = document.createElement('canvas');
    canvas.width=256;
    canvas.height=128;
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;

    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
        + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
        + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";

    context.fillText( message, borderThickness, fontsize + borderThickness);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial(
        { map: texture} );
    // unknown to my tree.js , useScreenCoordinates: false, alignment: spriteAlignment } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(1,0.5,1.0);
    return sprite;
}

function roundRect (ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
