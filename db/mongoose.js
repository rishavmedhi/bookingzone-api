var mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bookingzone',{ useNewUrlParser: true });

module.exports = {
    mongoose
};
