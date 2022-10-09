import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Product from './Product'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public quantity: number

  @column({ columnName: 'product_id' })
  public productId: string

  @hasMany(() => Product, {
    foreignKey: 'id',
    localKey: 'productId',
  })
  public product: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(stock: Stock) {
    stock.id = randomUUID()
  }
}
