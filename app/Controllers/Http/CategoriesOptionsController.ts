import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategorieOption from 'App/Models/CategorieOption'

export default class CategoriesOptionsController {
  public async store({ request, response }: HttpContextContract) {
    const { categorieId, optionId } = request.only(['categorieId', 'optionId'])

    await CategorieOption.create({
      categorieId,
      optionId,
    })

    return response.created({})
  }
}
