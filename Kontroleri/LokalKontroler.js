let lokalModels = require('../Modeli/Lokal');
let Lokal = lokalModels.Lokal;
let Dogadjaj = lokalModels.Dogadjaj;
let bcrypt = require('bcrypt');
//var Promise = require('promise');


module.exports = {
    getLokali : (req,res) => {
        Lokal.find({}, (err,lokali) => {
            res.send(lokali);
        });
    },
    getLokal : (req,res) => {
        Lokal.find({"Naziv": req.query.naziv}, (err,lokali) => {
            res.send(lokali);
        });
    },
    postLokal : (req,res) => {
        let data = req.body;
        data.Password = bcrypt.hashSync(data.Password,5);
        Lokal.insertMany([data], (err) => {
            res.send("dodato");
        })
    },
    getDogadjaji : (req,res) => {
        Lokal.find({}, (err,lokali) => {
            let vracanje = new Array();
            for (let i = 0, l = lokali.length; i < l; i++ ) {
                for(let j = 0, k = lokali[i].Lista_dogadjaja.length; j < k; j++) {
                    vracanje.push(lokali[i].Lista_dogadjaja[j]);
                }
            }
            res.send(vracanje);
        })
    },
    postDogadjaj : (req,res) => {
        let username = req.body.Username;
        let dogadjaj = new Dogadjaj(req.body.Dogadjaj);

        Lokal.findOneAndUpdate({"Username":username},{$push:{"Lista_dogadjaja":dogadjaj}}, {new:true},
        (err,rezultat) =>{
            res.send(rezultat);
        } )
    }
}