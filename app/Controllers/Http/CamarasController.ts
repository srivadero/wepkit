import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camara from 'App/Models/Camara'
// import Novedad from 'App/Models/Novedad'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

enum PATH {
  'INDEX' = 'camara.index',
}

class CamaraValidator {
  constructor(private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    nombre: schema.string({ escape: true, trim: true }, [rules.maxLength(30)]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'nombre.required': 'No puede estar vacio',
    'nombre.maxLength': 'Maximo 30 caracteres',
  }
}

export default class CamarasController {
  public async index({ view }: HttpContextContract) {
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    return view.render('camara/index', { camaras })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('camara/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const data = await request.validate(CamaraValidator)

    const camara = new Camara
    camara.merge(data)
    await camara.save()
    session.flash({ success: Message.SAVED })
    return response.redirect().toRoute(PATH.INDEX)
  }

  public async show({ params, session, response, view }: HttpContextContract) {
    const camara = await Camara.find(params.id)
    if (!camara) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute(PATH.INDEX)
    }
    const novedades = await camara.related('novedades').query()
    return view.render('camara/show', { camara, novedades })
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const camara = await Camara.find(params.id)
    if (!camara) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute(PATH.INDEX)
    }
    return view.render('camara/edit', { camara })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(CamaraValidator)
    const camara = await Camara.find(params.id)
    if (!camara) {
      session.flash({ error: Message.NOT_FOUND })
    }
    else {
      camara.merge(data)
      await camara.save()
      session.flash({ success: Message.UPDATED })
    }
    return response.redirect().toRoute(PATH.INDEX)
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('Destroy elemente here')
    return response.redirect().toRoute(PATH.INDEX)
  }

}
