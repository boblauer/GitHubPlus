"use strict";

var $        = require('jquery')
  , PlusData = require('../models/plus-data')
  , template = require('../templates/plus-data')
  ;

function PlusDataView(model) {
  this.model = model;

  this.el = template(model.fields);
  this._insertPullRequest();
  this._updateFooter();

  this._bind();
}

PlusDataView.prototype._cancel = function(e, el) {
  e.preventDefault();

  var self = this;
  this.el.find('input').each(function(i, input) {
    input = $(input);

    var id = input.attr('id');
    input.val(self.model.clean[id]);
  });
};

PlusDataView.prototype._save = function(e, el) {
  e.preventDefault();

  var self = this;
  this.model.save(function(err, container) {
    if (!err) {
      container.hide();

      self._flashSave();
      self._updateFooter();
    }
  });
};

PlusDataView.prototype._flashSave = function() {
  this.el.addClass('saved');

  var self = this;
  setTimeout(function() {
    self.el.removeClass('saved');
  }, 2e3);
};


PlusDataView.prototype._bind = function() {
  this.el
    .on('change', 'input', $.proxy(this._fieldChaned, this))
    .on('click', '#ghplus-cancel', $.proxy(this._cancel, this))
    .on('click', '#ghplus-save', $.proxy(this._save, this));
};

PlusDataView.prototype._fieldChaned = function(e) {
  var field = $(e.target);
  this.model.fields[field.attr('id')] = field.val();
};

PlusDataView.prototype._updateFooter = function() {
  var visibilityFn = this.model.fields.updatedOn ? 'show' : 'hide';

  this.el.find('.footnote')
    .find('.updated-by').text(this.model.fields.updatedBy).end()
    .find('.updated-on').text(this.model.fields.updatedOn).end()
    [visibilityFn]();
};

PlusDataView.prototype._insertPullRequest = function() {
  var pullRequest = $('div.js-comment').filter('[id*=pullrequest]:last');

  if (pullRequest.length) {
    pullRequest = pullRequest.clone()
      .css('border', '1px solid #cacaca')
      .css('marginTop', '20px')
      .removeAttr('id');

    this.el.splice(1, 0, pullRequest.get(0));
  }
};

PlusDataView.prototype.prependTo = function(parent) {
  $(parent).prepend(this.el);
};

module.exports = PlusDataView;
