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
            .populate('idLokala', 'naziv telefon')
            .exec((err, dogadjaj) => {
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
                        izvodjac: ime,
                        idLokala: d.idLokala._id,
                        nazivLokala: d.idLokala.naziv,
                        telefonLokala: d.idLokala.telefon
                    }
                    listavracanje.push(dog);
                })

                res.send(listavracanje);
            })
    },
    //vraca dogadjaj po id-ju, uz naziv lokala i listu pesama ciji se zanr poklapa sa tipom dogadjaja
    getDogadjaj: (req, res) => {
        Dogadjaj.findById(req.params.id).populate('idLokala', 'naziv').exec((err, d) => {
            Izvodjac.findById(d.izvodjac).populate('pesme').exec((err, izv) => {
                let pesme = new Array();
                let ime = "Izvodjac obrisan"
                if (izv !== null) {

                    ime = izv.ime;
                    pesme = izv.pesme;
                    // pesme = izv.pesme.filter(p => {
                    //     return p.zanr == d.tip;
                    // });
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
                    izvodjac: ime,
                    idLokala: d.idLokala._id,
                    nazivLokala: d.idLokala.naziv
                }
                res.send(rezultat);
            })
        })
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
        Dogadjaj.find({ izvodjac: req.params.idIzvodjaca })
            .populate('idLokala', 'naziv telefon')
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
                            izvodjac: d.izvodjac,
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

    //delete dogadjaj: obrise dogadjaj i izbaci svoj id iz liste dogadjaja lokala
    deleteDogadjaj: (req, res) => {
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

    },
    putDogadjaj: (req,res) => {
		console.log("PUT DOGADAJ\n");
		console.log(req.body);
        Dogadjaj.findOneAndUpdate({_id:req.body._id},req.body, (err,novi) =>{
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
              }
              return res.status(200).json({ result: novi });
        })
    }
}

