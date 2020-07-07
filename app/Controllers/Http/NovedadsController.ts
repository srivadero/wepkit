import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad'
import Camara from 'App/Models/Camara'
import NovedadEditValidator from 'App/Validators/novedad/EditValidator'
import NovedadCreateManyValidator from 'App/Validators/novedad/CreateManyValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
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

  public async create({ view }: HttpContextContract) {
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    return view.render('novedad/create', { camaras })
  }

  public async store({ request, response, session }: HttpContextContract) {
    console.log(request.all())
    const data = await request.validate(NovedadCreateManyValidator)

    data.camaras.forEach(async (elem) => {
      const camara = await Camara.find(elem)
      if (camara) {
        const novedad = new Novedad
        novedad.fecha = data.fecha
        novedad.descripcion = data.descripcion
        novedad.camaraId = elem
        await novedad.save()
      }
    })
    session.flash({ success: Message.SAVED })
    return response.redirect().toRoute('novedad.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const novedad = await Novedad.find(params.id)
    if (!novedad) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('novedad.index')
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
    return response.redirect().toRoute('novedad.index')
  }
}
