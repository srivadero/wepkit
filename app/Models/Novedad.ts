import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo, BelongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import Camara from 'App/Models/Camara'
import User from 'App/Models/User'
import Tipo from './Tipo'

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

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public tipoId: number

  @belongsTo(() => Tipo)
  public tipo: BelongsTo<typeof Tipo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static fromCamara = scope((query, camaraId: string) => {
    if (camaraId) query.andWhere('camaraId', camaraId)
  })

  public static fromUser = scope((query, userId: string) => {
    if (userId) query.andWhere('userId', userId)
  })

}
