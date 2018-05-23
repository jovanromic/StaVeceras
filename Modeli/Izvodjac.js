var mongoose = require('mongoose');

var izvodjacSchema = new mongoose.Schema({
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
  }, { collection: 'izvodjac' });

  var Izvodjac = mongoose.model('Izvodjac', izvodjacSchema, 'izvodjac');

  module.exports = Izvodjac;