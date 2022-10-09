import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public unit: string

  @column()
  public description: string

  @column()
  public image: string

  @column({ columnName: 'validate_stock' })
  public validateStock: boolean

  @column({ columnName: 'use_card' })
  public useCard: boolean

  @hasMany(() => Category, {
    onQuery(query) {
      query.preload('option')
    },
  })
  public categorie: HasMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(product: Product) {
    product.id = randomUUID()
  }
}
