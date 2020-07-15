import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TipoValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    nombre: schema.string({ escape: true, trim: true }, [rules.maxLength(50)]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'nombre.required': 'No puede estar vacio',
    'nombre.maxLength': 'Maximo 50 caracteres',
  }

}
