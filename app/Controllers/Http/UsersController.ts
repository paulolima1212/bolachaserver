import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password, username } = await request.validate(CreateUserValidator)

    try {
      await User.create({
        email,
        password,
        username,
      })

      console.log({
        email,
        password,
        username,
      })

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '2hours',
      })

      return response.created({
        user: auth.user,
        token,
      })
    } catch (err) {
      console.log(err)
      return response.internalServerError()
    }
  }
}
