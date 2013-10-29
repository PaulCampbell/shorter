var mongoose = require('mongoose');
var shortId = require('shortid');
var config = require('../config/config.json');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: {
    type: String,
    required:true,
    unique: true
  },
  urlId: {
    type: String
  },
  domain: {
    type: String,
    required:true,
    default: config.domain
  },
  clickCount: {
    type:Number,
    required: true,
    default:0
  },
  created: {type: Date, default: Date.now}
})


LinkSchema.virtual('shortLink').get(function() {
  return this.domain + '/' + this.urlId;
});

LinkSchema.pre('save', function(next) {
  this.urlId = shortId.generate()
  return next();
});

exports.Link =  mongoose.model('Link', LinkSchema);