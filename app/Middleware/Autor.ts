import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad'

export default class Autor {
  public async handle ({ auth, params, response, session }: HttpContextContract, next: () => Promise<void>) {
    // console.log(`Autor middleware: Only autor should make this action on novedad ${params.id}`)
    const novedad = await Novedad.find(params.id)
    if(novedad)
    {
      if(novedad.userId == auth.user?.id) await next()
      else {
        session.flash({ 'error': 'No puedes ejecutar esta accion ya que no eres el autor'})
        return response.redirect('back')
      }
    }
    else {
      session.flash({ 'error': 'No se encontro novedad'})
      return response.redirect('back')
    }
  }
}
