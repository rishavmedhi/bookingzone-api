var mongoose = require('mongoose');

var User = mongoose.model('User',{
    uid: {
        type: Number,
        required: true,
        trim: true
    },
    username: {
        type: String,
        minlength: 1,
        default: "User",
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    house_no:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        default: null
    },
    status:{
        type: Number,
        default: 0
    }

});

module.exports = {
    User
};