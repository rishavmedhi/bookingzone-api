var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {Bookings} = require('../model/bookings');
const {ObjectID} = require('mongodb').ObjectID;


/* making a new booking if selected slot is free */
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
                    status: 1
                });
                new_booking.save().then(() => {
                    res.send({
                        'status':1,
                        'msg':"Booking successfully created"})
                }, (e) => {
                    res.status(400).send(e);
                })
            }
            else
            {
                res.send({
                    status: 0,
                    msg:"Booking failed. Slot you have selected is already booked"
                });
            }
        }, (e) => {
            res.status(400).send(e);
        })
});

/* cancelling a booking */
router.post('/cancel/', function(req,res) {
    let booking_id = req.body.booking_id;
    booking_id = mongoose.Types.ObjectId(booking_id);
    Bookings.find({
        _id: booking_id
    }).then(() => {
        Bookings.update({
            _id: booking_id
        }, {
            $set: {
                status: 0
            }
        }).then(() => {
            res.send({
                status: 1,
                msg:"Your Booking has been cancelled"});
        },(e2) => {
            res.status(400).send(e2);
        })
    },(e) => {
        res.status(400).send(e);
    });
});

/* listing all active bookings for a user */
router.post('/user/', (req,res) => {
   let uid = req.body.uid;
   uid = mongoose.Types.ObjectId(uid);
   Bookings.find({
       uid : uid,
       status: 1
   }).then((bookings) => {
        res.send({
            'status':1,
            'bookings':bookings
        });
   }, (e) => {
       res.status(400).send(e);
   });
});

module.exports = router;
