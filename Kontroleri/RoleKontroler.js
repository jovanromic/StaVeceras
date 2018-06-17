let roleModels = require('../Modeli/Role');
let Role = roleModels.Role;
let bcrypt = require('bcrypt');


module.exports = {
    login: (req, res) => {
		console.log("Login metoda: "+req.body.username);
        Role.findOne({ username: req.body.username },'-_id', (err, doc) => {
            if (!doc) 
            {
                res.status(404).json({
                    error: "Login failed"
					
                });
            }
            else 
            {
                let uspeo = bcrypt.compareSync(req.body.password, doc.password);
                //console.log(uspeo);
                if(!uspeo)
                {
                    res.status(200).json({
                        error: "Login failed",
					
                    });
                }
                else
                {
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
    
}