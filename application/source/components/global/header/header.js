/* =============================================================================
   components/global/header
   ========================================================================== */

'use strict';

var ns     = baseUI;
ns.header  = ns.header || {};
var header = ns.header;
var element;

header.attach = function (instance) {
    element = instance;
    initialize();
};

header.detach = function () {
    dispose();
};

function initialize() {
    console.log("header attached");

    addEvents();
}

function addEvents() {
    //element.on('click', callback);
}

function dispose() {
    element.parentNode.removeChild(element);
    delete ns.header;
    element = null;

    // remove event listeners below, example commented
    //element.off('click', callback);
    console.log("header detached");
}
