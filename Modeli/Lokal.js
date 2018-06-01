let mongoose = require('mongoose');

let slikaSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String }
});

let dogadjajSchema = new mongoose.Schema({
  Naziv: String,
  Pocetak: Date,
  Kraj: Date,
  Info: String,
  Tip: String,
  Lista_izvodjaca: [String]
});

let lokalSchema = new mongoose.Schema({
    Naziv: String,
    Username: String,
    Password: String,
    Lokacija: String,
    Latitude : Number,
    Longitude: Number,
    Info: String,
    Slika: String,
    Telefon: String,
    Lista_dogadjaja: [dogadjajSchema]
  }, { collection: 'lokal' });

  let Lokal = mongoose.model('Lokal', lokalSchema, 'lokal');
  let Dogadjaj = mongoose.model('Dogadjaj',dogadjajSchema);
  let Slika = mongoose.model('Slika',slikaSchema);

  module.exports = {
    Lokal:Lokal,
    Dogadjaj:Dogadjaj,
    Slika:Slika
  };