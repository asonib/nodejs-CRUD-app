const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
//nodemailer imports
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
//

const app = express();
mongoose.connect('mongodb://localhost/web_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((message) => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error Connecting to Database');
});
require('./models/Users');
const Users = mongoose.model('user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./config/passport')(passport);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Setting up the transporter
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: ''
        }
    })
);


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/user/login', (req, res) => {
    res.render('users/login');
});
app.post('/user/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/auth/dashboard/',
        failureRedirect: '/user/login',
        failureMessage: true
    })(req, res, next);
});

app.get('/auth/dashboard', (req, res) => {
    //sending the mail
    transporter.sendMail({
        to: 'aryan85tata@gmail.com',
        from: 'nodemailer-complete@noreply.com',
        subject: 'Signup succeeded!',
        html: '<h1>You successfully logged In!</h1>'
    });
    res.send("WELCOME TO FUCKING DASHBOARD");
})

app.get('/user/register', (req, res) => {
    res.render('users/register');
});
app.post('/user/register', [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).redirect('/user/register');
        }
        console.log(req.body);
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                const newUser = {
                    Name: req.body.name,
                    Email: req.body.email,
                    Phone: req.body.phone,
                    Password: hash
                }
                new Users(newUser).save().then((user) => {
                    console.log('Users Registered');
                    res.redirect('/user/login');
                }).catch((err) => {
                    console.log('Problem Registering');
                });
            });
        });
    });

const port = 3000 || process.env.port;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});