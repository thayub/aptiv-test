const helperfn = require('./default');


beforeEach(() => {
    jest.resetAllMocks();
});

describe('initialProcessData', () => {
    beforeEach(() => {
        helperfn.initCar = jest.fn();
    });
    test('should have called object initiation 3 times', () => {
        // Initial Value
        const configToTest = { cars: 3, carsData: [] };
        // After the test
        helperfn.initialProcessData(configToTest);
        expect(helperfn.initCar).toHaveBeenCalledTimes(3);
    });
    test('should have called object initiation 0 times', () => {
        // Initial Value
        const configToTest = { cars: 0, carsData: [] };
        // After the test
        helperfn.initialProcessData(configToTest);
        expect(helperfn.initCar).toHaveBeenCalledTimes(0);
    });
});

describe('resetCarDetails', () => {
    beforeEach(() => {
        helperfn.initCar = jest.fn();
    });
    test('should have returned true & called initCar 6 (3+3) times', (done) => {
        // Before : initialProcessData with configToTest
        const configToTest = { cars: 5, carsData: [] };
        helperfn.initialProcessData(configToTest);

        helperfn.resetCarDetails().then((data) => {
            expect(data).toBe(true);
            expect(helperfn.initCar).toHaveBeenCalledTimes(5 + 5);
            done();
        });
    });
    test('should have returned true & called initCar 0 times', (done) => {
        // Before : initialProcessData with configToTest values
        const configToTest = { cars: 0, carsData: [] };
        helperfn.initialProcessData(configToTest);
        // Testing
        helperfn.resetCarDetails().then((data) => {
            expect(data).toBe(true);
            expect(helperfn.initCar).toHaveBeenCalledTimes(0 + 0);
            done();
        });
    });
});

describe('calculateDist', () => {
    test('should return 0 if source & destination are the same', () => {
        const SOURCE = { x: 2, y: 2 };
        const DESTINATION = { x: 2, y: 2 };
        expect(helperfn.calculateDist(SOURCE, DESTINATION)).toBe(0);
    });
    test('should return correct value with source & destination positive', () => {
        const SOURCE = { x: 1, y: 1 };
        const DESTINATION = { x: 2, y: 2 };
        expect(helperfn.calculateDist(SOURCE, DESTINATION)).toBe(2);
    });
    test('should return correct value with source & destination negative', () => {
        const SOURCE = { x: -1, y: -1 };
        const DESTINATION = { x: -2, y: -2 };
        expect(helperfn.calculateDist(SOURCE, DESTINATION)).toBe(2);
    });
    test('should return correct value with source positive & destination negative', () => {
        const SOURCE = { x: 1, y: 1 };
        const DESTINATION = { x: -2, y: -2 };
        expect(helperfn.calculateDist(SOURCE, DESTINATION)).toBe(6);
    });
    test('should return correct value with source negative & destination positive', () => {
        const SOURCE = { x: -1, y: -1 };
        const DESTINATION = { x: 2, y: 2 };
        expect(helperfn.calculateDist(SOURCE, DESTINATION)).toBe(6);
    });
});

describe('getEmptyCars', () => {
    const configToTest = {
        timeUp: 8,
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
    test('it should return only the available car in an array', (done) => {
        helperfn.getEmptyCars().then((data) => {
            expect(data).toEqual([configToTest.carsData[0]]);
            done();
        });
    });
});

describe('bookCar', () => {
    const configToTest = {
        timeUp: 10,
        intialPosition: [0, 0],
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
    beforeEach(() => {
        helperfn.setFunctionData(configToTest);
    });
    test('it should update the car data and return true', (done) => {
        const bookingObj = {
            carId: 2,
            finalGridPosition: { x: 1, y: 1 },
            timeRemaining: 10
        };
        helperfn.bookCar(bookingObj.carId, bookingObj.finalGridPosition, bookingObj.timeRemaining).then((data) => {
            expect(data).toEqual(true);
            const newConfigToTest = helperfn.getFunctionData();
            expect(newConfigToTest.carsData[1].available).toBe(false);
            expect(newConfigToTest.carsData[1].x).toBe(bookingObj.finalGridPosition.x);
            expect(newConfigToTest.carsData[1].y).toBe(bookingObj.finalGridPosition.y);
            expect(newConfigToTest.carsData[1].timeRemaining).toBe(bookingObj.timeRemaining);
            done();
        });
    });
});

describe('incrementTimeFn', () => {
    describe('timeUp field', () => {
        test('should increment the timeUp field by 1(unit) and return that value', (done) => {
            // before: set current state
            const stateToSet = {
                timeUp: 9,
                intialPosition: [0, 0],
                cars: 0,
                carsData: []
            };
            helperfn.setFunctionData(stateToSet);
            // test
            helperfn.incrementTimeFn().then((data) => {
                expect(data).toBe(10);
                const newStateValues = helperfn.getFunctionData();
                expect(newStateValues.timeUp).toBe(10);
                done();
            });
        });
    });
});