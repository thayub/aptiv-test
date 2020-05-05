const defaultConfig = require('../../config/config');

let functionData = {};

/**
 * Initializing the car data
 * @param  {Int} id : The id of the car
 * @return {Obj} : The car object that is initialized
 */
exports.initCar = (id) => {
    return {
      id: id + 1,
      x: defaultConfig.initialPosition[0],
      y: defaultConfig.initialPosition[1],
      available: true,
      timeRemaining: 0
    };
  };

/**
 * Init the Data object which will be used across the application
 * @param  {Object} config
 */
exports.initialProcessData = (config) => {
    functionData = config;
    console.log(functionData);

    for (let i = 0; i < config.cars; i += 1) {
        console.log(this.initCar(i));
        functionData.carsData.push(this.initCar(i));
    }
    console.log(functionData);
  };

/**
 * Get the present available cars from the memory
 * @return {Promise} -> Array of the cars []
 */

exports.getEmptyCars = () => {

    const carArray = new Promise((resolve, reject) => {
        resolve(functionData.carsData.filter(car => car.available === true));
    });
    return carArray;
}
/**
 * Distance between 2 points in a 2D matrix
 * @param  {Object} Source { x1 , y1 }
 * @param  {Object} Destination { x2 , y2 }
 * @return {Integer} - The computed distance between A and B
 */
exports.calculateDist = (source, destination) => {
    // Using the following formula : Distance in 2D  = √[( y2 –  y1)² + ( x1 –  x2)²]
    // https://www.npmjs.com/package/manhattan [REFERENCE]
    return Math.abs((destination.y - source.y) + (destination.x - source.x));
};



/**
 * Reset the JSON data which holds the car details
 * @return {Promise} - The final JSON data which is resolved to initial values.
 */
exports.resetCarDetails = () => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < functionData.carsData.length; i += 1) {
            functionData.carsData[i] = this.initCar(i);
        }
        resolve(true);
    });
};

/**
 * Update time service for the system by 1 tick
 * For each car:
 * - Reduce the time in total journey time
 * - Set eligible cars to available if their time is zero
 * @return {Promise}  Object which will be resolved
 */
exports.incrementTimeFn = () => {
    return new Promise((resolve , reject) => {
        functionData.timeUp++;
        functionData.carsData.forEach((eachCar, n) => {
            if(eachCar.time > 0)
                eachCar.time--;
            if(eachCar.time === 0)
                eachCar.available == true;
        });
        resolve(functionData.timeUp);
    });
};


/**
 * increment the service timeUp by 1
 * Which moves the system into the future by 1 unit/second every time it is called.
 * - Decrease the time remaining in each car by 1 unit to advance them
 * - If the time remaining is 0, then make the car available.
 * @return {Promise}
 */
exports.incrementTimeUnit = () => {
    return new Promise((resolve, reject) => {
        // increment the service up time
        serviceData.timeServiceUp += 1;
        // update cars
        serviceData.carData.forEach((car, i) => {
            if (car.timeRemaining > 0) {
                car.timeRemaining -= 1;
            }
            if (car.timeRemaining === 0) {
                car.available = true;
            }
        });
        resolve(serviceData.timeServiceUp);
    });
};


/**
 * Booking a car
 * 1. set available to false
 * 2. set its position to the final trip position
 * 3. set its time to the total length of its journey time , since it will be blocked during those time
 * @param {Integer} - carId
 * @param {Object} - final grid position { x: , y: }
 * @param {Integer} - time for which it is booked, ie total journey time
 * @return {Promise} - Promise object which resolves after updating the Data JSON
 */
exports.bookCar = (carId, finalGridPosition, bookingTime) => {
    return new Promise((resolve, reject) => {
        this.getCarById(carId).then((car) => {
            // updating car details
            car.available = false;
            car.x = finalGridPosition.x;
            car.y = finalGridPosition.y;
            car.time = bookingTime;
            resolve(true);
        });
    });
}



/**
 * Set the function data object with a state that needs to be super imposed
 * @param {Object} - The current state of the system which needs to be set.
 * @return Nothing to return, internal state change
 */
exports.setFunctionData = (currentStateData) => {
    functionData = currentStateData;
}
/**
 * Get the current functionData representing the current state of the app
 * @param null
 * @return {Object} Returns the current functionData Object indicating the current data state of the application
 */
exports.getFunctionData = () => {
    return functionData;
}

/**
 * Get car by id
 * @param  {Integer} - carId
 * @return {Promise} - The car object from the functionData in memory
 */
exports.getCarById = (carId) => {
    const carData = new Promise((resolve, reject) => {
        resolve(functionData.carsData.find(car => car.id === carId));
    });

    return carData;
};