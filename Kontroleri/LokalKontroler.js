var Lokal = require('../Modeli/Lokal');

module.exports = {
    getLokali : function(req,res){
        Lokal.find({},function(err,lokali){
            res.send(lokali);
        });
    },
    getLokal : function(req,res){
        Lokal.find({"Naziv": req.query.naziv},function(err,lokali){
            res.send(lokali);
        });
    }
}