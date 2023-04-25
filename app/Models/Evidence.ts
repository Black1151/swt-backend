import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Goal from 'App/Models/Goal'

export default class Evidence extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public goalId: number

  @belongsTo(() => Goal)
  public goal: BelongsTo<typeof Goal>

  @column()
  public comment: string

  @column()
  public staffMember: string

  @column()
  public imageLink: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
