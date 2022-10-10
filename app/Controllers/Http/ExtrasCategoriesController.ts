import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExtraCategory from 'App/Models/ExtraCategory'

export default class ExtrasCategoriesController {
  public async store({ request, response }: HttpContextContract) {
    const { categorieId, extraId } = request.only(['extraId', 'categorieId'])

    await ExtraCategory.create({
      categorieId,
      extraId,
    })

    return response.created({})
  }
}
