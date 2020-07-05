import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Novedads extends BaseSchema {
  protected tableName = 'novedads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('fecha').notNullable()
      table.string('descripcion').notNullable()
      table.integer('camara_id').notNullable().references('id').inTable('camaras').onDelete('cascade')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
