import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student, { IEvidence } from 'App/Models/Student'
import Goal from 'App/Models/Goal';

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

  // Fetch one student
  public async getStudent({ params, response }: HttpContextContract) {
    try {
      const student = await Student.find(params.id)
      response.status(200).send(student)
    } catch (error) {
      console.error(error)
      response.status(500).send({ message: 'Error fetching student.' })
    }
  }


  // Add a student
  public async store({ request, response }: HttpContextContract) {
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
      const student = await Student.create(data)
      response.status(201).send(student)
    } catch (error) {
      console.error(error)
      response.status(500).send({ message: 'Error adding student.' })
    }
  } 

  // Get all goals for a specific student
  public async getAllGoals({ params, response }: HttpContextContract) {

    try {
      const student = await Student.find(params.id)
      if (student) {
        await student.load('goals')
        response.status(200).send(student.goals)
      } else {
        response.status(404).send({ message: 'Student not found.' })
      }
    } catch (error) {
      console.error(error)
      response.status(500).send({ message: 'Error fetching goals.' })
    }
  }


  // Add a new goal for a student
  public async addGoal({ params, request, response }: HttpContextContract) {
    try {
      const student = await Student.find(params.id);
      if (student) {
        const newGoal = new Goal();
        newGoal.title = request.only(['title']).title;
        newGoal.status = 'In progress';
        await student.related('goals').save(newGoal);
        response.status(200).send(student);
      } else {
        response.status(404).send({ message: 'Student not found.' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).send({ message: 'Error adding goal.' });
    }
  }
  
  
///// Needs update after new approach applied to add goal

//Update the status of a goal for a student
public async updateGoalStatus({ params, request, response }: HttpContextContract) {
  try {
    const goal = await Goal.find(params.id)
    const newStatus = request.input('status')

    if (goal) {
      goal.status = newStatus
      await goal.save()
      response.status(200).send({ message: 'Goal status updated.' }) // changed the message
    } else {
      response.status(404).send({ message: 'Goal not found.' }) // changed the message
    }
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: 'Error updating goal status.' })
  }
}



///// Needs update after new approachapplied to add goal
// Add an entry to the evidence for a goal
// public async addEvidence({ params, request, response }: HttpContextContract) {
//   try {
//     const student = await Student.find(params.id)
//     const goalIndex = request.input('goal_index')
//     const newEvidence : IEvidence = request.only(['date', 'name', 'image_link'])

//     if (student) {
//       if (student.goals?.[goalIndex]) { 
//         student.goals[goalIndex].evidence = (student.goals[goalIndex].evidence ?? []).concat(newEvidence)
//         await student.save()
//         response.status(200).send(student)
//       } else {
//         response.status(404).send({ message: 'Goal not found.' })
//       }
//     } else {
//       response.status(404).send({ message: 'Student not found.' })
//     }
//   } catch (error) {
//     console.error(error)
//     response.status(500).send({ message: 'Error adding evidence.' })
//   }
// }



  
  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
