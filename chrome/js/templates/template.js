"use strict";

var $ = require('jquery')
  , parse = require('parse')
  ;

require('jqueryui');

function buildTemplate(locals) {
  var html = getHTML();
  html = parse(html, locals);

  return $(html)
    .find('#ghplus-due-date').datepicker()
    .end();
}

function getHTML() {
  return [
    '<div class="ghplus bubble" id="ghplus-container">',
      '<div class="discussion-bubble-inner">',
        '<label for="ghplus-due-date">Due Date:</label>',
        '<span><input id="ghplus-due-date" value="{{dueDate}}" /></span>',
        '<label for="ghplus-estimated-hours">Hours Estimated:</label>',
        '<span><input id="ghplus-estimated-hours" value="{{estimate}}" /></span>',
        '<span class="button-container">',
          '<a href="#" id="ghplus-cancel" class="minibutton danger comment-cancel-button">Cancel</a>',
          '<a href="#" id="ghplus-save" class="minibutton">Save</a>',
        '</span>',
        '<div class="footnote"><span>Last edited by <span class="updated-by">{{updatedBy}}</span> on <span class="updated-on">{{updatedOn}}</span></span></div>',
      '</div>',
    '</div>',
    '<div class="closed-banner"></div>'
  ].join('');
}

module.exports = buildTemplate;