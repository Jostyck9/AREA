require('dotenv').config();

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

var trustProxy = false;
if (process.env.DYNO) {
  trustProxy = true;
}

passport.use(new Strategy({
    consumerKey: 'GKRASjadiIHwSBs9KkO7KXhIM',
    consumerSecret: '8dlwneANyz6WJTUR8NOBcYkYVSL9jEVviPfWbHoKcmC8ERnYQ9',
    callbackURL: 'http://127.0.0.1:8082/oauth/callback',
    proxy: trustProxy
  },
  function(token, tokenSecret, profile, cb) {
    console.log(token)
    console.log(tokenSecret)
    return cb(null, profile);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });

app.get('/',
  passport.authenticate('twitter'));

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/oauth/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.get('/logout',
  function(req, res){
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

app.listen(process.env['PORT'] || 8082);
