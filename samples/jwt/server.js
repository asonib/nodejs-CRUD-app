const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
global.__basedir = __dirname;

mongoose.connect('mongodb://localhost/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('Problem connecting to he database');
});

const auth = require('./config/auth');

const config = require('./config/config');
console.log("Encryptor : ", config.config.jwtSecret);
app.get('/', (req, res) => {
    payload = {
        user: {
            id: 'ASB75E'
        }
    }
    jwt.sign({
        data: payload
    }, config.config.jwtSecret,
        {
            expiresIn: 60 * 60
        }, (err, token) => {
            if(err) throw err;
            console.log(token);
            res.render('index', {
                title: 'Welcome | Dashboard',
                token: token
            });
        }
    );
});
app.get('/auth/dashboard', auth, (req, res) => {
    
    // var decoded = jwt.verify(data, 'asb75E');
    // console.log(decoded.user);
});

const port = 3000 || process.env.PORT;
app.listen(port, (result) => {
    console.log(`server started at port ${port}`);
});