let mongoose = require('mongoose');

let pesmaSchema = new mongoose.Schema({
    /*Autor_i_Naziv: String,
    Zanr: String*/
    autor: String,
    naziv: String, 
    zanr: String,
    url: String,
    ukupni_glasovi: Number
});


let Pesma = mongoose.model('Pesma', pesmaSchema, 'pesma');

module.exports = {
    Pesma : Pesma
}