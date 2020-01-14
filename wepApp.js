/**
 * Created by vijay on 26/04/15.
 */

const debug = require('debug')('cms');
const app = require('./app');
const config = require('config');

const server = require('http').createServer(app);

app.set('port', process.env.NODE_PORT || config.annabelle.port || 7001);


server.listen(app.get('port'));
console.logger.debug(`Express server with socket.io listening on port ${app.get('port')}`);

// var server = app.listen(app.get('port'), function() {
//     debug('Express server listening on port ' + server.address().port);
//     console.logger.debug('Express server listening on port ' + server.address().port);
// });
if(process.send) {
  process.send('ready');
}
