const helperFn = require('../services/default');


/**
 * Increment the time of the system by 1 unit.
 * @return {Integer}                -   The current time unit of the system
 */

exports.incrementTimeFn = () => {

    return helperFn.incrementTimeFn().then((result) => {
        return result;
    });

}