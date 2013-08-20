var $            = require('jquery')
  , PlusData     = require('./models/plus-data')
  , PlusDataView = require('./views/plus-data')
  ;

require('jqueryui');

function getUserName() {
  return $.trim($('#user-links').find('a.name').text());
}

function init() {
  var model = new PlusData(getUserName());
  model.load();

  var view = new PlusDataView(model);
  view.prependTo('div.js-discussion');
}

init();