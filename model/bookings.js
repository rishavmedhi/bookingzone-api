var mongoose = require('mongoose');


var Bookings = mongoose.model('Bookings',{
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    starttime: {
        type: Number,
        required: true
    },
    endtime: {
        type: Number,
        required: true
    },
    event:{
        type: String,
        required: true
    },
    period:{
        type: String,
        default: null
    },
    status:{
        type: Number,
        default: 0
    }
});

module.exports = {
    Bookings
};