const helperFn = require('../services/default');
const bookingService = require('../services/bookingService');



/**
 * Create the booking for the car based on the source and destination
 * @param  {Object}  req            -   The X, Y co-ordinates of the source and destination
 * @return {Object}                 -   The car id and the total time unit of the operation
 */

exports.createBooking =  (req, res) => {
    const isSchemaValid = bookingService.validateReq(req.body);

    if (isSchemaValid.hasOwnProperty("error")) {
        res.status(400).json({
            message: 'The input is malformed, kindly check the structure'
        });
    }else{
        const response  = bookingService.createBooking(req, res);
        return response;
    }
}
/**
 * Returns the current state of the system
 * @return {Object}                 -   The current time unit of system and the list of cars available with their X,Y and the availability.
 */
exports.currentState = (req, res) => {
    const result = helperFn.getFunctionData();
    res.status(200).json({
        result : result
    });
}