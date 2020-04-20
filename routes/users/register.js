const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require(path.join(__basedir, 'models', 'Register.js'));
const Register = mongoose.model('register');

router.get('/register', (req, res) => {
    res.render('register',{
        method: 'GET'
    });
});

router.post('/register', (req, res) => {
    errors = [];
    if(!req.body.name){
        errors.push({text : 'please enter name'});
    }
    if(!req.body.email){
        errors.push({text : 'please enter email'});
    }
    if(!req.body.phone){
        errors.push({text : 'please enter phone number'});
    }
    if(!req.body.password){
        errors.push({text : 'please enter password'});
    }

    if(errors.length > 0){
        res.render('register', {
            err: errors,
            method: 'POST'
        });
    }else{
        password = req.body.password;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hashedPassword) {
                newUser = {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: hashedPassword
                }
                const users = new Register(newUser);
                users.save()
                .then((usr) => {
                    console.log(usr);
                    console.log('Registered Successfully');
                    res.redirect('/users/login');
                })
                .catch((err) => {
                    console.log('Error registering');
                });
            });
        });
    }
});

module.exports = router;