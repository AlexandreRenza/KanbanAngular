// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3100;
//var bodyParser = require('body-parser');
///app.use(bodyParser.json()); // support json encoded bodies
///app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static('./'));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);