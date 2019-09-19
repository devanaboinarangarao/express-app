const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    email : String,
    password : String,
    name : String,
    phone : String,
    Address : String
});

module.exports = mongoose.model('Users', UsersSchema);