import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camara from 'App/Models/Camara'
import CamaraValidator from 'App/Validators/CamaraValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
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
    return response.redirect().toRoute('camara.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const camara = await Camara.find(params.id)
    if (!camara) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('camara.index')
    }
    return view.render('camara/edit', { camara })
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(CamaraValidator)
    const camara = await Camara.find(params.id)
    camara?.merge(data)
    await camara?.save()
    session.flash(camara ? { success: Message.UPDATED } : { error: Message.NOT_FOUND })
    return response.redirect().toRoute('camara.index')
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('Camara.destroy no implementado')
    return response.redirect().toRoute('camara.index')
  }

}
