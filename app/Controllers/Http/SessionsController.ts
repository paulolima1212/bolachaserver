import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class SessionsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUserValidator)

    try {
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

  public async destroy({ response, auth }: HttpContextContract) {
    try {
      await auth.logout()

      return response.ok({})
    } catch (err) {
      console.log(err)
      return response.internalServerError()
    }
  }
}
