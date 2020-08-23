import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

class DataValidator {
  constructor(private ctx: HttpContextContract) {
  }
  public cacheKey = this.ctx.routeKey

  public schema = schema.create({
    name: schema.string({ escape: true, trim: true }, [rules.minLength(3)]),
    mail: schema.string({ escape: true, trim: true }, [rules.minLength(3)]),
    city: schema.string({ escape: true, trim: true }, [rules.minLength(3)]),
  })

  public messages = {
    // 'nombre.required': 'No puede estar vacio',
    // 'nombre.maxLength': 'Maximo 30 caracteres',
  }
}

const data = [
  {id: 1, name: 'ASD1', mail: 'qwe1', city: 'c1'},
  {id: 2, name: 'ASD2', mail: 'qwe2', city: 'c2'},
  {id: 3, name: 'ASD3', mail: 'qwe3', city: 'c3'},
  {id: 4, name: 'ASD4', mail: 'qwe4', city: 'c4'},
  {id: 5, name: 'ASD5', mail: 'qwe5', city: 'c5'},
]

export default class TestsController {
  public async index ({ view }: HttpContextContract) {
    return view.render('test/index', { items: data})
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('test/create')
  }

  public async store ({ request, response}: HttpContextContract) {
    const data = await request.validate(DataValidator)
    console.log(data)
    return response.redirect().toRoute('test.index')
  }

  public async edit ({ params, view }: HttpContextContract) {
    const item = data[params.id-1]
    return view.render('test/edit', { item: item } )
  }

  public async update ({request, response}: HttpContextContract) {
    const data = await request.validate(DataValidator)
    console.log(data)
    return response.redirect().toRoute('test.index')
  }

  public async show ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
