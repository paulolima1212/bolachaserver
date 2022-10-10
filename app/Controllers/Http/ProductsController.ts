import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  public async store({ request, response }: HttpContextContract) {
    const { description, image, name, price, unit, useCard, validateStock } =
      await request.validate(CreateProductValidator)

    const product = await Product.create({
      description,
      image,
      name,
      price,
      unit,
      useCard,
      validateStock,
    })

    return response.created({ product })
  }

  public async show({ response }: HttpContextContract) {
    const products = await Product.query().preload('categorie')

    return response.ok({ products })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    await Product.query().where('id', id).delete()

    return response.ok({})
  }

  public async showOne({ params, response }: HttpContextContract) {
    const { id } = params

    const product = await Product.query().where('id', id).preload('categorie')

    return response.ok({ product })
  }
}
