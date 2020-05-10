const helperFn = require('../services/default');


exports.resetCarDetails = () => {

    return helperFn.resetCarDetails().then((result) => {
        return result;
    });

}