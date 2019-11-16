var mongoose = require('mongoose');

var User = mongoose.model('User',{
    username: {
        type: String,
        minlength: 1,
        default: "User",
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    house_no:{
        type: String
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