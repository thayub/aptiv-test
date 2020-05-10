const helperFn = require('../services/default');
const resetService = require('../services/default');


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