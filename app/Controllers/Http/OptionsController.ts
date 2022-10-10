import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Option from 'App/Models/Option'

export default class OptionsController {
  public async store({ request, response }: HttpContextContract) {
    const { option } = request.only(['option'])

    const optionCreated = await Option.create({
      option,
    })

    return response.created({
      option: optionCreated,
    })
  }

  public async show({ response }: HttpContextContract) {
    const options = await Option.query().preload('categorie')

    return response.ok({
      options,
    })
  }

  public async showOne({ response, params }: HttpContextContract) {
    const { id } = params

    const option = await Option.query().where('id', id).preload('categorie')

    return response.ok({
      option,
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    await Option.query().where('id', id).delete()

    return response.ok({})
  }
}
