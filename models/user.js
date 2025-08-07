const mongoose = require('mongoose');
const { type } = require('os');

//My name is Sachin
const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    surname: {
        type : String,
    },
    email: {
        type : String,
    },
    phone: {
        type : Number,
    }
})

module.exports = new mongoose.model('Contacts',userSchema);