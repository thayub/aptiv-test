const Joi = require("@hapi/joi");
const helperFn = require('../../app/helper/default');
const errorMessage = require('http-errors');


const schema = Joi.object().keys({
    source: Joi.required(),
    destination: Joi.required()
});

const createBooking =  (req, res, next) => {
    console.log("iInside the controller");
    const result = schema.validate(req.body);

    if (result.error !== (null || undefined)){
        res.status(400).json({
            message: 'The input is malformed, kindly check the structure'
        });
    }else{
        // Getting all cars which are available for booking
        let minimumCarDistance = Infinity;
        let minimumCarId = null;
        helperFn.getEmptyCars().then((availableCars) => {
            // console.log("availableCarsavailableCarsavailableCarsavailableCarsavailableCars");
            // console.log(availableCars);
            // console.log(req.body.source);
            // console.log(req.body.destination);

            // Finding the distance with all the cars and the source given by the user
            availableCars.forEach((eachCar) => {
                const carDist = helperFn.calculateDist(eachCar, req.body.source);
                console.log("each car distance");
                console.log(carDist + '-----------'+ eachCar.id);

                // Choose the car Id with the least car ID and distance
                if (carDist < minimumCarDistance) {
                    minimumCarDistance = carDist;
                    minimumCarId = eachCar.id;
                }else if (carDist === minimumCarDistance){
                    minimumCarId = minimumCarId ? ((eachCar.id < minimumCarId) ? eachCar.id : minimumCarId) : eachCar.id;
                }
            });

            if (minimumCarId){
                // car with minimum ID and the least distance exists
                // 1. Find distance from car to customer {minimumCarDistance}
                // 2. Distance for journey
                const customerJourneyTripTime = helperFn.calculateDist(req.body.source, req.body.destination);
                // 3. Add 1 & 2
                const totalJourneyTime = minimumCarDistance + customerJourneyTripTime
                // 4. set the car to be booked
                console.log('minimumCarId'+minimumCarId);

                helperFn.bookCar(minimumCarId, req.body.destination, totalJourneyTime).then((result) => {
                    res.json({
                        car_id:minimumCarId,
                        total_time: totalJourneyTime
                    });
                });
            } else {
                // sending empty response since there is no car available
                res.json({});
            }

        }).catch(err => next(err));
    }

}

exports.currentState = (req, res, next) => {
    const result = helperFn.getFunctionData();
    res.status(200).json({
        result : result
    });
}



exports.createBooking = createBooking;