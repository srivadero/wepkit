import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad'
import Camara from 'App/Models/Camara'
import NovedadEditValidator from 'App/Validators/novedad/EditValidator'
import NovedadCreateManyValidator from 'App/Validators/novedad/CreateManyValidator'
import User from 'App/Models/User'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

export default class NovedadsController {

  public async index({ request, view }: HttpContextContract) {
    const data = request.all()
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    const usuarios = await User.query().orderBy('username', 'asc')
    const novedades = await Novedad.query()
      .apply((scopes) => { scopes.fromCamara(data.camara) })
      .apply((scopes) => { scopes.fromUser(data.usuario) })
      .preload('camara')
      .preload('user')
      .preload('tipo')
      .orderBy('fecha', 'desc')
    return view.render('novedad/index', { novedades, camaras, usuarios })
  }

  public async create({ view }: HttpContextContract) {
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    return view.render('novedad/create', { camaras })
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    const data = await request.validate(NovedadCreateManyValidator)

    data.camaras.forEach(async (elem) => {
      const camara = await Camara.find(elem)
      if (camara) {
        const novedad = new Novedad
        novedad.fecha = data.fecha
        novedad.descripcion = data.descripcion
        novedad.camaraId = elem
        if (auth.user) novedad.userId = auth.user.id
        await novedad.save()
      }
    })
    session.flash({ success: Message.SAVED })
    return response.redirect().toRoute('novedad.index')
  }

  public async show({ params, response, session, view }: HttpContextContract) {
    const novedad = await Novedad
      .query()
      .where('id', params.id)
      .preload('camara')
      .preload('user')
      .first()
    if (!novedad) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('novedad.index')
    }
    return view.render('novedad/show', { novedad })
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

  public async destroy({ response }: HttpContextContract) {
    console.log('Novedad.destroy no implementado')
    return response.redirect().toRoute('novedad.index')
  }

}
