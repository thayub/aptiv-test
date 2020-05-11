const helperFn = require('../services/default');


/**
 * Reset all the car details in the system
 * @return {Boolean}                -   True if reset is done.
 */
exports.resetCarDetails = () => {

    return helperFn.resetCarDetails().then((result) => {
        return result;
    });

}