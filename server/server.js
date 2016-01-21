var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});