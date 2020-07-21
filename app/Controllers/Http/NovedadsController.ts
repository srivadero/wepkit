import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad'
import Camara from 'App/Models/Camara'
import User from 'App/Models/User'
import Tipo from 'App/Models/Tipo'
import NovedadEditValidator from 'App/Validators/novedad/EditValidator'
import NovedadCreateValidator from 'App/Validators/novedad/CreateValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

export default class NovedadsController {

  public async index({ request, view }: HttpContextContract) {
    // Get query parameters
    const camara = request.get().camara
    const usuario = request.get().usuario
    const tipo = request.get().tipo
    const page  = request.get().page || 1

    // Query database
    const pagination = await Novedad.query()
      .apply((scopes) => { scopes.whereCamaraIs(camara) })
      .apply((scopes) => { scopes.whereUserIs(usuario) })
      .apply((scopes) => { scopes.whereTipoIs(tipo) })
      .preload('camara')
      .preload('user')
      .preload('tipo')
      .orderBy('id', 'asc')
      .paginate(page, 20)

      // Fetch data
      const novedades = pagination.all()
      const camaras = await Camara.query().orderBy('nombre', 'asc')
      const usuarios = await User.query().orderBy('username', 'asc')
      const tipos = await Tipo.query().orderBy('nombre', 'asc')

      return view.render('novedad/index', { novedades, camaras, usuarios, tipos, pagination: pagination.getMeta(), camara, usuario, tipo })
  }

  public async create({ view }: HttpContextContract) {
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    const tipos = await Tipo.query().orderBy('nombre', 'asc')
    return view.render('novedad/create', { camaras, tipos })
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    const data = await request.validate(NovedadCreateValidator)

    data.camaras.forEach(async (elem) => {
      const camara = await Camara.find(elem)
      if (camara) {
        const novedad = new Novedad
        novedad.fecha = data.fecha
        novedad.descripcion = data.descripcion
        novedad.camaraId = elem
        if(auth.user) novedad.userId = auth.user!.id
        novedad.tipoId = data.tipo
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
    novedad?.merge(data)
    await novedad?.save()
    session.flash(novedad ? { success: Message.UPDATED } : { error: Message.NOT_FOUND })
    return response.redirect().toRoute('novedad.index')
  }

  public async show({ params, response, session, view }: HttpContextContract) {
    const novedad = await Novedad
      .query()
      .where('id', params.id)
      .preload('camara')
      .preload('user')
      .preload('tipo')
      .first()
    if (!novedad) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('novedad.index')
    }
    return view.render('novedad/show', { novedad })
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('Novedad.destroy no implementado')
    return response.redirect().toRoute('novedad.index')
  }

  // public async index({ request, session, view }: HttpContextContract) {
  //   const { camara, usuario, tipo } = session.all()
  //   const page  = request.get().page || 1

  //   // const data = request.all()
  //   const camaras = await Camara.query().orderBy('nombre', 'asc')
  //   const usuarios = await User.query().orderBy('username', 'asc')
  //   const tipos = await Tipo.query().orderBy('nombre', 'asc')
  //   const pagination = await Novedad.query()
  //     .apply((scopes) => { scopes.whereCamaraIs(camara) })
  //     .apply((scopes) => { scopes.whereUserIs(usuario) })
  //     .apply((scopes) => { scopes.whereTipoIs(tipo) })
  //     .preload('camara')
  //     .preload('user')
  //     .preload('tipo')
  //     .orderBy('fecha', 'desc')
  //     .paginate(page, 10)
  //     const novedades = pagination.all()

  //     return view.render('novedad/index', { novedades, camaras, usuarios, tipos,
  //     camara, usuario, tipo, pagination: pagination.getMeta()
  //   })
  // }

  // public async filter({ session, request, response } : HttpContextContract) {
  //   const data = request.all()
  //   session.put('camara', data.camara)
  //   session.put('usuario', data.usuario)
  //   session.put('tipo', data.tipo)
  //   return  response.redirect().toRoute('novedad.index')
  // }

  // public async removeFilter( { session, response }: HttpContextContract) {
  //   session.put('camara', '')
  //   session.put('usuario', '')
  //   session.put('tipo', '')
  //   return  response.redirect().toRoute('novedad.index')
  // }

}
