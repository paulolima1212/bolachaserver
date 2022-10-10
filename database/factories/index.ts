import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const createUser = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.name.fullName(),
  }
}).build()
