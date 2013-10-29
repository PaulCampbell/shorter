var Links = require('../models/link.js');
var Visit = require('../models/visit.js')

exports.get = function(req,res) {
  Links.Link.findOne({urlId: req.params['linkId'] }, function(err, link) {
    if(err) { return handleError(err, res)}
    if(!link){ return handleError(err,res, 404)}

    link.clickCount += 1;
    link.save(function(){
      res.setHeader('Location', link.url);
      res.statusCode = 302
      res.end();
    })
  })
}


exports.post = function(req,res) {
  var link = new Links.Link(req.body);
  link.save(function(err){
    if(err){
      return handleError(err,res);
    }
    res.setHeader('Location', link.shortLink);
    res.statusCode = 201
    res.end();
  });
}


function handleError(err,res,status) {
  if(err) console.log('Error ' + err)
  if(status){
    res.statusCode = status
    res.end();
  } else {
    console.log(err)
    res.statusCode = 400
    res.end(JSON.stringify(err));
  }

}