var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var logger = require('morgan');
var request = require('request');
var cheerio = require('cheerio')


// Initialize Express for debugging & body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production'){
  mongoose.connect('mongodb://heroku_58c6l923:2gecc0p46jq110h6lke7elc7vb@ds115214.mlab.com:15214/heroku_58c6l923');
}
else{
  mongoose.connect('mongodb://localhost/WebScraper');
  
}
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the Comment and Article models
var Comment = require('./models/Note.js');
var Article = require('./models/Article.js');

// Import Routes/Controller
var router = require('./controllers/controller.js');
app.use('/', router);


// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});