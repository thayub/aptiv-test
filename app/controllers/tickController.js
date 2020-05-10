const helperFn = require('../services/default');
const tickService = require('../services/tickService');



exports.incrementTime = (req, res, next) => {

    const tickServiceRes = tickService.incrementTimeFn();

    tickServiceRes.then((result) => {
            res.json({
                timeUp: result
            });
    }).catch(err => next(err));
};