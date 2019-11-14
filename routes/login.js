var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {User} = require('../model/user');


/* fetching login data */
router.post('/', function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;

    User.find({
        username : username,
        password: password
    })
    .then((user)=>{
        res.send({'status':1,'user':user});
    }, (e) => {
        res.status(400).send(e);
    })
});

module.exports = router;
