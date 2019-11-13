var express = require('express');
var router = express.Router();

var {Bookings} = require('../model/bookings');


/* fetching login data */
router.post('/new/', function(req,res){

    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    let event = req.body.event;
    Bookings.find({
        event : event,
        status : 1,
        $or : [
            {$or : [{starttime : {$gte : starttime, $lte : endtime}, endtime: {$gte : starttime, $lte : endtime}}] },
            {$and : [{starttime : {$lte : starttime}},{endtime : {$gte : endtime}}]}
        ]}).then((booking)=>{
            if(booking.length===0)
            {
                let new_booking = new Bookings({
                    uid : req.body.uid,
                    starttime: req.body.starttime,
                    endtime: req.body.endtime,
                    event: req.body.event,
                    period: req.body.period,
                    status: req.body.status
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
