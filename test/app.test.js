const request = require('supertest');

const app = require('../src/app');

test('Should respond in root', () => {
    return request(app).get('/')
        .then(res => {
            expect(res.status).toBe(200)
        })
})