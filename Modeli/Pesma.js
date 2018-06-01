let mongoose = require('mongoose');

let pesmaSchema = new mongoose.Schema({
    /*Autor_i_Naziv: String,
    Zanr: String*/
    Autor: String,
    Naziv: String, 
    Zanr: String,
    Ukupni_glasovi: Number
});


let Pesma = mongoose.model('Pesma', pesmaSchema, 'pesma');

module.exports = {
    Pesma : Pesma
}