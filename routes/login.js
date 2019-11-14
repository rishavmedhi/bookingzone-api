var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {User} = require('../model/user');


/* fetching login data */
router.post('/', function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;

    // Todo : filter the info coming from the db
    User.find({
        username : username,
        password: password
    })
    .then((user)=>{
        if(user.length!==0)
            res.send({'status':1,'user':user[0],msg:'Login successful'});
        else
            res.send({'status':0,'msg':'Failed to login. Cannot find username or invalid password'});
    }, (e) => {
        res.status(400).send(e);
    })
});

module.exports = router;
