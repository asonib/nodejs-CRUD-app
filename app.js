const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/shoppingapp', () => {
    useUnifiedTopology: true
    useNewUrlParser: true
})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(() => {
        console.log('error connecting to DB');
    });
;

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    console.log(req.body);
    res.send("ALL OK");
});

port = process.env.port ||3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});