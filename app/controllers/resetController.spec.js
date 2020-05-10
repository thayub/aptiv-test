const request = require('supertest');
const app = require('../../app');
const helperFn = require('../services/default');


describe('test POST /api/reset', () => {
    it('should successfully reset the app state and return 200', (done) => {
        // before
        const currentState = {
            timeUp: 17,
            initialPosition: [0, 0],
            cars: 2,
            carsData: [
                {
                    id: 1,
                    x: 2,
                    y: 4,
                    available: false,
                    timeRemaining: 1
                }
            ],
            time: 2
        };

        // Setting the state of the system manually
        helperFn.setFunctionData(currentState);

        // Calling the reset API now
        request(app)
            .put('/api/reset')
            .send()
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('The car details have been reset');
                const expectedResultState = helperFn.getFunctionData();
                expect(expectedResultState.carsData[0].x).toBe(0);
                expect(expectedResultState.carsData[0].y).toBe(0);
                expect(expectedResultState.carsData[0].available).toBe(true);
                expect(expectedResultState.carsData[0].timeRemaining).toBe(0);
                done();
            });
    });
});
