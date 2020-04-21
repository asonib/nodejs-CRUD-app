const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
mongoose.Promise = global.Promise;

global.__basedir = __dirname;
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());

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

require('./config/passport')(passport);

const loginRoute = require('./routes/users/login');
const registerRoute = require('./routes/users/register');
const viewUserRoute = require('./routes/admin/users');
const editRoute = require('./routes/admin/edit');

app.use('/users', loginRoute);
app.use('/users', registerRoute);
app.use('/admin', viewUserRoute);
app.use('/admin', editRoute);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users/dashboard', (req, res) => {
    
    res.render('user/dashboard');
})



app.delete('/admin/delete/:id', (req, res) => {
    RegisterModel.findByIdAndDelete({
        _id: req.params.id
    })
    .then(() => {
        res.redirect('/admin/viewUsers');
    })
    .catch((err) => {
        console.log('error deleting data');
    })
});

port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});