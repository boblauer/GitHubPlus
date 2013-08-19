"use strict";

function parse(s, o) {
    return s.replace(/\{\{([^}]+)\}\}/g, function(m, g) {
        return o[g] || '';
    });
};

module.exports = parse;