/**
 * @author Henryk Iwaniuk / b.iwaniuk@campus.tu-berlin.de
 */

var NEWTON = {REVISION: '1'};

NEWTON.__IDCont = 0;

NEWTON.prototype = {
    constructor: NEWTON
};

NEWTON.isNumber = function (a) {
    return !isNaN(a-0);
};

NEWTON.isVector = function (a) {
    return (a !== undefined && a.x !== undefined && a.y !== undefined && a.z !== undefined);
};
