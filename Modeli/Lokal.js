let mongoose = require('mongoose');

// let slikaSchema = new mongoose.Schema({
//     img: { data: Buffer, contentType: String }
// });

/*let dogadjajSchema = new mongoose.Schema({
  Naziv: String,
  Pocetak: Date,
  Kraj: Date,
  Info: String,
  Tip: String,
  Lista_izvodjaca: [String]
});*/

let dogadjajModels = require('../Modeli/Dogadjaj');
let Dogadjaj = dogadjajModels.Dogadjaj;

let lokalSchema = new mongoose.Schema({
    naziv: String,
    username: String,
    password: String,
    lokacija: String,
    latitude : Number,
    longitude: Number,
    info: String,
    slika: String,
    ocena: Number,
    brGlasanja: Number,
    fbStranica : String,
    telefon: String,
    dogadjaji: [{type:mongoose.Schema.Types.ObjectId, ref:'Dogadjaj'}]
  }, { collection: 'lokal' });

  let Lokal = mongoose.model('Lokal', lokalSchema, 'lokal');
  //let Dogadjaj = mongoose.model('Dogadjaj',dogadjajSchema);
  //let Slika = mongoose.model('Slika',slikaSchema);

  module.exports = {
    Lokal:Lokal,
    //Dogadjaj:Dogadjaj,
    //Slika:Slika
  };