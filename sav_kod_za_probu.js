var express = require('express');
var app = express();

var mongoose = require('mongoose');
var conString = "mongodb+srv://yocko1:yocko1@staveceras-3zynw.mongodb.net/stavecerasbp";

//mongodb+srv://yocko1:<PASSWORD>@staveceras-3zynw.mongodb.net/test

/* var dogadjajSchema = mongoose.Schema({
  Naziv: String,
  Pocetak: Date,
  Kraj: Date,
  Info: String,
  Tip: String,
  Lista_Izvodjaca:Array
}) */

var izvodjacSchema = mongoose.Schema({
  _id: String,
  Ime: String,
  Slika: String,
  Email: String,
  Ocena: Number,
  Telefon: String,
  Tip: String,
  Lista_pesama: [{
    Autor_i_Naziv: String,
    Zanr: String
  }]
},{collection:'izvodjac'});

/* var lokalSchema = mongoose.Schema({
  Naziv: String,
  Lokacija: String,
  Info: String,
  Slika: String,
  Telefon: String,
  Lista_dogadjaja: [{
    Naziv: String,
    Pocetak: Date,
    Kraj: Date,
    Info: String,
    Tip: String,
    Lista_Izvodjaca:[String]
  }]
},{collection: "lokal"}); */

//var Lokal = mongoose.model("Lokal", lokalSchema, "lokal");
var Izvodjac = mongoose.model('Izvodjac', izvodjacSchema, 'izvodjac');

app.get('/',function(req,res){
  res.send("Hello world!");
});

app.get('/pesme', function(req, res){
  console.log(req.query);
/*   let i = new Izvodjac({
     Ime: "DJ Izvo ac",
     Slika: "---",
     Email:"izvodjac@gmail.com",
     Ocena: 0,
     Telefon: "0631231123",
     Tip: "DJ",
     Lista_pesama:[{
       Autor_i_Naziv: "ZAYN ft. Sia - Dusk till dawn",
       Zanr: "Pop sranje"
     },
     {
       Autor_i_Naziv: "The Doors ft. Snoop Dogg = Riders on the storm",
       Zanr: "Rock"
     }]
    }); */
   let con; 
  var db = mongoose.connect(uri, function(err, client) {
    //const baza = client.db('stavecerasbp');
    //console.log(baza);
    // perform actions on the collection object
    con = client;
    }); 
    let izv;
    Izvodjac.find({"Tip": req.query.tip},{_id:0, Lista_pesama:1},function(err, result){
      console.log(result);
      //res.send(result);
      izv= result;
      res.send(izv);
      con.close();
   
    });
    //res.send(izv);
   
 });
  
  /*   var p = Pesma.findOne({Autor_i_Naziv: "Zare i Goci - Ja kroz selo"},
function(err,doc){
  console.log(doc);
  res.send(doc); 
}); */
 
// app.get('/lokal',function(req,res){
//     modeli().Lokal.findOne({"Naziv":"Liv"},function(err,doc){
//       res.send(doc);
//     }); 
//   });


app.listen(process.env.PORT || 3000); //process env PORT jer heroku dinamicki dodeljuje port, a 3000 kad se pokrece sa localhosta



/////////////
//ovakav POST sa insertMany radi

postIzvodjac : (req, res) => {
  Izvodjac.insertMany([req.body], (err) => {
      res.send("dodavanjee");
  });
}

/*postPesma : (req,res) => {
        //let pesma = {Autor_i_Naziv : req.body.Autor_i_Naziv, Zanr : req.body.Zanr};
        let pesma = new Pesma(req.body);
        let ime = req.body.Ime;
        //odrediti po kom parametru se kreira upit
        Izvodjac.findOneAndUpdate({"Ime":ime},{ $push:{"Lista_pesama":pesma}},{new:true},(err,rezultat) =>{
            res.send(rezultat);
        });
    },
    getPesme :(req,res) => {
        let izv;
        Izvodjac.find({"Ime":req.query.Ime},'Lista_pesama', (err,rezultat) =>{
            res.send(rezultat);
        })*/