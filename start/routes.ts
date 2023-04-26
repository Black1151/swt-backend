/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //Student records
  Route.get('/students', 'StudentsController.index')
  Route.get('/students/:id', 'StudentsController.getStudent')

  Route.post('/students', 'StudentsController.store')

  // Behaviour score
  Route.put('/students/:id/behavior_score', 'StudentsController.updateBehaviourScore')

  // Goals
  Route.get('/students/goals/:id', 'StudentsController.getAllGoals')   
  Route.post('/students/goals/:id', 'StudentsController.addGoal')
  Route.put('/students/goals/:id/status', 'StudentsController.updateGoalStatus')

  // Evidence for goals
  Route.post('/students/goals/evidence/:id', 'StudentsController.addEvidence')
}).prefix('/api')