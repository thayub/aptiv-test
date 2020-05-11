const helperFn = require('../services/default');
const Joi = require("@hapi/joi");
const logger = require('../../lib/logger');


/**
 * Schema to check the integrity of the incoming request
 * @param {Object}  req object - contains source {x1, y1} and destination {x2, y2}
 * @return {Object} validated result
 */

const schema = Joi.object().keys({
    source: Joi.object().keys({
            x: Joi.number().integer().min(-2147483648).max(2147483647).required(), // Using the raw values, and checking for integer is not accurate
            y: Joi.number().integer().min(-2147483648).max(2147483647).required()
        }),
    destination: Joi.object().keys({
        x: Joi.number().integer().min(-2147483648).max(2147483647).required(),
        y: Joi.number().integer().min(-2147483648).max(2147483647).required()
    })
});

/**
 * Checking the validity of incoming request
 * @param  {Object} req object - contains source {x1, y1} and destination {x2, y2}
 * @return {Boolean}
 */

exports.validateReq = (reqData) => {

    const validateRes = schema.validate(reqData);
    return validateRes;
}

/**
 * Booking service that helps in booking the car and returns the car id and distance, null if it does not match criteria
 * @param  {Object} req object - contains source {x1, y1} and destination {x2, y2}
 * @return {Object} - {car_id: a , total_time: t }
 */

exports.createBooking = (req, res) => {

    this.getEmptyCars().then((availableCars) => {
        minimumCarDetails = this.getMinimumCarDetails(availableCars, req.body.source);
        if (minimumCarDetails.car_id != null){

            const totalJourneyTime = this.getTotalTime(req.body.source, req.body.destination, minimumCarDetails.min_distance);

            const bookCarObj = this.bookCar(req.body.destination, minimumCarDetails.car_id,totalJourneyTime);

            bookCarObj.then((result) => {

                if (result == true){
                    // sample logging :
                    logger.log({
                        level: 'info', message: JSON.stringify({car_id:minimumCarDetails.car_id, total_time: totalJourneyTime}), meta: { service: 'booking-service' },
                    });

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
    });

}

/**
 * This service returns an array of cars available in ths system, which are free to be booked
 * @return {Object} of car Arrays
 */

exports.getEmptyCars = () => {
    return helperFn.getEmptyCars().then((result) => {
        return result;
    });
}


/**
 * Get the minimum distance between available cars and the source from the new booking to be done
 * @param  {Array}  availableCars   -   Array of the available cars
 * @param  {Object} source          -   The X, Y co-ordinates of the source
 * @return {Object}                 -   The smallest car id and the minimum distance
 */
exports.getMinimumCarDetails = (availableCars, source) => {

    let minimumCarDistance = Infinity;
    let minimumCarId = null;

    availableCars.forEach((eachCar) => {
        const carDist = helperFn.calculateDist(eachCar, source);
        // Choose the car Id with the least car ID and distance
        if (carDist < minimumCarDistance) {
            minimumCarDistance = carDist;
            minimumCarId = eachCar.id;
        }else if (carDist === minimumCarDistance){
            minimumCarId = minimumCarId ? ((eachCar.id < minimumCarId) ? eachCar.id : minimumCarId) : eachCar.id;
        }
    });
    return  {
                car_id:minimumCarId,
                min_distance: minimumCarDistance
            }

}

/**
 * Get the total time for the car to reach source and then the destination
 * @param  {Object} source          -   The X, Y co-ordinates of the source
 * @param  {Object} destination     -   The X, Y co-ordinates of the destination
 * @param  {Object} minDistance     -   The minimum distance between the cars and the source
 * @return {Integer}                -   The total time of the journey from current position to reach destination
 */

exports.getTotalTime = (source, destination, minDistance) => {

    const customerJourneyTripTime = helperFn.calculateDist(source, destination);
    const totalJourneyTime = minDistance + customerJourneyTripTime
    return totalJourneyTime;

}


/**
 * Update the car to be booked , and return the status
 * @param  {Object} destination     -   The X, Y co-ordinates of the destination
 * @param  {Integer} minCarId       -   The car with the least ID
 * @param  {Integer} totalTime      -   The total time of the journey from current position to reach destination
 * @return {Boolean}                -   True if the car is booked.
 */

exports.bookCar = (destination, minimumCarId, totalTime) => {
    return helperFn.bookCar(minimumCarId, destination, totalTime).then((result) => {
        return result;
    });
}