var express = require('express');
// var exampleRouter = require('./middleware/exampleRouter');
var app = express();

// app.use('/example', exampleRouter);
app.use(express.static('public'));
app.use(express.static('node_modules/ionic/release'));

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });

var server = app.listen(9001, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('apocodelypse listening at http://%s:%s', host, port);
});
