const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureMessage: true
    })(req, res, next);
});

module.exports = router;