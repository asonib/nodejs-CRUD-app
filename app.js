const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', (req, res) => {
    res.render('home');
});

port = process.env.port ||3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});