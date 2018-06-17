let lokalModels = require('../Modeli/Lokal');
let dogadjajModels = require('../Modeli/Dogadjaj');
let Lokal = lokalModels.Lokal;
let Dogadjaj = dogadjajModels.Dogadjaj;
let roleModels = require('../Modeli/Role');
let Role = roleModels.Role;
let bcrypt = require('bcrypt');

module.exports = {
    getLokali: (req, res) => {
        Lokal.find({}, { dogadjaji: false }, (err, lokali) => {
            res.send(lokali);
        });
    },
    getLokal: (req, res) => {
        Lokal.findById(req.params.id)
            .populate({ path: 'dogadjaji', select: '-idLokala' })
            .exec((err, lokal) => {
                res.send(lokal);
            })
    },
    getLokalDogadjaji: (req, res) => {
        Lokal.findById(req.params.id)
            .populate({ path: 'dogadjaji', populate: { path: 'izvodjac', select: '-_id ime' }, select: '-idLokala' })
            .exec((err, lokal) => {
                let rezultat = {
                    dogadjaji: lokal.dogadjaji
                }
                res.send(rezultat);
            })
    },
    postLokal: (req, res) => {
		console.log("POST LOKAL\n")
		console.log(req.body);
        let data = req.body;
        if (req.file != undefined || req.file != null) {
            data.slika = req.file.path;
        }
        data.password = bcrypt.hashSync(data.password, 5);
        Lokal.insertMany([data], { new: true }, (err, doc) => {
            let rola = {
                userID: doc[0]._id,
                username: doc[0].username,
                password: doc[0].password,
                rola: "Lokal"
            }
            Role.insertMany([rola], (err, rola) => {
                res.send(doc[0]);
            })
        })
    },
    deleteLokal: (req, res) => {
		console.log("DELETE LOKAL");
		console.log(req.body);
        Lokal.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                res.status(404).json({ message: "Brisanje neuspelo" });
            }
            else {
                Role.deleteOne({ userID: req.params.id }, (err, rez) => {
                    if (err) {
                        console.log(err);
                        res.status(404).json({ message: "Brisanje neuspelo" })
                    }
                    else {
                        Dogadjaj.deleteMany({ idLokala: req.params.id }, (err, dogs) => {
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
        })
    },

    putLokal : (req,res) => {
		console.log("PUT LOKAL\n");
		console.log(req.body);
        let data = req.body;
        if (req.file != undefined || req.file != null) {
            data.slika = req.file.path;
        }
        Lokal.findOneAndUpdate({_id:data._id}, data, (err,rez)=>{
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
              }
              return res.status(200).json({ result: rez });
        })
    }
}