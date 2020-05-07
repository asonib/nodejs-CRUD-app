const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

require('../models/Users');
const User = mongoose.model('user');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        console.log(email, password);
        User.findOne({
            Email: email
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'No User Found' });
            }
            console.log('User Found');
            bcrypt.compare(password, user.Password, function(err, res) {
                if (err) throw err;
                if(res == true){
                    console.log('Correct credentials');
                    return done(null, user);
                }else{
                    console.log('Incorrect credentials');
                    return done(null, false, { message: 'Password Incorrect' });
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
