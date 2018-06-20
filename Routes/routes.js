let express = require('express');   

///////////////////////////////

//OVDE REQUIRE KONTROLERA

let izvodjacKontroler = require('../Kontroleri/IzvodjacKontroler');
let lokalKontroler = require('../Kontroleri/LokalKontroler');
let pesmaKontroler = require('../Kontroleri/PesmaKontroler');
let dogadjajKontroler = require('../Kontroleri/DogadjajKontroler');
let rolaKontroler = require('../Kontroleri/RoleKontroler');
///////////////////////////////
let router = express.Router();
//////////////////////////////
let multer = require('multer');

let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './uploads');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
})

let upload = multer({storage:storage});
////////////



//OVDE U RUTER PLUGUJEMO RUTE IZ KONTROLERA
router.route('/').get(function(req,res){
    res.send("Hello Vorld");
});
router.route('/izvodjaci').get(izvodjacKontroler.getIzvodjaci);
router.route('/izvodjac/:id').get(izvodjacKontroler.getIzvodjac);
router.route('/dodaj-izvodjaca').post(upload.single('slika'),izvodjacKontroler.postIzvodjac);
router.route('/delete-izvodjac/:id').delete(izvodjacKontroler.deleteIzvodjac);
router.route('/izmeni-izvodjaca').put(upload.single('slika'),izvodjacKontroler.putIzvodjac);

router.route('/lokaldogadjaji/:id').get(lokalKontroler.getLokalDogadjaji);
router.route('/lokali').get(lokalKontroler.getLokali);
router.route('/lokal/:id').get(lokalKontroler.getLokal);
router.route('/dodaj-lokal').post(upload.single('slika'),lokalKontroler.postLokal);
router.route('/delete-lokal/:id').delete(lokalKontroler.deleteLokal);
router.route('/izmeni-lokal').put(upload.single('slika'), lokalKontroler.putLokal);

router.route('/dogadjaji').get(dogadjajKontroler.getDogadjaji);
router.route('/dogadjaji/:idIzvodjaca').get(dogadjajKontroler.getDogadjajiPoIdIzvodjaca);
router.route('/dogadjaj/:id').get(dogadjajKontroler.getDogadjaj);
router.route('/dodaj-dogadjaj').post(dogadjajKontroler.postDogadjaj);
router.route('/obrisi-dogadjaj/:id').delete(dogadjajKontroler.deleteDogadjaj);
router.route('/izmeni-dogadjaj').put(dogadjajKontroler.putDogadjaj);
router.route('/top-dogadjaji').get(dogadjajKontroler.getTopDogadjaji);
router.route('/necessery-data/:id').get(dogadjajKontroler.getNecesseryData);
router.route('/get-listu-pesama/:id').get(dogadjajKontroler.getDogadjajPesme);
//router.route('/pesma').post(izvodjacKontroler.postPesma);
//router.route('/pesme').get(izvodjacKontroler.getPesme);
//router.route('/dogadjaj').post(lokalKontroler.postDogadjaj);
//router.route('/pesme/:zanr').get(pesmaKontroler.getPesma); //da vrati po odredjenom zanru
//router.route('/pesme').post(izvodjacKontroler.postListaPesama);
router.route('/pesme').get(pesmaKontroler.getPesme);
router.route('/pesme-izvodjaca/:id').get(pesmaKontroler.getPesmeIzvodjaca);
router.route('/pesme-izvodjaca-zanr').get(pesmaKontroler.getPesmeIzvodjacaZanr);
router.route('/toplista').get(pesmaKontroler.getTopLista);
router.route('/dodaj-pesmu').post(pesmaKontroler.postPesma);
router.route('/obrisi-pesmu/:id').delete(pesmaKontroler.deletePesma);
router.route('/dodaj-pesmu-izvodjacu').put(pesmaKontroler.putPesmaUListu);
router.route('/kreiraj-pesma-izvodjac').post(pesmaKontroler.postPesmaIzvodjac);
router.route('/izbrisi-iz-liste').put(pesmaKontroler.deletePesmaIzvodjac);

router.route('/login').post(rolaKontroler.login);
router.route('/kreiraj-admina').post(rolaKontroler.kreirajAdmina);
//za rutu /pesma get handler je getPesma iz uvezenog movieCtrl


module.exports = router; //ovaj ruter se u index.js requiruje i mountuje