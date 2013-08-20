"use strict";

var $        = require('jquery')
  , PlusData = require('../models/plus-data')
  , template = require('../templates/plus-data')
  ;

function PlusDataView(model) {
  this.model = model

  this.el = template(model);
  this.updateFooter();

  this._bind();

  // TODO: Does this belong in the model?
  this._setClean();
}

PlusDataView.prototype._setClean = function(dueDate, estimate) {
  this.clean = {
    dueDate: this.model.dueDate,
    estimate: this.model.estimate
  };
};

PlusDataView.prototype._bind = function() {
  this.el
    .on('change', '#ghplus-due-date', $.proxy(this._dueDateChanged, this))
    .on('change', '#ghplus-estimated-hours', $.proxy(this._estimateChanged, this))
    .on('click', '#ghplus-_cancel', $.proxy(this._cancel, this))
    .on('click', '#ghplus-save', $.proxy(this._save, this));
};

PlusDataView.prototype._cancel = function(e, el) {
  e.preventDefault();

  this.el.find('#ghplus-due-date').val(this.clean.dueDate);
  this.el.find('#ghplus-estimated-hours').val(this.clean.estimate);
};

PlusDataView.prototype._save = function(e, el) {
  e.preventDefault();

  // TODO: Move isDirty to the model?  Probably.
  if (this.isDirty()) {
    var self = this;
    this.model.save(function(err, container) {
      if (!err) {
        container.hide();

        self._flashSave();
        self._setClean();
        self.updateFooter();
      }
    });
  }
};

PlusDataView.prototype._flashSave = function() {
  this.el.addClass('saved');

  var self = this;
  setTimeout(function() {
    self.el.removeClass('saved');
  }, 2000);
}

PlusDataView.prototype._dueDateChanged = function() {
  this.model.dueDate = this.el.find('#ghplus-due-date').val();
};

PlusDataView.prototype._estimateChanged = function() {
  this.model.estimate = this.el.find('#ghplus-estimated-hours').val();
};

PlusDataView.prototype.isDirty = function() {
  return this.model.dueDate !== this.clean.dueDate || this.model.estimate !== this.clean.estimate;
};

PlusDataView.prototype.prependTo = function(parent) {
  $(parent).prepend(this.el);

  // fix for http://bugs.jqueryui.com/ticket/8989
  $("#ui-datepicker-div").wrap('<div class="gh-plus" />');
};

PlusDataView.prototype.updateFooter = function() {
  var visibilityFn = this.model.updatedOn ? 'show' : 'hide';

  this.el.find('.footnote')
    .find('.updated-by').text(this.model.updatedBy).end()
    .find('.updated-on').text(this.model.updatedOn).end()
    [visibilityFn]();
};

module.exports = PlusDataView;
