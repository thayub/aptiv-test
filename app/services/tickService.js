const helperFn = require('../services/default');


exports.incrementTimeFn = () => {

    return helperFn.incrementTimeFn().then((result) => {
        return result;
    });

}