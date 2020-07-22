import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estado from 'App/Models/Estado'
import EstadoValidator from 'App/Validators/EstadoValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

export default class EstadosController {
  public async index({ view }: HttpContextContract) {
    const estados = await Estado.query().orderBy('nombre', 'asc')
    return view.render('estado/index', { estados: estados })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('estado/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const data = await request.validate(EstadoValidator)
    const estado = new Estado
    estado.merge(data)
    await estado.save()
    session.flash({ success: Message.SAVED })
    return response.redirect().toRoute('estado.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const estado = await Estado.find(params.id)
    if (!estado) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('estado.index')
    }
    return view.render('estado/edit', { estado: estado })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(EstadoValidator)
    const estado = await Estado.find(params.id)
    estado?.merge(data)
    await estado?.save()
    session.flash(estado ? { success: Message.UPDATED } : { error: Message.NOT_FOUND })
    return response.redirect().toRoute('estado.index')
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('estado.destroy no implementado')
    return response.redirect().toRoute('estado.index')
  }

}
