let mongoose = require('mongoose');

let roleSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    //userID: String,
    username: String,
    password : String,
    rola: String
});

let Role = mongoose.model('Role',roleSchema,'role');

module.exports = {
    Role: Role
}