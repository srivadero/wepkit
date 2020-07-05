import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo, BelongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import Camara from './Camara'

export default class Novedad extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public fecha: DateTime

  @column()
  public descripcion: string

  @column()
  public camaraId: number

  @belongsTo(() => Camara)
  public camara: BelongsTo<typeof Camara>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static fromCamara = scope((query, camaraId: string) => {
    if (camaraId) query.andWhere('camaraId', camaraId)
  })
}
