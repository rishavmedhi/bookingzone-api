var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {Bookings} = require('../model/bookings');


/* fetching login data */
router.post('/new/', function(req,res,next){

    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    let event = req.body.event;
    Bookings.find({
        event : event,
        status : 1,
        $and : [
            {$or : [{starttime : {$gt : starttime, $lt : endtime}, endtime: {$gt : starttime, $lt : endtime}}] },
            {$and : [{starttime : {$lt : starttime}},{endtime : {$gt : endtime}}]}
        ]}).then((booking)=>{
            if(booking.length===0)
            {
                let new_booking = new Bookings({
                    uid : req.body.uid,
                    starttime: req.body.starttime,
                    endtime: req.body.endtime,
                    event: req.body.event,
                    period: req.body.period,
                    status: requ.body.status
                });
                new_booking.save().then(() => {
                    res.send("Booking successfully created")
                }, (e) => {
                    res.status(400).send(e);
                })
            }
            else
            {
                res.send("Booking failed. Slot you have selected is already booked");
            }
        }, (e) => {
            res.status(400).send(e);
        })
});

module.exports = router;
