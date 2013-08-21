var $            = require('jquery')
  , PlusData     = require('./models/plus-data')
  , PlusDataView = require('./views/plus-data')
  , repos        = require('config').repos
  ;

function init() {
  if (isSupportedRepo()) {
    var model = new PlusData(getUserName());
    model.load();

    var view = new PlusDataView(model);
    view.prependTo('div.js-discussion');
  }
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
