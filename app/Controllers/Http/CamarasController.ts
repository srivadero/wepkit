import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camara from 'App/Models/Camara'
import CamaraValidator from 'App/Validators/CamaraValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

export default class CamarasController {

  public async asTable( ctx: HttpContextContract){
    ctx.session.put('show_as', 'table')
    // return this.index(ctx)
    return ctx.response.redirect().toRoute('camara.index')
  }

  public async asCards( ctx: HttpContextContract){
    ctx.session.put('show_as', 'cards')
    // return this.index(ctx)
    return ctx.response.redirect().toRoute('camara.index')
  }

  public async index({ session, view }: HttpContextContract) {
    const camaras = await Camara.query().orderBy('nombre', 'asc')
    const show_as = session.get('show_as', 'table')
    return view.render('camara/index', { camaras, show_as })
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

  public async show({ params, session, response, view }: HttpContextContract) {
      const camara = await Camara.find(params.id)
      if (!camara) {
        session.flash({ error: Message.NOT_FOUND })
        return response.redirect().toRoute('camara.index')
      }
      const novedades = await camara.related('novedades').query().orderBy('fecha', 'desc')
      return view.render('camara/show', { camara, novedades })
    // console.log('Camara.show no implementado')
    // return response.redirect().toRoute('camara.index')
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
    if (!camara) {
      session.flash({ error: Message.NOT_FOUND })
    }
    else {
      camara.merge(data)
      await camara.save()
      session.flash({ success: Message.UPDATED })
    }
    return response.redirect().toRoute('camara.index')
  }

  public async destroy({ response }: HttpContextContract) {
    console.log('Camara.destroy no implementado')
    return response.redirect().toRoute('camara.index')
  }

}
