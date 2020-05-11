const tickService = require('../services/tickService');




/**
 * Increment the time unit of the system by 1 unit
 * @return {Object}                 -   The latest couter of the time unit with the key `timeUp`
 */
exports.incrementTime = (req, res, next) => {

    const tickServiceRes = tickService.incrementTimeFn();
    tickServiceRes.then((result) => {
            res.json({
                timeUp: result
            });
    }).catch(err => next(err));
};