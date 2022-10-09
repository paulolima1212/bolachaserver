import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.integer('quantity')
      table.string('product_id').notNullable().references('id').inTable('products')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
