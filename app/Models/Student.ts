// app/Models/Student.ts

import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string
  
  @column()
  public year: string

  // Add any other fields you need
}
