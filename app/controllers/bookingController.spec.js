const request = require('supertest');
const app = require('../../app');
const bookingController = require('./bookingContoller');
const helpers = require('../../app/helper/default');


describe('test POST /api/book', () => {
    it('should return 400 if source is missing from body', (done) => {
        request(app)
            .post('/api/book')
            .send({ destination: {} })
            .expect(400)
            .then((res) => {
                console.log(res.body);
                console.log("-=-=-=-=-=-=-");
                expect(res.body.message).toBe('Missing source');
                done();
            });
    });
});