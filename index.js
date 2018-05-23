/////////////////////////////////
//REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var routes = require('./Routes/routes.js');
/////////////////////////////////
var app = express();
/////////////////////////////////
//KONEKCIJA KA BAZI
var conString = "mongodb+srv://yocko1:yocko1@staveceras-3zynw.mongodb.net/stavecerasbp";
mongoose.connect(conString);
/////////////////////////////////

////////////////////////////////
//LOGIKA 
app.use('/',routes);

app.listen(process.env.PORT || 3000);
////////////////////////////////