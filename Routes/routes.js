let express = require('express');   

///////////////////////////////

//OVDE REQUIRE KONTROLERA

let izvodjacKontroler = require('../Kontroleri/IzvodjacKontroler');
let lokalKontroler = require('../Kontroleri/LokalKontroler');
let pesmaKontroler = require('../Kontroleri/PesmaKontroler');
///////////////////////////////
let router = express.Router();
//////////////////////////////

//OVDE U RUTER PLUGUJEMO RUTE IZ KONTROLERA
router.route('/').get(function(req,res){
    res.send("Hello Vorld");
});
router.route('/izvodjaci').get(izvodjacKontroler.getIzvodjaci);
router.route('/izvodjac').get(izvodjacKontroler.getIzvodjac);
router.route('/izvodjac').post(izvodjacKontroler.postIzvodjac);
router.route('/lokali').get(lokalKontroler.getLokali);
router.route('/lokal').get(lokalKontroler.getLokal);
router.route('/lokal').post(lokalKontroler.postLokal);
router.route('/dogadjaji').get(lokalKontroler.getDogadjaji);
//router.route('/pesma').post(izvodjacKontroler.postPesma);
//router.route('/pesme').get(izvodjacKontroler.getPesme);
router.route('/dogadjaj').post(lokalKontroler.postDogadjaj);
router.route('/pesme/:zanr').get(pesmaKontroler.getPesma); //da vrati po odredjenom zanru
router.route('/pesme').get(izvodjacKontroler.getPesme);
router.route('/pesme').post(izvodjacKontroler.postListaPesama);
//za rutu /pesma get handler je getPesma iz uvezenog movieCtrl


module.exports = router; //ovaj ruter se u index.js requiruje i mountuje