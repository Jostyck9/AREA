const request = require('supertest')
const app = require('../src/server')

let token = ''

describe('Auth', () => {
    it('Should get a missing email error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                password: 'zertyuio',
                name: 'hugo'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get a missing password error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                name: 'hugo'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get a missing name error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                password: 'tryuioiiuehfuih'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get a missing name error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                password: 'tryuioiiuehfuih'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get an invalid email error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.testtest.fr',
                password: 'tryuioiiuehfuih',
                name: 'hugo'
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get an invalid password error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                password: 'tr',
                name: 'hugo'
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get an invalid username error for register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.testtest.fr',
                password: 'tryuioiiuehfuih',
                name: ''
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should register a user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                password: 'testtesttest',
                name: 'test'
            })
        expect(!res.body).toBe(false)
    })
})

describe('Auth', () => {
    it('Should get an error already existing user', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                password: 'testtesttest',
                name: 'test'
            })
        expect(res.statusCode).toEqual(403)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should connect the user', async () => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test.test@test.fr',
                password: 'testtesttest',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
        expect(res.body.token.lenght).not.toBe(0)
        token = res.body.token
    })
})

describe('Auth', () => {
    it('Should get an error for inexisting user', async () => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test.testtestzdkjjdoj.fr',
                password: 'testtesttest',
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get an error for missing email field', async () => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                password: 'testtesttest'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get an error for missing password field', async () => {
        let res = await request(app)
            .post('/auth/login')
            .send({
                email: 'testtest@test.fr'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should get an error logout', async () => {
        let res = await request(app)
            .post('/auth/logout')
            .set('Authorization', 'jruijeroiffjo')
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Auth', () => {
    it('Should logout', async () => {
        let res = await request(app)
            .post('/auth/logout')
            .set('Authorization', token)
        expect(res.statusCode).toEqual(200)
    })
})