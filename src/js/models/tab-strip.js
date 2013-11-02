"use strict";

var $ = require('jquery')
  ;

function TabStripModel() {

}

TabStripModel.prototype._getType = function(url) {
  var type = null;

  if (url.indexOf('/issues/') !== -1) {
    type = 'issue';
  } else if (url.indexOf('/pull/') !== -1) {
    type = 'pull';
  }

  return type;
};

TabStripModel.prototype.load = function() {
  var tabs = [];
  var used = {};

  var self = this;
  $('.js-comment-body a.issue-link').each(function() {
    var text = $.trim(this.innerText).replace('#', '');
    var url = this.getAttribute('href');
    var type = self._getType(url);

    if (!used[text]) {
      tabs.push({ title: text, url: url, type: type });
      used[text] = true;
    }
  });

  return tabs;
};

module.exports = TabStripModel;
