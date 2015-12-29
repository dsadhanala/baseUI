/* =============================================================================
   app-scripts.js
   ========================================================================== */
/*** custom name space for jQuery and application level components ***/
var baseJQ = $.noConflict();
var baseUI = baseUI || {};

// setting global vars to share with other modules
global.baseJQ = baseJQ;
global.baseUI = baseUI;

// all components
require('components');
require('global/initialize-modules');
