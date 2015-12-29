/* =============================================================================
   assets/js/global/initialize-modules.js
   ========================================================================== */
var domUtils   = require('global/dom-utils');
var ns         = baseUI;

function initializeModules() {
    var allModules = domUtils.findAll('[data-uimodule]');

    // find all the JS modules on page and initiate
    domUtils.forEach(allModules, attachModules);

    /**
     * attach components on the page
     * @param  {[type]} item [description]
     */
    function attachModules(item) {
        var modulElement = item.attributes['data-uimodule'].value;

        // find and call this module
        var action = (action === undefined) ? 'attach' : action;
        if (modulElement !== '' && ns[modulElement] && typeof ns[modulElement][action] === 'function') {
            ns[modulElement][action](item);
        }
    }
}

// initialize on 'DOMContentLoaded'
domUtils.ready(initializeModules);
