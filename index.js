const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookingzone')
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));

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

const new_user = new User({
    uid: 1,
    username: "admin",
    password: 1,
    house_no: 304,
    name: "Admin",
    status: 1
});

async function saveUser() {
    const new_user = new User({
        uid: 1,
        username: "admin",
        password: "hello123",
        house_no: 304,
        name: "Admin",
        status: 1
    });

    const result = await new_user.save();
    console.log(result);
}

saveUser();