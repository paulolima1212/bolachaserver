/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class ExceptionHandler extends HttpExceptionHandler {
  private readonly BAD_REQUEST = 'BAD_REQUEST'

  constructor() {
    super(Logger)
  }

  public async handle(error: Exception, { response }: HttpContextContract) {
    if (error.status === 422) {
      return response.status(error.status).json({
        message: error.message,
        status: this.BAD_REQUEST,
        code: error.code,
      })
    }
    return response.status(error.status).json({
      message: error.message,
      status: error.status,
      code: error.code,
    })
  }
}
