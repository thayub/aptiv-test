const helperfn = require('./default');
const resetService = require('./resetService');



beforeEach(() => {
    jest.resetAllMocks();
});


describe('resetCarDetails', () => {
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
    test('it should return the status as true after reset', (done) => {
        resetService.resetCarDetails().then((data) => {
            expect(data).toBe(true);
            done();
        });
    });
});