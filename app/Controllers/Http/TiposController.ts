import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tipo from 'App/Models/Tipo'
import TipoValidator from 'App/Validators/TipoValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

export default class TiposController {

  public async index({ view }: HttpContextContract) {
    const tipos = await Tipo.query().orderBy('nombre', 'asc')
    return view.render('tipo/index', { tipos })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('tipo/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const data = await request.validate(TipoValidator)
    const tipo = new Tipo
    tipo.merge(data)
    await tipo.save()
    session.flash({ success: Message.SAVED })
    return response.redirect().toRoute('tipo.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const tipo = await Tipo.find(params.id)
    if (!tipo) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('tipo.index')
    }
    return view.render('tipo/edit', { tipo })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(TipoValidator)
    const tipo = await Tipo.find(params.id)
    tipo?.merge(data)
    await tipo?.save()
    session.flash(tipo ? { success: Message.UPDATED } : { error: Message.NOT_FOUND })
    return response.redirect().toRoute('tipo.index')
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('Tipo.destroy no implementado')
    return response.redirect().toRoute('tipo.index')
  }

}
