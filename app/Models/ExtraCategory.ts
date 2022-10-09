import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Extra from './Extra'
import Category from './Category'

export default class ExtraCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'extra_id' })
  public extraId: string

  @column({ columnName: 'categorie_id' })
  public categorieId: string

  @belongsTo(() => Extra, {
    foreignKey: 'id',
    localKey: 'extraId',
  })
  public extra: BelongsTo<typeof Extra>

  @belongsTo(() => Category, {
    foreignKey: 'id',
    localKey: 'categorieId',
  })
  public categorie: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(extraCategorie: ExtraCategory) {
    extraCategorie.id = randomUUID()
  }
}
