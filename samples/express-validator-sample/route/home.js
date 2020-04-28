const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Users');
const User = mongoose.model('user');

const homeRoute = require('../controllers/home-controller');

router.get('/', homeRoute.homeControllerGet);

router.post('/', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            message: 'ERROR',
            errors: errors.array() });
    }

    const password = req.body.password;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            const userDetail = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            const newUser = new User(userDetail);
            newUser.save()
                .catch((err) => {
                    console.log('error adding to database');
                });
            res.send('ALL OK');
        });
    });

});

module.exports = router;