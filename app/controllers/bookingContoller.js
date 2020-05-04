const Joi = require("@hapi/joi");
const helperFn = require('../../app/helper/default');



const schema = Joi.object().keys({
    source: Joi.required(),
    destination: Joi.required()
});

const createBooking =  (req, res, next) => {
    console.log(req.body);
    console.log(req.body.destination);
    const result = schema.validate(req.body);
    console.log("=-=-=-=");
    console.log(result.error);
    if (result.error !== null || undefined){
        // next(createError(400, 'The input is malformed, kindly check the structure'));
        res.status(422).json({
            message: 'The input is malformed, kindly check the structure'
        })
    }
    helperFn.getEmptyCars().then((availableCars) => {
        // finding the car which is available immediately
        // Updating the value after finalizing a car
    }).catch(err => next(err));
}


exports.createBooking = createBooking;