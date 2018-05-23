var mongoose = require('mongoose');

var lokalSchema = new mongoose.Schema({
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
      Lista_Izvodjaca: [String]
    }]
  }, { collection: 'lokal' });

  var Lokal = mongoose.model('Lokal', lokalSchema, 'lokal');

  module.exports = Lokal;