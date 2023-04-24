import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export interface Goal {
  title: string
  date: string
  status: string
  evidence: Evidence[]
}

export interface Evidence {
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

  @column({ serializeAs: 'goals' })
  public goals: Goal[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}