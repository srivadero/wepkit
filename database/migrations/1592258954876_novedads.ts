import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Novedads extends BaseSchema {
  protected tableName = 'novedads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('fecha').notNullable()
      table.string('descripcion').notNullable()
      table.integer('camara_id').notNullable().references('id').inTable('camaras').onDelete('cascade')
      table.integer('user_id').nullable().references('id').inTable('users').onDelete('cascade')
      table.integer('tipo_id').nullable().references('id').inTable('tipos').onDelete('cascade')
      table.integer('estado_id').nullable().references('id').inTable('estados').onDelete('cascade')
      // table.boolean('isopen').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
