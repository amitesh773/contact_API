const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
} 
//Mera phele commit
module.exports = main; 
