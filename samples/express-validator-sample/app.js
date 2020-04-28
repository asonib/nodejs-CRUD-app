const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

//mongoose connection
require('./config/database');

const homeRoute = require('./route/home');

app.use(homeRoute);

const port = 3000 || process.env.port;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})