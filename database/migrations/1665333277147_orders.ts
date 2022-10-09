import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('client').notNullable()
      table.string('nif').notNullable()
      table.string('table').notNullable()
      table.string('total_pay').notNullable()
      table
        .enum('payment_method', ['MBWAY', 'DINHEIRO'], {
          useNative: true,
          enumName: 'pay_method',
        })
        .defaultTo('DINHEIRO')
      table.boolean('status').defaultTo(false)
      table.boolean('status_payment').defaultTo(false)
      table.string('product_id').references('id').inTable('products').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
