import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategorieValidator from 'App/Validators/CreateCategorieValidator'

export default class CategoriesController {
  public async store({ request, response }: HttpContextContract) {
    const { description, image, isCard, name, productId } = await request.validate(
      CreateCategorieValidator
    )

    const categorie = await Category.create({
      description,
      image,
      isCard,
      name,
      productId,
    })

    await categorie.preload('extra')
    await categorie.preload('option')
    await categorie.preload('product')

    return response.created({
      categorie,
    })
  }

  public async show({ response }: HttpContextContract) {
    const categories = await Category.query().preload('product').preload('extra').preload('option')

    return response.ok({
      categories,
    })
  }

  public async showOne({ response, params }: HttpContextContract) {
    const { id } = params

    const categorie = await Category.query()
      .where('id', id)
      .preload('product')
      .preload('extra')
      .preload('option')

    return response.ok({
      categorie,
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    await Category.query().where('id', id).delete()

    return response.ok({})
  }
}
