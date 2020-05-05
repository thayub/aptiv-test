const helperFn = require('../../app/helper/default');



exports.incrementTime = (req, res, next) => {
    helperFn.incrementTimeFn()
        .then((result) => {
            res.json({
                timeUp: result
            });
        })
        .catch(err => next(err));
};