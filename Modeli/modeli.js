///////////////////////
//MODELI IZVODJACA I LOKALA
///////////////////////
var mongoose = require('mongoose');
//obavlja se jedan lagani export modela kreiranih na osnovu Schema, kasnije se ovaj fajl requireuje gde treba
module.exports = function () {

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


  var modeli = {
    Izvodjac : mongoose.model('Izvodjac', izvodjacSchema, 'izvodjac'),
    Lokal : mongoose.model('Lokal', lokalSchema, 'lokal')
  };
  
  return modeli;
}