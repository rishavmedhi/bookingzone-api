const config = require('../config/config');
var mongoose = require('mongoose');

mongoose.promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/bookingzone',{ useNewUrlParser: true });
mongoose.connect(config.mongodb_string,{ useNewUrlParser: true });

module.exports = {
    mongoose
};
