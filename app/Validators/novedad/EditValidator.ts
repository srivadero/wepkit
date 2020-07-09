import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class NovedadEditValidator {
  constructor (private ctx: HttpContextContract) {
  }

  public schema = schema.create({
    fecha: schema.date({ format: 'd/L/yyyy H:m' }),
    descripcion: schema.string({ escape: true, trim: true }, [rules.maxLength(150)]),
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
    'fecha.required': 'No puede estar vacio',
    'fecha.format': 'Formato no valido',
    'descripcion.required': 'No puede estar vacio',
    'descripcion.maxLength': 'Maximo 150 caracteres',
    'camara.required': 'Debe seleccionar uno'
  }
}
