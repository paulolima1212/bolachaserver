import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CallService from 'App/Models/CallService'
import CallServiceValidator from 'App/Validators/CallServiceValidator'

export default class CallServicesController {
  public async store({ request, response }: HttpContextContract) {
    const { client, isDone, service, table } = await request.validate(CallServiceValidator)

    const callService = await CallService.create({
      client,
      isDone,
      service,
      table,
    })

    return response.created({
      data: callService,
    })
  }

  public async show({ response }: HttpContextContract) {
    const callServices = await CallService.query()

    return response.ok({
      data: callServices,
    })
  }

  public async showOne({ response, params }: HttpContextContract) {
    const { id } = params

    const callService = await CallService.query().where('id', id)

    return response.ok({
      data: callService,
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    await CallService.query().where('id', id).delete()

    return response.ok({})
  }
}
