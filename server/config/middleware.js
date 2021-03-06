var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function(app, express) {
  // define routers
  var userRouter = express.Router();
  var giftRouter = express.Router();
  var giftListRouter = express.Router(); // giftList is a collection of gift items
  var friendRouter = express.Router();

  // Request body parsing middleware should be above methodOverride
  // express middleware

  app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors());

  // We point to our static assets
  app.use(express.static(__dirname + '/../../src'));

  // define API paths
  app.use('/api/users', userRouter);
  app.use('/api/gifts', giftRouter);
  app.use('/api/giftlists', giftListRouter);
  app.use('/api/friends', friendRouter);
  app.get('/*', function(req, res) {
    res.sendFile('index.html', {
      // TODO: check this path 
      root: '../../src'
    });
  });

  // auth middleware will be here if we allow users to login w/o facebook

  // require route files
  require('../users/userRoutes.js')(userRouter);
  require('../gifts/giftRoutes.js')(giftRouter);
  require('../giftlists/giftListRoutes.js')(giftListRouter);
  require('../friends/friendRoutes.js')(friendRouter);

};
