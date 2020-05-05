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

    if (result.error !== (null || undefined)){
        res.status(400).json({
            message: 'The input is malformed, kindly check the structure'
        })
    }else{
        helperFn.getEmptyCars().then((availableCars) => {
            // finding the car which is available immediately
            findDistance(availableCars, req.body.source);
            // Updating the value after finalizing a car
        }).catch(err => next(err));


        res.status(200).json({
            message: 'proper input'
        })
    }

}

const findDistance = (availableCars, source) => {
    console.log('availableCars  inside method');
    console.log(source);
    availableCars.forEach((eachCar) => {
        const carDist = helperFn.calculateDist(eachCar, source);
        console.log("\n");
        console.log(carDist);
    });

}




exports.createBooking = createBooking;