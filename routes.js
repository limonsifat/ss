const express = require('express');
var path = require('path');
const app = express();

/*USER AUTHENTICATION API ROUTE*/
var usersRoutes = require('./server/routes/user-routes')();
app.use('/api/user', usersRoutes);

/*MOVIES API ROUTE*/
var moviesRoutes = require('./server/routes/movies-routes')();
app.use('/api/movies', moviesRoutes);

/*CATEGORIES API ROUTE*/
var categoryRoutes = require('./server/routes/category-routes')();
app.use('/api/category', categoryRoutes);


// Export our changes
module.exports = app; 