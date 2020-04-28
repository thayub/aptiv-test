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


