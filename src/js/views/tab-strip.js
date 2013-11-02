"use strict";

var $             = require('jquery')
  , TabStripModel = require('../models/tab-strip')
  , TabView       = require('./tab')
  ;

function TabStripView() {
  var tabs = new TabStripModel().load();
  this.showTabs(tabs);
}

TabStripView.prototype.showTabs = function(tabs) {
  var firstTab = $('.tabnav-tabs:first').children(':first');
  firstTab.on('click', function() {
    $('.js-discussion').hide();
    $('.js-discussion:first').show();
  });

  tabs.reverse().forEach(function(tab) {
    firstTab.after(new TabView(tab, firstTab));
  });
};

module.exports = TabStripView;
