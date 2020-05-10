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
        const response  = bookingService.createBooking(req, res);
        return response;

    }
}

exports.currentState = (req, res) => {
    const result = helperFn.getFunctionData();
    res.status(200).json({
        result : result
    });
}