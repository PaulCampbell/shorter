should = require 'should'
request = require 'request'
Links = require '../models/link.js'
Visits = require '../models/visit.js'
mongoose = require 'mongoose'
config = require '../config/config.json'


request = request.defaults({jar: true, followRedirect: false})

describe 'review api', ->
  testUrl = 'http://www.someLink.com/asdasd'
  before (done) ->
    mongoose.connect(config.mongoConnectionString)
    done()

  after (done) ->
    Links.Link.remove {url:testUrl}, ->
      done()

  describe 'create a shortlink', ->
    it 'returns 201 with the link', (done) ->
      opts = {url: 'http://localhost:7999/link', method: 'post', form: { url: testUrl }}
      request opts, (err, res) ->
        res.statusCode.should.equal 201
        should.exist res.headers.location
        done()

    it 'returns 400 for invalid link', (done) ->
      opts = {url: 'http://localhost:7999/link', method: 'post', form: { url: 'not a link' }}
      request opts, (err, res) ->
        res.statusCode.should.equal 400
        done()




  describe 'get short valid link', ->
    link = null
    testLinkUrl  = 'http://www.shopa.com/product/1233wqesad32-amazingproductinnit'

    before (done) ->
      link = new Links.Link {url: testLinkUrl}
      link.save ->
        done()

    after (done) ->
      Links.Link.remove {url:testLinkUrl} , ->
        done()

    it 'returns a 302 with full url in the Location header', (done) ->
      opts = {url: link.shortLink, method: 'get'}
      request opts, (err, res) ->
        res.statusCode.should.equal 302
        console.log res.headers
        done()

    it 'increments the click count', (done) ->
      opts = {url: link.shortLink, method: 'get'}
      request opts, (err, res) ->
        Links.Link.findOne {url:testLinkUrl}, (err, link) ->
          link.clickCount.should.greaterThan 0
          done()

    describe.skip 'wip', ->
      it 'logs a visit', (done) ->
        opts = {url: link.shortLink, method: 'get'}
        request opts, (err, res) ->
          Visits.Visit.find {link:link._id}, (err, links) ->
            links.length.should.greaterThan 0
            done()



