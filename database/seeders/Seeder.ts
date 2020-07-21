import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Camara from 'App/Models/Camara'
import Novedad from 'App/Models/Novedad'
import Tipo from 'App/Models/Tipo'
import { DateTime } from 'luxon'
import faker from 'faker'

export default class SeederSeeder extends BaseSeeder {
  public async run() {
    // Reset database
    await Novedad.truncate()
    await Camara.truncate()
    await User.truncate()
    await Tipo.truncate()

    // Create admin user
    await User.firstOrCreate({ username: 'admin' },
      { username: 'admin', email: 'admin@example.com', password: 'admin' }
    )

    // Create operator user
    await User.firstOrCreate({ username: 'operator1' },
      { username: 'operator1', email: 'operator1@example.com', password: 'operator1' }
    )

    // Create tipos
    await Tipo.createMany([
      { nombre: 'Mantenimiento camaras'},
      { nombre: 'Mantenimiento perimetral'}
    ])

    // Create some camaras
    for (let index = 1; index <= 10; index++) {
      const camara = await Camara.create({ nombre: 'IP ' + index })
      // Create some novedades
      await camara.related('novedades').createMany([
        { userId: 1, tipoId: 1, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 1, tipoId: 2, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 1, tipoId: 1, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 2, tipoId: 1, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 2, tipoId: 2, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 1, tipoId: 1, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 1, tipoId: 2, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 1, tipoId: 1, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 2, tipoId: 1, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
        { userId: 2, tipoId: 2, fecha: DateTime.fromJSDate(faker.date.recent(30)), descripcion: faker.lorem.sentence()},
      ])
    }
  }
}
