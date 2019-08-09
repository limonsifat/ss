//config file
var config = require( __dirname + '/config' );

// Mongoose
// const mongoose = require('mongodb').MongoClient


const mongoose = require('mongoose');
mongoose.connect(config.db.hostURI, {
  auth: {
    user: config.db.username,
    password: config.db.password
  },
  useNewUrlParser: true
}).catch(err => console.error(`ERROR: ${err}`));
// End Mongoose

const express = require('express');
const path = require('path');
const app = express();

// Adding cookies and sessions support to our app
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
app.use(cookieParser());
app.use(session({
  secret: (process.env.secret || 'bookrakacha'),
  cookie: {
    maxAge: 10800000
  },
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash('success') || null;
  res.locals.flash.error = req.flash('error') || null;

  next();
});
const cors = require('cors');
app.use(cors());
app.options('*', cors());

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// End Parser

// Our views path
// app.set('views', path.join(__dirname, 'views'));
// app.use('/css/styles.css', express.static('views/styles.css'));
// app.use('/images', express.static('views/images/'));

// Authentication helpers
const isAuthenticated = (req) => {
  return req.session && req.session.userId;
};

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) {
      req.flash('error', 'You are not permitted to do this action.');
      res.redirect('/');
    }
  }

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});

app.get('/',(req,res)=>{
  res.send("hello world");
});

// Our routes
const routes = require('./routes.js');
app.use('/', routes);

app.listen(config.http.port, () => console.log(`Listening on ${config.http.port}`));