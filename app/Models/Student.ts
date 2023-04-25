import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Goal from './Goal'

export interface IGoal {
  title: string
  date: string
  status: string
  evidence?: IEvidence[]
}

export interface IEvidence {
  date: string
  name: string
  image_link: string
}

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public year: number

  @column()
  public behaviorScore: number

  @hasMany(() => Goal)
  public goals: HasMany<typeof Goal>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}