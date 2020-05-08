const request = require('supertest');
const app = require('../../app');
const helperFn = require('../helper/default');


describe('test POST /api/tick', () => {
    it('should successfully increment timeUp and return all other values as well', (done) => {
        // CURRENT STATE TO BE CHECKED WITH
        const stateCheck = {
            timeUp: 4,
            initPosition: [0, 0],
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
                    x: 1,
                    y: 4,
                    available: false,
                    timeRemaining: 4
                },
                {
                    id: 3,
                    x: 4,
                    y: 4,
                    available: true,
                    timeRemaining: 0
                }
            ]
        };
        helperFn.setFunctionData(stateCheck);

        request(app)
            .post('/api/tick')
            .send()
            .expect(200)
            .then((res) => {
                expect(res.body.timeUp).toBe(5);
                const newState = helperFn.getFunctionData();
                expect(newState.timeUp).toBe(5);
                expect(newState.carsData[0].available).toBe(true);
                expect(newState.carsData[0].timeRemaining).toBe(0);
                expect(newState.carsData[1].available).toBe(false);
                expect(newState.carsData[1].timeRemaining).toBe(3);
                expect(newState.carsData[2].available).toBe(true);
                expect(newState.carsData[2].timeRemaining).toBe(0);
                done();
            });
    });
});
