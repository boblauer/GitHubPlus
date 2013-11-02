var $            = require('jquery')
  , PlusData     = require('./models/plus-data')
  , PlusDataView = require('./views/plus-data')
  , TabStripView = require('./views/tab-strip')
  , repos        = require('config').repos
  ;

function init() {
  if (isSupportedRepo()) {

    if (isIssue()) {
      loadPlusDataView();
    }
    else if (isPullRequest()) {
      loadTabStripView();
    }
  }
}

function isIssue() {
  return (/\/issues\//).test(location.href);
}

function isPullRequest() {
  return (/\/pull\//).test(location.href);
}


function loadPlusDataView() {
  var model = new PlusData(getUserName());
  model.load();

  var plusDataView = new PlusDataView(model);
  plusDataView.prependTo('div.js-discussion');
}

function loadTabStripView() {
  var tabStripView = new TabStripView();
}

function isSupportedRepo() {
  var supported = false;
  repos.forEach(function(repo) {
    if (location.pathname.toLowerCase().match(repo.toLowerCase())) {
      supported = true;
    }
  });

  return supported;
}

function getUserName() {
  return $.trim($('#user-links').find('a.name').text());
}

init();
