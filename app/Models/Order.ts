import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Product from './Product'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public client: string

  @column()
  public nif: string

  @column()
  public table: string

  @column({ columnName: 'total_pay' })
  public totalPay: number

  @column({ columnName: 'payment_method' })
  public paymentMethod: string

  @column()
  public status: boolean

  @column({ columnName: 'status_payment' })
  public statusPayment: boolean

  @column({ columnName: 'product_id' })
  public productId: string

  @hasMany(() => Product, {
    localKey: 'productId',
    foreignKey: 'id',
  })
  public product: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(order: Order) {
    order.id = randomUUID()
  }
}
