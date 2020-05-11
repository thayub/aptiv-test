const resetService = require('../services/default');


/**
 * Reset all the car details and return them to the initial state which is [0,0]
 * @return {Object}                 -   The message that the car details have been reset
 */

exports.resetCarDetails = (req, res, next) => {

    const resetVar = resetService.resetCarDetails()
    resetVar.then((result) => {
        if (result == true){
            res.status(200).json({
                message: 'The car details have been reset'
            });
        }
    }).catch(err => next(err));
};