let PesmaModel = require('../Modeli/Pesma.js');
let Pesma = PesmaModel.Pesma;
module.exports = {
    getPesma : (req,res) => {
        Pesma.find({Zanr:req.params.zanr}, (err,pesme) => {
            res.send(pesme);
        })
    },
    getPesmaZanr : (req,res) => {
        Pesma.find({Zanr:req.query.zanr}, (err,pesme) => {
            res.send(pesme);
        })
    },
    getPesmaAutor : (req,res) => {
        Pesma.find({Autor:req.query.autor}, (err,pesme) => {
            res.send(pesme);
        })
    },
    postListaPesama : (req,res) => {
        Pesma.findOneAndUpdate()
    }
 }