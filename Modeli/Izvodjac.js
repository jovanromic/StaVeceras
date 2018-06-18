
let mongoose = require('mongoose');

let pesmaModels = require('../Modeli/Pesma');
let Pesma = pesmaModels.Pesma;
/*let pesmaSchema = new mongoose.Schema({
    Autor_i_Naziv: String,
    Zanr: String
});*/

let izvodjacSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    ime: String,
    username: String,
    password: String,
    slika: String,
    email: String,
    ocena: Number,
    brGlasanja: Number,
    fbStranica: String,
    telefon: String,
    tip: String,
    pesme: [{type:mongoose.Schema.Types.ObjectId,ref:'Pesma'}] //ne treba jocku, vracamo mu bez
}, { collection: 'izvodjac' });

let Izvodjac = mongoose.model('Izvodjac', izvodjacSchema, 'izvodjac');
//let Pesma = mongoose.model('Pesma', pesmaSchema);

module.exports = {
    Izvodjac: Izvodjac
    //Pesma: Pesma
};