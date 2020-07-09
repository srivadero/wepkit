import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camara from 'App/Models/Camara'
import Novedad from 'App/Models/Novedad'
import NovedadCreateValidator from 'App/Validators/novedad/CreateValidator'
import NovedadEditValidator from 'App/Validators/novedad/EditValidator'

enum Message {
  'NOT_FOUND' = 'Elemento no encontrado',
  'SAVED' = 'Elemento creado',
  'UPDATED' = 'Elemento guardado',
}

export default class NovedadCamarasController {

  public async create({ params, view }: HttpContextContract) {
    const camara = await Camara.find(params.camara_id)
    return view.render('camara/createNovedad', { camara })
  }

  public async store({ params, request, response, session }: HttpContextContract) {
    const data = await request.validate(NovedadCreateValidator)
    const camara = await Camara.find(params.camara_id)
    if (camara) {
      const novedad = new Novedad
      novedad.fecha = data.fecha
      novedad.descripcion = data.descripcion
      await camara.related('novedades').save(novedad)
      session.flash({ success: Message.SAVED })
      return response.redirect().toRoute('camara.show', { id: params.camara_id })
    }
    session.flash({ error: Message.NOT_FOUND })
    return response.redirect().toRoute('camara.index')
  }

  public async edit({ params, response, session, view }: HttpContextContract) {
    const novedad = await Novedad.find(params.id)
    if (!novedad) {
      session.flash({ error: Message.NOT_FOUND })
      return response.redirect().toRoute('camara.index')
    }
    return view.render('camara/editNovedad', { novedad })
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
    return response.redirect().toRoute('camara.show', { params: { id: params.camara_id } })
  }

}
