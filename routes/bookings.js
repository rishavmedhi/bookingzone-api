var express = require('express');
var router = express.Router();

var {mongoose} = require('../db/mongoose');
var {Bookings} = require('../model/bookings');
const {ObjectID} = require('mongodb').ObjectID;


/* making a new booking if selected slot is free */
router.post('/new/', function(req,res){
    let req_params = req.body;
    if(typeof req_params.starttime!=="undefined" && req_params.starttime>0 && typeof req_params.endtime!=="undefined" && req_params.endtime>0 && typeof req_params.event!=="undefined" && req_params.event.length>0 && typeof req_params.period!=="undefined" && req_params.period.length>0 && typeof req_params.uid!=="undefined" && req_params.uid.length>0) {

        let starttime = req_params.starttime;
        let endtime = req_params.endtime;
        let event = req_params.event;
        // console.log({ event: event,
        //     status: 1,
        //     $or: [
        //         {$or: [{starttime: {$gte: starttime, $lte: endtime}, endtime: {$gte: starttime, $lte: endtime}}]},
        //         {$and: [{starttime: {$lte: starttime}}, {endtime: {$gte: endtime}}]}
        //     ]});
        //
        // console.log({starttime: {$gte: starttime, $lte: endtime}});
        // console.log({endtime: {$gte: starttime, $lte: endtime}});
        // console.log({$and: [{starttime: {$lte: starttime}}, {endtime: {$gte: endtime}}]});
        Bookings.find({
            event: event,
            status: 1,
            $or: [
                {$or: [{starttime: {$gte: starttime, $lt: endtime}}, {endtime: {$gt: starttime, $lte: endtime}}]},
                {$and: [{starttime: {$lte: starttime}}, {endtime: {$gte: endtime}}]}
            ]
        }).then((booking) => {
            console.log(booking);
            console.log(booking.length);
            if (booking.length === 0) {
                let new_booking = new Bookings({
                    uid: req_params.uid,
                    starttime: req_params.starttime,
                    endtime: req_params.endtime,
                    event: req_params.event,
                    period: req_params.period,
                    status: 1
                });
                new_booking.save().then(() => {
                    res.send({
                        'status': 1,
                        'msg': "Booking successfully created"
                    })
                }, (e) => {
                    res.status(400).send(e);
                })
            } else {
                res.send({
                    status: 0,
                    msg: "Booking failed. Slot you have selected is already booked"
                });
            }
        }, (e) => {
            res.status(400).send(e);
        })
    }
    else
        res.status(400).send('Invalid parameters sent');
});

/* cancelling a booking */
router.post('/cancel/', function(req,res) {
    let req_params = req.body;
    if(typeof req_params.booking_id!=="undefined" && req_params.booking_id.length>0) {
        let booking_id = req_params.booking_id;
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
                    msg: "Your Booking has been cancelled"
                });
            }, (e2) => {
                res.status(400).send(e2);
            })
        }, (e) => {
            res.status(400).send(e);
        });
    }
    else
        res.status(400).send('Invalid parameters sent');
});

/* listing all active bookings for a user */
router.post('/user/', (req,res) => {
    let req_params = req.body;
    if(typeof req_params.uid!=="undefined" && req_params.uid.length>0) {
       let uid = req_params.uid;
       uid = mongoose.Types.ObjectId(uid);
       Bookings.find({
           uid : uid,
           status: 1
       }).sort({
               starttime: 1
           }).then((bookings) => {
            res.send({
                'status':1,
                'bookings':bookings
            });
       }, (e) => {
           res.status(400).send(e);
       });
    }
    else
        res.status(400).send('Invalid parameters sent');
});

module.exports = router;
