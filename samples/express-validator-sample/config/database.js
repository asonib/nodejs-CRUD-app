const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/projects')
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('error connecting to mongoDB server');
});

module.exports = router;