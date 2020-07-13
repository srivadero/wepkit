import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tipos extends BaseSchema {
  protected tableName = 'tipos'

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
