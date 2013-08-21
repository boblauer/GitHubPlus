"use strict";

var $         = require('jquery')
  , DataStore = require('../store/gh-comment')
  ;

function PlusData(currentUser) {
  this.store = DataStore;

  this.fields = {
    updatedBy: null,
    updatedOn: null
  };

  this.clean = {};

  this.user = currentUser;
}

PlusData.prototype._formatDate = function(date) {
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
};

PlusData.prototype.markAsClean = function() {
  var self = this;

  Object.keys(this.fields).forEach(function(fieldName) {
    self.clean[fieldName] = self.fields[fieldName];
  });
};

PlusData.prototype.isDirty = function() {
  var self = this
    , isDirty = false;

  Object.keys(this.fields).forEach(function(fieldName) {
    if (self.clean[fieldName] !== self.fields[fieldName]) {
      isDirty = true;
    }
  });

  return isDirty;
};

PlusData.prototype.save = function(cb) {
  var self = this;

  if (this.isDirty()) {
    this.fields.updatedBy = this.user;
    this.fields.updatedOn = this._formatDate(new Date());

    this.store.save(this.fields, function(err, data) {
      if (!err) {
        self.markAsClean();
      }

      cb(err, data);
    });
  }
};

PlusData.prototype.load = function() {
  $.extend(this.fields, this.store.load());
  this.markAsClean();
};

module.exports = PlusData;

