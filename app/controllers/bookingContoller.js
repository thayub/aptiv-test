const Joi = require("@hapi/joi");
const helperFn = require('../../app/helper/default');
const errorMessage = require('http-errors');


const schema = Joi.object().keys({
    source: Joi.required(),
    destination: Joi.required()
});

const createBooking =  (req, res, next) => {
    console.log("iInside the controller");
    const result = schema.validate(req.body);
    console.log("=-=-=-=");
    console.log(result.error);
    if (result.error !== (null || undefined)){
        res.status(400).json({
            message: 'The input is malformed, kindly check the structure'
        })
    }else{
        res.status(200).json({
            message: 'proper input'
        })
    }
    helperFn.getEmptyCars().then((availableCars) => {
        // finding the car which is available immediately
        console.log('availableCars');
        console.log(availableCars);
        // Updating the value after finalizing a car
    }).catch(err => next(err));
}


exports.createBooking = createBooking;