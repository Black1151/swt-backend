import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Evidence from './Evidence'
import Student from 'App/Models/Student'

export default class Goal extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @column()
  public title: string

  @column()
  public date: string

  @column()
  public status: string

  @hasMany(() => Evidence)
  public evidence: HasMany<typeof Evidence>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}