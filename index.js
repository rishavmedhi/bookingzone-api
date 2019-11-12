const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookingzone')
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));