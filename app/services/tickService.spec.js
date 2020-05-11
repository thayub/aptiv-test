const helperfn = require('./default');
const tickService = require('./tickService');



beforeEach(() => {
    jest.resetAllMocks();
});


describe('incrementTimeFn', () => {
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
    test('it should return the value 5 for the data above', (done) => {
        tickService.incrementTimeFn().then((data) => {
            expect(data).toBe(5);
            done();
        });
    });
});