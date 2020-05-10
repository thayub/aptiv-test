const Joi = require("@hapi/joi");
const helperFn = require('../services/default');
const errorMessage = require('http-errors');
const bookingService = require('../services/bookingService');


const schema = Joi.object().keys({
    source: Joi.required(),
    destination: Joi.required()
});

exports.createBooking =  (req, res, next) => {

    const result = schema.validate(req.body);

    if (result.error !== (null || undefined)){
        res.status(400).json({
            message: 'The input is malformed, kindly check the structure'
        });

    }else{

        bookingService.getEmptyCars().then((availableCars) => {
            minimumCarDetails = bookingService.getMinimumCarDetails(availableCars, req.body.source);
        if (minimumCarDetails.car_id != null){

            const totalJourneyTime = bookingService.getTotalTime(req.body.source, req.body.destination, minimumCarDetails.min_distance);

            const bookCarObj = bookingService.bookCar(req.body.destination, minimumCarDetails.car_id,totalJourneyTime);

            bookCarObj.then((result) => {
                if (result == true){
                    res.json({
                        car_id:minimumCarDetails.car_id,
                        total_time: totalJourneyTime
                    });
                }else{
                    res.json({});
                }
            });
        } else {
            res.json({});
        }
        }).catch(err => next(err));
    }
}

exports.currentState = (req, res) => {
    const result = helperFn.getFunctionData();
    res.status(200).json({
        result : result
    });
}