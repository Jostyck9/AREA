const request = require('supertest')
const app = require('../src/server')

describe('Services', () => {
    it('should get all the services', async () => {
        const res = await request(app)
            .get('/services')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(typeof (res.body)).toBe('object')
        expect(typeof (res.body)).not.toHaveLength(0)
        res.body.forEach(element => {
            expect(element).toHaveProperty('name')
            expect(element).toHaveProperty('id')
            expect(element).toHaveProperty('actions')
            expect(element).toHaveProperty('reactions')
            element.actions.forEach(elementAction => {
                expect(elementAction).toHaveProperty('name')
                expect(elementAction).toHaveProperty('description')
                expect(elementAction).toHaveProperty('id')
                expect(elementAction).toHaveProperty('results')
            })
            element.reactions.forEach(elementReaction => {
                expect(elementReaction).toHaveProperty('name')
                expect(elementReaction).toHaveProperty('description')
                expect(elementReaction).toHaveProperty('id')
                expect(elementReaction).toHaveProperty('parameters')
            })
        });
    })
})

describe('Services', () => {
    it('should get the service with Github', async () => {
        let res = await request(app)
            .get('/services/github')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/GitHUb')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the service with mail', async () => {
        let res = await request(app)
            .get('/services/mail')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/Mail')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the service with Spotify', async () => {
        let res = await request(app)
            .get('/services/spotify')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/SpotIfy')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the service with Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/TwItteR')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the service with timer', async () => {
        let res = await request(app)
            .get('/services/timer')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/timEr')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the service with dropbox', async () => {
        let res = await request(app)
            .get('/services/dropbox')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/dRopBox')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the service with Discord', async () => {
        let res = await request(app)
            .get('/services/discord')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })

        res = await request(app)
            .get('/services/DisCord')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('actions')
        expect(res.body).toHaveProperty('reactions')
        res.body.actions.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
        res.body.reactions.forEach(elementReaction => {
            expect(elementReaction).toHaveProperty('name')
            expect(elementReaction).toHaveProperty('description')
            expect(elementReaction).toHaveProperty('id')
            expect(elementReaction).toHaveProperty('parameters')
        })
    })
})


describe('Services', () => {
    it('should get an error', async () => {
        let res = await request(app)
            .get('/services/zdidzhpo')
            .send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Services', () => {
    it('should get the actions of Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter/actions')
            .send()
        expect(res.statusCode).toEqual(200)
        res.body.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('results')
        })
    })
})

describe('Services', () => {
    it('should get an error for unknow service action', async () => {
        let res = await request(app)
            .get('/services/gzyugeduihzeddoijzeij/actions')
            .send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Services', () => {
    it('should get an error for unknow service reactions', async () => {
        let res = await request(app)
            .get('/services/gzyugeduihzeddoijzeij/reactions')
            .send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Services', () => {
    it('should get the reactions of Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter/reactions')
            .send()
        expect(res.statusCode).toEqual(200)
        res.body.forEach(elementAction => {
            expect(elementAction).toHaveProperty('name')
            expect(elementAction).toHaveProperty('description')
            expect(elementAction).toHaveProperty('id')
            expect(elementAction).toHaveProperty('parameters')
        })
    })
})

describe('Services', () => {
    it('should get the precise reaction of Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter/reactions/tweet')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('parameters')
    })
})

describe('Services', () => {
    it('should get the precise action of Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter/actions/tweet')
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('description')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('results')
    })
})

describe('Services', () => {
    it('should get an error for the precise reaction of Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter/reactions/tweeteiuiz')
            .send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Services', () => {
    it('should get an error for the precise action of Twitter', async () => {
        let res = await request(app)
            .get('/services/twitter/actions/tweeteiuiz')
            .send()
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
    })
})