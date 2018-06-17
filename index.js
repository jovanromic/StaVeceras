/////////////////////////////////
//REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./Routes/routes.js');
var bodyParser = require('body-parser');
//var session = require('express-session');
var socketio = require('socket.io');
/////////////////////////////////
var app = express();
var server = require('http').Server(app);
//////////////////////////////////
//SOCKETI PODESAVANJA
var io = socketio(server);
io.path('/');

let lista = [];
lista["pesma1"] = 0;


io.on('connection', (socket) => {
  console.log("Klijent konektovan preko socketa: "+socket.id);

  socket.on('glasanje', (data) => {
    lista[data]++;
    console.log(lista[data]);
    io.emit('glasanje',lista[data]);
  })
  //socket.emit('news', { hello: 'world' });



});
//app.use('/socket',socket);
/////////////////////////////////
//KONEKCIJA KA BAZI
var conString = "mongodb+srv://yocko1:yocko1@staveceras-3zynw.mongodb.net/stavecerasbp";
mongoose.connect(conString);
/////////////////////////////////
//KONFIGURACIJA BODY PARSERA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads',express.static('uploads'));
// app.use(
//   session({
//     secret: "iy98hcbh489n38984y4h498",
//     resave: true,
//     saveUninitialized: false
//   })
// );

////////////////////////////////
// j.j. dodao
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

////////////////////////////////
// HEADERS
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
////////////////////////////////
//LOGIKA 
app.use('/', routes);
server.listen(process.env.PORT || 3000);
//app.listen(process.env.PORT || 3000);
////////////////////////////////