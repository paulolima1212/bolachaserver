import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'call_services'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('client').notNullable()
      table.string('table').notNullable()
      table
        .enum('service', ['PAYCHECK', 'HELP'], { enumName: 'service', useNative: true })
        .notNullable()
      table.boolean('is_done').defaultTo(false)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
