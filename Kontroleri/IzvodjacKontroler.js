///////////////////////
//PO OVOM SABLONU
///////////////////////

var Izvodjac = require('../Modeli/Izvodjac.js');

module.exports = {
    getIzvodjaci : function(req, res){
       Izvodjac.find({},function(err,izvodjaci){
           res.send(izvodjaci);
       });
    },
    getIzvodjac : function(req, res){
       Izvodjac.find({"Ime":req.query.ime},function(err,izvodjac){
           res.send(izvodjac);
       })
    },
    postIzvodjaci : function(req, res){
       //do something
    }
}