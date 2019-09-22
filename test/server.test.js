const supertest = require('supertest');

const request = supertest('http://localhost:3001')

test('Must responds in 3001 port', () => {
    return request.get('/').then(res => expect(res.status).toBe(200));
})