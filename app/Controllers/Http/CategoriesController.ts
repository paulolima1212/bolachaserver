import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {
  public async store({ request, response }: HttpContextContract) {
    const {} = request.only(['name', 'descirption', ''])
  }
}
