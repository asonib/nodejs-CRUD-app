const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();

require(path.join(__basedir, 'models', 'Register.js'));
const Register = mongoose.model('register');

router.get('/viewUsers', (req, res) => {
    Register.find()
    .then((users) => {
        res.render(path.join(__basedir, 'views', 'admin', 'viewUsers'), {
            data: users
        });
    })
    .catch((err) => {
        console.log('error fetching data');
    });
    
});

module.exports = router;