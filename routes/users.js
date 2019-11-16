var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {User} = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/all-users/', function(req,res,next){
    User.find().then((user)=>{
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    })
});

router.post('/save/', function(req,res){
   let req_params = req.body;

   if(typeof req_params.username!=="undefined" && req_params.username.length>0 && typeof req_params.password!=="undefined" && req_params.password.length>0  && typeof req_params.name!=="undefined" && req_params.name.length>0 )
   {
       let new_user = new User(
       {
           username: req.body.username,
           password: req.body.password,
           name: req.body.name,
           status: 1
       }
       );
       new_user.save().then(()=>{
           res.send("User created successfully");
       }, (e) => {
           res.status(500).send(e);
       });
   }
   else
       res.status(400).send('Invalid parameters sent');
});

module.exports = router;
