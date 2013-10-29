var   links = require('../actions/api.js')
    , dashboard = require('../actions/dashboard.js');

function init(app){

  app.get('/:linkId',  links.get);
  app.post('/link', links.post);

  app.get('/', dashboard.index)

}

exports.init = init;
