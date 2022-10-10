import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Category from './Category'
import Option from './Option'

export default class CategorieOption extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'category_id' })
  public categoryId: string

  @column({ columnName: 'option_id' })
  public optionId: string

  @belongsTo(() => Category, {
    foreignKey: 'id',
    localKey: 'categorieId',
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Option, {
    foreignKey: 'id',
    localKey: 'optionId',
  })
  public option: BelongsTo<typeof Option>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static attatchId(categoriAndOption: CategorieOption) {
    categoriAndOption.id = randomUUID()
  }
}
