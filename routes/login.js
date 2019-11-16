var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {User} = require('../model/user');


/* fetching login data */
router.post('/', function(req,res){
    let req_params = req.body;
    if(typeof req_params.username!=="undefined" && req_params.username.length>0 && typeof req_params.password!=="undefined" && req_params.password.length>0) {
        let username = req_params.username;
        let password = req_params.password;

        // Todo : filter the info coming from the db
        User.find({
            username: username,
            password: password
        })
            .then((user) => {
                if (user.length !== 0)
                    res.send({'status': 1, 'user': user[0], msg: 'Login successful'});
                else
                    res.send({'status': 0, 'msg': 'Failed to login. Cannot find username or invalid password'});
            }, (e) => {
                res.status(500).send(e);
            })
    }
    else
        res.status(400).send('Invalid parameters sent');
});

module.exports = router;
