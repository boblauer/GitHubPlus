"use strict";

var $ = require('jquery');

require('jqueryui');

function init(el) {
  $(el).datepicker();

  // fix for http://bugs.jqueryui.com/ticket/8989
  $("#ui-datepicker-div").wrap('<div class="gh-plus" />');
}

module.exports = {
  init: init
};
