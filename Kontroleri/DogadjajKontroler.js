let dogadjajModels = require('../Modeli/Dogadjaj');
let Dogadjaj = dogadjajModels.Dogadjaj;
//let Lokal = lokalModels.Lokal;
let lokalModels = require('../Modeli/Lokal');
let Lokal = lokalModels.Lokal;
let izvodjacModels = require('../Modeli/Izvodjac');
let Izvodjac = izvodjacModels.Izvodjac;

module.exports = {
    //vraca sve dogadjaje, uz to i ime izvodjaca, naziv lokala i telefon lokala za svaki od njih
    getDogadjaji: (req, res) => {
        Dogadjaj.find({})
            .populate('izvodjac', '-_id ime')
            .populate('idLokala', 'naziv telefon slika')
            .exec((err, dogadjaj) => {
                if (err) {
                    res.status(404).json({ message: "Greska" });
                }
                else {
                    let listavracanje = new Array();
                    dogadjaj.forEach(d => {
                        let ime = "Izvodjac obrisan";

                        if (d.izvodjac !== null) {
                            ime = d.izvodjac.ime;
                        }

                        let dog = {
                            _id: d.id,
                            naziv: d.naziv,
                            pocetak: d.pocetak,
                            kraj: d.kraj,
                            info: d.info,
                            tip: d.tip,
                            sifra: d.sifra,
                            topDogadjaj: d.topDogadjaj,
                            izvodjac: ime,
                            idLokala: d.idLokala._id,
                            nazivLokala: d.idLokala.naziv,
                            telefonLokala: d.idLokala.telefon,
                            slikaLokala: d.idLokala.slika
                        }
                        listavracanje.push(dog);
                    })

                    res.send(listavracanje);
                }
            })
    },
    getTopDogadjaji: (req, res) => {
        Dogadjaj.find({ topDogadjaj: true })
            .populate('izvodjac', '-_id ime')
            .populate('idLokala', 'naziv telefon')
            .exec((err, dogadjaj) => {
                if (err) {
                    res.status(404).json({ message: "Greska" });
                }
                else {
                    let listavracanje = new Array();
                    dogadjaj.forEach(d => {
                        let ime = "Izvodjac obrisan";

                        if (d.izvodjac !== null) {
                            ime = d.izvodjac.ime;
                        }

                        let dog = {
                            _id: d.id,
                            naziv: d.naziv,
                            pocetak: d.pocetak,
                            kraj: d.kraj,
                            info: d.info,
                            tip: d.tip,
                            sifra: d.sifra,
                            topDogadjaj: d.topDogadjaj,
                            izvodjac: ime,
                            idLokala: d.idLokala._id,
                            nazivLokala: d.idLokala.naziv,
                            telefonLokala: d.idLokala.telefon
                        }
                        listavracanje.push(dog);
                    })

                    res.send(listavracanje);
                }
            })
    },
    //vraca dogadjaj po id-ju, uz naziv lokala i listu pesama ciji se zanr poklapa sa tipom dogadjaja
    getDogadjaj: (req, res) => {
        if (req.params.id == null || req.params.id == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Dogadjaj.findById(req.params.id).populate('idLokala', 'naziv').exec((err, d) => {
                if (err) {
                    res.status(404).json({ message: "Greska" });
                }
                else {
                    Izvodjac.findById(d.izvodjac).populate('pesme').exec((err, izv) => {
                        if (err) {
                            res.status(404).json({ message: "Greska" });
                        }
                        else {
                            let pesme = new Array();
                            let ime = "Izvodjac obrisan"
                            if (izv !== null) {

                                ime = izv.ime;
                                pesme = izv.pesme;
                                pesme = izv.pesme.filter(p => {
                                    return p.zanr == d.tip;
                                });
                            }
                            let rezultat = {
                                repertoar: pesme,

                                _id: d.id,
                                naziv: d.naziv,
                                pocetak: d.pocetak,
                                kraj: d.kraj,
                                info: d.info,
                                tip: d.tip,
                                sifra: d.sifra,
                                topDogadjaj: d.topDogadjaj,
                                izvodjac: ime,
                                idLokala: d.idLokala._id,
                                nazivLokala: d.idLokala.naziv
                            }
                            res.send(rezultat);
                        }
                    })
                }
            })
        }
    },
    getDogadjajPesme: (req, res) => {
        if (req.params.id == null || req.params.id == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Dogadjaj.findById(req.params.id, (err, dog) => {
                if (err) {
                    res.status(404).json({ message: "Greska" });
                }
                else {
                    Izvodjac.findById(dog.izvodjac).populate('pesme').exec((err, izv) => {
                        if (err) {
                            res.status(404).json({ message: "Greska" });
                        }
                        else {
                            let repertoar = new Array();
                            repertoar = izv.pesme.filter(p => {
                                return p.zanr == dog.tip;
                            });
                            res.send(repertoar);
                        }
                    })
                }
            })
        }
    },
    getNecesseryData: (req, res) => {
        if (req.params.id == null || req.params.id == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Dogadjaj.findById(req.params.id).populate('idLokala').populate('izvodjac').exec((err, d) => {
                if (err) {
                    res.status(404).json({ message: "Greska" });
                }
                else {
                    let dogadjaj = {
                        _id: d.id,
                        naziv: d.naziv,
                        pocetak: d.pocetak,
                        kraj: d.kraj,
                        info: d.info,
                        tip: d.tip,
                        sifra: d.sifra,
                        topDogadjaj: d.topDogadjaj,
                    }
                    let l = d.idLokala;
                    let lokal = {
                        _id: l._id,
                        naziv: l.naziv,
                        slika: l.slika,
                        info: l.info,
                        ocena: l.ocena,
                        //brglasova
                        telefon: l.telefon,
                        lokacija: l.lokacija,
                        fbStranica: l.fbStranica
                    }
                    let i = d.izvodjac;
                    let izvodjac = {
                        _id: i._id,
                        ime: i.ime,
                        slika: i.slika,
                        ocena: i.ocena,
                        tip: i.tip,
                        fbStranica: i.fbStranica
                    }
                    let vracanje = {
                        dogadjaj: dogadjaj,
                        lokal: lokal,
                        izvodjac: izvodjac
                    }
                    res.send(vracanje);
                }
            })
        }

    },
    //doda novi dogadjaj u kolekciju, azurira listu dogadjaja za lokal id-jem novog dogadjaja
    postDogadjaj: (req, res) => {
        var dog = new Dogadjaj(req.body);
        console.log(dog);
        Lokal.findByIdAndUpdate(dog.idLokala, { $push: { dogadjaji: dog._id } }, { safe: true, upsert: true }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                //do stuff
            }
        })
        Dogadjaj.insertMany(dog, (err, result) => {
            if (err) console.log(err);
            else {
                console.log("dodao");
                res.status(200).json({ message: "dodato" });
            }
        })
    },

    //vraca dogadjaj za odredjenog izvodjaca, uz to dodaje i telefon, id i naziv lokala
    getDogadjajiPoIdIzvodjaca: (req, res) => {
        if (req.params.idIzvodjaca == null || req.params.idIzvodjaca == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Dogadjaj.find({ izvodjac: req.params.idIzvodjaca })
                .populate('idLokala', 'naziv telefon slika')
                .exec((err, dogadjaj) => {
                    if (err) {
                        console.log(err);
                        res.status(404).json({ message: "Not found" });
                    }
                    else {
                        console.log(dogadjaj);
                        let listavracanje = new Array();
                        dogadjaj.forEach(d => {
                            let dog = {
                                _id: d.id,
                                naziv: d.naziv,
                                pocetak: d.pocetak,
                                kraj: d.kraj,
                                info: d.info,
                                tip: d.tip,
                                sifra: d.sifra,
                                topDogadjaj: d.topDogadjaj,
                                izvodjac: d.izvodjac,
                                idLokala: d.idLokala._id,
                                nazivLokala: d.idLokala.naziv,
                                telefonLokala: d.idLokala.telefon,
                                slikaLokala: d.idLokala.slika
                            }
                            listavracanje.push(dog);
                        })
                        res.send(listavracanje);
                    }
                })
        }
    },

    //delete dogadjaj: obrise dogadjaj i izbaci svoj id iz liste dogadjaja lokala
    deleteDogadjaj: (req, res) => {
        if (req.params.id == null || req.params.id == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            Dogadjaj.findByIdAndRemove(req.params.id, (err, dog) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({
                        message: "Brisanje neuspelo"
                    })
                }
                else {
                    Lokal.findByIdAndUpdate(dog.idLokala, { $pull: { dogadjaji: dog._id } }, (err, doc) => {
                        if (err) {
                            console.log(err);
                            res.status(404).json({
                                message: "Brisanje neuspelo"
                            })
                        }
                        else {
                            res.status(200).json({
                                message: "Brisanje uspelo"
                            })
                        }
                    })
                }

            })
        }

    },
    putDogadjaj: (req, res) => {
        console.log("PUT DOGADAJ\n");
        //console.log(req.body);
        let dogadjaj = req.body;
        delete dogadjaj.idLokala;
        if (dogadjaj.izvodjac == null || dogadjaj.izvodjac == undefined) {
            delete dogadjaj.izvodjac;
        }
        console.log(dogadjaj);
        Dogadjaj.findOneAndUpdate({ _id: dogadjaj._id }, dogadjaj, (err, novi) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
            }
            return res.status(200).json({ result: novi });
        })
    }
}

