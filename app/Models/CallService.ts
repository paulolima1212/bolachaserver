import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'

export default class CallService extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public client: string

  @column()
  public table: string

  @column()
  public service: string

  @column({
    columnName: 'is_done',
  })
  public isDone: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async attatchId(callService: CallService) {
    callService.id = randomUUID()
  }
}
