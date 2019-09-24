const request = require('supertest');

const app = require('../../src/app');

test('Should return all users ', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test('Should insert an user with success', () => {
    const mail = `${Date.now()}@mail.com`;
    return request(app).post('/users')
        .send({ name: 'Walter Mitty', mail, passwd: '123456' })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Walter Mitty');
        });
});

test('Should NOT insert user WITHOUT name', () => {
    return request(app).post('/users')
        .send({ mail: 'walter@mail.com', passwd: '123456' })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Name must be present!');
        });
});