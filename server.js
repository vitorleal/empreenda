var express      = require('express'),
    routes       = require('./routes'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    middleware   = require('./middleware'),
    swig         = require('swig'),
    app          = express();


/* ---------------
      Config
--------------- */
app.use([
  express.static('public'),
  bodyParser.json(),
  cookieParser(),
  middleware.sessionId()
]);

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('view cache', false);
swig.setDefaults({ cache: false });


/* ---------------
      Routes
--------------- */
// Index
app.get('/', routes.index);

// Teams
app.get('/teams', routes.teams.getAll);

// Vote
app.get('/vote', routes.vote.get);
app.post('/vote', routes.vote.post);


// Start server
var server = app.listen(3000, function () {
  console.log("App serving in :%s", server.address().port);
});

