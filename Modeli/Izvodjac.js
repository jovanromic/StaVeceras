//import { ObjectId } from '../../../../../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

let mongoose = require('mongoose');

/*let pesmaSchema = new mongoose.Schema({
    Autor_i_Naziv: String,
    Zanr: String
});*/

let izvodjacSchema = new mongoose.Schema({
    _id: String,
    Ime: String,
    Username: String,
    Password: String,
    Slika: String,
    Email: String,
    Ocena: Number,
    Telefon: String,
    Tip: String,
    Lista_pesama: [String]
}, { collection: 'izvodjac' });

let Izvodjac = mongoose.model('Izvodjac', izvodjacSchema, 'izvodjac');
//let Pesma = mongoose.model('Pesma', pesmaSchema);

module.exports = {
    Izvodjac: Izvodjac
    //Pesma: Pesma
};