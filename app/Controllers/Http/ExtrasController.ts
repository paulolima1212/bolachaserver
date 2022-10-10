import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Extra from 'App/Models/Extra'

export default class ExtrasController {
  public async store({ request, response }: HttpContextContract) {
    const { option } = request.only(['option'])

    await Extra.create({
      option,
    })

    return response.created({})
  }
}
