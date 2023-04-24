import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student, { Goal, Evidence } from 'App/Models/Student'

export default class StudentsController {

  
  // Fetch all students
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

  // Add a new goal for a student
public async addGoal({ params, request, response }: HttpContextContract) {
  try {
    const student = await Student.find(params.id)
    if (student) {
      const newGoal : Goal = request.only(['title', 'date', 'status', 'evidence'])
      student.goals.push(newGoal) // Use goals directly as an array
      await student.save()
      response.status(200).send(student)
  } else {
      response.status(404).send({ message: 'Student not found.' })
    }
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: 'Error adding goal.' })
  }
}

// Update the status of a goal for a student
public async updateGoalStatus({ params, request, response }: HttpContextContract) {
  try {
    const student = await Student.find(params.id)
    const goalIndex = request.input('goal_index')
    const newStatus = request.input('status')

    if (student) {
      if (student.goals[goalIndex]) { // Use goals directly as an array
        student.goals[goalIndex].status = newStatus
        await student.save()
        response.status(200).send(student)
      } else {
        response.status(404).send({ message: 'Goal not found.' })
      }
    } else {
      response.status(404).send({ message: 'Student not found.' })
    }
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: 'Error updating goal status.' })
  }
}

// Add an entry to the evidence for a goal
public async addEvidence({ params, request, response }: HttpContextContract) {
  try {
    const student = await Student.find(params.id)
    const goalIndex = request.input('goal_index')
    const newEvidence : Evidence = request.only(['date', 'name', 'image_link'])

    if (student) {
      if (student.goals[goalIndex]) { 
        student.goals[goalIndex].evidence.push(newEvidence)
        await student.save()
        response.status(200).send(student)
      } else {
        response.status(404).send({ message: 'Goal not found.' })
      }
    } else {
      response.status(404).send({ message: 'Student not found.' })
    }
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: 'Error adding evidence.' })
  }
}

  public async store({ request, response }: HttpContextContract) {
    console.log(request.body())
  
    try {
      const data = request.only([
        'first_name',
        'last_name',
        'year',
        'behavior_score',
        'goals',
      ])
  
      if (!data.goals) {
        data.goals = JSON.stringify([])
      }
  
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
