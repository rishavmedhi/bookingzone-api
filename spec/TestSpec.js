const request = require('request');

// var base_url = "http://localhost:3000/";
var base_url = "https://bookingzone.herokuapp.com/api/";

describe("Booking Zone Server", function() {
    describe("POST Login /", function() {
         it("Testing Login function when empty ",   function(done){
             let request_params = {
                 username : 'rishavmedhi',
                 password : 'hello123'
             };
             const requestOptions = {
                 qs: "",
                 json: request_params,
                 method: 'POST'
             };

             doRequest(base_url+"login", requestOptions).then((response) => {
                 expect(response.body.status).toBe(1);
                 done();
             })

        });

        it("Testing Login by empty parameters for login", function(done){
            let request_params = {
                username : '',
                password : ''
            };
            const requestOptions={
                method: 'POST',
                json: {}
            };
            doRequest(base_url+"login", requestOptions).then((response) => {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    });
    describe("POST bookings/new/ /", function() {
        it("Testing creation of new booking creation function with no params",   function(done){
            let request_params = {};
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/new/", requestOptions).then((response) => {
                expect(response.statusCode).toBe(400);
                done();
            })
        });

        it("Testing creation of new booking creation function",   function(done){
            let request_params = {
                "uid": "5dcb052790547cf14149159d",
                "starttime" : 1573643081,
                "endtime": 1573646681,
                "event": "BADMINTON",
                "period": "2 hrs"
            };
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/new/", requestOptions).then((response) => {
                expect(response.body.status).toBe(1);
                done();
            })
        });

        it("Testing creation of new booking creation function with same data as previous",   function(done){
            let request_params = {
                "uid": "5dcb052790547cf14149159d",
                "starttime" : 1573643081,
                "endtime": 1573646681,
                "event": "BADMINTON",
                "period": "2 hrs"
            };
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/new/", requestOptions).then((response) => {
                expect(response.body.status).toBe(0);
                done();
            })
        });
    });

    describe("POST bookings/cancel/ /", function() {
        it("Testing cancellation of booking function with no params",   function(done){
            let request_params = {};
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/cancel/", requestOptions).then((response) => {
                expect(response.statusCode).toBe(400);
                done();
            })
        });

        it("Testing cancellation of booking function with valid params",   function(done){
            let request_params = {
                booking_id: "5dcc06fcc229d22b31cfb6a7"
            };
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/cancel/", requestOptions).then((response) => {
                expect(response.body.status).toBe(1);
                done();
            })
        });
    });

    describe("POST bookings/user/ /", function() {
        it("Testing listing of booking function with no params",   function(done){
            let request_params = {};
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/user/", requestOptions).then((response) => {
                expect(response.statusCode).toBe(400);
                done();
            })
        });

        it("Testing listing of booking function with valid params",   function(done){
            let request_params = {
                uid: "5dcb052790547cf14149159d"
            };
            const requestOptions = {
                qs: "",
                json: request_params,
                method: 'POST'
            };

            doRequest(base_url+"bookings/user/", requestOptions).then((response) => {
                expect(response.body.status).toBe(1);
                done();
            })
        });
    });
});




// perform request
const doRequest = (url, options) => {
    return new Promise(function (resolve, reject) {
        request(url, options, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                let return_body = {
                    res : res,
                    body : body
                }
                resolve(return_body);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = {
    doRequest
};

