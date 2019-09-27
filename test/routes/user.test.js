const request = require('supertest');
const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

test('Should return all users ', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test('Should insert an user with success', () => {
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

test('Should NOT insert user WITHOUT email', async () => {
    const result = await request(app).post('/users')
        .send({ name: 'Walter Mitty', passwd: '123456' })

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email must be present!');
});

test('Should NOT insert user WITHOUT password ', (done) => {
    request(app).post('/users')
        .send({ name: 'Walter Mitty', mail: 'walter@mail.com' })
        .then((result) => {
            expect(result.status).toBe(400);
            expect(result.body.error).toBe('Password must be present!');
            done();
        })
        .catch(error => done.fails(error));
});

test('Should NOT insert user with an existing email', () => {
    return request(app).post('/users')
        .send({ name: 'Walter Mitty', mail, passwd: '123456' })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('This user exists in db !');
        });
});