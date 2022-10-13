import { test } from '@japa/runner'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'

const BASE_URL = `http://localhost:3333/_api/v1/cookie`

let token: string

test.group('User', ({ each }) => {
  test('it should a create an user', async ({ assert }) => {
    const { email, password, username } = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.name.fullName(),
    }

    const { body } = await supertest(BASE_URL).post('/users').send({
      email,
      password,
      username,
    })
    assert.exists(body.user, 'User is not defined')
    assert.exists(body.token, 'Token is not defined')
    assert.equal(body.user.email, email)
    assert.equal(body.user.username, username)
  })

  test('It should not create an user', async ({ assert }) => {
    const { body } = await supertest(BASE_URL)
      .post('/users')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .expect(422)

    assert.notExists(body.user, 'User as returned')
    assert.notExists(body.token, 'User as returned')
  })

  test('it should verefy email is valid', async ({ assert }) => {
    const user = {
      email: faker.name.firstName(),
      username: faker.name.fullName(),
      password: faker.internet.password(),
    }

    const { body } = await supertest(BASE_URL).post('/users').send(user).expect(422)

    assert.exists(body.message, 'Message error is not defined')
    assert.exists(body.status, 'Status error is not defined')
  })

  test('it should create a session', async ({ assert }) => {
    const { email, password } = {
      email: 'icaro@icaro.com',
      password: 'caknclkas',
    }

    const { body } = await supertest(BASE_URL)
      .post('/users/sessions')
      .send({ email, password })
      .expect(201)

    token = body.token.token

    assert.exists(body.user, 'User is not defined')
    assert.exists(body.token, 'Token is not defined')
    assert.equal(body.user.email, email)
  })

  test('it should remove a session', async ({ assert }) => {
    const { body } = await supertest(BASE_URL)
      .delete('/users/sessions')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.isEmpty(body)
  })

  each.teardown(async () => {
    await Database.beginGlobalTransaction()
  })
  each.setup(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
