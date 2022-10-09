import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('name').notNullable()
      table.float('price').notNullable()
      table.string('unit').notNullable()
      table.string('description').defaultTo(null)
      table.string('image').defaultTo(null)
      table.boolean('validate_stock').defaultTo(false)
      table.boolean('use_card').defaultTo(false)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
