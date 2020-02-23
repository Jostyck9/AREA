const request = require('supertest')
const app = require('../src/server')

let token = ''
let idCreated = 0

describe('Area', () => {
    it('Get an empty list', async () => {
        //register if not existing
        await request(app)
            .post('/auth/register')
            .send({
                email: 'test.test@test.fr',
                password: 'testtesttest',
                name: 'test'
            })

        let coRes = await request(app).post('/auth/login').send({
            email: 'test.test@test.fr',
            password: 'testtesttest'
        })
        token = coRes.body.token

        let res = await request(app)
            .get('/area')
            .set('Authorization', token)
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBe(0)
    })
})

describe('Area', () => {
    it('Should get error Missing field action_id when creating', async () => {
        let res = await request(app)
            .post('/area')
            .set('Authorization', token)
            .send({
                reaction_id: 0,
                parameters: {}
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Area', () => {
    it('Should get error Missing field reaction_id when creating', async () => {
        let res = await request(app)
            .post('/area')
            .set('Authorization', token)
            .send({
                action_id: 0,
                parameters: {}
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Area', () => {
    it('Should get error Missing field parameters when creating', async () => {
        let res = await request(app)
            .post('/area')
            .set('Authorization', token)
            .send({
                reaction_id: 0,
                action_id: 0
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Area', () => {
    it('Should get error missing var in parameters when creating', async () => {
        let res = await request(app)
            .post('/area')
            .set('Authorization', token)
            .send({
                action_id: 0,
                reaction_id: 0,
                parameters: {}
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Area', () => {
    it('Should create', async () => {
        let res = await request(app)
            .post('/area')
            .set('Authorization', token)
            .send({
                action_id: 0,
                reaction_id: 0,
                parameters: {message: 'ok'}
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Area', () => {
    it('Should list area', async () => {
        let res = await request(app)
            .get('/area')
            .set('Authorization', token)
        expect(res.statusCode).toEqual(200)
        res.body.forEach(element => {
            expect(element).toHaveProperty('id')
            expect(element).toHaveProperty('action_id')
            expect(element).toHaveProperty('reaction_id')
            expect(element).toHaveProperty('parameters')
            idCreated = element.id
        });
    })
})

describe('Area', () => {
    it('Should get the created area', async () => {
        let res = await request(app)
            .get('/area/' + idCreated)
            .set('Authorization', token)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('action_id')
        expect(res.body).toHaveProperty('reaction_id')
        expect(res.body).toHaveProperty('parameters')
    })
})

describe('Area', () => {
    it('Should delete an area', async () => {
        let res = await request(app)
            .delete('/area/' + idCreated)
            .set('Authorization', token)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Area', () => {
    it('Should get an error delete an area', async () => {
        let res = await request(app)
            .delete('/area/' + 200000)
            .set('Authorization', token)
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
    })
})