const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('user', UserSchema);