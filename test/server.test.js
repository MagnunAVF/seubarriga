const supertest = require('supertest');

const request = supertest('https://www.google.com')

test('Must responds in 3001 port', () => {
    return request.get('/').then(res => expect(res.status).toBe(200));
})