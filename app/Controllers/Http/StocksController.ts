import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from 'App/Models/Stock'

export default class StocksController {
  public async store({ request, response }: HttpContextContract) {
    const { quantity, productId } = request.only(['quantity', 'productId'])

    await Stock.create({ quantity, productId })

    return response.created({})
  }
}
