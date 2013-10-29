var mongoose = require('mongoose');
var config = require('../config/config.json');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var VisitSchema = new Schema({
  link: {
    type : ObjectId, ref : 'Link'
  },
  ipAddress: {
    type: String
  },
  referrer: {
    type: String
  },
  created: {type: Date, default: Date.now}
})

exports.Visit =  mongoose.model('Visit', VisitSchema);

