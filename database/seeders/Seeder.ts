import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Camara from 'App/Models/Camara'
import Novedad from 'App/Models/Novedad'
import { DateTime } from 'luxon'
import faker from 'faker'

export default class SeederSeeder extends BaseSeeder {
  public async run() {
    // Reset database
    await Novedad.truncate()
    await Camara.truncate()
    await User.truncate()

    // Create admin user
    await User.firstOrCreate({ username: 'admin' },
      { username: 'admin', email: 'admin@example.com', password: 'admin' }
    )

    // Create some camaras
    for (let index = 1; index <= 5; index++) {
      const camara = await Camara.create({ nombre: 'IP_0' + index })
      // Create some novedades
      await camara.related('novedades').createMany([
        { fecha: DateTime.fromJSDate(faker.date.recent(3)), descripcion: faker.lorem.sentence()},
        { fecha: DateTime.fromJSDate(faker.date.recent(3)), descripcion: faker.lorem.sentence()},
        { fecha: DateTime.fromJSDate(faker.date.recent(3)), descripcion: faker.lorem.sentence()},
        { fecha: DateTime.fromJSDate(faker.date.recent(3)), descripcion: faker.lorem.sentence()},
        { fecha: DateTime.fromJSDate(faker.date.recent(3)), descripcion: faker.lorem.sentence()},
      ])
    }
  }
}
