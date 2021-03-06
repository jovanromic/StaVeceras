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
let pesmeModels = require('./Modeli/Pesma');
let dogadjajModels = require('./Modeli/Dogadjaj');
let Pesma = pesmeModels.Pesma;
let Dogadjaj = dogadjajModels.Dogadjaj;
let dogadjaji = [];

io.on('connection', (socket) => {
  console.log("Klijent konektovan preko socketa: " + socket.id);


  // socket.on('startdogadjaj', (data) =>{

  //   // dogadjaji[data.dogid] = new Array();
  //   // dogadjaji[data.dogid].push(data.pesma);
  //   console.log(dogadjaji);
  // })
  socket.on('start-dogadjaj', (data) => {
    if (data.idDogadjaja != null && data.idDogadjaja != undefined &&
      data.lista != null && data.lista != undefined) {

      console.log("start dogadjaj");
      console.log("dogadjaj id: " + data.idDogadjaja);
      console.log(data.lista);
      let id = data.idDogadjaja;
      let lista2 = JSON.parse(data.lista);
      if (dogadjaji[id] == null || dogadjaji[id] == undefined) {
        dogadjaji[id] = new Array();
        lista2.forEach(x => {
          dogadjaji[id][x._id] = 0;
        });
        console.log("dogadjaji= ");
        console.log(dogadjaji)
        console.log("dogadjaj[" + id + "]=");
        console.log(dogadjaji[id]);
      }
    }

    // let str='konekcija_'+data.dogadjajId+'';
    // socket.emit(str,{data:'idemo'});
  });
  socket.on('get-ranking-list', (data) => {
    let id = data.dogadjajId;
    let url = 'ranking-list_' + id + '';
    if (dogadjaji[id] != null || dogadjaji[id] != undefined) {

      let url = 'ranking-list_' + id + '';
      // console.log("saljem na: "+url);
      // console.log(dogadjaji[id]);
      console.log(dogadjaji[id]);
      let dog = Object.assign({}, dogadjaji[id]);
      socket.emit(url, JSON.stringify(dog));

    }
    else {
      socket.emit(url, { message: "greska" });
    }
  })
  socket.on('glasanje', (data) => {
    let id = data.dogadjajId;//idDogadjaja?
    let pesma = data.idPesme;
    let event = 'glasanje_' + id + '';
    if (id != null && id != undefined != pesma != null && pesma != undefined) {

      if (dogadjaji[id] !== [] || dogadjaji[id] !== []) {//mozda treba null i undefinedno

        console.log("glasanje na dogadjaju " + id + " za pesmu " + pesma);
        dogadjaji[id][pesma]++;
        console.log("dogadjaji[" + id + "][" + pesma + "] = \n" + dogadjaji[id][pesma] + '');
        Pesma.updateOne({ _id: pesma }, { $inc: { ukupni_glasovi: 1 } }, (err, raw) => {
          if (err) {
            console.log(err);
          }
          else {
            io.emit(event, { idPesme: pesma });
          }
        })

      }
      else {
        socket.emit(event, { message: "greska" });
      }
    }
  })
  socket.on('kraj-dogadjaj', (data) => {
    let id = data.dogadjajId;
    if (id != null || id != undefined) {
      delete dogadjaji[id];
      console.log(dogadjaji);
      let event = 'kraj-dogadjaj_' + id + '';
      Dogadjaj.deleteOne({ _id: id }, (err, res) => {
        if (err) {
          console.log(err);
        }
        else {
          io.emit(event, { data: "Zavrsen dogadjaj" });
        }
      })

    }
  })
  socket.on('reset', (data) => {
	console.log("reset socket");
    let id = data.dogadjajId;
    let pesma = data.idPesme;
    let event = 'glasanje_' + id + '';
    if (id != null && id != undefined != pesma != null && pesma != undefined) {
      dogadjaji[id][pesma] = 0;
      console.log(dogadjaji[id]);
      io.emit(event, { idPesme: pesma , resetPesme:"reset"});
    }
    else {
      socket.emit(event, { message: "greska" });
    }
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
app.use('/uploads', express.static('uploads'));
// app.use(
//   session({
//     secret: "iy98hcbh489n38984y4h498",
//     resave: true,
//     saveUninitialized: false
//   })
// );

////////////////////////////////
// j.j. dodao
app.all('/*', function (req, res, next) {
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
app.use('/api', routes);
server.listen(process.env.PORT || 3000);
//app.listen(process.env.PORT || 3000);
////////////////////////////////