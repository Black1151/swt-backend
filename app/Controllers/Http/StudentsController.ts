import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {

  public async index({ response }: HttpContextContract) {
    try {
      const students = await Student.all()
      response.status(200).send(students)
    } catch (error) {
      console.error(error)
      response.status(500).send({ message: 'Error fetching students.' })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    
    console.log(request.body())

    try {
      const data = request.only(['first_name', 'last_name', 'year'])
      console.log(data)
      const student = await Student.create(data)
      response.status(201).send(student)
    } catch (error) {
      console.error(error)
      response.status(500).send({ message: 'Error adding student.' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
