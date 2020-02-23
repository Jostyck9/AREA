const request = require('supertest')
const app = require('../src/server')

describe('About', () => {
  it('should get the about message', async () => {
    const res = await request(app)
      .get('/about.json')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('client')
    expect(res.body).toHaveProperty('client.host')
    expect(res.body).toHaveProperty('server')
    expect(res.body).toHaveProperty('server.current_time')
    expect(res.body).toHaveProperty('server.services')
    res.body.server.services.forEach(element => {
      expect(element).toHaveProperty('name')
      expect(element).toHaveProperty('actions')
      expect(element).toHaveProperty('reactions')
      element.actions.forEach(elementAction => {
        expect(elementAction).toHaveProperty('name')
        expect(elementAction).toHaveProperty('description')
      })
      element.reactions.forEach(elementReaction => {
        expect(elementReaction).toHaveProperty('name')
        expect(elementReaction).toHaveProperty('description')
      })
    });
  })
})