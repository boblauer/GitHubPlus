"use strict";

var $ = require('jquery')
  ;

function TabView(tabData, templateTab) {
  this.title = tabData.title;
  this.url = tabData.url;
  this.type = tabData.type;

  var tab = templateTab.clone();

  tab.find('a').removeClass('selected').attr('href', '#').contents().filter(function() {
    return this.nodeType === 3;
  }).toArray().pop().nodeValue = ' ' + this.title + ' ';

  tab.find('.octicon').attr('class', 'octicon').addClass(this._getOcticon(this.type));
  tab.on('click', this._showTab.bind(this));

  return tab;
}

TabView.prototype._getOcticon = function(type) {
  switch (type) {
    case 'issue':
      return 'octicon-issue-opened';
    case 'pull':
      return 'octicon-git-pull-request';
  }

  return '';
};

TabView.prototype._showTab = function() {
  var self = this;
  this._getTabContents(function(el) {
    $('.js-discussion').hide();
    self.el.show();
  });
};

TabView.prototype._getTabContents = function(cb) {
  var self = this;
  if (!this.el) {
    $.get(this.url, function(html) {
      html = html.match(/\<body[\s\S]*\<\/body\>/)[0];
      self.el = $(html).find('.js-discussion:first').addClass('js-discussion gh-plus-inline-discussion');

      $('.js-discussion:first').after(self.el);
      cb(this.el);
    });
  } else {
    cb(this.el);
  }
};


module.exports = TabView;

