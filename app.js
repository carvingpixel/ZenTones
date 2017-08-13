var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var search = require('./routes/search');
var results = require('./routes/results');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup use pages
app.use('/', index);
app.use('/search', search);
app.use('/results',results);


//MONGOOSE AND MONGODB SETUP FROM VIDEO -- code by lokin crook
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/zentones', function(err, db) {
    if(err) { return console.dir(err); }
});

// schema for validation server side //-- coded by lokin crook
var Schema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: Number
});

// bind user to the schema for validation -- coded by lokin crook
var user = mongoose.model('registration',Schema);


// post data from form redirect to search -- coded by lokin crook
app.post('/submit',function(req,res){
    new user({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number
    }).save(function(err, doc){
            if(err) res.json(err);
            else
                res.redirect('/search');
            //res.send('Successful input');
        });
});


//try to setup search but that video provided was using JADE like many others!
//app.get('/results',function(req,res){
app.post('/results',function(req,res){
    user.find({},function(err,docs){
        if(err) res.json(err);
        else
       res.send('Sorry, referenced video used jade, stuck again line 68 I definitely tried this all night too :( ');
//     res.render('search',{registrations: docs});
    });
});








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
