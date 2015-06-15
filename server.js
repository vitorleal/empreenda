var express      = require('express'),
    routes       = require('./routes'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    middleware   = require('./middleware'),
    swig         = require('swig'),
    db           = require('./db'),
    app          = express();


/* ---------------
      Config
--------------- */
app.use([
  express.static('public'),
  bodyParser.json(),
  cookieParser(),
  middleware.userId()
]);

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('view cache', false);
swig.setDefaults({ cache: false });

// Connect db
db.connect();


/* ---------------
      Routes
--------------- */
// Index
app.get('/', routes.index);

// Login
app.get('/login', routes.auth.login.get);
app.post('/login', routes.auth.login.post);
app.get('/logout', routes.auth.logout);

// Team
app.get('/team/all', routes.team.getAll);
app.post('/team', routes.team.post);

// User
app.post('/user', routes.user.post);

// Vote
app.get('/vote', routes.vote.get);
app.post('/vote', routes.vote.post);


// Start server
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("App serving in :%s", server.address().port);
});

