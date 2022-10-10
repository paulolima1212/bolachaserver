import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CallService from 'App/Models/CallService'

export default class CallServicesController {
  public async store({ request, response }: HttpContextContract) {
    const { client, isDone, service, table } = request.only([
      'client',
      'table',
      'service',
      'isDone',
    ])

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
}
