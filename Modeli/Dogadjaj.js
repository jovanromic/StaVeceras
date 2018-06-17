//import { ObjectId } from '../../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

let mongoose = require('mongoose');

let lokalModels = require('../Modeli/Lokal');
let Lokal = lokalModels.Lokal;

let izvodjacModels = require('../Modeli/Izvodjac');
let Izvodjac = izvodjacModels.Izvodjac;

let dogadjajSchema = new mongoose.Schema({
    naziv: String,
    pocetak: Date,
    kraj: Date,
    info: String,
    tip: String,
    sifra: String, //sifra String
    izvodjac: {type: mongoose.Schema.Types.ObjectId, ref: 'Izvodjac'},
    idLokala: {type: mongoose.Schema.Types.ObjectId, ref: 'Lokal'}
}, { collection: 'dogadjaj' });

  let Dogadjaj = mongoose.model('Dogadjaj',dogadjajSchema);

  module.exports = {
    Dogadjaj: Dogadjaj
    //Pesma: Pesma
};
  
