const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();

global.__basedir = __dirname;
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

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

app.get('/admin/edit/:id', (req, res) => {
    RegisterModel.findById({
        _id: req.params.id
    })
    .then((data) => {
        console.log(data);
        res.render('admin/editUser', {
            user: data
        });
    })
    .catch((err) => {
        console.log(err);
    }); 
});
app.put('/admin/edit/:id', (req, res) => {
    RegisterModel.findById({
        _id: req.params.id
    })
    .then((user) => {
        user.name = req.body.name,
        user.email = req.body.email,
        user.phone = req.body.phone

        user.save()
        .then(() => {
            console.log('Updated successfully');
            res.redirect('/admin/viewUsers');
        })
        .catch((err) => {
            console.log('error updating file');
        });
    })
    .catch((err) => {
        console.log('cannont find user');
    });
});

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