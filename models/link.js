var mongoose = require('mongoose');
var shortId = require('shortid');
var config = require('../config/config.json');
var mongooseValidator = require('mongoose-validator');
var dateformat = require('dateformat')

var Schema = mongoose.Schema;
var validator = mongooseValidator.validator;

var domainValidator = [validator.isUrl('Must be valid url')];

var LinkSchema = new Schema({
  url: {
    type: String,
    required:true,
    unique: true,
    validate: domainValidator
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
  if(this.isNew){
    this.urlId = shortId.generate()
  }
  return next();
});

LinkSchema.virtual('prettyDate')
    .get(function() {
      return dateformat(this.created, "mmmm dS, yyyy");
    });

exports.Link =  mongoose.model('Link', LinkSchema);