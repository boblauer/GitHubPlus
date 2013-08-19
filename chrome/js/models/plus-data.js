"use strict";

var $         = require('jquery')
  , DataStore = require('../store/gh-comment')
  ;

function PlusData(currentUser) {
  this.store = DataStore;

  this.dueDate = null;
  this.estimate = null;
  this.updatedBy = null;
  this.updatedOn = null;

  this.user = currentUser;
}

PlusData.prototype.formatDate = function(date) {
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
};

PlusData.prototype.getSaveData = function() {
  return {
    dueDate: this.dueDate,
    estimate: this.estimate,
    updatedBy: this.updatedBy,
    updatedOn: this.updatedOn
  };
};

// TODO: Callback possible?
PlusData.prototype.save = function(cb) {
  this.updatedBy = this.user;
  this.updatedOn = this.formatDate(new Date());

  this.store.save(this.getSaveData(), cb);
};

PlusData.prototype.load = function() {
  var data = this.store.load();
  $.extend(this, data);
};

PlusData.prototype

module.exports = PlusData;

