import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Estados extends BaseSchema {
  protected tableName = 'estados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
