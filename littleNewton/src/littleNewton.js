/**
 * @author Henryk Iwaniuk / b.iwaniuk@campus.tu-berlin.de
 */

var NEWTON = {REVISION: '1'};

NEWTON.__IDCont = 0;

NEWTON.prototype = {
    constructor: NEWTON
};

NEWTON.isNumber = function (a) {
    return !isNaN(a-0) && a != null;
};

NEWTON.isVector = function (a) {
    // return (a !== undefined && NEWTON.isNumber(a.x) && NEWTON.isNumber(a.y) && NEWTON.isNumber(a.z));
    return a !== undefined;
};
