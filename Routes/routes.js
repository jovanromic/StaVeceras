var express = require('express');   

///////////////////////////////

//OVDE REQUIRE KONTROLERA

var izvodjacKontroler = require('../Kontroleri/IzvodjacKontroler');
var lokalKontroler = require('../Kontroleri/LokalKontroler');
///////////////////////////////
var router = express.Router();
//////////////////////////////

//OVDE U RUTER PLUGUJEMO RUTE IZ KONTROLERA
router.route('/').get(function(req,res){
    res.send("Hello Vorld");
});
router.route('/izvodjaci').get(izvodjacKontroler.getIzvodjaci);
router.route('/izvodjac').get(izvodjacKontroler.getIzvodjac);
router.route('/lokali').get(lokalKontroler.getLokali);
router.route('/lokal').get(lokalKontroler.getLokal);
//za rutu /pesma get handler je getPesma iz uvezenog movieCtrl


module.exports = router; //ovaj ruter se u index.js requiruje i mountuje