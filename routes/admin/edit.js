const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RegisterModel = mongoose.model('register');

router.get('/edit/:id', (req, res) => {
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
router.put('/edit/:id', (req, res) => {
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

module.exports = router;