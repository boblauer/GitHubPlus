"use strict";

var $         = require('jquery')
  , parse     = require('parse')
  , fieldData = require('template');
  ;

require('jqueryui');

function buildTemplate(locals) {
  var html = getHTML();
  html = parse(html, locals);

  return $(html)
    .find('#ghplus-due-date').datepicker()
    .end();
}

function buildFieldsHTML() {
  var html = '';
  $.each(fieldData, function(index, data) {
    html += '<label for="' + data.id + '">' + data.label + ':</label>';
    html += '<span><input id="' + data.id + '" type="' + (this.type || 'text') + '" data-control-type="' + (this.controlType || '') + '" /></span>';
  });

  return html;
}

function getHTML() {
  return [
    '<div class="ghplus bubble" id="ghplus-container">',
      '<div class="discussion-bubble-inner">',
        buildFieldsHTML(),
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
