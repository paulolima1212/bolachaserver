import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Extra from './Extra'
import Option from './Option'
import Product from './Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @column({ columnName: 'is_card' })
  public isCard: boolean

  @column({ columnName: 'product_id' })
  public productId: string

  @manyToMany(() => Extra, {
    pivotTable: 'extra_categories',
  })
  public extra: ManyToMany<typeof Extra>

  @manyToMany(() => Option, {
    pivotTable: 'categorie_options',
  })
  public option: ManyToMany<typeof Option>

  @belongsTo(() => Product, {
    foreignKey: 'id',
    localKey: 'productId',
  })
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(categorie: Category) {
    categorie.id = randomUUID()
  }
}
