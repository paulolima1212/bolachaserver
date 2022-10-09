import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Category from './Category'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public option: string

  @column({ columnName: 'category_id' })
  public categoryId: string

  @manyToMany(() => Category, {
    pivotTable: 'categorie_options',
  })
  public categorie: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(option: Option) {
    option.id = randomUUID()
  }
}
