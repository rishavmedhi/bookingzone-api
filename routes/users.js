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
   let new_user = new User(
       {
           username: req.body.username,
           password: req.body.password,
           house_no: req.body.house_no,
           name: req.body.name,
           status: req.body.status
       }
   );
   new_user.save().then(()=>{
       res.send("User created successfully");
   }, (e) => {
       res.status(400).send(e);
   });
});

module.exports = router;
