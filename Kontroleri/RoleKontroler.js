let roleModels = require('../Modeli/Role');
let Role = roleModels.Role;
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');

module.exports = {
    login: (req, res) => {
        if (req.body.username == null || req.body.username == undefined) {
            res.status(400).json({ message: "Greska" });
        }
        else {
            console.log("Login metoda: " + req.body.username);
            Role.findOne({ username: req.body.username }, '-_id', (err, doc) => {
                if (!doc) {
                    res.status(404).json({
                        error: "Login failed"

                    });
                }
                else {
                    let uspeo = bcrypt.compareSync(req.body.password, doc.password);
                    //console.log(uspeo);
                    if (!uspeo) {
                        res.status(200).json({
                            error: "Login failed",

                        });
                    }
                    else {
                        let rezultat = {
                            userID: doc.userID,
                            rola: doc.rola
                        }
                        console.log(rezultat.userID);
                        res.status(200).json(rezultat);
                    }
                }
            })
        }
    },
    kreirajAdmina: (req, res) => {
        if (req.body == null || req.body == undefined)
            res.status(400).json({ message: "Greska u zahtevu" });
        else {
            let a = req.body;
            a.password = bcrypt.hashSync(a.password, 5);

            let admin = {
                username: a.username,
                password: a.password,
                rola: "Administrator",
            }
            Role.insertMany([admin], (err, rola) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Update neuspeo" })
                }
                else res.status(201).json({ message: "Admin dodat" });
            })
        }
    }

}