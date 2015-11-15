// Express
var express = require('express');
var app = express();


// Middleware
var bodyParser = require('body-parser');
var resourceMiddleware = require('./resource-middleware');

// Use JSON body parser since we accept application/json
app.use(bodyParser.json());

// Injects resources such as the database into the request
app.use(resourceMiddleware);

// Set user if logged in
app.use(function(req, res, next)
{
    if(typeof req.query.access_token !== 'undefined' && req.query.access_token.length)
    {
        var matchedUser = req.resources.users.filter(function(ob)
        {
            return ob.access_token === req.query.access_token;
        });

        if(matchedUser.length == 1)
        {
            req.user = matchedUser[0];
        }
    }

    next();
});


// Routers
var mainRouter = require('./main-router');
var guestRouter = require('./guest-router');
var memberRouter = require('./member-router');
var vinylRouter = require('./vinyl-router');

// Routes
app.use('/', mainRouter);
app.use('/', vinylRouter);
app.use('/guest', guestRouter);
app.use('/users/me', memberRouter);

// Error Handler
var errorHandler = require('./error-handler');

app.use(errorHandler);

module.exports = app;

