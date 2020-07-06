import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad'
import Camara from 'App/Models/Camara'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

enum PATH {
  'INDEX' = 'novedad.index',
}

class NovedadValidator {
  constructor(private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    fecha: schema.date({ format: 'd/L/yyyy H:m' }),
    descripcion: schema.string({ escape: true, trim: true }, [rules.maxLength(150)]),
    // camara: schema.array().members(schema.number())
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'fecha.required': 'No puede estar vacio',
    'fecha.format': 'Formato no valido',
    'descripcion.required': 'No puede estar vacio',
    'descripcion.maxLength': 'Maximo 150 caracteres',
    'camara.required': 'Debe seleccionar uno'
  }
}

class NovedadEditValidator {
  constructor(private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    fecha: schema.date({ format: 'd/L/yyyy H:m' }),
    descripcion: schema.string({ escape: true, trim: true }, [rules.maxLength(150)]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'date.format': 'Formato de fecha invalido',
    'fecha.required': 'No puede estar vacio',
    'fecha.format': 'Formato no valido',
    'descripcion.required': 'No puede estar vacio',
    'descripcion.maxLength': 'Maximo 150 caracteres',
    'camara.required': 'Debe seleccionar uno'
  }
}

export default class NovedadsController {
  public async index({ view }: HttpContextContract) {
    // const data = request.only(['camara', 'autor'])
    // const camaras = await Camara.query().orderBy('nombre', 'asc')
    // if (data.camara) {
    //   camaras.forEach((camara) => {
    //     camara.selected = (camara.id == data.camara) ? true : false
    //   })
    // }
    // const novedades = await Novedad
    //   .query()
    //   .apply((scopes) => { scopes.fromCamara(data.camara) })
    //   .preload('camara')
    //   .orderBy('fecha', 'desc')
    // return view.render('novedad/index', { camaras, novedades })
    const novedades = await Novedad.query().preload('camara').orderBy('fecha', 'desc')
    return view.render('novedad/index', { novedades })
  }

  public async create({ params, view }: HttpContextContract) {
    const camara = await Camara.find(params.camara_id)
    return view.render('novedad/create', { camara })
  }

  public async store({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(NovedadValidator)
    const camara = await Camara.find(params.camara_id)
    if(camara){
        const novedad = new Novedad
        novedad.fecha = data.fecha
        novedad.descripcion = data.descripcion
        await camara.related('novedades').save(novedad)
        session.flash({ success: Message.SAVED })
        return response.redirect().toRoute('camara.show', { id: params.camara_id})
      }
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('camara.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const novedad = await Novedad.find(params.id)
    if (!novedad) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute(PATH.INDEX)
    }
    return view.render('novedad/edit', { novedad })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(NovedadEditValidator)
    const novedad = await Novedad.find(params.id)
    if (!novedad) {
      session.flash({ error: Message.NOT_FOUND })
    }
    else {
      novedad.merge(data)
      await novedad.save()
      session.flash({ success: Message.UPDATED })
    }
    return response.redirect().toRoute('camara.show', { params: { id: params.camara_id} })
  }

  public async createMany({ params, view }: HttpContextContract) {
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    return view.render('novedad/createMany', { camaras})
  }

  public async storeMany({ params, request, response, session }: HttpContextContract) {
    console.log(request.all())
    // const data = await request.validate(NovedadValidator)
    // const camara = await Camara.find(params.camara_id)
    // if(camara){
    //     const novedad = new Novedad
    //     novedad.fecha = data.fecha
    //     novedad.descripcion = data.descripcion
    //     await camara.related('novedades').save(novedad)
    //     session.flash({ success: Message.SAVED })
    //     return response.redirect().toRoute('camara.show', { id: params.camara_id})
    //   }
    //   session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('novedad.index')
  }
}
