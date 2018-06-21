///////////////////////
//PO OVOM SABLONU
///////////////////////

let izvodjacModels = require('../Modeli/Izvodjac.js');
let Izvodjac = izvodjacModels.Izvodjac;

let PesmaModels = require('../Modeli/Pesma.js');
let Pesma = PesmaModels.Pesma;

let dogadjajModels = require('../Modeli/Dogadjaj');
let Dogadjaj = dogadjajModels.Dogadjaj;

let roleModels = require('../Modeli/Role');
let Role = roleModels.Role;


let bcrypt = require('bcrypt');

module.exports = {
    getIzvodjaci: (req, res) => {
        Izvodjac.find({}, (err, izvodjaci) => {
            if (err) {
                console.log(err);
                res.status(404).json({ message: "Greska" });
            }
            else
                res.send(izvodjaci);
        });
    },
    getTopIzvodjaci: (req, res) => {//slika,ime,id,ocena,fbstranica
        Izvodjac.find({}).sort('-ocena').limit(3).select('ime _id ocena fbStranica slika tip').exec((err, izvodjaci) => {
            if (err) {
                res.status(500).json({ message: "Greska" });
            }
            else {
                res.send(izvodjaci);
            }
        })
    },
    getIzvodjac: (req, res) => {
        if (req.params.id == null || req.params.id == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Izvodjac.findById(req.params.id, (err, izvodjac) => {
                if (err) {
                    res.status(404).json({ message: "Greska" });
                }
                else {
                    Dogadjaj.find({ izvodjac: izvodjac }, '_id', (err, dog) => {
                        if (err) {
                            console.log(err);
                            res.status(404).json({ message: "Not found" });
                        }
                        else {
                            let lista = dog.map(x => x._id);
                            let i = {
                                id: izvodjac._id,
                                username: izvodjac.username,
                                password: izvodjac.password,
                                ime: izvodjac.ime,
                                slika: izvodjac.slika,
                                email: izvodjac.email,
                                ocena: izvodjac.ocena,
                                brGlasanja: izvodjac.brGlasanja,
                                fbStranica: izvodjac.fbStranica,
                                telefon: izvodjac.telefon,
                                tip: izvodjac.tip,
                                dogadjaji: lista
                            }

                            res.send(i);
                        }
                    })
                }
            })
        }
    },
    postIzvodjac: (req, res) => {
        let data = req.body;
        if (req.file != undefined || req.file != null) {
            data.slika = req.file.path;
        }
        data.password = bcrypt.hashSync(data.password, 5);
        //data.brGlasanja = 1;
        Izvodjac.insertMany([data], { new: true }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Greska" });
            }
            else {
                let rola = {
                    userID: doc[0]._id,
                    username: doc[0].username,
                    password: doc[0].password,
                    rola: "Izvodjac"
                }
                Role.insertMany([rola], (err, rezultat) => {
                    if (err) {
                        res.status(500).json({ message: "greska" });
                    }
                    else {
                        res.send(doc[0]);
                    }
                })

            }
        })
    },
    // //treba da se preradi
    // postListaPesama: (req, res) => {
    //     let lista = req.body.Lista_pesama;
    //     let Username = req.body.Username;
    //     Izvodjac.findOneAndUpdate({ username: Username }, { $push: { pesme: lista } }, { new: true },
    //         (err, rezultat) => {
    //             res.send(rezultat);
    //         })
    // },
    // getRepertoar: (req,res) => {

    // },
    // getDogadjajiPoIdIzvodjaca: (req,res) => {
    //     Dogadjaj.find({izvodjac : req.params.idIzvodjaca})
    //     .populate('idLokala','naziv telefon')
    //     .exec((err,dogadjaj)=>{
    //         console.log(dogadjaj);
    //         let listavracanje = new Array();
    //         dogadjaj.forEach(d => {
    //             let dog = {
    //                 _id : d.id,
    //                 naziv : d.naziv,
    //                 pocetak : d.pocetak,
    //                 kraj : d.kraj,
    //                 info : d.info,
    //                 tip : d.tip,
    //                 sifra : d.sifra,
    //                 izvodjac : d.izvodjac,
    //                 idLokala : d.idLokala._id,
    //                 nazivLokala: d.idLokala.naziv,
    //                 telefonLokala: d.idLokala.telefon 
    //             }
    //             listavracanje.push(dog);
    //         })      
    //         res.send(listavracanje);
    //     })
    // },
    deleteIzvodjac: (req, res) => {
        if (req.params.id == null || req.params.id == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Izvodjac.deleteOne({ _id: req.params.id }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ message: "Brisanje neuspelo" });
                }
                else {
                    Role.deleteOne({ userID: req.params.id }, (err, rez) => {
                        if (err) {
                            console.log(err);
                            res.status(404).json({ message: "Brisanje neuspelo" })
                        }
                        else {
                            res.status(200).json({ message: "Brisanje uspelo" });
                        }
                    })
                }
            })
        }
    },

    putIzvodjac: (req, res) => {
        console.log("\nPUT IZVODJAC\n");
        console.log(req.body);
        let data = req.body;
        if (req.file != undefined || req.file != null) {
            data.slika = req.file.path;
        }
        Izvodjac.findOneAndUpdate({ _id: req.body._id }, data, (err, rez) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
            }
            return res.status(200).json({ result: rez });
        })
    }

}