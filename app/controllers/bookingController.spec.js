const request = require('supertest');
const app = require('../../app');
const bookingController = require('./bookingController');
const helperFn = require('../../app/helper/default');


describe('test POST /api/book', () => {
    it('should return 400 if source is missing from body', (done) => {
        request(app)
            .post('/api/book')
            .send({ destination: {} })
            .expect(400)
            .then((res) => {
                console.log(res.body);
                console.log("-=-=-=-=-=-=-");
                expect(res.body.message).toBe('The input is malformed, kindly check the structure');
                done();
            });
    });
});


describe('test POST /api/status', () => {
    it('should return 200 and give the curernt status of the system', (done) => {
        // CURRENT STATE TO BE CHECKED WITH
        const stateCheck = {
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
            .post('/api/status')
            .send()
            .expect(200)
            .then((res) => {
                const newState = helperFn.getFunctionData();
                expect(newState.timeUp).toBe(4);
                expect(newState.carsData[0].available).toBe(false);
                expect(newState.carsData[0].timeRemaining).toBe(1);
                expect(newState.carsData[1].available).toBe(false);
                expect(newState.carsData[1].timeRemaining).toBe(4);
                expect(newState.carsData[2].available).toBe(true);
                expect(newState.carsData[2].timeRemaining).toBe(0);
                done();
            });
    });
});