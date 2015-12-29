(function(name, definition) {
    if (typeof exports === 'object') {
        if (typeof module === 'object' && typeof module.exports === 'object' ) {
            module.exports = definition;
        }
        exports[name] = definition;
        return;
    }
    this[name] = definition;
}('handlebars-helper-indexStartsAtOne', function indexStartsAtOne(value, options) {
    "use strict";
    return parseInt(value) + 1;
}));
