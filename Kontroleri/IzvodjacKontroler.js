///////////////////////
//PO OVOM SABLONU
///////////////////////

let izvodjacModels = require('../Modeli/Izvodjac.js');
let Izvodjac = izvodjacModels.Izvodjac;
let PesmaModels = require('../Modeli/Pesma.js');
let Pesma = PesmaModels.Pesma;
//let Pesma = izvodjacModels.Pesma;
let bcrypt = require('bcrypt');

module.exports = {
    getIzvodjaci : (req, res) => {
       Izvodjac.find({}, (err,izvodjaci) => {
           res.send(izvodjaci);
       });
    },
    getIzvodjac : (req, res) => {
        //odrediti po kom parametru se kreira upit 
       Izvodjac.findOne({"Ime":req.query.ime}, (err,izvodjac) => {
           res.send(izvodjac);
       })
    },
    postIzvodjac : (req, res) => {
        let data = req.body;
        data.Password = bcrypt.hashSync(data.Password,5);
        Izvodjac.insertMany([data], (err) => {
            res.send("dodato");
        })
    },
    postListaPesama : (req,res) => {
        let lista = req.body.Lista_pesama;
        let Username = req.body.Username;
        Izvodjac.findOneAndUpdate({Username:Username},{$push:{Lista_pesama:lista}},{new:true},
            (err,rezultat) => {
                res.send(rezultat);
            })
    },
    getPesme : (req,res) => {
        Izvodjac.findOne({Username:req.query.Username},'Lista_pesama', (err,rezultat) => {
           // console.log(rezultat);
            let pesme = new Array();
            for(let i =0, l=rezultat.Lista_pesama.length;i<l;i++)
            {
                Pesma.findOne({_id:rezultat.Lista_pesama[i]},(err,pesma)=>{
                    //console.log(rezultat.Lista_pesama[i]);
                    pesme.push(pesma);
                    //console.log(pesme);
                    if(i==(l-1)) {
                        res.send(pesme);
                    }
                })
            }
        })
    }
    /*postPesma : (req,res) => {
        //let pesma = {Autor_i_Naziv : req.body.Autor_i_Naziv, Zanr : req.body.Zanr};
        let pesma = new Pesma(req.body);
        let ime = req.body.Ime;
        //odrediti po kom parametru se kreira upit
        Izvodjac.findOneAndUpdate({"Ime":ime},{ $push:{"Lista_pesama":pesma}},{new:true},(err,rezultat) =>{
            res.send(rezultat);
        });
    },
    getPesme :(req,res) => {
        let izv;
        Izvodjac.find({"Ime":req.query.Ime},'Lista_pesama', (err,rezultat) =>{
            res.send(rezultat);
        })*/
}