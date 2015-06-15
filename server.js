var express      = require('express'),
    routes       = require('./routes'),
    configs      = require('./configs'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    middleware   = require('./middleware'),
    swig         = require('swig'),
    db           = require('./db'),
    session      = require('express-session'),
    connectMongo = require('connect-mongo')(session),
    app          = express();


/* ---------------
      Config
--------------- */
app.use([
  express.static('public'),
  bodyParser.json(),
  session({
    secret: 'empreendaCookieSecret',
    store: new connectMongo({
      url: configs.MONGOURL,
      ttl: 7 * 24 * 60 * 60
    })
  }),
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

