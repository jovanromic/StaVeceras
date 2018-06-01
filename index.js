/////////////////////////////////
//REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./Routes/routes.js');
var bodyParser = require('body-parser');
var session = require('express-session');

/////////////////////////////////
var app = express();
var server = require('http').Server(app);
/*Proba*/var io = require('socket.io')();

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
});
/////////////////////////////////
//KONEKCIJA KA BAZI
var conString = "mongodb+srv://yocko1:yocko1@staveceras-3zynw.mongodb.net/stavecerasbp";
mongoose.connect(conString);
/////////////////////////////////
//KONFIGURACIJA BODY PARSERA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
  session({
    secret: "iy98hcbh489n38984y4h498", 
    resave: true,
    saveUninitialized: false
  })
);
////////////////////////////////
//LOGIKA 
app.use('/',routes);
server.listen(process.env.PORT||3000);
//app.listen(process.env.PORT || 3000);
////////////////////////////////