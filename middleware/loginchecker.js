const express = require('express');
const app = express();

const loginChecker = (req, res, next) => {

    let role = req.body.role;
    if(role !== 'admin'){
        return res.status(401).json({message:'Unauthorize Access...'})
    }
    console.log(role)
    next();
}

module.exports = loginChecker;