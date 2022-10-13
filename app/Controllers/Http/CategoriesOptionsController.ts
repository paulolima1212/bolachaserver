import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategorieOption from 'App/Models/CategorieOption'

export default class CategoriesOptionsController {
  public async store({ request, response }: HttpContextContract) {
    const { categoryId, optionId } = request.only(['categoryId', 'optionId'])

    await CategorieOption.create({
      optionId,
      categoryId,
    })

    return response.created({})
  }
}
