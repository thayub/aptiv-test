const helperFn = require('../services/default');
const winston = require('winston');
const logger = require('../../lib/logger');



exports.createBooking = (req, res) => {

    this.getEmptyCars().then((availableCars) => {
        minimumCarDetails = this.getMinimumCarDetails(availableCars, req.body.source);
        if (minimumCarDetails.car_id != null){

            const totalJourneyTime = this.getTotalTime(req.body.source, req.body.destination, minimumCarDetails.min_distance);

            const bookCarObj = this.bookCar(req.body.destination, minimumCarDetails.car_id,totalJourneyTime);

            bookCarObj.then((result) => {

                if (result == true){
                    // sample logging :
                    logger.log({
                        level: 'info', message: JSON.stringify({car_id:minimumCarDetails.car_id, total_time: totalJourneyTime}), meta: { service: 'booking-service' },
                    });

                    res.json({
                        car_id:minimumCarDetails.car_id,
                        total_time: totalJourneyTime
                    });
                }else{
                    res.json({});
                }
            });
        } else {
            res.json({});
        }
    });

}


exports.getEmptyCars = () => {
    return helperFn.getEmptyCars().then((result) => {
        return result;
    });
}

exports.getMinimumCarDetails = (availableCars, source) => {

    let minimumCarDistance = Infinity;
    let minimumCarId = null;

    availableCars.forEach((eachCar) => {
        const carDist = helperFn.calculateDist(eachCar, source);
        // Choose the car Id with the least car ID and distance
        if (carDist < minimumCarDistance) {
            minimumCarDistance = carDist;
            minimumCarId = eachCar.id;
        }else if (carDist === minimumCarDistance){
            minimumCarId = minimumCarId ? ((eachCar.id < minimumCarId) ? eachCar.id : minimumCarId) : eachCar.id;
        }
    });
    return  {
                car_id:minimumCarId,
                min_distance: minimumCarDistance
            }

}

exports.getTotalTime = (source, destination, minDistance) => {

    const customerJourneyTripTime = helperFn.calculateDist(source, destination);
    const totalJourneyTime = minDistance + customerJourneyTripTime
    return totalJourneyTime;

}

exports.bookCar = (destination, minimumCarId, totalTime) => {
    return helperFn.bookCar(minimumCarId, destination, totalTime).then((result) => {
        return result;
    });
}