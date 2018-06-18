let PesmaModel = require('../Modeli/Pesma.js');
let Pesma = PesmaModel.Pesma;
let IzvodjacModel = require('../Modeli/Izvodjac');
let Izvodjac = IzvodjacModel.Izvodjac;

module.exports = {
    getPesme : (req,res) => {
        Pesma.find({}, (err,pesme) =>{
            if(err)
            {
                console.log(err);
                res.status(404).json({message:"Neuspelo"});
            }
            else{
                res.status(200).json(pesme);
            }
        })
    },
    getPesmeIzvodjaca : (req,res) =>{
        Izvodjac.findById(req.params.id).populate('pesme').exec((err,izvodjac) =>{
            if(err){
                res.status(404).json({message:"Neuspelo"});
            }
            else{
                res.status(200).json(izvodjac.pesme);
            }
        })
    },
    getPesmeIzvodjacaZanr :(req,res) => {
        Izvodjac.findById(req.query.idIzvodjaca).populate('pesme').exec((err,izv) =>{
            if(err){
                res.status(404).json({message: "Neuspelo"});
            }
            else{
                let pesme = new Array();
                pesme = izv.pesme.filter(p => {
                    return p.zanr == req.query.zanr;
                });
                res.status(200).json(pesme);
            }
        })
    },
    getTopLista: (req, res) => {
        Pesma.find({}).sort('-glasovi').limit(25).exec((err, pesme) => {
            res.send(pesme)
        })
    },
    postPesma: (req, res) => {
        let data = req.body;
        Pesma.insertMany([data], { new: true }, (err, doc) => {
            if (err) {
                res.status(404).json({ message: "Dodavanje pesme neuspelo" });
            }
            else {
                res.status(201).json({ message: "Dodavanje pesme uspelo" });
            }
        })
    },
    deletePesma:(req, res) => {
        let idpesme = req.params.id;
        Pesma.findByIdAndRemove(req.params.id,(err,doc) => {
            if (err) {
                res.status(404).json({ message: "Brisanje neuspelo" });
            }
            else {
                Izvodjac.updateMany( {} , { $pull: { pesme: idpesme}}, (err,doc) => {
                    if (err) {
                        res.status(404).json({ message: "Brisanje neuspelo" });
                    }
                    else {
                        res.status(200).json({message: "Uspelo brisanje pesme!"});
                    }
                })
            }
        })
    },
    postPesmaIzvodjac:(req,res) => {
        //var pesma = new Pesma(req.body);
        let pesma = {
            autor:  req.body.autor,
            naziv: req.body.naziv,
            zanr: req.body.zanr,
            url: req.body.url,
            ukupni_glasovi: req.body.ukupni_glasovi
        }
        var pesma1 = new Pesma(pesma);
        console.log(pesma);
        Izvodjac.findByIdAndUpdate(req.body.idIzvodjaca, { $push: { pesme: pesma1 } }, { safe: true, upsert: true }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                //do stuff
            }
        })
        Pesma.insertMany(pesma1, (err, result) => {
            if (err) console.log(err);
            else {
                console.log("dodao");
                res.status(200).json({ message: "dodato" });
            }
        })
    },
    putPesmaUListu:(req, res) => {
        Izvodjac.findByIdAndUpdate(req.body.idIzvodjaca, {$push: {pesme: req.body.idPesme}}, (err,doc) => {
            if(err) {
                res.status(404).json({ message: "Dodavanje neuspelo" });
            }
            else {
                res.status(201).json({message: "Dodavanje pesme uspelo!"});
            }
        })
    },
    /////////PROBA////////////////
    // getPesmeGlasanje:(pesme) =>{
    //     // pesme = Pesma.find({});
    //     // return pesme;
    //     Pesma.find({}).exec().then((res)=>{
    //         pesme = res;
    //         return pesme;
    //     })
        
    // }
}