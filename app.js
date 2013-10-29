var   express = require('express')
    , mongoose = require('mongoose')
    , routes = require('./infrastructure/routes.js')
    , config = require('./config/config.json');

var app = express();

mongoose.connect(config.mongoConnectionString);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(require('stylus').middleware(__dirname + '/public'));


routes.init(app);

app.listen(process.env.PORT || config.port);

console.log('Accorciare listening on ' + config.port)

