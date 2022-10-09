import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Category from './Category'

export default class Extra extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public option: string

  @manyToMany(() => Category, {
    pivotTable: 'extra_categories',
  })
  public categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(extra: Extra) {
    extra.id = randomUUID()
  }
}
