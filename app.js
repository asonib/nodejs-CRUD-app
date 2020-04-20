const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

global.__basedir = __dirname;
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/shoppingapp', () => {
    
})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(() => {
        console.log('error connecting to DB');
    });
;
require('./models/Register');
const RegisterModel = mongoose.model('register');

const loginRoute = require('./routes/users/login');
const registerRoute = require('./routes/users/register');
const viewUserRoute = require('./routes/admin/users');

app.use('/users', loginRoute);
app.use('/users', registerRoute);
app.use('/admin', viewUserRoute);

app.get('/', (req, res) => {
    res.render('home');
});


port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});