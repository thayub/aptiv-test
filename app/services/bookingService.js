const helperFn = require('../services/default');



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