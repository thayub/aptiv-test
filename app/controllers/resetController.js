const helperFn = require('../../app/helper/default');


exports.resetCarDetails = (req, res, next) => {

    console.log("in reset controller");

    const resetVar = helperFn.resetCarDetails()
    resetVar.then((result) => {
        res.status(200).json({
            message: 'The car details have been reset'
        });
    }).catch(err => next(err));
};