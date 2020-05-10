const helperfn = require('./default');
const bookingService = require('./bookingService');



beforeEach(() => {
    jest.resetAllMocks();
});


describe('getEmptyCars', () => {
    const configToTest = {
        timeUp: 4,
        initialPosition: [0, 0],
        cars: 2,
        carsData: [
            {
                id: 1,
                x: 2,
                y: 4,
                available: true,
                timeRemaining: 1
            },
            {
                id: 2,
                x: 4,
                y: 6,
                available: false,
                timeRemaining: 0
            }
        ]
    };
    beforeEach(() => {
        helperfn.setFunctionData(configToTest);
    });
    test('it should return only the available cars in an array', (done) => {
        bookingService.getEmptyCars().then((data) => {
            expect(data.length).toBe(1);
            done();
        });
    });
});


describe('getMinimumCarDetails', () => {
    const configToTest = {
        timeUp: 4,
        initialPosition: [0, 0],
        cars: 2,
        carsData: [
            {
                id: 1,
                x: 2,
                y: 4,
                available: false,
                timeRemaining: 1
            },
            {
                id: 2,
                x: 4,
                y: 6,
                available: true,
                timeRemaining: 0
            }
        ]
    };
    const availableCars = [
            {
                id: 1,
                x: 2,
                y: 4,
                available: false,
                timeRemaining: 1
            },
            {
                id: 2,
                x: 4,
                y: 6,
                available: true,
                timeRemaining: 0
            }
        ];
    const source = { x: 0, y: 0};

    beforeEach(() => {
        helperfn.setFunctionData(configToTest);
    });

    test('it should return the least car ID and the minimum distance', () => {
        let resToCheck = bookingService.getMinimumCarDetails(availableCars, source);
        expect(resToCheck.car_id).toEqual(1);
        expect(resToCheck.min_distance).toEqual(6);
    });

});

describe('getMinimumCarDetails', () => {
    const configToTest = {
        timeUp: 1,
        initialPosition: [0, 0],
        cars: 2,
        carsData: [
            {
                id: 1,
                x: 2,
                y: 4,
                available: false,
                timeRemaining: 1
            },
            {
                id: 2,
                x: 0,
                y: 0,
                available: true,
                timeRemaining: 0
            },
            {
                id: 3,
                x: 0,
                y: 0,
                available: true,
                timeRemaining: 0
            }
        ]
    };
    const availableCars = [
        {
            id: 1,
            x: 2,
            y: 4,
            available: false,
            timeRemaining: 1
        },
        {
            id: 2,
            x: 0,
            y: 0,
            available: true,
            timeRemaining: 0
        },
        {
            id: 3,
            x: 0,
            y: 0,
            available: true,
            timeRemaining: 0
        }
    ];
    const source = { x: 0, y: 0};

    beforeEach(() => {
        helperfn.setFunctionData(configToTest);
    });

    test('it should return the least car ID and the minimum distance with edge condition , it returns the car with lower ID', () => {
        let resToCheck = bookingService.getMinimumCarDetails(availableCars, source);
        expect(resToCheck.car_id).toEqual(2);
        expect(resToCheck.min_distance).toEqual(0);
    });

});

describe('getTotalTime', () => {
    const source = { x: 0, y: 0};
    const destination = { x: 4, y: 4};
    const minDistance = 4;

    test('it should return the total time of the operation', () => {
        let resToCheck = bookingService.getTotalTime(source, destination, minDistance);
        expect(resToCheck).toEqual(12);
    });

});


describe('bookCar', () => {
    const minimumCarId = 1;
    const destination = { x: 4, y: 4};
    const totalTime = 12;

    const configToTest = {
        timeUp: 0,
        initialPosition: [0, 0],
        cars: 1,
        carsData: [
            {
                id: 1,
                x: 0,
                y: 0,
                available: true,
                timeRemaining: 0
            }
        ]
    };
    beforeEach(() => {
        helperfn.setFunctionData(configToTest);
    });


    test('it should return true after booking the car', () => {
        let resToCheck = bookingService.bookCar(destination, minimumCarId, totalTime);
        resToCheck.then((result) => {
            expect(result).toBe(true);
        })

    });

});