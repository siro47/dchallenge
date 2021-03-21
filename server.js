// Imports 
const express = require('express');
const config = require('./config/config');
const app = express();
const PORT = process.env.PORT || 3000;

// Config routes
var routes = require('./routes/routes');
routes.assignRoutes(app);

// Setting host and port
app.set('host', process.env.EXPRESS_HOST || '127.0.0.1');
app.set('port', process.env.EXPRESS_PORT || 8080);
app.set('uri', config.get_uri());

if(process.env.NODE_ENV !== 'test')  {
  app.listen(app.get('port'), () => {
   console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
   console.log('Press CTRL-C to stop\n')  })
}

module.exports = app
