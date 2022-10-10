import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import CreateOrderValidator from 'App/Validators/CreateOrderValidator'

export default class OrdersController {
  public async store({ request, response }: HttpContextContract) {
    const { client, nif, paymentMethod, productId, status, statusPayment, table, totalPay } =
      await request.validate(CreateOrderValidator)

    const order = await Order.create({
      client,
      nif,
      paymentMethod,
      productId,
      status,
      statusPayment,
      table,
      totalPay,
    })

    return response.created({
      order,
    })
  }

  public async show({ response }: HttpContextContract) {
    const orders = await Order.query().preload('product')

    return response.ok({
      orders,
    })
  }

  public async showOne({ params, response }: HttpContextContract) {
    const { id } = params

    const order = await Order.query().where('id', id).preload('product')

    return response.ok({
      order,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    await Order.query().where('id', id).delete()

    return response.ok({})
  }
}
