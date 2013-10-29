var Links = require('../models/link.js')

exports.index = function(req,res) {
  var index = req.query.index || 0;
  var resultsPerPage = req.query.resultsPerPage || 20;
  Links.Link.find({}).sort('-created').limit(resultsPerPage).skip(index).exec( function(err, links){
    var previousLink = '';
    if((parseInt(index) - parseInt(resultsPerPage)) >= 0) {
      previousLink =  '/?index=' + (parseInt(index) - parseInt(resultsPerPage)) + '&resultsPerPage=' + resultsPerPage
    }
    res.render('index', {
      previousLink: previousLink,
      nextLink:  '/?index=' + (parseInt(index) + parseInt(resultsPerPage)) + '&resultsPerPage=' + resultsPerPage,
      links: links
    });
  });
}